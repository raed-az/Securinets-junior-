/* Creator Studio. Levels/quizzes are plain data (never executed). Imports are validated field by field. */
(function(){
const {t,L,T}=CKI,C=CKC,S=CKS,A=CKA,G=CKG,E=CKE,esc=G.esc;
const M=window.CKM=window.CKM||{routes:{}};
const u=M.u;const app=()=>window.CKApp;const $=s=>document.querySelector(s);

u('stT','Cyber Creator Studio','Atelier de création cyber','استوديو الإنشاء السيبراني');u('stD','Design your own maze, test it with code blocks, save it and share it as a JSON file. You can also write quiz questions.','Crée ton labyrinthe, teste-le avec des blocs, enregistre-le et partage-le en fichier JSON. Tu peux aussi écrire des questions de quiz.','صمّم متاهتك واختبرها بالكتل البرمجية واحفظها وشاركها كملف JSON. ويمكنك أيضاً كتابة أسئلة اختبار.');
u('stTool','Tool','Outil','الأداة');u('t_wall','Wall','Mur','جدار');u('t_start','Start','Départ','البداية');u('t_goal','Goal','Arrivée','الهدف');u('t_key','Key','Clé','مفتاح');u('t_dev','Suspicious device','Appareil suspect','جهاز مشبوه');u('t_ers','Eraser','Gomme','ممحاة');
u('stW','Width','Largeur','العرض');u('stH','Height','Hauteur','الارتفاع');u('stName','Level name','Nom du niveau','اسم المرحلة');u('stTest','Test with blocks','Tester avec des blocs','اختبر بالكتل');u('stSave','Save level','Enregistrer','احفظ المرحلة');u('stClear','Clear grid','Vider la grille','امسح الشبكة');u('stMy','My levels','Mes niveaux','مراحلي');u('stLoad','Load','Charger','حمّل');u('stDel','Delete','Supprimer','احذف');u('stExp','Export JSON','Exporter en JSON','تصدير JSON');u('stImp','Import JSON file','Importer un fichier JSON','استيراد ملف JSON');u('stEmpty','No saved levels yet.','Aucun niveau enregistré.','لا توجد مراحل محفوظة بعد.');
u('stSaved','Level saved.','Niveau enregistré.','تم حفظ المرحلة.');u('stNeed','You need exactly one Start and one Goal.','Il faut exactement un Départ et une Arrivée.','يلزم بداية واحدة وهدف واحد بالضبط.');u('stUnsolv','This level cannot be solved: the goal or a key is not reachable.','Ce niveau est impossible : l’arrivée ou une clé est inaccessible.','هذه المرحلة غير قابلة للحل: الهدف أو مفتاح لا يمكن الوصول إليه.');u('stImpOk','Imported: {a}','Importé : {a}','تم الاستيراد: {a}');u('stImpBad','Import refused: the file is not a valid CyberKids level or quiz.','Import refusé : ce fichier n’est pas un niveau ou quiz CyberKids valide.','رُفض الاستيراد: الملف ليس مرحلة أو اختباراً صالحاً من CyberKids.');u('stConfirmDel','Delete this item? This cannot be undone.','Supprimer cet élément ? C’est définitif.','حذف هذا العنصر؟ لا يمكن التراجع.');u('stYes','Yes, delete','Oui, supprimer','نعم، احذف');
u('stTestHint','Build a block program that solves your own level!','Construis un programme en blocs qui résout ton propre niveau !','ابنِ برنامج كتل يحل مرحلتك أنت!');u('stSolved','Your level is solvable with blocks. Great design!','Ton niveau est résolu avec des blocs. Beau travail !','مرحلتك قابلة للحل بالكتل. تصميم رائع!');
u('qzT','Quiz creator','Créateur de quiz','منشئ الاختبارات');u('qzQ','Question','Question','السؤال');u('qzO','Answer {a}','Réponse {a}','الإجابة {a}');u('qzC','Correct answer','Bonne réponse','الإجابة الصحيحة');u('qzE','Explanation','Explication','التفسير');u('qzAdd','Save question','Enregistrer la question','احفظ السؤال');u('qzMy','My questions','Mes questions','أسئلتي');u('qzPlay','Play my quiz','Jouer mon quiz','العب اختباري');u('qzBad','Write a question, three answers and an explanation.','Écris une question, trois réponses et une explication.','اكتب سؤالاً وثلاث إجابات وتفسيراً.');
const TOOLS=[['#','t_wall'],['S','t_start'],['F','t_goal'],['K','t_key'],['X','t_dev'],['.','t_ers']];
const SYM={'#':'▓','S':'S','F':'⚑','K':'k','X':'!','.':''};
const ALLOW=['move','left','right','repeat','if','collect'];

function grid(w,h){const g=[];for(let y=0;y<h;y++){let r='';for(let x=0;x<w;x++)r+=(x===0||y===0||x===w-1||y===h-1)?'#':'.';g.push(r)}return g}
function solvable(g){const h=g.length,w=g[0].length;let s,f,keys=[];g.forEach((r,y)=>[...r].forEach((c,x)=>{if(c==='S')s=[x,y];if(c==='F')f=[x,y];if(c==='K')keys.push(x+','+y)}));
  const seen=new Set([s+'']),q=[s];while(q.length){const [x,y]=q.shift();[[1,0],[-1,0],[0,1],[0,-1]].forEach(([a,b])=>{const nx=x+a,ny=y+b;if(g[ny]&&g[ny][nx]&&'#X'.indexOf(g[ny][nx])<0&&!seen.has(nx+','+ny)){seen.add(nx+','+ny);q.push([nx,ny])}})}
  return seen.has(f+'')&&keys.every(k=>seen.has(k))}
const count=(g,c)=>g.join('').split(c).length-1;
/* Validate an untrusted level object. Returns a clean copy or null. */
function cleanLevel(o){
  if(!o||typeof o!=='object'||o.kind!=='cyberkids-level'||o.v!==1)return null;
  const w=+o.w,h=+o.h;if(!(w>=5&&w<=12&&h>=5&&h<=12)||!Array.isArray(o.grid)||o.grid.length!==h)return null;
  const g=[];for(const r of o.grid){if(typeof r!=='string'||r.length!==w||/[^#SFKX.]/.test(r))return null;g.push(r)}
  if(count(g,'S')!==1||count(g,'F')!==1||count(g,'K')>6||count(g,'X')>8)return null;
  return {kind:'cyberkids-level',v:1,name:String(o.name||'Level').replace(/[<>]/g,'').slice(0,24),w,h,grid:g};
}
function cleanQuiz(o){
  if(!o||typeof o!=='object'||o.kind!=='cyberkids-quiz'||o.v!==1||!Array.isArray(o.items)||o.items.length>30)return null;
  const items=[];for(const i of o.items){if(!i||typeof i.q!=='string'||!Array.isArray(i.o)||i.o.length!==3||i.o.some(x=>typeof x!=='string')||![0,1,2].includes(i.a)||typeof i.e!=='string')return null;
    const c=s=>s.replace(/[<>]/g,'').slice(0,160);items.push({q:c(i.q),o:i.o.map(c),a:i.a,e:c(i.e)})}
  return {kind:'cyberkids-quiz',v:1,items};
}
const download=(name,obj)=>{const b=new Blob([JSON.stringify(obj,null,2)],{type:'application/json'}),a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=name;document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},500)};
M.cleanLevel=cleanLevel;M.cleanQuiz=cleanQuiz;M.solvable=solvable;

M.routes.studio=(p,post)=>{
  post(()=>{
    const el=$('#sd');let w=8,h=7,g=grid(w,h),tool='#',name='',msg='';
    const st=S.s.studio;
    const setCell=(x,y)=>{let r=[...g[y]];if(x===0||y===0||x===w-1||y===h-1)return; // keep outer wall
      if(tool==='S'||tool==='F'){g=g.map(row=>row.replace(tool,'.'));r=[...g[y]]}
      r[x]=tool;g[y]=r.join('')};
    const draw=()=>{
      el.innerHTML=`<div class="panel"><div class="row"><label>${t('stW')} <select class="lang" id="sw">${[5,6,7,8,9,10,12].map(n=>`<option ${n===w?'selected':''}>${n}</option>`).join('')}</select></label><label>${t('stH')} <select class="lang" id="sh">${[5,6,7,8,9,10,12].map(n=>`<option ${n===h?'selected':''}>${n}</option>`).join('')}</select></label>
      <label>${t('stName')} <input id="sn" class="input" maxlength="24" value="${esc(name)}" style="max-width:14rem;min-height:44px"></label></div>
      <div class="tabs" role="group" aria-label="${t('stTool')}">${TOOLS.map(x=>`<button class="tab" data-t="${x[0]}" aria-pressed="${tool===x[0]}">${SYM[x[0]]||'∅'} ${t(x[1])}</button>`).join('')}</div>
      <div class="board" id="gb" style="grid-template-columns:repeat(${w},1fr);max-width:480px" role="grid">${g.map((r,y)=>[...r].map((c,x)=>`<button class="cell${c==='#'?' w':''}" data-x="${x}" data-y="${y}" style="font-size:clamp(.8rem,3vw,1.2rem);border:0;cursor:pointer;color:var(--ink);font-weight:900;${c==='.'?'':''}" aria-label="${x+1},${y+1}: ${c==='#'?t('t_wall'):c==='S'?t('t_start'):c==='F'?t('t_goal'):c==='K'?t('t_key'):c==='X'?t('t_dev'):'·'}">${c==='#'?'':c==='.'?'':A.icon({S:'maze',F:'flag',K:'key',X:'device'}[c],40)}</button>`).join('')).join('')}</div>
      <div class="row" style="margin-top:.8rem"><button class="btn green" data-a="test">${t('stTest')}</button><button class="btn" data-a="save">${t('stSave')}</button><button class="btn ghost" data-a="clear">${t('stClear')}</button></div><div id="sm" role="status" aria-live="polite">${msg}</div><div id="stest"></div></div>
      <h2 style="margin-top:1.4rem">${t('stMy')}</h2>${st.levels.length?`<div class="grid g3">${st.levels.map((l,i)=>`<div class="card"><b>${esc(l.name)}</b> <span class="muted">${l.w}×${l.h}</span><div class="row" style="margin-top:.5rem"><button class="btn sm" data-ld="${i}">${t('stLoad')}</button><button class="btn sm ghost" data-ex="${i}">${t('stExp')}</button><button class="btn sm ghost" data-dl="${i}">${t('stDel')}</button></div></div>`).join('')}</div>`:`<p class="muted">${t('stEmpty')}</p>`}
      <p style="margin-top:.8rem"><label class="btn ghost sm" for="imp">${t('stImp')}</label><input id="imp" type="file" accept="application/json,.json" style="position:absolute;opacity:0;width:1px;height:1px"></p>
      <h2 style="margin-top:1.4rem">${t('qzT')}</h2><div class="panel" id="qz"></div>`;
      quiz();
    };
    const say=(m,good)=>{msg=`<div class="fb ${good?'good':'try'}">${m}</div>`;const s=$('#sm');if(s)s.innerHTML=msg};
    const cur=()=>({kind:'cyberkids-level',v:1,name:(name||'Level').slice(0,24),w,h,grid:g});
    const valid=()=>{if(count(g,'S')!==1||count(g,'F')!==1){say('✖ '+t('stNeed'));return false}if(!solvable(g)){say('✖ '+t('stUnsolv'));return false}return true};
    el.onclick=e=>{
      const c=e.target.closest('[data-x]'),tl=e.target.closest('[data-t]'),a=e.target.closest('[data-a]');
      if(c){setCell(+c.dataset.x,+c.dataset.y);const keep=c.dataset.x+','+c.dataset.y;draw();const n=el.querySelector(`[data-x="${keep.split(',')[0]}"][data-y="${keep.split(',')[1]}"]`);n&&n.focus();return}
      if(tl){tool=tl.dataset.t;draw();return}
      const ld=e.target.closest('[data-ld]'),ex=e.target.closest('[data-ex]'),dl=e.target.closest('[data-dl]');
      if(ld){const l=st.levels[+ld.dataset.ld];w=l.w;h=l.h;g=l.grid.slice();name=l.name;draw();return}
      if(ex){download('cyberkids-level.json',st.levels[+ex.dataset.ex]);return}
      if(dl){const i=+dl.dataset.dl,d=app().openModal(`<div>${G.say(t('stConfirmDel'),'think')}<div class="row" style="margin-top:1rem"><button class="btn" data-no="1">${t('close')}</button><button class="btn ghost" data-yes="1">${t('stYes')}</button></div></div>`);
        d.addEventListener('click',ev=>{if(ev.target.closest('[data-no]'))app().closeModal();if(ev.target.closest('[data-yes]')){st.levels.splice(i,1);S.save();app().closeModal();draw()}});return}
      if(!a)return;
      if(a.dataset.a==='clear'){g=grid(w,h);draw()}
      if(a.dataset.a==='save'){if(!valid())return;const l=cleanLevel(cur());if(!l)return;st.levels=st.levels.filter(x=>x.name!==l.name).slice(-19).concat(l);S.save();msg='';draw();say('✔ '+t('stSaved'),true)}
      if(a.dataset.a==='test'){if(!valid())return;const box=$('#stest');box.innerHTML=`<div class="msgbox">${t('stTestHint')}</div><div id="ted"></div>`;
        E.blocks(box.querySelector('#ted'),{def:{map:g.slice(),dir:1,allow:ALLOW},onWin:()=>{say('✔ '+t('stSolved'),true);app().celebrate([{id:'studio:made',xp:20}],0,null,{href:'#/studio',label:t('nStudio')})}})}
    };
    el.onchange=e=>{
      if(e.target.id==='sw'||e.target.id==='sh'){w=+$('#sw').value;h=+$('#sh').value;g=grid(w,h);draw();return}
      if(e.target.id==='sn'){name=e.target.value;return}
      if(e.target.id==='imp'){const f=e.target.files[0];if(!f||f.size>200000){say('✖ '+t('stImpBad'));return}
        const r=new FileReader();r.onload=()=>{let o;try{o=JSON.parse(String(r.result))}catch(x){}const l=cleanLevel(o),q=cleanQuiz(o);
          if(l){st.levels=st.levels.filter(x=>x.name!==l.name).slice(-19).concat(l);S.save();w=l.w;h=l.h;g=l.grid.slice();name=l.name;draw();say('✔ '+t('stImpOk',{a:esc(l.name)}),true)}
          else if(q){st.quizzes=q.items.slice(0,30);S.save();draw();say('✔ '+t('stImpOk',{a:q.items.length}),true)}
          else say('✖ '+t('stImpBad'))};r.readAsText(f)}};
    function quiz(){
      const q=$('#qz'),qs=st.quizzes;
      q.innerHTML=`<label for="qq">${t('qzQ')}</label><input id="qq" class="input" maxlength="160">${[0,1,2].map(i=>`<label for="qo${i}" style="display:block;margin-top:.5rem">${t('qzO',{a:i+1})}</label><input id="qo${i}" class="input" maxlength="160">`).join('')}
      <label for="qa" style="display:block;margin-top:.5rem">${t('qzC')}</label><select id="qa" class="lang">${[1,2,3].map(i=>`<option value="${i-1}">${i}</option>`).join('')}</select>
      <label for="qe" style="display:block;margin-top:.5rem">${t('qzE')}</label><input id="qe" class="input" maxlength="160"><div class="row" style="margin-top:.7rem"><button class="btn" id="qadd">${t('qzAdd')}</button>${qs.length?`<button class="btn green" id="qplay">${t('qzPlay')} (${qs.length})</button><button class="btn ghost" id="qexp">${t('stExp')}</button>`:''}</div><div id="qm" role="status"></div><div id="qp"></div>`;
      $('#qadd').onclick=()=>{const v=id=>$(id).value.trim(),o=[v('#qo0'),v('#qo1'),v('#qo2')];
        if(!v('#qq')||o.some(x=>!x)||!v('#qe')){$('#qm').innerHTML=`<div class="fb try">✖ ${t('qzBad')}</div>`;return}
        const it=cleanQuiz({kind:'cyberkids-quiz',v:1,items:[{q:v('#qq'),o,a:+$('#qa').value,e:v('#qe')}]});if(!it)return;st.quizzes=st.quizzes.concat(it.items).slice(-30);S.save();quiz();$('#qm').innerHTML=`<div class="fb good">✔ ${t('stSaved')}</div>`};
      const pl=$('#qplay');if(pl)pl.onclick=()=>G.quiz($('#qp'),st.quizzes.map(i=>({q:i.q,opts:i.o,a:i.a,why:i.e,ex:true})),{done:()=>{}});
      const ex=$('#qexp');if(ex)ex.onclick=()=>download('cyberkids-quiz.json',{kind:'cyberkids-quiz',v:1,items:st.quizzes});
    }
    draw();
  });
  return `<div class="wrap sec"><h1>${t('stT')}</h1>${G.say(t('stD'))}<div id="sd" style="margin-top:1rem"></div></div>`;
};
})();
