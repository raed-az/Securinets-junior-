/* Mini-games. Every game receives (el, {done(mistakes)}). Nothing typed here is stored or sent anywhere. */
(function(){
const {t,L}=CKI,C=CKC,E=CKE,A=CKA;
const G={};
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
G.esc=esc;
G.say=(msg,mood)=>`<div class="byte-say"><div class="byte">${A.byte(mood||'happy')}</div><div class="bubble">${msg}</div></div>`;
const norm=s=>String(s).toUpperCase().replace(/[^A-Z0-9_{}]/g,'');
G.norm=norm;

/* ---------- Generic quiz (missions, Safe or Suspicious, library) ---------- */
G.quiz=function(el,steps,o){
  let i=0,mistakes=0,solved=false;
  function draw(){
    const s=steps[i];solved=false;
    el.innerHTML=`<div class="panel"><p class="muted">${t('qOf',{a:i+1,b:steps.length})}</p><div class="bar"><i style="width:${i/steps.length*100}%"></i></div>
    <h3 style="margin-top:1rem">${L(s.q)}</h3><div>${s.opts.map((x,k)=>`<button class="opt" data-k="${k}">${L(x)}</button>`).join('')}</div><div id="fb" role="status" aria-live="polite"></div></div>`;
  }
  el.onclick=e=>{
    const b=e.target.closest('[data-k]'),nx=e.target.closest('[data-next]');
    if(nx){if(i<steps.length-1){i++;draw()}else o.done(mistakes);return}
    if(!b||solved)return;const s=steps[i],k=+b.dataset.k,fb=el.querySelector('#fb');
    if(k===s.a){solved=true;b.classList.add('right');
      el.querySelectorAll('.opt').forEach(x=>x.disabled=true);
      fb.innerHTML=`<div class="fb good">${t('correct')}${L(s.why)}</div><p><button class="btn green" data-next="1">${i<steps.length-1?t('next'):t('continue')}</button></p>`;
    }else{mistakes++;b.classList.add('wrong');b.disabled=true;fb.innerHTML=`<div class="fb try">${t('almost')}${t('tryOther')}</div>`}
  };
  draw();
};

/* ---------- Password Lab ---------- */
G.strength=function(p){
  if(!p||C.common.indexOf(p.toLowerCase())>=0||/^(.)\1+$/.test(p))return 0;
  let s=0;if(p.length>=8)s++;if(p.length>=12)s++;if(p.length>=16)s++;
  const cls=[/[a-z]/,/[A-Z]/,/\d/,/[^A-Za-z0-9]/].filter(r=>r.test(p)).length;if(cls>=3)s++;
  return Math.min(4,s);
};
const meter=s=>`<div class="meter" aria-hidden="true">${[0,1,2,3].map(k=>`<i class="${k<s?'on'+(s>=4?4:s-1):''}"></i>`).join('')}</div><strong>${t('str'+s)}</strong>`;
G.password=function(el,o){
  let r=0,mistakes=0,done=false;const R=C.passRounds;
  function round(){
    done=false;const q=R[r];
    el.innerHTML=`<div class="panel"><p class="muted">${t('roundOf',{a:r+1,b:R.length+1})}</p><div class="msgbox">${t('passNote')}</div><h3>${t('pwPick')}</h3>
    ${q.opts.map((p,k)=>`<button class="opt mono ltr" style="direction:ltr;text-align:start" data-k="${k}">${esc(p)}<span class="meter-slot"></span></button>`).join('')}<div id="fb" role="status" aria-live="polite"></div></div>`;
  }
  function build(){
    el.innerHTML=`<div class="panel"><p class="muted">${t('roundOf',{a:R.length+1,b:R.length+1})}</p><div class="msgbox">${t('passNote')}</div><h3>${t('pwBuild')}</h3>
    <input class="input flag-in" id="pw" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="${t('pwPh')}" aria-label="${t('pwBuild')}"><div id="m" style="margin:.6rem 0">${meter(0)}</div><div id="fb" role="status" aria-live="polite"></div><button class="btn green" id="ok">${t('check')}</button></div>`;
    const inp=el.querySelector('#pw');inp.oninput=()=>{el.querySelector('#m').innerHTML=meter(G.strength(inp.value))};
    el.querySelector('#ok').onclick=()=>{const s=G.strength(inp.value),fb=el.querySelector('#fb');
      if(s>=3){fb.innerHTML=`<div class="fb good">${t('pwBuilt')}</div>`;inp.value='';o.done(mistakes)}
      else{mistakes++;fb.innerHTML=`<div class="fb try">${t('pwTip')}</div>`}};
  }
  el.onclick=e=>{
    const b=e.target.closest('[data-k]'),nx=e.target.closest('[data-next]');
    if(nx){r++;r<R.length?round():build();return}
    if(!b||done)return;const q=R[r],k=+b.dataset.k;
    if(k===q.a){done=true;
      el.querySelectorAll('.opt').forEach((x,j)=>{x.disabled=true;x.querySelector('.meter-slot').innerHTML=meter(G.strength(q.opts[j]));if(j===q.a)x.classList.add('right')});
      el.querySelector('#fb').innerHTML=`<div class="fb good">${t('correct')}${L(q.why)}</div><p><button class="btn green" data-next="1">${t('next')}</button></p>`;
    }else{mistakes++;b.classList.add('wrong');b.disabled=true;b.querySelector('.meter-slot').innerHTML=meter(G.strength(q.opts[k]));el.querySelector('#fb').innerHTML=`<div class="fb try">${t('almost')}${t('tryOther')}</div>`}
  };
  round();
};

/* ---------- Phishing Detective ---------- */
G.phishing=function(el,o){
  let i=0,mistakes=0,tries=0,sel=new Set(),over=false;const P=C.phish;
  function draw(){
    const p=P[i];sel=new Set();tries=0;over=false;
    el.innerHTML=`<div class="panel"><p class="muted">${t('qOf',{a:i+1,b:P.length})}</p><div class="bar"><i style="width:${i/P.length*100}%"></i></div>
    <p style="margin-top:1rem"><span class="pill">${L(p.kind)}</span> <span class="mono muted">${esc(p.from)}</span></p>
    <div class="msgbox" id="msg">${p.segs.map((s,k)=>`<button class="seg" data-s="${k}" aria-pressed="false">${L(s[0])}</button>`).join(' ')}</div>
    <p class="muted">${t('phHelp')}</p><button class="btn green" id="ok">${t('check')}</button><div id="fb" role="status" aria-live="polite"></div></div>`;
  }
  el.onclick=e=>{
    const sg=e.target.closest('[data-s]'),nx=e.target.closest('[data-next]');
    if(nx){if(i<P.length-1){i++;draw()}else o.done(mistakes);return}
    if(sg&&!over){const k=+sg.dataset.s;sel.has(k)?sel.delete(k):sel.add(k);sg.classList.toggle('on',sel.has(k));sg.setAttribute('aria-pressed',sel.has(k));return}
    if(e.target.closest('#ok')&&!over){
      const p=P[i],bad=p.segs.map((s,k)=>s[1]?k:-1).filter(k=>k>=0),ok=bad.length===sel.size&&bad.every(k=>sel.has(k)),fb=el.querySelector('#fb');
      tries++;
      if(ok||tries>=3){over=true;if(!ok)mistakes++;
        if(!ok)el.querySelectorAll('.seg').forEach((b,k)=>{b.classList.toggle('on',bad.indexOf(k)>=0)});
        fb.innerHTML=`<div class="fb ${ok?'good':'try'}">${ok?t('correct'):''}${L(p.why)}</div><p><button class="btn green" data-next="1">${i<P.length-1?t('next'):t('continue')}</button></p>`;
      }else{mistakes++;fb.innerHTML=`<div class="fb try">${t('almost')}${t('phTry')}</div>`}
    }
  };
  draw();
};

/* ---------- Caesar tool (decoder game + CTF) ---------- */
const shift=(s,n)=>s.replace(/[A-Z]/gi,c=>{const b=c<='Z'?65:97;return String.fromCharCode((c.charCodeAt(0)-b+n+26*10)%26+b)});
G.shift=shift;
G.caesar=function(el,cipher,ans,hintT,o){
  let sh=0,hint=false;
  function draw(){
    const dec=shift(cipher,-sh);
    el.innerHTML=`<div class="msgbox ltr" style="text-align:center"><div style="font-size:1.6rem;letter-spacing:.2em;font-weight:900;word-break:break-word" class="mono">${esc(cipher)}</div>
    <div class="row" style="justify-content:center;margin:.6rem 0"><button class="btn sm ghost" data-sh="-1" aria-label="−1">−</button><span class="xp" aria-live="polite">${t('decShift')}: ${sh}</span><button class="btn sm ghost" data-sh="1" aria-label="+1">+</button></div>
    <div style="font-size:1.6rem;letter-spacing:.2em;font-weight:900;color:var(--purple);word-break:break-word" class="mono">${esc(dec)}</div></div>
    ${hintT?`<p>${hint?`<span class="hint">${L(hintT)}</span>`:`<button class="btn sm yellow" data-hint="1">${t('hint')}</button>`}</p>`:''}
    ${ans?`<label class="muted" for="ca">${t('yourWords')}</label><input id="ca" class="input flag-in" type="text" autocomplete="off" spellcheck="false" style="margin:.3rem 0 .6rem"><button class="btn green" data-ok="1">${t('check')}</button><div id="fb" role="status" aria-live="polite"></div>`:''}`;
  }
  el.onclick=e=>{
    const s=e.target.closest('[data-sh]');
    if(s){sh=(sh+ +s.dataset.sh+26)%26;const v=(el.querySelector('#ca')||{}).value;draw();if(v!=null)el.querySelector('#ca').value=v;return}
    if(e.target.closest('[data-hint]')){const v=(el.querySelector('#ca')||{}).value;hint=true;draw();if(v!=null)el.querySelector('#ca').value=v;return}
    if(e.target.closest('[data-ok]')){const v=norm(el.querySelector('#ca').value.replace(/ /g,''));const fb=el.querySelector('#fb');
      if(v===ans.replace(/ /g,'')){fb.innerHTML=`<div class="fb good">${t('decRight')}</div>`;o&&o.ok()}else{fb.innerHTML=`<div class="fb try">${t('decWrong')}</div>`;o&&o.bad()}}
  };
  draw();
};
G.decoder=function(el,o){
  let i=0,mistakes=0;const D=C.decoder;
  function lvl(){
    el.innerHTML=`<div class="panel"><p class="muted">${t('levelN',{a:i+1})} / ${D.length}</p><div class="bar"><i style="width:${i/D.length*100}%"></i></div><p style="margin-top:1rem">${t('decIntro')}</p><div id="c"></div><div id="nx"></div></div>`;
    G.caesar(el.querySelector('#c'),D[i].cipher,D[i].ans,D[i].hint,{bad:()=>{mistakes++},ok:()=>{
      el.querySelector('#nx').innerHTML=`<p><button class="btn green">${i<D.length-1?t('next'):t('continue')}</button></p><div class="msgbox">${t('decLearn')}</div>`;
      el.querySelector('#nx button').onclick=()=>{if(i<D.length-1){i++;lvl()}else o.done(Math.min(mistakes,3))}}});
  }
  lvl();
};

/* ---------- Firewall Builder ---------- */
G.firewall=function(el,o){
  const rules={};C.fwPatterns.forEach(p=>rules[p.id]='allow');let mistakes=0;
  const sev={allow:0,warn:1,block:2};
  function draw(res){
    el.innerHTML=`<div class="panel"><div class="msgbox"><b>${t('fwRules')}</b><p class="muted">${t('fwStrong')}</p>
    ${C.fwPatterns.map(p=>`<div class="row" style="margin:.5rem 0"><span class="pill">${t('fwIf')}</span><span>${L(p.label)}</span><span class="pill">${t('fwThen')}</span>
      <select class="lang" data-r="${p.id}" aria-label="${L(p.label)}">${['allow','warn','block'].map(a=>`<option value="${a}"${rules[p.id]===a?' selected':''}>${t('fw_'+a)}</option>`).join('')}</select></div>`).join('')}</div>
    <button class="btn green" id="go">▶ ${t('fwRun')}</button>
    ${res?`<h3 style="margin-top:1rem">${t('fwEvents')}</h3><table class="fw"><tbody>${res.rows.map(r=>`<tr><td>${L(r.e.label)}</td><td><span class="pill ${r.ok?'easy':'challenge'}">${t('fw_'+r.act)}</span></td><td aria-label="${r.ok?'ok':'no'}">${r.ok?'✔':'✖'}</td></tr>`).join('')}</tbody></table>
    <div class="fb ${res.all?'good':'try'}" role="status">${res.all?t('fwAllGood'):res.msg}</div>`:''}</div>`;
  }
  el.onchange=e=>{const s=e.target.closest('[data-r]');if(s)rules[s.dataset.r]=s.value};
  el.onclick=e=>{
    if(!e.target.closest('#go'))return;
    let friend=false,trick=false;
    const rows=C.fwEvents.map(ev=>{let act='allow';ev.tags.forEach(tag=>{if(rules[tag]&&sev[rules[tag]]>sev[act])act=rules[tag]});
      const ok=ev.bad?act!=='allow':act==='allow';if(!ok){ev.bad?trick=true:friend=true}return {e:ev,act,ok}});
    const all=rows.every(r=>r.ok);if(!all)mistakes++;
    draw({rows,all,msg:(friend?t('fwFriend')+' ':'')+(trick?t('fwTrick'):'')});
    if(all)o.done(Math.min(mistakes,3));
  };
  draw();
};

/* ---------- Block programming game (level picker) ---------- */
G.blockSeq=function(el,idxs,o){
  let k=0,mistakes=0;
  function lvl(){
    const def=C.blockLevels[idxs[k]];
    el.innerHTML=`<div class="panel"><p class="muted">${t('levelN',{a:k+1})} / ${idxs.length} · ${L(def.title)}</p><div class="msgbox">${L(def.tip)}</div><div id="ed"></div><div id="nx"></div></div>`;
    E.blocks(el.querySelector('#ed'),{def,onWin:info=>{mistakes+=info.mistakes;
      el.querySelector('#nx').innerHTML=`<div class="fb good">${t('bLearn'+(def.allow.indexOf('if')>=0?'If':def.allow.indexOf('repeat')>=0?'Rep':'Seq'))}</div><p><button class="btn green">${k<idxs.length-1?t('nextLevel'):t('continue')}</button></p>`;
      el.querySelector('#nx button').onclick=()=>{if(k<idxs.length-1){k++;lvl()}else o.done(Math.min(mistakes,3))}}});
  }
  lvl();
};

/* ---------- CTF widgets ---------- */
G.widget=function(el,ch,o){
  const w=ch.w;
  if(w.type==='lines'){
    el.innerHTML=w.lines.map(l=>`<div class="step msgbox"><div class="n">${esc(l[0])}</div><div style="align-self:center">${L(l[1])}</div></div>`).join('');
  }else if(w.type==='caesar'){G.caesar(el,w.cipher,null,null,null)}
  else if(w.type==='files'){
    const isFile=v=>typeof v.en==='string';
    const tree=(obj,top)=>Object.keys(obj).map(k=>isFile(obj[k])?`<button data-f="${esc(k)}" data-c="${esc(L(obj[k]))}">▫ ${esc(k)}</button>`:`<details${top?' open':''}><summary class="mono">▸ ${esc(k)}</summary><div class="kids">${tree(obj[k],false)}</div></details>`).join('');
    el.innerHTML=`<div class="grid g2"><div class="tree msgbox">${tree(w.tree,true)}</div><div class="msgbox" id="view" aria-live="polite"><span class="muted">${t('filePick')}</span></div></div>`;
    el.onclick=e=>{const b=e.target.closest('[data-f]');if(b)el.querySelector('#view').innerHTML=`<b class="mono">${b.dataset.f}</b><p>${b.dataset.c}</p>`};
  }else if(w.type==='bulbs'){
    const on=w.on.slice();
    const d=()=>{el.innerHTML=`<div class="bulbs">${w.vals.map((v,k)=>`<button class="bulb" style="background:none;border:0;color:inherit;font:inherit;cursor:pointer" data-b="${k}" aria-pressed="${!!on[k]}" aria-label="${v} ${on[k]?'ON':'OFF'}"><i class="${on[k]?'':'off'}"></i><b>${v}</b><br><span class="muted">${on[k]?'ON':'OFF'}</span></button>`).join('')}</div>`};
    el.onclick=e=>{const b=e.target.closest('[data-b]');if(b){on[+b.dataset.b]^=1;d()}};d();
  }else if(w.type==='blocks'){
    const def=C.blockLevels[w.level];
    el.innerHTML=`<div class="msgbox">${L(def.tip)}</div><div id="ed"></div><div id="nx"></div>`;
    E.blocks(el.querySelector('#ed'),{def,onWin:()=>{el.querySelector('#nx').innerHTML=`<div class="fb good">${t('bCode')} <code>${esc(ch.flag)}</code></div>`}});
  }
};

/* ---------- Registry ---------- */
G.start=function(id,el,o){
  if(id==='password')return G.password(el,o);
  if(id==='phishing')return G.phishing(el,o);
  if(id==='safe')return G.quiz(el,C.safe,o);
  if(id==='decoder')return G.decoder(el,o);
  if(id==='firewall')return G.firewall(el,o);
  if(id==='maze')return E.maze(el,o);
  if(id==='blocks')return G.blockSeq(el,[0,1,2,3,4],{done:m=>o.done(m)});
};
window.CKG=G;
})();
