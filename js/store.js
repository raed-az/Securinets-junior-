/* Local-only progress. Falls back to memory if localStorage is blocked (private mode, sandboxed previews). */
(function(){
const C=window.CKC;
const KEY='cyberkids.v1';
const mem={};
let persistent=true;
const ls={
  get(k){try{return window.localStorage.getItem(k)}catch(e){persistent=false;return mem[k]==null?null:mem[k]}},
  set(k,v){try{window.localStorage.setItem(k,v)}catch(e){persistent=false;mem[k]=v}},
  del(k){try{window.localStorage.removeItem(k)}catch(e){delete mem[k]}}
};
const blank=()=>({ver:2,name:'',quiz:{},miss:{},days:[],acts:{},daily:{},week:{id:'',n:0,paid:false},studio:{levels:[],quizzes:[]},det:{},def:{},final:{best:0},lang:null,theme:null,mode:null,nick:'',avatar:0,onboarded:false,xp:0,done:{},badges:[],hints:0});
let S=blank();
/* Load + validate + migrate (v1 -> v2 only adds fields; existing progress is kept). */
const isObj=v=>v&&typeof v==='object'&&!Array.isArray(v);
function sanitize(o){
  const b=blank(),r=Object.assign(b,isObj(o)?o:{});
  ['quiz','miss','acts','daily','det','def','done'].forEach(k=>{if(!isObj(r[k]))r[k]=b[k]||{}});
  if(!isObj(r.week))r.week=b.week;if(!isObj(r.studio)||!Array.isArray(r.studio.levels))r.studio=b.studio;if(!Array.isArray(r.studio.quizzes))r.studio.quizzes=[];
  if(!isObj(r.final))r.final=b.final;
  if(!Array.isArray(r.days))r.days=[];if(!Array.isArray(r.badges))r.badges=[];
  r.xp=Math.max(0,Math.min(1e6,+r.xp||0));r.name=String(r.name||'').slice(0,24);r.nick=String(r.nick||'').slice(0,16);r.avatar=(+r.avatar||0)%6;r.ver=2;
  Object.keys(r.done).forEach(k=>{const v=+r.done[k];if(!(v>=1&&v<=3))delete r.done[k];else r.done[k]=v});
  return r;
}
try{const raw=ls.get(KEY);if(raw)S=sanitize(JSON.parse(raw));else S=blank()}catch(e){S=blank()}
const save=()=>ls.set(KEY,JSON.stringify(S));

const ctfXp={easy:30,medium:50,challenge:80},proXp={easy:40,medium:70,challenge:110};
function badgeState(){
  const d=S.done,has=id=>!!d[id];
  const ctfN=C.ctf.filter(c=>d['ctf:'+c.id]).length,lxN=C.linux.filter(m=>d['lx:'+m.id]).length,tmN=C.tasks.filter(x=>d['tm:'+x.id]).length,prN=C.pctf.filter(c=>d['ctf:'+c.id]).length;
  return {first:Object.keys(d).length>0,pw:has('c1')&&has('c2'),phish:has('p1')&&has('p2'),code:has('l1')&&has('l2'),prog:has('a1')&&has('a2'),ctf:ctfN>=5,hero:C.missions.every(m=>has(m.id)),lx:lxN>=6,term:tmN>=8,pro:prN>=6,defender:lxN>=C.linux.length&&tmN>=C.tasks.length&&prN>=10,course:C.course.every(m=>has('mod:'+m.id)),final:has('final'),sleuth:['det:case1','det:case2','det:case3'].every(has),netdef:has('def:run'),creator:has('studio:made')};
}
const Store={
  get s(){return S},
  set(k,v){S[k]=v;save()},
  isDone:id=>!!S.done[id],
  stars:id=>S.done[id]||0,
  level:()=>Math.floor(S.xp/100)+1,
  levelProgress:()=>S.xp%100,
  /* Complete an item once for XP; replaying keeps the best star count. Returns info for the celebration. */
  get persistent(){return persistent},
  today:()=>new Date().toISOString().slice(0,10),
  weekId(){const d=new Date(),t=new Date(Date.UTC(d.getFullYear(),d.getMonth(),d.getDate())),n=t.getUTCDay()||7;t.setUTCDate(t.getUTCDate()+4-n);const y=new Date(Date.UTC(t.getUTCFullYear(),0,1));return t.getUTCFullYear()+'-W'+Math.ceil(((t-y)/864e5+1)/7)},
  /* Learning days + streak: never punishing, we only show a count. */
  touchDay(){const d=this.today();if(S.days.indexOf(d)<0){S.days.push(d);if(S.days.length>400)S.days.shift()}},
  streak(){let n=0;const d=new Date();for(let i=0;i<400;i++){const k=new Date(d.getTime()-i*864e5).toISOString().slice(0,10);if(S.days.indexOf(k)>=0)n++;else if(i>0)break}return n},
  track(topic,miss){if(miss){S.miss[topic]=(S.miss[topic]||0)+1;save()}},
  recordQuiz(mid,score){S.quiz[mid]=Math.max(S.quiz[mid]||0,score);save()},
  exportJson(){return JSON.stringify({app:'cyberkids',exported:new Date().toISOString(),data:S},null,2)},
  importJson(txt){let o;try{o=JSON.parse(txt)}catch(e){return false}if(!isObj(o)||o.app!=='cyberkids'||!isObj(o.data))return false;S=sanitize(o.data);save();return true},
  complete(id,xp,mistakes){
    const stars=mistakes===0?3:mistakes<=2?2:1;
    const first=!S.done[id];
    if(first){S.xp+=xp}
    if(first||stars>S.done[id])S.done[id]=stars;
    if(first){this.touchDay();const d=this.today(),cat=id.indexOf(':')>0?id.split(':')[0]:'mission';(S.acts[d]=S.acts[d]||[]).push(cat);const wk=this.weekId();if(S.week.id!==wk)S.week={id:wk,n:0,paid:false};S.week.n++;
      const keys=Object.keys(S.acts);if(keys.length>60)keys.sort().slice(0,keys.length-60).forEach(k=>delete S.acts[k])}
    const st=badgeState(),newly=[];
    Object.keys(st).forEach(b=>{if(st[b]&&S.badges.indexOf(b)<0){S.badges.push(b);newly.push(b)}});
    save();
    return {first,xp:first?xp:0,stars,newly};
  },
  ctfXp:(d,pro)=>(pro?proXp:ctfXp)[d]||30,
  worldProgress(w){const ms=C.missions.filter(m=>m.world===w);return {done:ms.filter(m=>S.done[m.id]).length,total:ms.length}},
  missionUnlocked(m){const ms=C.missions.filter(x=>x.world===m.world);const i=ms.indexOf(m);return i<=0||!!S.done[ms[i-1].id]},
  ctfUnlocked(ch){
    if(ch.diff==='easy')return true;
    const set=ch.pro?C.pctf:C.ctf;
    const n=d=>set.filter(c=>c.diff===d&&S.done['ctf:'+c.id]).length;
    return ch.diff==='medium'?n('easy')>=2:n('medium')>=2;
  },
  reset(){S=Object.assign(blank(),{lang:S.lang,theme:S.theme,mode:S.mode,onboarded:true});save()},
  save
};
window.CKS=Store;
})();
