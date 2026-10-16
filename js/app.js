/* CyberKids app shell: hash router (GitHub Pages friendly), views, onboarding, celebrations. */
(function(){
const {t,L,LANGS}=CKI,C=CKC,S=CKS,A=CKA,E=CKE,G=CKG,esc=G.esc;
const $=s=>document.querySelector(s);
const main=$('#main'),nav=$('#nav'),foot=$('#footer'),modalRoot=$('#modal-root');
const reduce=()=>window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const AVATARS=[0,1,2,3,4,5];
const world=id=>C.worlds.find(w=>w.id===id);
const mission=id=>C.missions.find(m=>m.id===id);
const game=id=>C.games.find(g=>g.id===id);
const ctfOf=id=>C.ctf.find(c=>c.id===id);
const diffPill=d=>`<span class="pill ${d}">${t(d)}</span>`;
const starsHtml=n=>[1,2,3].map(i=>`<span style="opacity:${i<=n?1:.25}">${A.icon('star',26)}</span>`).join('');
let ctfCat='all',ob=null;

/* ---------- Theme & language ---------- */
function initPrefs(){
  let l=S.s.lang;if(!l){const n=(navigator.language||'en').slice(0,2);l=LANGS[n]?n:'en'}
  CKI.setLang(l);
  let th=S.s.theme;if(!th)th=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';
  setTheme(th,false);
}
function setTheme(th,save){
  document.documentElement.dataset.theme=th;
  const m=document.querySelector('meta[name=theme-color]');if(m)m.content=th==='dark'?'#0a1130':'#eaf5ff';
  if(save!==false)S.set('theme',th);
}
function setLang(l){S.set('lang',l);CKI.setLang(l);render()}

/* ---------- Toast, modal, confetti ---------- */
function toast(m){const r=$('#toast-root'),d=document.createElement('div');d.className='toast';d.textContent=m;r.appendChild(d);setTimeout(()=>d.remove(),3200)}
let lastFocus=null;
function openModal(html,onEsc){
  lastFocus=document.activeElement;
  modalRoot.innerHTML=`<div class="modal-bg"><div class="modal" role="dialog" aria-modal="true">${html}</div></div>`;
  const d=modalRoot.querySelector('.modal'),f=d.querySelector('button,input,select');f&&f.focus();
  modalRoot.onkeydown=e=>{if(e.key==='Escape'){onEsc?onEsc():closeModal()}
    if(e.key==='Tab'){const els=[...d.querySelectorAll('button,input,select,a[href]')].filter(x=>!x.disabled);if(!els.length)return;const a=els[0],z=els[els.length-1];
      if(e.shiftKey&&document.activeElement===a){e.preventDefault();z.focus()}else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus()}}};
  return d;
}
function closeModal(){modalRoot.innerHTML='';modalRoot.onkeydown=null;ob=null;if(lastFocus&&lastFocus.focus)try{lastFocus.focus()}catch(e){}}
function confetti(){
  if(reduce())return;const cv=$('#confetti'),cx=cv.getContext('2d');cv.width=innerWidth;cv.height=innerHeight;
  const cols=['#ffc531','#2f6bff','#12b5c0','#7a5cff','#1fb877','#ff8a3d','#ff6b8a'];
  const ps=Array.from({length:110},()=>({x:Math.random()*cv.width,y:-20-Math.random()*cv.height*.4,r:5+Math.random()*7,c:cols[(Math.random()*cols.length)|0],vy:2+Math.random()*4,vx:-2+Math.random()*4,a:Math.random()*6}));
  let n=0;(function f(){cx.clearRect(0,0,cv.width,cv.height);ps.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.a+=.15;cx.fillStyle=p.c;cx.save();cx.translate(p.x,p.y);cx.rotate(p.a);cx.fillRect(-p.r/2,-p.r/2,p.r,p.r*.6);cx.restore()});
    if(++n<130)requestAnimationFrame(f);else cx.clearRect(0,0,cv.width,cv.height)})();
}
/* items: [{id,xp}] ; next: {href,label} */
function celebrate(items,mistakes,next,back){
  let xp=0,stars=0,newly=[],first=false;
  items.forEach(it=>{const r=S.complete(it.id,it.xp,mistakes);xp+=r.xp;stars=Math.max(stars,r.stars);first=first||r.first;r.newly.forEach(b=>newly.indexOf(b)<0&&newly.push(b))});
  confetti();
  const bd=newly.map(id=>C.badges.find(b=>b.id===id));
  {
    const d=openModal(`<div class="center">${G.say(`<b>${t('missionDone')}</b><br>${first?t('earned',{a:xp,b:stars}):t('replayNote')}`,'cheer')}
    <div class="row" style="justify-content:center;margin:1rem 0" aria-label="${stars}/3">${starsHtml(stars)}</div>
    ${bd.map(b=>`<div class="badge"><div class="b-ico">${A.icon(b.icon,52)}</div><b>${t('newBadge',{a:L(b.name)})}</b></div>`).join('')}
    <div class="row" style="justify-content:center">${next?`<a class="btn green" href="${next.href}" data-close>${next.label}</a>`:''}<a class="btn ghost" href="${back.href}" data-close>${back.label}</a></div></div>`);
    d.addEventListener('click',e=>{if(e.target.closest('[data-close]'))closeModal()});
  }
  renderNav();
}

/* ---------- Layout ---------- */
function route(){const h=location.hash.replace(/^#/,'')||'/';const p=h.split('/').filter(Boolean);return {p,key:p[0]||'home'}}
function renderNav(){
  const r=route().key,cur=k=>r===k?' aria-current="page"':'';
  const lk=[['home','#/','nHome'],['worlds','#/worlds','nWorlds'],['games','#/games','nGames'],['ctf','#/ctf','nCtf'],['library','#/library','nLib'],['dashboard','#/dashboard','nDash']];
  const dark=document.documentElement.dataset.theme==='dark';
  nav.innerHTML=`<div class="wrap nav"><a class="brand" href="#/" aria-label="CyberKids"><img src="assets/logo.jpeg" alt="" width="46" height="46"><span>CyberKids</span></a>
  <nav class="links" id="links" aria-label="Main">${lk.map(a=>`<a href="${a[1]}"${cur(a[0]==='worlds'?'worlds':a[0]==='home'?'home':a[0])}>${t(a[2])}</a>`).join('')}</nav>
  <div class="tools"><a class="xp xp-nav" href="#/dashboard" aria-label="${t('level')} ${S.level()}">${A.icon('star',20)} ${t('level')} ${S.level()}</a>
  <select class="lang" id="lang" aria-label="${t('langL')}">${Object.keys(LANGS).map(k=>`<option value="${k}"${CKI.lang===k?' selected':''}>${LANGS[k].name}</option>`).join('')}</select>
  <button class="icon-btn" id="theme" aria-label="${t('themeL')}" title="${t('themeL')}">${dark?'<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z"/></svg>':'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><circle cx="12" cy="12" r="4.5" fill="currentColor"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/></svg>'}</button>
  <a class="btn sm yellow cta-nav" href="#/mission/f1">${t('start')}</a>
  <button class="icon-btn menu-btn" id="menu" aria-expanded="false" aria-controls="links" aria-label="${t('menu')}">☰</button></div></div>`;
  $('#lang').onchange=e=>setLang(e.target.value);
  $('#theme').onclick=()=>{setTheme(document.documentElement.dataset.theme==='dark'?'light':'dark');renderNav()};
  $('#menu').onclick=e=>{const l=$('#links'),o=l.classList.toggle('open');e.currentTarget.setAttribute('aria-expanded',o)};
  $('#links').onclick=e=>{if(e.target.closest('a'))$('#links').classList.remove('open')};
}
function renderFooter(){
  foot.innerHTML=`<div class="wrap"><div class="grid"><div><div class="brand"><img src="assets/logo.jpeg" alt="" width="46" height="46"><span>CyberKids</span></div><p><b>${t('tagline')}</b></p><p class="muted">${t('fProject')}</p><p><b>Junior Securinets @ ISI</b></p></div>
  <div><h3>${t('fNav')}</h3><a href="#/worlds">${t('nWorlds')}</a><a href="#/games">${t('nGames')}</a><a href="#/ctf">${t('nCtf')}</a><a href="#/library">${t('nLib')}</a></div>
  <div><h3>${t('langL')}</h3><div class="row">${Object.keys(LANGS).map(k=>`<button class="tab" data-l="${k}" aria-pressed="${CKI.lang===k}">${LANGS[k].name}</button>`).join('')}</div></div>
  <div><h3>${t('fPrivT')}</h3><p class="muted">${t('fPriv')}</p><p><b>${t('fAdult')}</b></p></div></div></div>`;
  foot.onclick=e=>{const b=e.target.closest('[data-l]');if(b)setLang(b.dataset.l)};
}
function crumbs(items){return `<div class="crumbs">${items.map((i,k)=>i.href?`<a href="${i.href}">${i.t}</a>${k<items.length-1?'<span class="flip" aria-hidden="true">›</span>':''}`:`<b>${i.t}</b>`).join('')}</div>`}

/* ---------- Cards ---------- */
function worldCard(w){const p=S.worldProgress(w.id);
  return `<a class="card link" href="#/world/${w.id}"><div class="art">${A.scene(w.art)}</div><h3>${L(w.name)}</h3><p class="muted">${L(w.desc)}</p>
  <div class="row">${diffPill(w.diff)}<span class="pill">${p.done}/${p.total} ${t('missions')}</span></div><span class="btn sm" style="align-self:flex-start">${p.done?t('continue'):t('open')}</span></a>`}
function gameHref(g){return g.ctf?`#/ctf/${g.ctf}`:`#/game/${g.id}`}
function gameCard(g){const d=S.isDone(g.mission||'g:'+g.id)||(g.ctf&&S.isDone('ctf:'+g.ctf));
  return `<a class="card link" href="${gameHref(g)}"><div class="art">${A.scene(g.art)}</div><h3>${L(g.title)}</h3><p class="muted">${L(g.desc)}</p>
  <div class="row">${diffPill(g.diff)}<span class="pill">~${g.mins} ${t('mins')}</span>${d?`<span class="pill easy">✔ ${t('done')}</span>`:''}</div><span class="btn sm purple" style="align-self:flex-start">${t('play')}</span></a>`}
function badgeCard(b){const on=S.s.badges.indexOf(b.id)>=0;
  return `<div class="card badge${on?'':' off'}"><div class="b-ico">${A.icon(b.icon,50)}</div><b>${L(b.name)}</b><p class="muted" style="font-size:.9rem;margin:0">${L(b.desc)}</p></div>`}
function ctfCard(c){const open=S.ctfUnlocked(c),done=S.isDone('ctf:'+c.id),cat=C.ctfCats.find(x=>x.id===c.cat);
  return `<a class="card link${open?'':' locked'}" href="${open?'#/ctf/'+c.id:'#/ctf'}" ${open?'':'aria-disabled="true"'}><div class="row"><span class="pill" style="background:${cat.color};color:#fff">${L(cat.name)}</span>${diffPill(c.diff)}</div>
  <h3>${L(c.name)}</h3><p class="muted">${L(c.obj)}</p><div class="row"><span class="pill">~${c.mins} ${t('mins')}</span>${done?`<span class="pill easy">✔ ${t('done')}</span>`:''}${open?'':`<span class="pill lock">🔒 ${t('locked')}</span>`}</div>${open?'':`<small class="muted">${t(c.diff==='medium'?'unlockMed':'unlockCh')}</small>`}</a>`}

/* ---------- Views ---------- */
function homeView(){
  const prog={};C.worlds.forEach(w=>prog[w.id]=S.worldProgress(w.id));
  const labels={};C.worlds.forEach(w=>labels[w.id]=L(w.name));
  const cur=(C.worlds.find(w=>prog[w.id].done<prog[w.id].total)||C.worlds[0]).id;
  return `<section class="hero"><div class="stars-bg"></div><div class="wrap"><div><p class="tag">${t('heroTag')}</p><h1>${t('h1')}</h1><p style="font-size:1.2rem;max-width:34rem">${t('heroSub')}</p>
  <div class="row"><a class="btn yellow" href="#/mission/f1">${t('heroCta1')}</a><a class="btn ghost" href="#/games">${t('heroCta2')}</a></div><p style="margin-top:1rem"><b>${t('tagline')}</b></p></div>
  <div class="hero-art"><img class="logo-orb" src="assets/logo.jpeg" alt="CyberKids: Byte and three young heroes" width="360" height="336">
  <span class="float" style="top:2%;inset-inline-start:2%">${A.icon('lock',44)}</span><span class="float" style="top:8%;inset-inline-end:0;animation-delay:.6s">${A.icon('shield',44)}</span><span class="float" style="bottom:8%;inset-inline-start:0;animation-delay:1.2s">${A.icon('cipher',44)}</span><span class="float" style="bottom:2%;inset-inline-end:4%;animation-delay:1.8s">${A.icon('mail',44)}</span></div></div></section>
  <section class="sec wrap"><h2>${t('worldsT')}</h2><p class="muted">${t('worldsSub')}</p><div class="map">${A.map(C.worlds,labels,prog,cur)}</div><div class="grid g3" style="margin-top:1.2rem">${C.worlds.map(worldCard).join('')}</div></section>
  <section class="sec wrap"><h2>${t('gamesT')}</h2><p class="muted">${t('gamesSub')}</p><div class="grid g3">${C.games.map(gameCard).join('')}</div></section>
  <section class="sec wrap"><div class="card" style="background:linear-gradient(135deg,var(--surface),var(--surface2))"><div class="grid g2" style="align-items:center"><div><h2>${t('ctfT')}</h2><p>${t('ctfSub')}</p><div class="row" style="margin-bottom:1rem">${C.ctfCats.map(c=>`<span class="pill" style="background:${c.color};color:#fff">${L(c.name)}</span>`).join('')}</div><a class="btn purple" href="#/ctf">${t('nCtf')}</a></div><div class="art" style="border-radius:20px;overflow:hidden">${A.scene('flag')}</div></div></div></section>
  <section class="sec wrap"><h2 class="center">${t('howT')}</h2><div class="grid g3 steps">${[1,2,3].map(n=>`<div class="card step"><div class="n" style="background:${['var(--blue)','var(--purple)','var(--green)'][n-1]}">${n}</div><div><h3>${t('how'+n+'T')}</h3><p class="muted">${t('how'+n+'D')}</p></div></div>`).join('')}</div></section>
  <section class="sec wrap"><h2>${t('achT')}</h2><p class="muted">${t('achSub')}</p><div class="grid g3">${C.badges.slice(0,6).map(badgeCard).join('')}</div></section>
  <section class="sec wrap"><h2>${t('safeT')}</h2><div class="grid g2">${[1,2,3,4].map(n=>`<div class="card"><h3>${t('tip'+n+'T')}</h3><p class="muted">${t('tip'+n+'D')}</p></div>`).join('')}</div></section>`;
}
function worldsView(){
  const prog={},labels={};C.worlds.forEach(w=>{prog[w.id]=S.worldProgress(w.id);labels[w.id]=L(w.name)});
  const cur=(C.worlds.find(w=>prog[w.id].done<prog[w.id].total)||C.worlds[0]).id;
  return `<div class="wrap sec"><h1>${t('nWorlds')}</h1><p class="muted">${t('worldsSub')}</p><div class="map">${A.map(C.worlds,labels,prog,cur)}</div><div class="grid g3" style="margin-top:1.4rem">${C.worlds.map(worldCard).join('')}</div></div>`;
}
function worldView(id){
  const w=world(id);if(!w)return notFound();const ms=C.missions.filter(m=>m.world===id),p=S.worldProgress(id);
  return `<div class="wrap sec">${crumbs([{t:t('nWorlds'),href:'#/worlds'},{t:L(w.name)}])}<div class="card"><div class="art" style="aspect-ratio:21/6">${A.scene(w.art)}</div><h1>${L(w.name)}</h1><p>${L(w.desc)}</p>
  <div class="bar" role="progressbar" aria-valuemin="0" aria-valuemax="${p.total}" aria-valuenow="${p.done}"><i style="width:${p.done/p.total*100}%"></i></div></div>
  <h2 style="margin-top:1.6rem">${t('missions')}</h2><div class="grid g2">${ms.map((m,i)=>{const open=S.missionUnlocked(m),d=S.isDone(m.id);
    return `<div class="card${open?'':' locked'}"><div class="row"><span class="pill">${t('mission')} ${i+1}</span>${d?`<span class="row" style="gap:0">${starsHtml(S.stars(m.id))}</span>`:open?`<span class="pill medium">${t('newT')}</span>`:`<span class="pill lock">🔒 ${t('locked')}</span>`}</div>
    <h3 style="margin-top:.5rem">${L(m.title)}</h3><p>${L(m.story)}</p><p class="muted"><b>${t('objective')}:</b> ${L(m.obj)}</p><p class="row"><span class="pill">+${m.xp} ${t('xp')}</span></p>
    ${open?`<a class="btn ${d?'ghost':'green'}" href="#/mission/${m.id}">${d?t('playAgain'):t('play')}</a>`:`<small class="muted">${t('unlockM')}</small>`}</div>`}).join('')}</div></div>`;
}
function nextOf(m){const ms=C.missions.filter(x=>x.world===m.world);return ms[ms.indexOf(m)+1]||null}
function missionView(id,after){
  const m=mission(id);if(!m)return notFound();const w=world(m.world);
  if(!S.missionUnlocked(m))return `<div class="wrap sec">${crumbs([{t:L(w.name),href:'#/world/'+w.id},{t:L(m.title)}])}<div class="panel center"><h2>🔒 ${t('locked')}</h2><p>${t('unlockM')}</p><a class="btn" href="#/world/${w.id}">${t('backToMap')}</a></div></div>`;
  after(()=>{
    const el=$('#run'),nx=nextOf(m);
    const done=mis=>celebrate([{id:m.id,xp:m.xp}].concat(m.type==='ctf'?[{id:'ctf:'+m.ctf,xp:S.ctfXp(ctfOf(m.ctf).diff)}]:[]),mis,nx?{href:'#/mission/'+nx.id,label:t('nextMission')}:null,{href:'#/world/'+w.id,label:t('backToMap')});
    if(m.type==='quiz')G.quiz(el,m.steps,{done});
    else if(m.type==='game')G.start(m.game,el,{done});
    else if(m.type==='blocks')G.blockSeq(el,m.levels,{done});
    else if(m.type==='ctf')ctfRunner(el,ctfOf(m.ctf),{solved:done,noCelebrate:true});
  });
  return `<div class="wrap sec">${crumbs([{t:t('nWorlds'),href:'#/worlds'},{t:L(w.name),href:'#/world/'+w.id},{t:L(m.title)}])}
  <div class="panel"><h1 style="font-size:clamp(1.7rem,4vw,2.4rem)">${L(m.title)}</h1>${G.say(`<b>${t('story')}:</b> ${L(m.story)}<br><b>${t('objective')}:</b> ${L(m.obj)}`)}</div><div id="run" style="margin-top:1rem"></div></div>`;
}
function gamesView(){return `<div class="wrap sec"><h1>${t('nGames')}</h1><p class="muted">${t('gamesSub')}</p><div class="grid g3">${C.games.map(gameCard).join('')}</div></div>`}
function gameView(id,after){
  const g=game(id);if(!g)return notFound();if(g.ctf){location.replace('#/ctf/'+g.ctf);return ''}
  const key=g.mission||'g:'+g.id,xp=g.mission?mission(g.mission).xp:25;
  after(()=>G.start(g.id,$('#run'),{done:mis=>celebrate([{id:key,xp}],mis,null,{href:'#/games',label:t('nGames')})}));
  return `<div class="wrap sec">${crumbs([{t:t('nGames'),href:'#/games'},{t:L(g.title)}])}<div class="panel"><h1 style="font-size:clamp(1.7rem,4vw,2.4rem)">${L(g.title)}</h1>${G.say(L(g.desc))}</div><div id="run" style="margin-top:1rem"></div></div>`;
}
/* CTF */
function ctfView(){
  const cats=[{id:'all',name:CKI.T('All','Tous','الكل')}].concat(C.ctfCats);
  const list=C.ctf.filter(c=>ctfCat==='all'||c.cat===ctfCat);
  const n=C.ctf.filter(c=>S.isDone('ctf:'+c.id)).length;
  return `<div class="wrap sec"><h1>${t('nCtf')}</h1>${G.say(t('ctfSub'))}<p class="muted">${t('flagNote')} <span class="xp">${n}/${C.ctf.length} ${t('done2')}</span></p>
  <div class="tabs" role="group" aria-label="${t('ctfCats')}">${cats.map(c=>`<button class="tab" data-cat="${c.id}" aria-pressed="${ctfCat===c.id}">${L(c.name)}</button>`).join('')}</div>
  <div class="grid g3">${list.map(ctfCard).join('')}</div></div>`;
}
function ctfRunner(el,ch,o){
  let hints=0,wrong=0,solved=S.isDone('ctf:'+ch.id);
  el.innerHTML=`<div class="panel"><h3>${t('clues')}</h3><div id="w"></div></div>
  <div class="panel" style="margin-top:1rem"><div id="hs"></div><button class="btn sm yellow" id="hb">${t('hint')}</button>
  <hr style="border:0;border-top:2px solid var(--line);margin:1rem 0"><label for="fl" class="muted">${t('submit')}</label>
  <div class="row" style="flex-wrap:nowrap"><input id="fl" class="input flag-in" type="text" autocomplete="off" autocapitalize="characters" spellcheck="false" placeholder="${t('flagPh')}" style="flex:1"><button class="btn green" id="sb">${t('submit')}</button></div>
  <div id="fb" role="status" aria-live="polite"></div></div>`;
  G.widget(el.querySelector('#w'),ch,{});
  el.querySelector('#hb').onclick=()=>{
    if(hints<ch.hints.length){hints++;el.querySelector('#hs').innerHTML=ch.hints.slice(0,hints).map((h,i)=>`<div class="hint"><b>${t('hintsUsed')} ${i+1}:</b> ${L(h)}</div>`).join('')}
    if(hints>=ch.hints.length){el.querySelector('#hb').textContent=t('noMoreHints');el.querySelector('#hb').disabled=true}};
  const submit=()=>{
    const v=G.norm(el.querySelector('#fl').value),fb=el.querySelector('#fb');
    if(v===G.norm(ch.flag)){
      fb.innerHTML=`<div class="fb good"><b>${t('flagOk')}</b><br><b>${t('learnedT')}:</b> ${L(ch.explain)}</div>`;
      if(o.noCelebrate)o.solved(Math.min(wrong,3));else if(o.solved)o.solved(Math.min(wrong,3));
    }else{wrong++;fb.innerHTML=`<div class="fb try">${t('flagNo')}</div>`}
  };
  el.querySelector('#sb').onclick=submit;el.querySelector('#fl').onkeydown=e=>{if(e.key==='Enter')submit()};
}
function ctfChallengeView(id,after){
  const ch=ctfOf(id);if(!ch)return notFound();
  if(!S.ctfUnlocked(ch))return `<div class="wrap sec">${crumbs([{t:t('nCtf'),href:'#/ctf'},{t:L(ch.name)}])}<div class="panel center"><h2>🔒 ${t('locked')}</h2><p>${t(ch.diff==='medium'?'unlockMed':'unlockCh')}</p><a class="btn" href="#/ctf">${t('back')}</a></div></div>`;
  const cat=C.ctfCats.find(c=>c.id===ch.cat),i=C.ctf.indexOf(ch),nx=C.ctf.slice(i+1).find(c=>S.ctfUnlocked(c)&&!S.isDone('ctf:'+c.id));
  after(()=>ctfRunner($('#run'),ch,{solved:mis=>celebrate([{id:'ctf:'+ch.id,xp:S.ctfXp(ch.diff)}],mis,nx?{href:'#/ctf/'+nx.id,label:t('next')}:null,{href:'#/ctf',label:t('nCtf')})}));
  return `<div class="wrap sec">${crumbs([{t:t('nCtf'),href:'#/ctf'},{t:L(ch.name)}])}<div class="panel"><div class="row"><span class="pill" style="background:${cat.color};color:#fff">${L(cat.name)}</span>${diffPill(ch.diff)}<span class="pill">~${ch.mins} ${t('mins')}</span>${S.isDone('ctf:'+ch.id)?`<span class="pill easy">✔ ${t('done')}</span>`:''}</div>
  <h1 style="font-size:clamp(1.7rem,4vw,2.4rem)">${L(ch.name)}</h1>${G.say(`<b>${t('story')}:</b> ${L(ch.story)}<br><b>${t('objective')}:</b> ${L(ch.obj)}`)}</div><div id="run" style="margin-top:1rem"></div></div>`;
}
/* Library */
function libraryView(){return `<div class="wrap sec"><h1>${t('nLib')}</h1><div class="grid g3">${C.lessons.map(l=>`<a class="card link" href="#/lesson/${l.id}"><div class="art">${A.scene(l.art)}</div><h3>${L(l.title)}</h3><p class="muted">${L(l.def)}</p><div class="row">${S.isDone('les:'+l.id)?`<span class="pill easy">✔ ${t('done')}</span>`:''}<span class="btn sm turq">${t('open')}</span></div></a>`).join('')}</div></div>`}
function lessonView(id,after){
  const l=C.lessons.find(x=>x.id===id);if(!l)return notFound();
  const flip=id.length%2===0,opts=flip?[l.right,l.wrong]:[l.wrong,l.right];
  after(()=>G.quiz($('#qz'),[{q:l.q,opts:opts,a:flip?0:1,why:l.recap}],{done:mis=>celebrate([{id:'les:'+l.id,xp:10}],mis,null,{href:'#/library',label:t('nLib')})}));
  const rm=mission(l.mission);
  return `<div class="wrap sec">${crumbs([{t:t('nLib'),href:'#/library'},{t:L(l.title)}])}<div class="panel"><div class="lesson-art"><div style="width:min(420px,100%);aspect-ratio:16/9;border-radius:16px;overflow:hidden">${A.scene(l.art)}</div></div><h1 style="font-size:clamp(1.7rem,4vw,2.4rem)">${L(l.title)}</h1>
  ${G.say(L(l.def))}<h3 style="margin-top:1rem">${t('everyday')}</h3><p>${L(l.ex)}</p><h3>${t('recap')}</h3><p>${L(l.recap)}</p></div>
  <h2 style="margin-top:1.4rem">${t('quickQuiz')}</h2><div id="qz"></div>${rm?`<p style="margin-top:1rem"><b>${t('related')}:</b> <a class="btn sm" href="#/mission/${rm.id}">${L(rm.title)}</a></p>`:''}</div>`;
}
/* Dashboard */
function dashView(){
  const st=S.s,wl=C.worlds.map(w=>{const p=S.worldProgress(w.id);return `<div class="card"><b>${L(w.name)}</b><div class="bar" style="margin:.5rem 0"><i style="width:${p.done/p.total*100}%"></i></div><small class="muted">${p.done}/${p.total}</small></div>`}).join('');
  const total=Object.keys(st.done).reduce((a,k)=>a+st.done[k],0);
  return `<div class="wrap sec"><h1>${t('dashT')}</h1><div class="panel"><div class="row" style="gap:1.2rem"><div>${A.avatar(st.avatar,92)}</div><div style="flex:1;min-width:220px"><label class="muted" for="nick">${t('yourNick')}</label><input id="nick" class="input" maxlength="16" value="${esc(st.nick)}" autocomplete="off"><p class="muted" style="font-size:.9rem">${t('obNickHelp')}</p></div></div>
  <h3>${t('avatarL')}</h3><div class="avatars">${AVATARS.map(i=>`<button data-av="${i}" aria-pressed="${st.avatar===i}" aria-label="${t('avatarL')} ${i+1}">${A.avatar(i,52)}</button>`).join('')}</div></div>
  <div class="grid g3" style="margin:1.2rem 0"><div class="card center"><h3>${t('level')} ${S.level()}</h3><div class="bar"><i style="width:${S.levelProgress()}%"></i></div><p class="muted">${st.xp} ${t('xp')}</p></div><div class="card center"><h3>${t('stars')}</h3><p style="font-size:2rem;margin:0" class="row" aria-label="${total}"><span style="margin:auto;display:flex;align-items:center;gap:.4rem">${A.icon('star',34)} ${total}</span></p></div><div class="card center"><h3>${t('badges')}</h3><p style="font-size:2rem;margin:0">${st.badges.length}/${C.badges.length}</p></div></div>
  <h2>${t('badges')}</h2><div class="grid g3">${C.badges.map(badgeCard).join('')}</div><h2 style="margin-top:1.6rem">${t('progW')}</h2><div class="grid g3">${wl}</div>
  <p class="muted" style="margin-top:1.4rem">${t('localNote')}</p><button class="btn ghost" id="rst">${t('resetP')}</button></div>`;
}
function notFound(){return `<div class="wrap sec center">${G.say(t('notFound'))}<p><a class="btn" href="#/">${t('nHome')}</a></p></div>`}

/* ---------- Onboarding ---------- */
function obRender(){
  const d=openModal(`<div>${G.say(t('obHi'),'cheer')}<h3 style="margin-top:1rem">${t('obLang')}</h3><div class="row">${Object.keys(LANGS).map(k=>`<button class="tab" data-ol="${k}" aria-pressed="${CKI.lang===k}">${LANGS[k].name}</button>`).join('')}</div>
  <h3 style="margin-top:1rem">${t('obAvatar')}</h3><div class="avatars">${AVATARS.map(i=>`<button data-oa="${i}" aria-pressed="${ob.avatar===i}" aria-label="${t('avatarL')} ${i+1}">${A.avatar(i,52)}</button>`).join('')}</div>
  <h3 style="margin-top:1rem"><label for="onick">${t('obNick')}</label></h3><input id="onick" class="input" maxlength="16" autocomplete="off" value="${esc(ob.nick)}"><p class="muted" style="font-size:.9rem">${t('obNickHelp')}</p>
  <div class="row" style="margin-top:1rem"><button class="btn green" data-go="1">${t('obGo')}</button><button class="btn ghost" data-skip="1">${t('obSkip')}</button></div></div>`,()=>obFinish(false));
  d.addEventListener('click',e=>{
    const l=e.target.closest('[data-ol]'),a=e.target.closest('[data-oa]');
    if(l){ob.nick=d.querySelector('#onick').value;setLang(l.dataset.ol);return}
    if(a){ob.nick=d.querySelector('#onick').value;ob.avatar=+a.dataset.oa;obRender();return}
    if(e.target.closest('[data-go]'))obFinish(true,d.querySelector('#onick').value);
    if(e.target.closest('[data-skip]'))obFinish(false,d.querySelector('#onick').value);
  });
}
function obFinish(go,nick){const o=ob||{avatar:0};S.set('onboarded',true);S.set('avatar',o.avatar);if(nick!=null)S.set('nick',nick.trim().slice(0,16));closeModal();if(go)location.hash='#/mission/f1';else renderNav()}

/* ---------- Render ---------- */
let after=[];
function render(){
  E.cleanup();document.documentElement.lang=CKI.lang;
  const r=route(),p=r.p;after=[];const post=fn=>after.push(fn);
  let html='',title='CyberKids';
  switch(r.key){
    case 'home':html=homeView();break;
    case 'worlds':html=worldsView();break;
    case 'world':html=worldView(p[1]);break;
    case 'mission':html=missionView(p[1],post);break;
    case 'games':html=gamesView();break;
    case 'game':html=gameView(p[1],post);break;
    case 'ctf':html=p[1]?ctfChallengeView(p[1],post):ctfView();break;
    case 'library':html=libraryView();break;
    case 'lesson':html=lessonView(p[1],post);break;
    case 'dashboard':html=dashView();break;
    default:html=notFound();
  }
  renderNav();renderFooter();main.innerHTML=html;
  after.forEach(f=>f());
  const h=main.querySelector('h1');document.title=(h?h.textContent+' · ':'')+'CyberKids — '+t('tagline');
  if(r.key==='ctf'&&!p[1])main.onclick=e=>{const b=e.target.closest('[data-cat]');if(b){ctfCat=b.dataset.cat;render()}};else main.onclick=null;
  if(r.key==='dashboard'){
    $('#nick').oninput=e=>S.set('nick',e.target.value.slice(0,16));
    main.onclick=e=>{const a=e.target.closest('[data-av]');if(a){S.set('avatar',+a.dataset.av);render();return}
      if(e.target.closest('#rst')){const d=openModal(`<div>${G.say(t('resetAsk'),'think')}<div class="row" style="margin-top:1rem"><button class="btn" data-no="1">${t('close')}</button><button class="btn ghost" data-yes="1">${t('resetP')}</button></div></div>`);
        d.addEventListener('click',ev=>{if(ev.target.closest('[data-no]'))closeModal();if(ev.target.closest('[data-yes]')){S.reset();closeModal();toast(t('resetDone'));render()}})}};
  }
  if(!S.s.onboarded&&!ob&&!modalRoot.firstChild){ob={avatar:S.s.avatar,nick:S.s.nick};obRender()}
  else if(ob&&modalRoot.firstChild)obRender();
}
addEventListener('hashchange',()=>{render();scrollTo(0,0);main.focus({preventScroll:true})});
document.addEventListener('DOMContentLoaded',()=>{});
initPrefs();render();
if('serviceWorker' in navigator&&/^https?:/.test(location.protocol)){addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}))}
})();
