/* Cyber Defense Simulator. 100% simulated: no scanning, no real firewall, no network access. */
(function(){
const {t,L,T}=CKI,C=CKC,S=CKS,A=CKA,G=CKG,esc=G.esc;
const M=window.CKM=window.CKM||{routes:{}};
const u=M.u;const app=()=>window.CKApp;const $=s=>document.querySelector(s);

u('dfT','Cyber Defense Simulator','Simulateur de défense cyber','محاكي الدفاع السيبراني');u('dfD','Protect a fictional school network. Spend a limited budget, then handle four security alerts. Your choices change the network.','Protège un réseau scolaire fictif. Dépense un budget limité puis traite quatre alertes. Tes choix modifient le réseau.','احمِ شبكة مدرسة خيالية. أنفق ميزانية محدودة ثم تعامل مع أربعة تنبيهات. اختياراتك تغيّر الشبكة.');u('dfSim','Simulation only: nothing here scans, attacks or changes a real network.','Simulation uniquement : rien ici ne scanne, n’attaque ni ne modifie un vrai réseau.','محاكاة فقط: لا شيء هنا يفحص أو يهاجم أو يغيّر شبكة حقيقية.');
u('dfBud','Budget: {a} of {b} points left','Budget : {a} points restants sur {b}','الميزانية: بقي {a} من {b} نقطة');u('dfPlan','Step 1: choose protections','Étape 1 : choisis des protections','الخطوة 1: اختر الحمايات');u('dfStart','Start the alerts','Lancer les alertes','ابدأ التنبيهات');u('dfAlert','Alert {a} of {b}','Alerte {a} sur {b}','التنبيه {a} من {b}');u('dfRisk','Overall risk','Risque global','الخطر العام');u('dfLow','Low','Faible','منخفض');u('dfMed','Medium','Moyen','متوسط');u('dfHigh','High','Élevé','مرتفع');u('dfNext','Next alert','Alerte suivante','التنبيه التالي');u('dfRep','Final security report','Rapport de sécurité final','تقرير الأمن النهائي');u('dfScore','Alert handling: {a} of {b}','Gestion des alertes : {a} sur {b}','معالجة التنبيهات: {a} من {b}');u('dfAgain','Run it again','Recommencer','أعد التشغيل');u('dfSpent','Budget spent: {a}','Budget dépensé : {a}','المنفق من الميزانية: {a}');u('dfNone','No protections chosen.','Aucune protection choisie.','لم تُختر حمايات.');u('dfRec','Tip: with a small budget, patching, MFA and backups give the most protection.','Astuce : avec un petit budget, mises à jour, MFA et sauvegardes protègent le plus.','نصيحة: مع ميزانية صغيرة تعطي التحديثات وMFA والنسخ الاحتياطي أكبر حماية.');u('dfOver','Not enough budget for that.','Budget insuffisant.','الميزانية لا تكفي.');
const NODES=[['net','nodeNet',20,60],['fw','nodeFw',160,60],['web','nodeWeb',320,10],['db','nodeDb',320,90],['staff','nodeStaff',320,170],['wifi','nodeWifi',160,150],['lab','nodeLab',160,230],['prn','nodePrn',320,250]];
u('nodeNet','Internet','Internet','الإنترنت');u('nodeFw','Firewall','Pare-feu','الجدار الناري');u('nodeWeb','Web portal','Portail web','بوابة الويب');u('nodeDb','Grades database','Base des notes','قاعدة العلامات');u('nodeStaff','Staff PCs','PC du personnel','حواسيب الموظفين');u('nodeWifi','Student Wi-Fi','Wi-Fi étudiants','واي فاي الطلبة');u('nodeLab','Lab PCs','PC du labo','حواسيب المختبر');u('nodePrn','Printer','Imprimante','الطابعة');
const ACT=[
 ['patch',20,T('Patch the web portal','Mettre à jour le portail web','تحديث بوابة الويب'),T('Fixes known flaws.','Corrige des failles connues.','يصلح ثغرات معروفة.'),{web:-35,lab:-5}],
 ['mfa',15,T('Multi-factor login for staff','Connexion multifacteur du personnel','تحقق متعدد العوامل للموظفين'),T('A stolen password is not enough.','Un mot de passe volé ne suffit pas.','كلمة سر مسروقة لا تكفي.'),{staff:-30,db:-10}],
 ['seg',25,T('Separate student Wi-Fi from servers','Séparer le Wi-Fi étudiant des serveurs','فصل واي فاي الطلبة عن الخوادم'),T('Network segmentation.','Segmentation du réseau.','تقسيم الشبكة.'),{db:-25,wifi:-15,lab:-15}],
 ['fw',10,T('Firewall: allow only web ports inbound','Pare-feu : n’autoriser que les ports web','جدار ناري: السماح بمنافذ الويب فقط'),T('Closes unneeded doors.','Ferme les portes inutiles.','يغلق الأبواب غير اللازمة.'),{web:-10,wifi:-5,fw:-30}],
 ['bak',15,T('Tested backups','Sauvegardes testées','نسخ احتياطية مختبرة'),T('Recover after ransomware.','Rétablir après un rançongiciel.','الاستعادة بعد الفدية.'),{lab:-10,db:-5}],
 ['mon',15,T('Logging and monitoring','Journalisation et surveillance','تسجيل ومراقبة'),T('Spot problems early.','Repérer tôt les problèmes.','اكتشاف المشاكل مبكراً.'),{web:-5,lab:-5,db:-5}],
 ['trn',10,T('Awareness training','Formation de sensibilisation','تدريب توعوي'),T('People spot phishing.','Les gens repèrent l’hameçonnage.','الناس يكتشفون التصيّد.'),{staff:-15,wifi:-10}],
 ['prn',5,T('Change printer default password','Changer le mot de passe par défaut de l’imprimante','تغيير كلمة سر الطابعة الافتراضية'),T('Default passwords are well known.','Les mots de passe par défaut sont connus.','كلمات السر الافتراضية معروفة.'),{prn:-20}]
];
const BASE={net:0,fw:50,web:60,db:50,staff:55,wifi:40,lab:35,prn:30};
const AL=[
 {k:'patch',title:T('Known flaw announced in the web portal software','Faille connue annoncée dans le logiciel du portail','إعلان ثغرة معروفة في برنامج البوابة'),
  opts:[[2,T('Apply the vendor patch after a quick test.','Appliquer le correctif après un test rapide.','تطبيق التحديث بعد اختبار سريع.'),T('Right call: known flaws get exploited fast.','Bon choix : les failles connues sont vite exploitées.','قرار صائب: الثغرات المعروفة تُستغل بسرعة.')],[1,T('Take the portal offline for a day.','Mettre le portail hors ligne un jour.','إيقاف البوابة يوماً.'),T('Safe, but students lose access. Patching is better.','Sûr, mais les étudiants perdent l’accès. Mettre à jour est mieux.','آمن لكن يفقد الطلبة الوصول. التحديث أفضل.')],[0,T('Ignore it, nothing happened yet.','L’ignorer, rien ne s’est passé.','تجاهلها فلم يحدث شيء بعد.'),T('“Nothing yet” is exactly when to act.','« Rien pour l’instant » est le bon moment pour agir.','«لم يحدث شيء بعد» هو وقت التصرف بالضبط.')]],
  note:T('Your earlier patch already closed this hole.','Ton correctif précédent a déjà fermé cette faille.','تحديثك السابق أغلق هذه الثغرة بالفعل.')},
 {k:'mfa',title:T('Three staff report a suspicious “password expired” email','Trois employés signalent un e-mail suspect « mot de passe expiré »','ثلاثة موظفين يبلّغون عن بريد مشبوه «انتهت كلمة السر»'),
  opts:[[2,T('Block the sender, warn staff and reset any exposed passwords.','Bloquer l’expéditeur, prévenir le personnel et réinitialiser les mots de passe exposés.','حظر المرسل وتحذير الموظفين وإعادة ضبط كلمات السر المكشوفة.'),T('A complete response.','Une réponse complète.','استجابة كاملة.')],[1,T('Delete the email only.','Supprimer seulement l’e-mail.','حذف البريد فقط.'),T('Others may still click it. Warn people too.','D’autres peuvent encore cliquer. Préviens aussi les gens.','قد ينقر آخرون عليه. حذّر الناس أيضاً.')],[0,T('Wait to see if anyone complains.','Attendre qu’on se plaigne.','الانتظار لمعرفة إن اشتكى أحد.'),T('Waiting hides real damage.','Attendre cache les vrais dégâts.','الانتظار يخفي الضرر الحقيقي.')]],
  note:T('Because staff use MFA, a stolen password alone cannot log in.','Comme le personnel utilise la MFA, un mot de passe volé seul ne suffit pas.','لأن الموظفين يستخدمون MFA لا تكفي كلمة سر مسروقة وحدها.')},
 {k:'seg',title:T('A student device scans internal servers from the Wi-Fi','Un appareil étudiant scanne les serveurs internes depuis le Wi-Fi','جهاز طالب يفحص الخوادم الداخلية من الواي فاي'),
  opts:[[2,T('Quarantine the device and review the Wi-Fi rules.','Mettre l’appareil en quarantaine et revoir les règles Wi-Fi.','عزل الجهاز ومراجعة قواعد الواي فاي.'),T('Containment first, then investigate.','D’abord contenir, ensuite enquêter.','الاحتواء أولاً ثم التحقيق.')],[1,T('Restart the router.','Redémarrer le routeur.','إعادة تشغيل الموجّه.'),T('It may stop it briefly but fixes nothing.','Cela l’arrête peut-être brièvement mais ne règle rien.','قد يوقفه مؤقتاً دون حل.')],[0,T('Ignore it, it is only students.','L’ignorer, ce ne sont que des étudiants.','تجاهله فهم مجرد طلبة.'),T('Unusual scanning deserves attention.','Un scan inhabituel mérite l’attention.','الفحص غير المعتاد يستحق الانتباه.')]],
  note:T('Segmentation already blocks the Wi-Fi from reaching the servers.','La segmentation empêche déjà le Wi-Fi d’atteindre les serveurs.','التقسيم يمنع الواي فاي أصلاً من الوصول إلى الخوادم.')},
 {k:'bak',title:T('Ransomware locks files on a lab PC','Un rançongiciel bloque les fichiers d’un PC du labo','فدية تقفل ملفات حاسوب مختبر'),
  opts:[[2,T('Isolate the PC, keep evidence and restore from backup.','Isoler le PC, garder les preuves et restaurer depuis la sauvegarde.','عزل الحاسوب وحفظ الأدلة والاستعادة من النسخة الاحتياطية.'),T('The textbook response.','La réponse de référence.','الاستجابة النموذجية.')],[1,T('Reformat the PC right away.','Reformater le PC tout de suite.','إعادة تهيئة الحاسوب فوراً.'),T('It removes the malware but destroys evidence.','Cela retire le malware mais détruit les preuves.','يزيل البرمجية لكنه يدمّر الأدلة.')],[0,T('Pay the ransom.','Payer la rançon.','دفع الفدية.'),T('Paying funds criminals and gives no guarantee.','Payer finance les criminels sans garantie.','الدفع يموّل المجرمين دون ضمان.')]],
  note:T('Your tested backups make recovery quick and painless.','Tes sauvegardes testées rendent la reprise rapide et simple.','نسخك الاحتياطية المختبرة تجعل الاستعادة سريعة وسهلة.'),
  none:T('Without backups, some lab files are lost for good.','Sans sauvegardes, certains fichiers du labo sont perdus pour toujours.','دون نسخ احتياطية تضيع بعض ملفات المختبر نهائياً.')}
];
const BUDGET=100;
function risks(chosen){const r=Object.assign({},BASE);ACT.forEach(a=>{if(chosen.has(a[0]))for(const k in a[4])r[k]=Math.max(0,r[k]+a[4][k])});return r}
const lvl=v=>v<30?['dfLow','var(--green)']:v<55?['dfMed','var(--yellow)']:['dfHigh','var(--red)'];
function avg(r){const ks=['web','db','staff','wifi','lab','prn'];return ks.reduce((a,k)=>a+r[k],0)/ks.length}
function diagram(r){
  const lines='M100 82H160M240 82L320 32M240 82L320 112M200 104V150M200 104L320 190M200 182V230M240 172L320 190M240 252L320 272';
  const nodes=NODES.map(([k,key,x,y])=>{const v=r[k]||0,[lk,col]=k==='net'?['dfLow','var(--surface2)']:lvl(v);
    return `<g><rect x="${x}" y="${y}" width="${k==='net'?90:100}" height="52" rx="10" fill="${col}" stroke="var(--ink)" stroke-width="2" opacity=".9"/><text x="${x+(k==='net'?45:50)}" y="${y+22}" text-anchor="middle" font-size="10.5" font-weight="800" fill="${k==='net'?'var(--ink)':'#111'}">${t(key)}</text>${k==='net'?'':`<text x="${x+50}" y="${y+40}" text-anchor="middle" font-size="12" font-weight="700" fill="#111">${t(lk)}</text>`}</g>`}).join('');
  return `<div class="lesson-art"><svg viewBox="0 0 440 320" style="width:min(520px,100%);direction:ltr" role="img" aria-label="${t('dfT')}" font-family="inherit"><path d="${lines}" stroke="var(--purple)" stroke-width="3" fill="none" stroke-dasharray="6 4"/>${nodes}</svg></div>`;
}
M.routes.defense=(p,post)=>{
  post(()=>{
    const el=$('#df');let chosen=new Set(),phase='plan',ai=0,score=0,log=[];
    const spent=()=>ACT.filter(a=>chosen.has(a[0])).reduce((s,a)=>s+a[1],0);
    const view=()=>{
      const r=risks(chosen),ov=avg(r),[lk]=lvl(ov);let body='';
      if(phase==='plan')body=`<h2>${t('dfPlan')}</h2><p class="xp" role="status">${t('dfBud',{a:BUDGET-spent(),b:BUDGET})}</p><div class="grid g2" style="margin-top:.8rem">${ACT.map(a=>`<label class="card" style="display:flex;gap:.7rem;align-items:flex-start;cursor:pointer"><input type="checkbox" data-a="${a[0]}" ${chosen.has(a[0])?'checked':''} style="width:24px;height:24px;margin-top:.2rem"><span><b>${L(a[2])}</b> <span class="pill">${a[1]}</span><br><span class="muted">${L(a[3])}</span></span></label>`).join('')}</div><p class="muted">${t('dfRec')}</p><div id="dfm" role="status"></div><button class="btn green" data-go="1">${t('dfStart')}</button>`;
      else if(phase==='alert'){const al=AL[ai],owned=chosen.has(al.k);
        body=`<h2>${t('dfAlert',{a:ai+1,b:AL.length})}</h2><div class="panel"><h3>⚠ ${L(al.title)}</h3>${al.opts.map((o,k)=>`<button class="opt" data-o="${k}">${L(o[1])}</button>`).join('')}<div id="dfa" role="status" aria-live="polite"></div></div>`}
      else body=`<h2>${t('dfRep')}</h2><div class="panel"><p><b>${t('dfScore',{a:score,b:AL.length*2})}</b></p><p>${t('dfSpent',{a:spent()})}. ${t('dfRisk')}: <b>${t(lk)}</b></p><h3>${t('trMastery')}</h3>${chosen.size?`<ul>${ACT.filter(a=>chosen.has(a[0])).map(a=>`<li>✔ ${L(a[2])}</li>`).join('')}</ul>`:`<p class="muted">${t('dfNone')}</p>`}<h3>${t('detDec')}</h3><ol>${log.map(l=>`<li>${L(l)}</li>`).join('')}</ol><p class="muted">${t('dfRec')}</p><div class="row"><button class="btn ghost" data-again="1">${t('dfAgain')}</button></div></div>`;
      el.innerHTML=`<p class="muted"><b>${t('dfSim')}</b></p>${diagram(r)}<p class="xp">${t('dfRisk')}: ${t(lk)} (${Math.round(ov)})</p>${body}`;
    };
    el.onchange=e=>{const c=e.target.closest('[data-a]');if(!c)return;const k=c.dataset.a,a=ACT.find(x=>x[0]===k);
      if(c.checked){if(spent()+a[1]>BUDGET){c.checked=false;$('#dfm').innerHTML=`<div class="fb try">${t('dfOver')}</div>`;return}chosen.add(k)}else chosen.delete(k);
      const pos=window.scrollY;view();window.scrollTo(0,pos);const nc=el.querySelector(`[data-a="${k}"]`);nc&&nc.focus()};
    el.onclick=e=>{
      if(e.target.closest('[data-go]')){phase='alert';ai=0;view();return}
      if(e.target.closest('[data-again]')){chosen=new Set();phase='plan';ai=0;score=0;log=[];view();return}
      const o=e.target.closest('[data-o]');
      if(o&&!o.disabled){const al=AL[ai],k=+o.dataset.o,opt=al.opts[k];el.querySelectorAll('[data-o]').forEach(x=>x.disabled=true);
        o.classList.add(opt[0]>0?'right':'wrong');o.insertAdjacentText('afterbegin',opt[0]>0?'✔ ':'✖ ');score+=opt[0];log.push(opt[1]);
        const owned=chosen.has(al.k),extra=owned?al.note:(al.none||null);
        $('#dfa').innerHTML=`<div class="fb ${opt[0]>0?'good':'try'}">${L(opt[2])}${owned?`<br><b>✔ ${L(al.note)}</b>`:(al.none?`<br>${L(al.none)}`:'')}</div><p><button class="btn green" data-nx="1">${ai<AL.length-1?t('dfNext'):t('dfRep')}</button></p>`;
        if(owned)score+=0;return}
      if(e.target.closest('[data-nx]')){if(ai<AL.length-1){ai++;view()}else{phase='report';view();const bonus=[...chosen].length;const st=score>=7?0:score>=4?1:3;app().celebrate([{id:'def:run',xp:60}],st,null,{href:'#/defense',label:t('nDefense')})}}
    };
    view();
  });
  return `<div class="wrap sec"><h1>${t('dfT')}</h1>${G.say(t('dfD'),'think')}<div id="df" style="margin-top:1rem"></div></div>`;
};
})();
