/* Game engine: maze board, a RESTRICTED block interpreter (no eval, no user code), block editor UI, free-play maze. */
(function(){
const {t,L}=CKI,A=CKA,C=CKC;
const E={};
const DX=[0,1,0,-1],DY=[-1,0,1,0];
const reduce=()=>window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
let handlers=[];
E.listen=fn=>{document.addEventListener('keydown',fn);handlers.push(fn)};
E.cleanup=()=>{handlers.forEach(h=>document.removeEventListener('keydown',h));handlers=[];(E.timers||[]).forEach(clearInterval);E.timers=[]};
E.timers=[];

E.parse=function(def){
  const rows=def.map,h=rows.length,w=rows[0].length,keys=new Set();let start={x:1,y:1},flag=null;
  rows.forEach((r,y)=>[...r].forEach((c,x)=>{if(c==='S')start={x,y};if(c==='F')flag={x,y};if(c==='K')keys.add(x+','+y)}));
  return {w,h,start,flag,keys,dir:def.dir==null?1:def.dir,at:(x,y)=>(y<0||x<0||y>=h||x>=w)?'#':rows[y][x]};
};
E.boardHtml=function(lv,st){
  let s=`<div class="board" style="grid-template-columns:repeat(${lv.w},1fr)" role="img" aria-label="${lv.w}×${lv.h}">`;
  for(let y=0;y<lv.h;y++)for(let x=0;x<lv.w;x++){
    const c=lv.at(x,y);let inner='',cls='cell';
    if(c==='#')cls+=' w';
    else if(c==='F')inner=A.icon('flag',64);
    else if(c==='X')inner=A.icon('device',64);
    else if(c==='K'&&!st.got.has(x+','+y))inner=A.icon('key',64);
    if(st.x===x&&st.y===y)inner=A.bot(st.dir);
    s+=`<div class="${cls}">${inner}</div>`;
  }
  return s+'</div>';
};

/* Restricted interpreter: only known node types run; counts are clamped; total steps are capped. */
E.simulate=function(lv,prog){
  let x=lv.start.x,y=lv.start.y,dir=lv.dir,got=new Set(),frames=[],steps=0,res=null;
  const need=lv.keys.size;
  const push=id=>frames.push({x,y,dir,got:new Set(got),id});
  const wallAhead=()=>lv.at(x+DX[dir],y+DY[dir])==='#';
  function run(list,depth){
    for(const n of list){
      if(res)return;
      if(++steps>300||depth>5){res='long';return}
      if(n.t==='move'){
        if(wallAhead()){push(n.id);res='wall';return}
        x+=DX[dir];y+=DY[dir];const c=lv.at(x,y);push(n.id);
        if(c==='X'){res='device';x=lv.start.x;y=lv.start.y;dir=lv.dir;got=new Set();push(n.id);return}
        if(c==='F'){res=got.size>=need?'win':'missing';return}
      }else if(n.t==='left'){dir=(dir+3)%4;push(n.id)}
      else if(n.t==='right'){dir=(dir+1)%4;push(n.id)}
      else if(n.t==='collect'){const k=x+','+y;if(lv.keys.has(k))got.add(k);push(n.id)}
      else if(n.t==='repeat'){
        const times=Math.min(20,Math.max(1,parseInt(n.n,10)||1));
        for(let i=0;i<times;i++){run(n.body||[],depth+1);if(res)return}
      }else if(n.t==='if'){run(wallAhead()?(n.body||[]):(n.else||[]),depth+1)}
    }
  }
  run(prog,0);
  if(!res)res='short';
  return {frames,res};
};

/* ---------- Block editor ---------- */
E.blocks=function(el,o){
  const lv=E.parse(o.def),allow=o.def.allow;
  let prog=[],sel='root',uid=0,sim=null,idx=-1,timer=null,mistakes=0,won=false;
  const start={x:lv.start.x,y:lv.start.y,dir:lv.dir,got:new Set()};
  const kinds={move:['move','↑',t('bMove')],left:['turn','↶',t('bLeft')],right:['turn','↷',t('bRight')],repeat:['loop','⟳',t('bRepeat')],if:['cond','?',t('bIf')],collect:['act','✦',t('bCollect')]};
  const find=(list,id)=>{for(const n of list){if(n.id===id)return n;for(const k of ['body','else']){if(n[k]){const r=find(n[k],id);if(r)return r}}}return null};
  const slot=key=>{if(key==='root')return prog;const [id,k]=key.split(':');const n=find(prog,+id);return n?n[k]:prog};
  const del=(list,id)=>{const i=list.findIndex(n=>n.id===id);if(i>=0){list.splice(i,1);return true}return list.some(n=>(n.body&&del(n.body,id))||(n.else&&del(n.else,id)))};
  const count=l=>l.reduce((a,n)=>a+1+(n.body?count(n.body):0)+(n.else?count(n.else):0),0);
  const stop=()=>{if(timer){clearInterval(timer);timer=null}};
  function nodeHtml(n){
    const k=kinds[n.t],x=`<button class="x" data-del="${n.id}" aria-label="×">×</button>`;
    const sl=(key,l)=>`<div class="slot${sel===key?' sel':''}" data-slot="${key}">${l.map(nodeHtml).join('')}</div>`;
    if(n.t==='repeat')return `<div class="blk ${k[0]}" data-id="${n.id}"><span>${k[1]} ${k[2]}</span><input class="num" type="number" inputmode="numeric" min="1" max="20" value="${n.n}" data-n="${n.id}" aria-label="${t('bTimes')}"><span>${t('bTimes')}</span>${x}${sl(n.id+':body',n.body)}</div>`;
    if(n.t==='if')return `<div class="blk ${k[0]}" data-id="${n.id}"><span>${k[1]} ${k[2]}</span>${x}${sl(n.id+':body',n.body)}<span>${t('bElse')}</span>${sl(n.id+':else',n.else)}</div>`;
    return `<div class="blk ${k[0]}" data-id="${n.id}"><span>${k[1]} ${k[2]}</span>${x}</div>`;
  }
  function draw(){
    el.querySelector('#bd').innerHTML=E.boardHtml(lv,idx<0||!sim?start:sim.frames[Math.min(idx,sim.frames.length-1)]);
    const p=el.querySelector('#prog');
    p.innerHTML=prog.length?prog.map(nodeHtml).join(''):`<p class="muted">${t('bEmpty')}</p>`;
    p.classList.toggle('sel',sel==='root');
    if(sim&&idx>=0&&sim.frames[idx]){const b=el.querySelector(`[data-id="${sim.frames[idx].id}"]`);if(b)b.classList.add('run')}
  }
  const say=(m,good)=>{const s=el.querySelector('#st');s.className='fb '+(good?'good':'try');s.textContent=m;s.hidden=false};
  function finish(){
    const r=sim.res,m={win:'bWin',wall:'bWall',device:'bDevice',missing:'bMissingKeys',long:'bTooLong',short:'bShort'}[r];
    say(t(m),r==='win');
    if(r==='win'){if(!won){won=true;o.onWin&&o.onWin({mistakes,blocks:count(prog)})}}else mistakes++;
  }
  function compute(){if(!prog.length){say(t('bEmpty'),false);return false}sim=E.simulate(lv,prog);idx=-1;return true}
  function advance(){
    if(!sim)return false;
    if(idx>=sim.frames.length-1){stop();finish();return false}
    idx++;draw();
    if(idx>=sim.frames.length-1){stop();finish();return false}
    return true;
  }
  function edit(){stop();sim=null;idx=-1;el.querySelector('#st').hidden=true;draw()}
  el.innerHTML=`<div class="maze-wrap"><div><div id="bd"></div><div id="st" class="fb try" role="status" aria-live="polite" hidden></div></div>
  <div class="ui"><div class="palette">${allow.map(a=>`<button class="blk ${kinds[a][0]}" data-add="${a}" draggable="true"><span>${kinds[a][1]} ${kinds[a][2]}</span></button>`).join('')}</div>
  <p class="muted" style="font-size:.9rem">${t('bTip')}</p>
  <div class="prog" id="prog" data-slot="root"></div>
  <div class="row" style="margin-top:.8rem"><button class="btn green" data-act="run">▶ ${t('run')}</button><button class="btn turq" data-act="step">⏭ ${t('stepBtn')}</button><button class="btn ghost" data-act="reset">↺ ${t('reset')}</button><button class="btn ghost" data-act="clear">${t('clear')}</button></div></div></div>`;
  el.addEventListener('click',e=>{
    const add=e.target.closest('[data-add]'),dl=e.target.closest('[data-del]'),sl=e.target.closest('[data-slot]'),ac=e.target.closest('[data-act]');
    if(add){edit();const type=add.dataset.add,n={id:++uid,t:type};if(type==='repeat'){n.n=3;n.body=[]}if(type==='if'){n.body=[];n.else=[]}
      if(count(prog)>60)return;(slot(sel)||prog).push(n);if(type==='repeat'||type==='if')sel=n.id+':body';draw();return}
    if(dl){edit();del(prog,+dl.dataset.del);if(sel!=='root'&&!find(prog,+sel.split(':')[0]))sel='root';draw();return}
    if(ac){const a=ac.dataset.act;
      if(a==='run'){stop();if(!compute())return;el.querySelector('#st').hidden=true;advance();if(sim&&idx<sim.frames.length-1)timer=setInterval(advance,reduce()?120:420);E.timers.push(timer)}
      if(a==='step'){stop();if(!sim||idx>=sim.frames.length-1){if(!compute())return;el.querySelector('#st').hidden=true}advance()}
      if(a==='reset'){edit();mistakes=mistakes}
      if(a==='clear'){prog=[];sel='root';edit()}
      return}
    if(sl&&!e.target.closest('.num')){const k=sl.dataset.slot;if(slot(k)){sel=k;stop();draw()}}
  });
  el.addEventListener('change',e=>{const i=e.target.closest('[data-n]');if(i){const n=find(prog,+i.dataset.n);if(n)n.n=Math.min(20,Math.max(1,parseInt(i.value,10)||1));edit()}});
  el.addEventListener('dragstart',e=>{const a=e.target.closest('[data-add]');if(a)e.dataTransfer.setData('text/plain',a.dataset.add)});
  el.addEventListener('dragover',e=>{if(e.target.closest('[data-slot]'))e.preventDefault()});
  el.addEventListener('drop',e=>{const sl=e.target.closest('[data-slot]');const type=e.dataTransfer.getData('text/plain');if(sl&&allow.indexOf(type)>=0){e.preventDefault();sel=sl.dataset.slot;const b=el.querySelector(`[data-add="${type}"]`);b&&b.click()}});
  E.timers.push(setInterval(()=>{if(!document.body.contains(el))stop()},1000));
  draw();
};

/* ---------- Free-play Cyber Maze ---------- */
E.maze=function(el,o){
  const levels=C.mazeLevels.map(d=>E.parse(d));let li=0,st,moves,hits=0,won=false;
  const say=(m,good)=>{const s=el.querySelector('#st');s.className='fb '+(good?'good':'try');s.textContent=m;s.hidden=false};
  function load(){const lv=levels[li];st={x:lv.start.x,y:lv.start.y,dir:lv.dir,got:new Set()};moves=0;won=false;el.querySelector('#st').hidden=true;draw()}
  function draw(){const lv=levels[li];el.querySelector('#bd').innerHTML=E.boardHtml(lv,st);el.querySelector('#hud').textContent=`${t('levelN',{a:li+1})} · ${t('moves')}: ${moves} · ${t('keysL')}: ${st.got.size}/${lv.keys.size}`}
  function move(d){
    if(won)return;const lv=levels[li];st.dir=d;const nx=st.x+DX[d],ny=st.y+DY[d];
    if(lv.at(nx,ny)==='#'){draw();return}
    st.x=nx;st.y=ny;moves++;const c=lv.at(nx,ny);
    if(c==='K')st.got.add(nx+','+ny);
    if(c==='X'){hits++;st.x=lv.start.x;st.y=lv.start.y;st.got=new Set();say(t('bDevice'),false)}
    else if(c==='F'){
      if(st.got.size>=lv.keys.size){won=true;draw();
        if(li<levels.length-1){say(t('bWin'),true);const b=document.createElement('button');b.className='btn green';b.textContent=t('next');b.onclick=()=>{li++;load()};el.querySelector('#st').appendChild(document.createElement('br'));el.querySelector('#st').appendChild(b)}
        else{say(t('bWin'),true);o.done(Math.min(hits,2))}
        return}
      say(t('bMissingKeys'),false)}
    draw();
  }
  el.innerHTML=`<div class="maze-wrap"><div><div id="bd"></div></div><div class="ui"><p id="hud" class="xp"></p><div id="st" class="fb try" role="status" aria-live="polite" hidden></div>
  <div class="dpad" aria-label="${t('gInstr')}"><button class="btn u" data-d="0" aria-label="↑">↑</button><button class="btn" data-d="3" aria-label="←">←</button><button class="btn" data-d="2" aria-label="↓">↓</button><button class="btn" data-d="1" aria-label="→">→</button></div>
  <div class="row" style="margin-top:1rem;justify-content:center"><button class="btn ghost" data-r="1">↺ ${t('reset')}</button></div></div></div>`;
  el.addEventListener('click',e=>{const b=e.target.closest('[data-d]');if(b)move(+b.dataset.d);if(e.target.closest('[data-r]'))load()});
  const map={ArrowUp:0,w:0,W:0,ArrowRight:1,d:1,D:1,ArrowDown:2,s:2,S:2,ArrowLeft:3,a:3,A:3};
  E.listen(e=>{if(!document.body.contains(el)||e.target.closest('input,textarea,select'))return;if(e.key in map){e.preventDefault();move(map[e.key])}});
  load();
};
window.CKE=E;
})();
