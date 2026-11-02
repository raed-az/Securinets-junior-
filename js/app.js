/* CyberKids app shell: hash router (GitHub Pages friendly), views, onboarding, celebrations. */
(function(){
const {t,L,LANGS}=CKI,C=CKC,S=CKS,A=CKA,E=CKE,G=CKG,X=CKX,esc=G.esc;
const isCollege=()=>S.s.mode==='college';
const $=s=>document.querySelector(s);
const main=$('#main'),nav=$('#nav'),foot=$('#footer'),modalRoot=$('#modal-root');
const reduce=()=>window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const AVATARS=[0,1,2,3,4,5];
const world=id=>C.worlds.find(w=>w.id===id);
const mission=id=>C.missions.find(m=>m.id===id);
const game=id=>C.games.find(g=>g.id===id);
const ctfOf=id=>C.ctf.concat(C.pctf).find(c=>c.id===id);
const ctfList=()=>isCollege()?C.pctf:C.ctf;
const ctfCatsNow=()=>isCollege()?C.pctfCats:C.ctfCats;
const diffPill=d=>`<span class="pill ${d}">${t(d)}</span>`;
const starsHtml=n=>[1,2,3].map(i=>`<span style="opacity:${i<=n?1:.25}">${A.icon('star',26)}</span>`).join('');
let ctfCat='all',ob=null;

/* ---------- Theme & language ---------- */
function initPrefs(){
  let l=S.s.lang;if(!l){const n=(navigator.language||'en').slice(0,2);l=LANGS[n]?n:'en'}
  CKI.setLang(l);
  let th=S.s.theme;if(!th)th=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';
  setTheme(th,false);
  document.documentElement.dataset.mode=S.s.mode||'kids';
}
function setMode(m){S.set('mode',m);document.documentElement.dataset.mode=m;ctfCat='all';if(location.hash==='#/'||!location.hash)render();else location.hash='#/'}
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
  const d=modalRoot.querySelector('.modal'),f=d.querySelector('button,input,select,a[href]');if(f)f.focus();else{d.tabIndex=-1;d.focus()}
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
  const bd=newly.map(id=>C.badges.concat(C.cbadges).find(b=>b.id===id)).filter(Boolean);
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
  const col=isCollege();
  const lk=col?[['home','#/','nHome'],['course','#/course','nCourse'],['linux','#/linux','nLinux'],['terminal','#/terminal','nTerm'],['ctf','#/ctf','nCtfPro']]:[['home','#/','nHome'],['worlds','#/worlds','nWorlds'],['games','#/games','nGames'],['ctf','#/ctf','nCtf'],['library','#/library','nLib']];
  const more=col?[['detective','#/detective','nDetective'],['defense','#/defense','nDefense'],['studio','#/studio','nStudio'],['passport','#/passport','nPassport'],['trophies','#/trophies','nTrophies'],['dashboard','#/dashboard','nSkills']]:[['studio','#/studio','nStudio'],['passport','#/passport','nPassport'],['trophies','#/trophies','nTrophies'],['dashboard','#/dashboard','nDash']];
  const dark=document.documentElement.dataset.theme==='dark';
  nav.innerHTML=`<div class="wrap nav"><a class="brand" href="#/" aria-label="CyberKids"><img src="assets/logo.jpeg" alt="" width="46" height="46"><span>CyberKids</span></a>
  <nav class="links" id="links" aria-label="Main">${lk.map(a=>`<a href="${a[1]}"${cur(a[0])}>${t(a[2])}</a>`).join('')}<details class="more"><summary class="tab">${t('nMore')}</summary><div class="more-menu">${more.map(a=>`<a href="${a[1]}"${cur(a[0])}>${t(a[2])}</a>`).join('')}</div></details><button class="tab mode-sw" id="modeSw" title="${t('modeSwitchTo')}" aria-label="${t('modeSwitchTo')}">⇄ ${t('modeSwitch',{a:col?t('modeKids'):t('modeCollege')})}</button></nav>
  <div class="tools"><a class="xp xp-nav" href="#/dashboard" aria-label="${t('level')} ${S.level()}">${A.icon('star',20)} ${t('level')} ${S.level()}</a>
  <select class="lang" id="lang" aria-label="${t('langL')}">${Object.keys(LANGS).map(k=>`<option value="${k}"${CKI.lang===k?' selected':''}>${LANGS[k].name}</option>`).join('')}</select>
  <button class="icon-btn" id="theme" aria-label="${t('themeL')}" title="${t('themeL')}">${dark?'<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z"/></svg>':'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><circle cx="12" cy="12" r="4.5" fill="currentColor"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/></svg>'}</button>
  <a class="btn sm yellow cta-nav" href="${col?'#/course':'#/mission/f1'}">${col?t('cStartCourse'):t('start')}</a>
  <button class="icon-btn menu-btn" id="menu" aria-expanded="false" aria-controls="links" aria-label="${t('menu')}">☰</button></div></div>`;
  $('#lang').onchange=e=>setLang(e.target.value);
  $('#theme').onclick=()=>{setTheme(document.documentElement.dataset.theme==='dark'?'light':'dark');renderNav()};
  $('#menu').onclick=e=>{const l=$('#links'),o=l.classList.toggle('open');e.currentTarget.setAttribute('aria-expanded',o)};
  $('#modeSw').onclick=()=>{$('#links').classList.remove('open');setMode(isCollege()?'kids':'college')};
  $('#links').onclick=e=>{if(e.target.closest('a'))$('#links').classList.remove('open')};
}
function renderFooter(){
  foot.innerHTML=`<div class="wrap"><div class="grid"><div><div class="brand"><img src="assets/logo.jpeg" alt="" width="46" height="46"><span>CyberKids</span></div><p><b>${t('tagline')}</b></p><p class="muted">${t('fProject')}</p><p><b>Junior Securinets @ ISI</b></p></div>
  <div><h3>${t('fNav')}</h3>${isCollege()?`<a href="#/linux">${t('nLinux')}</a><a href="#/terminal">${t('nTerm')}</a><a href="#/ctf">${t('nCtfPro')}</a><a href="#/dashboard">${t('nSkills')}</a>`:`<a href="#/worlds">${t('nWorlds')}</a><a href="#/games">${t('nGames')}</a><a href="#/ctf">${t('nCtf')}</a><a href="#/library">${t('nLib')}</a>`}<h3 style="margin-top:1rem">${t('modeAsk')}</h3><div class="row"><button class="tab" data-m="kids" aria-pressed="${!isCollege()}">${t('modeKids')}</button><button class="tab" data-m="college" aria-pressed="${isCollege()}">${t('modeCollege')}</button></div></div>
  <div><h3>${t('langL')}</h3><div class="row">${Object.keys(LANGS).map(k=>`<button class="tab" data-l="${k}" aria-pressed="${CKI.lang===k}">${LANGS[k].name}</button>`).join('')}</div></div>
  <div><h3>${t('fPrivT')}</h3><p class="muted">${t('fPriv')}</p><p><b>${t('fAdult')}</b></p></div></div></div>`;
  foot.onclick=e=>{const b=e.target.closest('[data-l]');if(b)setLang(b.dataset.l);const m=e.target.closest('[data-m]');if(m&&m.dataset.m!==(isCollege()?'college':'kids'))setMode(m.dataset.m)};
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
function ctfCard(c){const open=S.ctfUnlocked(c),done=S.isDone('ctf:'+c.id),cat=(c.pro?C.pctfCats:C.ctfCats).find(x=>x.id===c.cat);
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
  <div class="bar" role="progressbar" aria-valuemin="0" aria-valuemax="${p.total}" aria-valuenow="${p.done}"><i style="width:${p.done/p.total*100}%"></i></div><p class="row" style="margin-top:.6rem"><span class="pill">${t('worldPct',{a:Math.round(p.done/p.total*100)+'%'})}</span><span class="pill">${A.icon('star',16)} ${t('worldGems',{a:ms.reduce((a,m)=>a+S.stars(m.id),0)+'/'+ms.length*3})}</span></p></div>
  <h2 style="margin-top:1.6rem">${t('missions')}</h2><div class="grid g2">${ms.map((m,i)=>{const open=S.missionUnlocked(m),d=S.isDone(m.id);
    return `<div class="card${open?'':' locked'}"><div class="row"><span class="pill">${t('mission')} ${i+1}</span>${d?`<span class="row" style="gap:0">${starsHtml(S.stars(m.id))}</span>`:open?`<span class="pill medium">${t('newT')}</span>`:`<span class="pill lock">🔒 ${t('locked')}</span>`}</div>
    <h3 style="margin-top:.5rem">${L(m.title)}</h3><p>${L(m.story)}</p><p class="muted"><b>${t('objective')}:</b> ${L(m.obj)}</p><p class="row"><span class="pill">+${m.xp} ${t('xp')}</span></p>
    ${open?`<a class="btn ${d?'ghost':'green'}" href="#/mission/${m.id}">${d?t('playAgain'):t('play')}</a>`:`<small class="muted">🔒 ${t('worldReq',{a:L(ms[i-1].title)})}</small>`}</div>`}).join('')}</div>${sideAndFinal(w,p)}</div>`;
}
function sideAndFinal(w,p){const all=p.done===p.total,href=id=>{const [k,v]=id.split(':');return k==='les'?'#/lesson/'+v:k==='ctf'?'#/ctf/'+v:'#/game/'+v};
  return `<div class="card" style="margin-top:1.2rem;${all?'':'opacity:.7'}"><h3>${A.icon('trophy',32)} ${t('worldFinal')}</h3><p class="muted">${t('worldFinalD')}</p>${all?`<a class="btn ${S.isDone('wf:'+w.id)?'ghost':'green'}" href="#/worldfinal/${w.id}">${S.isDone('wf:'+w.id)?t('playAgain'):t('play')}</a>`:`<small>🔒 ${t('locked')}</small>`}</div><h2 style="margin-top:1.2rem">${t('worldSide')}</h2><div class="grid g3">${(C.side[w.id]||[]).map(id=>`<a class="card link" href="${href(id)}"><b>${esc(CKM.label(id))}</b>${S.isDone(id)?`<span class="pill easy">✔ ${t('done')}</span>`:''}</a>`).join('')}</div>`}
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
  const cats=[{id:'all',name:CKI.T('All','Tous','الكل')}].concat(ctfCatsNow());
  const all=ctfList(),list=all.filter(c=>ctfCat==='all'||c.cat===ctfCat);
  const n=all.filter(c=>S.isDone('ctf:'+c.id)).length;
  return `<div class="wrap sec"><h1>${t(isCollege()?'nCtfPro':'nCtf')}</h1>${G.say(t(isCollege()?'cP3D':'ctfSub'))}<p class="muted">${t('flagNote')} <span class="xp">${n}/${all.length} ${t('done2')}</span></p>
  <div class="tabs" role="group" aria-label="${t('ctfCats')}">${cats.map(c=>`<button class="tab" data-cat="${c.id}" aria-pressed="${ctfCat===c.id}">${L(c.name)}</button>`).join('')}</div>
  ${isCollege()&&ctfCat==='all'?chapters(all):`<div class="grid g3">${list.map(ctfCard).join('')}</div>`}${isCollege()?leaderboard(all):''}</div>`;
}
function chapters(all){return ['easy','medium','challenge'].map((d,i)=>{const it=all.filter(c=>c.diff===d),n=it.filter(c=>S.isDone('ctf:'+c.id)).length;
  return `<h2 style="margin-top:1.4rem">${t('cmp'+(i+1))}</h2><div class="bar" role="progressbar" aria-valuemin="0" aria-valuemax="${it.length}" aria-valuenow="${n}" style="margin-bottom:.8rem"><i style="width:${n/it.length*100}%"></i></div><div class="grid g3">${it.map(ctfCard).join('')}</div>`}).join('')}
function leaderboard(all){
  const me=all.filter(c=>S.isDone('ctf:'+c.id)).reduce((a,c)=>a+S.ctfXp(c.diff,true),0);
  const rows=[['Nova',620],['Rayan',480],['Ines',350],['Karim',210],[t('lbYou'),me,1]].sort((a,b)=>b[1]-a[1]);
  return `<h2 style="margin-top:1.8rem">${t('lbT')}</h2><p class="muted">${t('lbD')}</p><div style="overflow:auto"><table class="fw"><tbody>${rows.map((r,i)=>`<tr${r[2]?' style="font-weight:900;background:var(--surface2)"':''}><td>${i+1}</td><td>${esc(r[0])}${r[2]?' ★':''}</td><td>${r[1]} ${t('lbPts')}</td></tr>`).join('')}</tbody></table></div>`}
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
  const set=ch.pro?C.pctf:C.ctf,cat=(ch.pro?C.pctfCats:C.ctfCats).find(c=>c.id===ch.cat),i=set.indexOf(ch),nx=set.slice(i+1).find(c=>S.ctfUnlocked(c)&&!S.isDone('ctf:'+c.id));
  after(()=>ctfRunner($('#run'),ch,{solved:mis=>celebrate([{id:'ctf:'+ch.id,xp:S.ctfXp(ch.diff,ch.pro)}],mis,nx?{href:'#/ctf/'+nx.id,label:t('next')}:null,{href:'#/ctf',label:t('nCtf')})}));
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
  <h2>${t('badges')}</h2><div class="grid g3">${(isCollege()?C.cbadges:C.badges).map(badgeCard).join('')}</div><h2 style="margin-top:1.6rem">${t('progW')}</h2><div class="grid g3">${isCollege()?collegeProg():wl}</div>
  <p style="margin-top:1.4rem"><a class="btn ghost" href="#/trophies">${t('nTrophies')}</a> <a class="btn ghost" href="#/passport">${t('nPassport')}</a></p><div class="panel"><h3>${t('dataT')}</h3><p class="muted">${t('dataD')}</p><p class="muted">${t('localNote')}</p><div class="row"><button class="btn ghost" id="exp">${t('dataExp')}</button><label class="btn ghost" for="imp2">${t('dataImp')}</label><input id="imp2" type="file" accept="application/json,.json" style="position:absolute;opacity:0;width:1px;height:1px"><button class="btn ghost" id="rst">${t('resetP')}</button></div><div id="dm" role="status"></div></div></div>`;
}

/* ---------- College mode ---------- */
function cmdTable(ids){const rows=(ids&&ids.length?ids.map(i=>C.cmds.find(c=>c.c===i)).filter(Boolean):C.cmds);
  return `<div style="overflow:auto"><table class="fw"><tbody>${rows.map(c=>`<tr><td><code>${esc(c.u)}</code></td><td>${L(c.d)}</td></tr>`).join('')}</tbody></table></div>`}
function termArt(){const note=L(C.labFS().home.analyst['.secret_note']);
  return `<div class="termwin" aria-hidden="true"><div class="bar3"><i></i><i></i><i></i></div><pre><span class="p">analyst@kali:~$</span> pwd\n/home/analyst\n<span class="p">analyst@kali:~$</span> ls -a\n.  ..  .secret_note  missions/\n<span class="p">analyst@kali:~$</span> cat .secret_note\n</pre><div class="termnote" dir="auto">${esc(note)}<span class="cursor"></span></div></div>`}
function colStats(){return {lx:C.linux.filter(m=>S.isDone('lx:'+m.id)).length,tm:C.tasks.filter(x=>S.isDone('tm:'+x.id)).length,pr:C.pctf.filter(c=>S.isDone('ctf:'+c.id)).length}}
function collegeProg(){const c=colStats(),row=(n,a,b)=>`<div class="card"><b>${n}</b><div class="bar" style="margin:.5rem 0"><i style="width:${a/b*100}%"></i></div><small class="muted">${a}/${b}</small></div>`;
  return row(t('nLinux'),c.lx,C.linux.length)+row(t('nTerm'),c.tm,C.tasks.length)+row(t('nCtfPro'),c.pr,C.pctf.length)}
function collegeHome(){const c=colStats();
  const path=(href,ico,title,desc,a,b)=>`<a class="card link" href="${href}"><div class="row">${A.icon(ico,44)}<h3 style="margin:0">${title}</h3></div><p class="muted">${desc}</p><div class="bar"><i style="width:${a/b*100}%"></i></div><small class="muted">${a}/${b}</small><span class="btn sm purple" style="align-self:flex-start">${a?t('continue'):t('open')}</span></a>`;
  return `<section class="hero"><div class="stars-bg"></div><div class="wrap"><div><p class="tag">${t('cTag')}</p><h1>${t('cH1')}</h1><p style="font-size:1.15rem;max-width:36rem">${t('cSub')}</p>
  <div class="row"><a class="btn yellow" href="#/course">${t('cStartCourse')}</a><a class="btn ghost" href="#/linux/kali">${t('cCta1')}</a></div><p style="margin-top:1rem"><b>${t('tagline')}</b></p></div><div class="hero-art">${termArt()}</div></div></section>
  <section class="sec wrap">${G.say(t('obHi'),'cheer')}</section>
  <section class="sec wrap" style="padding-top:0"><h2>${t('cPathsT')}</h2><div class="grid g3">${path('#/linux','shield',t('nLinux'),t('cP1D'),c.lx,C.linux.length)}${path('#/terminal','maze',t('nTerm'),t('cP2D'),c.tm,C.tasks.length)}${path('#/ctf','flag',t('nCtfPro'),t('cP3D'),c.pr,C.pctf.length)}</div></section>
  <section class="sec wrap" style="padding-top:0"><h2>${t('cHomeMore')}</h2><div class="grid g3"><a class="card link" href="#/course"><h3>${A.icon('academy',36)} ${t('nCourse')}</h3><p class="muted">${t('crsPathD')}</p></a><a class="card link" href="#/detective"><h3>${A.icon('mail',36)} ${t('nDetective')}</h3><p class="muted">${t('detPathD')}</p></a><a class="card link" href="#/defense"><h3>${A.icon('wall',36)} ${t('nDefense')}</h3><p class="muted">${t('dfPathD')}</p></a><a class="card link" href="#/studio"><h3>${A.icon('blocks',36)} ${t('nStudio')}</h3><p class="muted">${t('stPathD')}</p></a><a class="card link" href="#/passport"><h3>${A.icon('trophy',36)} ${t('nPassport')}</h3><p class="muted">${t('ppD')}</p></a></div></section>
  <section class="sec wrap"><div class="card" style="border-color:var(--green)"><h2>${t('cEthicsT')}</h2><p>${t('cEthicsD')}</p></div></section>
  <section class="sec wrap"><h2>${t('cRoadT')}</h2><div class="grid g2 steps">${[1,2,3,4].map(n=>`<div class="card step"><div class="n">${n}</div><div style="align-self:center"><b>${t('road'+n)}</b></div></div>`).join('')}</div></section>
  <section class="sec wrap"><h2>${t('cCheatT')}</h2>${cmdTable(['pwd','ls','cd','cat','grep','find','chmod','man'])}<p><a class="btn sm" href="#/linux/nav">${t('lxCmds')}</a></p></section>`;
}
function linuxView(){
  return `<div class="wrap sec"><h1>${t('nLinux')}</h1>${G.say(t('lxIntro'))}<div class="grid g3" style="margin-top:1rem">${C.linux.map((m,i)=>`<a class="card link" href="#/linux/${m.id}"><div class="row">${A.icon(m.icon,44)}<span class="pill">${i+1}</span>${S.isDone('lx:'+m.id)?`<span class="pill easy">✔ ${t('done')}</span>`:''}</div><h3>${L(m.title)}</h3><p class="muted">${L(m.paras[0])}</p><span class="btn sm purple" style="align-self:flex-start">${t('open')}</span></a>`).join('')}</div></div>`;
}
function linuxModuleView(id,after){
  const i=C.linux.findIndex(m=>m.id===id);if(i<0)return notFound();const m=C.linux[i],prev=C.linux[i-1],next=C.linux[i+1];
  const flip=id.length%2===0,opts=flip?[m.right,m.wrong]:[m.wrong,m.right];
  after(()=>G.quiz($('#qz'),[{q:m.q,opts,a:flip?0:1,why:m.paras[m.paras.length-1]}],{done:mis=>celebrate([{id:'lx:'+m.id,xp:25}],mis,next?{href:'#/linux/'+next.id,label:t('next')}:{href:'#/terminal',label:t('nTerm')},{href:'#/linux',label:t('nLinux')})}));
  return `<div class="wrap sec">${crumbs([{t:t('nLinux'),href:'#/linux'},{t:L(m.title)}])}<div class="panel"><div class="row">${A.icon(m.icon,52)}<h1 style="margin:0;font-size:clamp(1.6rem,4vw,2.3rem)">${L(m.title)}</h1></div>
  ${m.paras.map(p=>`<p style="margin-top:.8rem">${L(p)}</p>`).join('')}
  ${m.cmds.length?`<h3>${t('lxCmds')}</h3>${cmdTable(m.cmds)}`:''}
  ${m.id==='tools'||m.id==='ethics'?`<div class="msgbox"><b>${t('lxPermNote')}</b></div>`:''}
  ${m.task?`<p><a class="btn turq" href="#/terminal/${m.task}">${t('lxTry')}</a></p>`:''}</div>
  <h2 style="margin-top:1.4rem">${t('quickQuiz')}</h2><div id="qz"></div>
  <div class="row" style="margin-top:1rem;justify-content:space-between">${prev?`<a class="btn ghost sm" href="#/linux/${prev.id}"><span class="flip">‹</span> ${L(prev.title)}</a>`:'<span></span>'}${next?`<a class="btn ghost sm" href="#/linux/${next.id}">${L(next.title)} <span class="flip">›</span></a>`:''}</div></div>`;
}
function badgeModal(newly){
  const bd=newly.map(id=>(C.badges.concat(C.cbadges)).find(b=>b.id===id)).filter(Boolean);if(!bd.length)return;
  confetti();const d=openModal(`<div class="center">${G.say('<b>'+t('great')+'</b>','cheer')}${bd.map(b=>`<div class="badge"><div class="b-ico">${A.icon(b.icon,52)}</div><b>${t('newBadge',{a:L(b.name)})}</b></div>`).join('')}<button class="btn green" data-close>${t('continue')}</button></div>`);
  d.addEventListener('click',e=>{if(e.target.closest('[data-close]'))closeModal()});
}
function terminalView(taskId,after){
  const tasks=C.tasks;let cur=tasks.find(x=>x.id===taskId)?taskId:(tasks.find(x=>!S.isDone('tm:'+x.id))||tasks[0]).id,hintOn=false;
  after(()=>{
    const root=$('#tmroot');
    const drawSide=()=>{const tk=tasks.find(x=>x.id===cur),n=tasks.filter(x=>S.isDone('tm:'+x.id)).length;
      $('#tlist').innerHTML=`<p class="xp">${t('tasksN',{a:n,b:tasks.length})}</p>`+tasks.map((x,i)=>`<button class="opt" data-t="${x.id}" aria-current="${x.id===cur}" style="min-height:44px;padding:.5rem .8rem;${x.id===cur?'border-color:var(--purple)':''}">${S.isDone('tm:'+x.id)?'✔':(i+1)+'.'} ${L(x.title)}</button>`).join('');
      $('#tgoal').innerHTML=`<b>${t('termGoal')}:</b> ${L(tk.goal)}<br>${hintOn?`<span class="hint" style="display:inline-block;margin-top:.4rem"><code>${esc(L(tk.hint))}</code></span>`:`<button class="btn sm yellow" data-h="1" style="margin-top:.5rem">${t('hint')}</button>`}`};
    drawSide();
    root.addEventListener('click',e=>{const b=e.target.closest('[data-t]');if(b){cur=b.dataset.t;hintOn=false;drawSide()}if(e.target.closest('[data-h]')){hintOn=true;drawSide()}});
    let explainOn=false,sess=null;$('#expl').onchange=e=>{explainOn=e.target.checked};$('#trs').onclick=()=>{render();toast(t('termResetDone'))};
    sess=X.mount($('#tm'),C.labFS(),{quick:['help','pwd','ls','ls -a','cd missions','cat readme.txt','grep ERROR server.log','man grep'],onCommand:ctx=>{
      if(explainOn){const c=C.cmds.find(k=>k.c===ctx.cmd.split(/\s+/).filter(w=>w!=='sudo')[0]);if(c&&sess)sess.note(c.u+' : '+L(c.d))}
      tasks.forEach(x=>{if(!S.isDone('tm:'+x.id)&&x.test(ctx)){const r=S.complete('tm:'+x.id,20,0);toast('✔ '+t('taskDone')+' '+L(x.title));
        if(x.id===cur){const nx=tasks.find(y=>!S.isDone('tm:'+y.id));if(nx){cur=nx.id;hintOn=false}}
        drawSide();renderNav();if(r.newly.length)badgeModal(r.newly)}})}});
  });
  return `<div class="wrap sec">${crumbs([{t:t('nLinux'),href:'#/linux'},{t:t('nTerm')}])}<h1>${t('termTitle')}</h1><div class="msgbox"><span class="pill medium">${t('simLabel')}</span> ${t('simNote')}<br>${t('termNote')}</div><div class="row" style="margin-bottom:.6rem"><label class="tab" style="cursor:pointer"><input type="checkbox" id="expl" style="width:20px;height:20px"> ${t('termExplain')}</label><button class="tab" id="trs">${t('termReset')}</button></div>
  <div class="grid" style="grid-template-columns:minmax(0,1fr);gap:1rem" id="tmroot"><div class="panel"><div id="tgoal"></div></div><div id="tm"></div><details class="panel" open><summary><b>${t('termTasks')}</b></summary><div id="tlist" style="margin-top:.6rem"></div></details></div></div>`;
}

function notFound(){return `<div class="wrap sec center">${G.say(t('notFound'))}<p><a class="btn" href="#/">${t('nHome')}</a></p></div>`}

/* ---------- Onboarding ---------- */
function obRender(){
  const d=openModal(`<div>${G.say(t('obHi'),'cheer')}<h3 style="margin-top:1rem">${t('modeAsk')}</h3><div class="grid g2">${['kids','college'].map(m=>`<button class="opt" data-om="${m}" aria-pressed="${ob.mode===m}" style="${ob.mode===m?'border-color:var(--purple)':''}"><b>${t(m==='kids'?'modeKids':'modeCollege')}</b><br><small class="muted">${t(m==='kids'?'modeKidsD':'modeColD')}</small></button>`).join('')}</div><h3 style="margin-top:1rem">${t('obLang')}</h3><div class="row">${Object.keys(LANGS).map(k=>`<button class="tab" data-ol="${k}" aria-pressed="${CKI.lang===k}">${LANGS[k].name}</button>`).join('')}</div>
  <h3 style="margin-top:1rem">${t('obAvatar')}</h3><div class="avatars">${AVATARS.map(i=>`<button data-oa="${i}" aria-pressed="${ob.avatar===i}" aria-label="${t('avatarL')} ${i+1}">${A.avatar(i,52)}</button>`).join('')}</div>
  <h3 style="margin-top:1rem"><label for="onick">${t('obNick')}</label></h3><input id="onick" class="input" maxlength="16" autocomplete="off" value="${esc(ob.nick)}"><p class="muted" style="font-size:.9rem">${t('obNickHelp')}</p>
  <div class="row" style="margin-top:1rem"><button class="btn green" data-go="1">${t('obGo')}</button><button class="btn ghost" data-skip="1">${t('obSkip')}</button></div></div>`,()=>obFinish(false));
  d.addEventListener('click',e=>{
    const l=e.target.closest('[data-ol]'),a=e.target.closest('[data-oa]'),om=e.target.closest('[data-om]');
    if(om){ob.nick=d.querySelector('#onick').value;ob.mode=om.dataset.om;S.set('mode',ob.mode);document.documentElement.dataset.mode=ob.mode;renderNav();renderFooter();obRender();return}
    if(l){ob.nick=d.querySelector('#onick').value;setLang(l.dataset.ol);return}
    if(a){ob.nick=d.querySelector('#onick').value;ob.avatar=+a.dataset.oa;obRender();return}
    if(e.target.closest('[data-go]'))obFinish(true,d.querySelector('#onick').value);
    if(e.target.closest('[data-skip]'))obFinish(false,d.querySelector('#onick').value);
  });
}
function obFinish(go,nick){const o=ob||{avatar:0};const m=o.mode||S.s.mode||'kids';S.set('mode',m);document.documentElement.dataset.mode=m;S.set('onboarded',true);S.set('avatar',o.avatar);if(nick!=null)S.set('nick',nick.trim().slice(0,16));closeModal();if(go)location.hash=m==='college'?'#/course':'#/mission/f1';else render()}

/* ---------- Render ---------- */
let after=[];
function render(){
  E.cleanup();document.documentElement.lang=CKI.lang;
  const r=route(),p=r.p;after=[];const post=fn=>after.push(fn);
  let html='',title='CyberKids';
  switch(r.key){
    case 'home':html=isCollege()?collegeHome():homeView();break;
    case 'linux':html=p[1]?linuxModuleView(p[1],post):linuxView();break;
    case 'terminal':html=terminalView(p[1],post);break;
    case 'worlds':html=worldsView();break;
    case 'world':html=worldView(p[1]);break;
    case 'mission':html=missionView(p[1],post);break;
    case 'games':html=gamesView();break;
    case 'game':html=gameView(p[1],post);break;
    case 'ctf':html=p[1]?ctfChallengeView(p[1],post):ctfView();break;
    case 'library':html=libraryView();break;
    case 'lesson':html=lessonView(p[1],post);break;
    case 'dashboard':html=dashView();break;
    default:{const fn=window.CKM&&CKM.routes[r.key];html=fn?fn(p,post):notFound()}
  }
  renderNav();renderFooter();main.innerHTML=(S.persistent?'':`<div class="wrap"><div class="fb try" role="alert">${t('dataNoStore')}</div></div>`)+html;
  after.forEach(f=>f());
  const h=main.querySelector('h1');document.title=(h?h.textContent+' · ':'')+'CyberKids — '+t('tagline');
  if(r.key==='ctf'&&!p[1])main.onclick=e=>{const b=e.target.closest('[data-cat]');if(b){ctfCat=b.dataset.cat;render()}};else main.onclick=null;
  if(r.key==='dashboard'){
    $('#nick').oninput=e=>S.set('nick',e.target.value.slice(0,16));
    $('#imp2').onchange=e=>{const f=e.target.files[0];if(!f||f.size>500000){$('#dm').innerHTML=`<div class="fb try">✖ ${t('dataBad')}</div>`;return}const r=new FileReader();r.onload=()=>{if(S.importJson(String(r.result))){toast(t('dataOk'));render()}else $('#dm').innerHTML=`<div class="fb try">✖ ${t('dataBad')}</div>`};r.readAsText(f)};
    main.onclick=e=>{const a=e.target.closest('[data-av]');if(a){S.set('avatar',+a.dataset.av);render();return}
      if(e.target.closest('#exp')){const b=new Blob([S.exportJson()],{type:'application/json'}),a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='cyberkids-progress.json';document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},500);return}
      if(e.target.closest('#rst')){const d=openModal(`<div>${G.say(t('resetAsk'),'think')}<div class="row" style="margin-top:1rem"><button class="btn" data-no="1">${t('close')}</button><button class="btn ghost" data-yes="1">${t('resetP')}</button></div></div>`);
        d.addEventListener('click',ev=>{if(ev.target.closest('[data-no]'))closeModal();if(ev.target.closest('[data-yes]')){S.reset();closeModal();toast(t('resetDone'));render()}})}};
  }
  if(!S.s.onboarded&&!ob&&!modalRoot.firstChild){ob={avatar:S.s.avatar,nick:S.s.nick,mode:S.s.mode};obRender()}
  else if(ob&&modalRoot.firstChild)obRender();
}
addEventListener('hashchange',()=>{if(!ob&&modalRoot.firstChild)closeModal();render();scrollTo(0,0);main.focus({preventScroll:true})});
document.addEventListener('DOMContentLoaded',()=>{});
window.CKApp={celebrate,openModal,closeModal,toast,confetti,crumbs,render,renderNav,isCollege,badgeModal};
initPrefs();render();
if('serviceWorker' in navigator&&/^https?:/.test(location.protocol)){addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}))}
})();
