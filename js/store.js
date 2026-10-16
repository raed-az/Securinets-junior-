/* Local-only progress. Falls back to memory if localStorage is blocked (private mode, sandboxed previews). */
(function(){
const C=window.CKC;
const KEY='cyberkids.v1';
const mem={};
const ls={
  get(k){try{return window.localStorage.getItem(k)}catch(e){return mem[k]==null?null:mem[k]}},
  set(k,v){try{window.localStorage.setItem(k,v)}catch(e){mem[k]=v}},
  del(k){try{window.localStorage.removeItem(k)}catch(e){delete mem[k]}}
};
const blank=()=>({lang:null,theme:null,nick:'',avatar:0,onboarded:false,xp:0,done:{},badges:[],hints:0});
let S=blank();
try{const raw=ls.get(KEY);if(raw){const o=JSON.parse(raw);if(o&&typeof o==='object')S=Object.assign(blank(),o)}}catch(e){}
const save=()=>ls.set(KEY,JSON.stringify(S));

const ctfXp={easy:30,medium:50,challenge:80};
function badgeState(){
  const d=S.done,has=id=>!!d[id];
  const ctfN=Object.keys(d).filter(k=>k.startsWith('ctf:')).length;
  return {first:Object.keys(d).length>0,pw:has('c1')&&has('c2'),phish:has('p1')&&has('p2'),code:has('l1')&&has('l2'),prog:has('a1')&&has('a2'),ctf:ctfN>=5,hero:C.missions.every(m=>has(m.id))};
}
const Store={
  get s(){return S},
  set(k,v){S[k]=v;save()},
  isDone:id=>!!S.done[id],
  stars:id=>S.done[id]||0,
  level:()=>Math.floor(S.xp/100)+1,
  levelProgress:()=>S.xp%100,
  /* Complete an item once for XP; replaying keeps the best star count. Returns info for the celebration. */
  complete(id,xp,mistakes){
    const stars=mistakes===0?3:mistakes<=2?2:1;
    const first=!S.done[id];
    if(first){S.xp+=xp}
    if(first||stars>S.done[id])S.done[id]=stars;
    const st=badgeState(),newly=[];
    Object.keys(st).forEach(b=>{if(st[b]&&S.badges.indexOf(b)<0){S.badges.push(b);newly.push(b)}});
    save();
    return {first,xp:first?xp:0,stars,newly};
  },
  ctfXp:d=>ctfXp[d]||30,
  worldProgress(w){const ms=C.missions.filter(m=>m.world===w);return {done:ms.filter(m=>S.done[m.id]).length,total:ms.length}},
  missionUnlocked(m){const ms=C.missions.filter(x=>x.world===m.world);const i=ms.indexOf(m);return i<=0||!!S.done[ms[i-1].id]},
  ctfUnlocked(ch){
    if(ch.diff==='easy')return true;
    const n=d=>C.ctf.filter(c=>c.diff===d&&S.done['ctf:'+c.id]).length;
    return ch.diff==='medium'?n('easy')>=2:n('medium')>=2;
  },
  reset(){S=Object.assign(blank(),{lang:S.lang,theme:S.theme,onboarded:true});save()},
  save
};
window.CKS=Store;
})();
