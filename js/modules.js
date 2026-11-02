/* College course + learning companion + passport + trophies. Views are registered in CKM.routes and rendered by app.js. */
(function(){
const {t,L,T}=CKI,C=CKC,S=CKS,A=CKA,G=CKG,esc=G.esc;
const M=window.CKM=window.CKM||{routes:{}};
const app=()=>window.CKApp;
const u=(k,en,fr,ar)=>{CKI.UI[k]=T(en,fr,ar)};
const fmtP=n=>new Intl.NumberFormat(CKI.lang,{style:'percent'}).format(n);
const fmtD=d=>new Intl.DateTimeFormat(CKI.lang,{dateStyle:'long'}).format(d);
const $=s=>document.querySelector(s);

/* ---------- strings ---------- */
u('nCourse','Course','Cours','المقرر');u('nMore','More','Plus','المزيد');u('nDetective','Cyber Detective','Cyber Détective','المحقق السيبراني');u('nDefense','Defense Simulator','Simulateur de défense','محاكي الدفاع');u('nStudio','Creator Studio','Atelier de création','استوديو الإنشاء');u('nPassport','Safety Passport','Passeport cyber','جواز الأمان السيبراني');u('nTrophies','Trophy Room','Salle des trophées','قاعة الكؤوس');
u('crsTitle','Introduction to Cybersecurity','Introduction à la cybersécurité','مقدمة في الأمن السيبراني');
u('crsIntro','A friendly course for first-year university students. No experience needed: 12 short modules with explanations, activities, quizzes and a final assessment.','Un cours accessible aux étudiants de première année. Aucune expérience requise : 12 modules courts avec explications, activités, quiz et évaluation finale.','مقرر ودي لطلبة السنة الأولى الجامعية. لا تحتاج خبرة: 12 وحدة قصيرة بشروحات وأنشطة واختبارات وتقييم نهائي.');
u('crsGoals','Course objectives','Objectifs du cours','أهداف المقرر');u('crsG1','Understand core security ideas and common threats.','Comprendre les idées clés de la sécurité et les menaces courantes.','فهم الأفكار الأمنية الأساسية والتهديدات الشائعة.');u('crsG2','Practice safe habits, simple tools and incident thinking.','Pratiquer de bons réflexes, des outils simples et la gestion d’incidents.','ممارسة عادات آمنة وأدوات بسيطة والتفكير في الحوادث.');u('crsG3','Know the ethics, the law basics and your next steps.','Connaître l’éthique, les bases juridiques et la suite.','معرفة الأخلاقيات وأساسيات القانون وخطواتك التالية.');
u('crsLevel','Level: Beginner','Niveau : débutant','المستوى: مبتدئ');u('crsTime','About {a} hours in total','Environ {a} heures au total','نحو {a} ساعات في المجموع');u('crsPct','Completion','Avancement','نسبة الإنجاز');u('crsMods','{a} of {b} modules completed','{a} modules sur {b} terminés','أُنجزت {a} من {b} وحدة');u('crsCur','Current lesson','Leçon en cours','الدرس الحالي');u('crsCont','Continue learning','Continuer à apprendre','تابع التعلم');
u('crsFinal','Final assessment','Évaluation finale','التقييم النهائي');u('crsFinalD','18 questions from all modules. Score at least 70% to pass. Retake it as often as you like.','18 questions couvrant tous les modules. Obtiens au moins 70 % pour réussir. Refais-la autant que tu veux.','18 سؤالاً من كل الوحدات. احصل على 70% على الأقل لتنجح. أعدها كما تشاء.');u('crsFinalLock','Finish all 12 modules to unlock the final assessment.','Termine les 12 modules pour débloquer l’évaluation finale.','أنهِ الوحدات الـ12 لتفتح التقييم النهائي.');u('crsFinalBest','Best score: {a}','Meilleur score : {a}','أفضل نتيجة: {a}');u('crsStartFinal','Start assessment','Commencer l’évaluation','ابدأ التقييم');
u('crsCert','Completion report and certificate','Rapport d’avancement et certificat','تقرير الإنجاز والشهادة');u('crsCertD','A printable summary of what you completed. It is self-generated and not an official certification.','Un résumé imprimable de ce que tu as terminé. Il est généré localement et n’est pas une certification officielle.','ملخص قابل للطباعة لما أنجزته. يُنشأ محلياً وليس شهادة رسمية.');u('crsOpenCert','Open report','Ouvrir le rapport','افتح التقرير');
u('modObj','Learning objectives','Objectifs d’apprentissage','أهداف التعلم');u('modExp1','The idea','L’idée','الفكرة');u('modExp2','In more depth','Pour aller plus loin','بمزيد من التعمق');u('modGloss','Glossary','Glossaire','المصطلحات');u('modAct','Interactive activity','Activité interactive','نشاط تفاعلي');u('modCheck','Knowledge check','Vérification des acquis','اختبر معلوماتك');u('modSum','Summary','Résumé','الخلاصة');
u('modDone','Mark lesson complete','Marquer la leçon terminée','علّم الدرس كمنجز');u('modDone2','Lesson completed','Leçon terminée','الدرس منجز');u('modNeed','Finish the knowledge check first to complete this lesson.','Termine d’abord la vérification des acquis pour valider cette leçon.','أنهِ اختبار المعلومات أولاً لتكمل هذا الدرس.');u('modPrev','Previous lesson','Leçon précédente','الدرس السابق');u('modNext','Next lesson','Leçon suivante','الدرس التالي');u('modList','All modules','Tous les modules','كل الوحدات');u('modTerm','Try it in the Terminal Lab','Essaie dans le labo Terminal','جرّب في مختبر الطرفية');u('modN','Module {a}','Module {a}','الوحدة {a}');
u('byteAsk','Ask Byte for a hint','Demander un indice à Byte','اطلب تلميحاً من بايت');u('byteHintN','Byte’s hint {a}','Indice de Byte {a}','تلميح بايت {a}');u('byteNote','Byte gives pre-written hints. It is not an AI chatbot.','Byte donne des indices pré-écrits. Ce n’est pas un chatbot IA.','يقدّم بايت تلميحات مكتوبة مسبقاً وليس روبوت دردشة ذكياً.');u('byteH1','Re-read “The idea” and ask: what is at risk, and who is affected?','Relis « L’idée » et demande-toi : qu’est-ce qui est en jeu, et qui est touché ?','أعد قراءة «الفكرة» واسأل: ما المعرّض للخطر ومن المتأثر؟');u('byteH2','Key term','Terme clé','مصطلح أساسي');u('byteRec','Byte recommends reviewing','Byte te conseille de revoir','يوصيك بايت بمراجعة');u('byteRecD','You missed questions on these topics.','Tu as manqué des questions sur ces sujets.','أخطأت في أسئلة حول هذه المواضيع.');u('byteNoRec','No recommendations yet. Keep learning, you are doing great!','Pas encore de recommandation. Continue, tu progresses bien !','لا توصيات بعد. واصل فأنت تتقدم جيداً!');u('byteSpecial','Experiment with the tool and compare what changes.','Expérimente avec l’outil et compare ce qui change.','جرّب الأداة وقارن ما يتغير.');
u('pwChk1','At least 12 characters','Au moins 12 caractères','12 حرفاً على الأقل');u('pwChk2','Mixes letters, numbers or symbols','Mélange lettres, chiffres ou symboles','يمزج الحروف والأرقام أو الرموز');u('pwChk3','Not a very common password','Pas un mot de passe très courant','ليست كلمة سر شائعة جداً');u('pwToolD','Type a made-up password to see how strong it is. It stays in your browser, is never saved or sent. Never type a real password.','Tape un mot de passe inventé pour voir sa solidité. Il reste dans ton navigateur, jamais enregistré ni envoyé. Ne tape jamais un vrai mot de passe.','اكتب كلمة سر مخترعة لترى قوتها. تبقى في متصفحك ولا تُحفظ ولا تُرسل. لا تكتب كلمة سر حقيقية أبداً.');
u('cdD','Educational demo: change the text and watch three different things happen.','Démo pédagogique : change le texte et observe trois choses différentes.','عرض تعليمي: غيّر النص وراقب ثلاثة أشياء مختلفة.');u('cdText','Your text','Ton texte','نصك');u('cdEnc','Encoding (Base64): reversible, no secret','Encodage (Base64) : réversible, sans secret','الترميز (Base64): قابل للعكس وبلا سر');u('cdHash','Hash (SHA-256): one-way fingerprint','Hachage (SHA-256) : empreinte à sens unique','التجزئة (SHA-256): بصمة أحادية الاتجاه');u('cdCae','Encryption (toy Caesar): needs the key','Chiffrement (César jouet) : nécessite la clé','التشفير (قيصر لعبة): يحتاج المفتاح');u('cdKey','Key (1–25)','Clé (1–25)','المفتاح (1–25)');u('cdToy','Toy demonstration: not real cryptography. Never use it to protect real data.','Démonstration jouet : pas de la vraie cryptographie. Ne l’utilise jamais pour de vraies données.','عرض تعليمي بسيط وليس تشفيراً حقيقياً. لا تستخدمه أبداً لحماية بيانات حقيقية.');u('cdNoHash','SHA-256 is not available in this browser context.','SHA-256 n’est pas disponible dans ce contexte de navigateur.','SHA-256 غير متاح في سياق هذا المتصفح.');
u('incHelp','Tap the suspicious log lines, then check. Next, build the incident report.','Touche les lignes suspectes du journal puis vérifie. Ensuite, construis le rapport d’incident.','المس أسطر السجل المشبوهة ثم تحقق. بعدها ابنِ تقرير الحادثة.');u('incWhat','What happened?','Que s’est-il passé ?','ماذا حدث؟');u('incAction','Best first action','Meilleure première action','أفضل إجراء أول');u('incEvid','Best evidence','Meilleure preuve','أفضل دليل');u('incMake','Generate report','Générer le rapport','أنشئ التقرير');u('incPick','Choose…','Choisis…','اختر…');u('incLogOk','You found the suspicious events: out-of-hours failed logins, a new admin account and a large grade download.','Tu as trouvé les événements suspects : connexions échouées hors horaires, nouveau compte admin et gros téléchargement de notes.','وجدت الأحداث المشبوهة: دخول فاشل خارج الدوام وحساب مدير جديد وتنزيل كبير للعلامات.');u('incLogNo','Not quite: look at times, failed attempts, new accounts and big downloads.','Pas tout à fait : regarde les heures, échecs, nouveaux comptes et gros téléchargements.','ليس تماماً: انظر إلى الأوقات والمحاولات الفاشلة والحسابات الجديدة والتنزيلات الكبيرة.');u('incRepOk','Report accepted: clear, factual and safe.','Rapport accepté : clair, factuel et prudent.','تم قبول التقرير: واضح وواقعي وآمن.');u('incRepNo','Some report choices need another look.','Certains choix du rapport sont à revoir.','بعض خيارات التقرير تحتاج إلى مراجعة.');
u('asQ','Question {a} of {b}','Question {a} sur {b}','السؤال {a} من {b}');u('asScore','Your score: {a}','Ton score : {a}','نتيجتك: {a}');u('asPass','Passed! Your completion report is ready.','Réussi ! Ton rapport est prêt.','نجحت! تقريرك جاهز.');u('asFail','Not yet. Review the recommended modules and try again, you can do it.','Pas encore. Revois les modules conseillés et réessaie, tu peux y arriver.','ليس بعد. راجع الوحدات الموصى بها وحاول مجدداً، أنت قادر.');u('asNext','Next question','Question suivante','السؤال التالي');u('asFinish','See my score','Voir mon score','اعرض نتيجتي');
u('repT','Cyber Safety Learning Report','Rapport d’apprentissage cyber','تقرير التعلم في الأمن السيبراني');u('repName','Display name (optional)','Nom affiché (facultatif)','الاسم الظاهر (اختياري)');u('repDisc','Self-generated local report. It is NOT an official certification, it is not verified by any organization and it can be edited.','Rapport généré localement. Ce n’est PAS une certification officielle, il n’est vérifié par aucune organisation et peut être modifié.','تقرير مُنشأ محلياً. وهو ليس شهادة رسمية ولا تتحقق منه أي جهة ويمكن تعديله.');u('repPrint','Print or save as PDF','Imprimer ou enregistrer en PDF','اطبع أو احفظ كملف PDF');u('repDate','Date','Date','التاريخ');u('repScore','Quiz score','Score quiz','نتيجة الاختبار');u('repStatus','Status','Statut','الحالة');u('repCertOn','Course completed and final assessment passed','Cours terminé et évaluation finale réussie','أُنهي المقرر ونُجح التقييم النهائي');u('repCertOff','Course not completed yet: this is a progress report.','Cours non terminé : ceci est un rapport d’avancement.','لم يكتمل المقرر بعد: هذا تقرير تقدّم.');u('repNameFor','Prepared for {a}','Établi pour {a}','أُعدّ لـ {a}');
u('ppT','Cyber Safety Passport','Passeport cyber','جواز الأمان السيبراني');u('ppD','Collect stamps by finishing activities. This passport is a local learning record, not an official certification.','Collecte des tampons en terminant des activités. Ce passeport est un suivi d’apprentissage local, pas une certification officielle.','اجمع الأختام بإنجاز الأنشطة. هذا الجواز سجل تعلم محلي وليس شهادة رسمية.');u('ppNeed','Requirements','Conditions','المتطلبات');u('ppEarned','Stamp earned','Tampon obtenu','ختم مكتسب');u('ppLocked','Not earned yet','Pas encore obtenu','لم يُكتسب بعد');u('ppRev','Completed activities','Activités terminées','الأنشطة المنجزة');u('ppNone','Nothing completed yet. Pick an activity to start!','Rien de terminé. Choisis une activité pour commencer !','لم تنجز شيئاً بعد. اختر نشاطاً لتبدأ!');u('ppOr','or','ou','أو');
u('st_pw','Password Safety','Sécurité des mots de passe','أمان كلمات السر');u('st_ph','Phishing Awareness','Vigilance anti-hameçonnage','الوعي بالتصيّد');u('st_pr','Privacy Protection','Protection de la vie privée','حماية الخصوصية');u('st_nw','Network Fundamentals','Bases du réseau','أساسيات الشبكات');u('st_cr','Cryptography Basics','Bases de la cryptographie','أساسيات التشفير');u('st_fo','Digital Forensics','Forensique numérique','التحقيق الرقمي');u('st_et','Ethical Cybersecurity','Cybersécurité éthique','الأمن السيبراني الأخلاقي');
u('trT','Trophy Room','Salle des trophées','قاعة الكؤوس');u('trStreak','Learning days in a row: {a}','Jours d’apprentissage d’affilée : {a}','أيام التعلم المتتالية: {a}');u('trStreakD','Streaks only celebrate you. Missing a day takes nothing away.','Les séries ne font que te féliciter. Manquer un jour ne retire rien.','السلاسل للاحتفاء بك فقط. تفويت يوم لا يُنقص شيئاً.');u('trDaily','Daily mission (optional)','Mission du jour (facultative)','مهمة اليوم (اختيارية)');u('trWeekly','Weekly quest','Quête de la semaine','مهمة الأسبوع');u('trWeeklyD','Finish {a} different activities this week ({b}/{a}).','Termine {a} activités différentes cette semaine ({b}/{a}).','أنجز {a} أنشطة مختلفة هذا الأسبوع ({b}/{a}).');u('trBonus','Bonus claimed: +{a} XP','Bonus obtenu : +{a} XP','تم نيل المكافأة: +{a} نقطة');u('trMastery','Topic mastery','Maîtrise par thème','إتقان المواضيع');u('trBadges','Badges and trophies','Badges et trophées','الأوسمة والكؤوس');u('trDisc','Achievements are stored only in this browser. They are not independently verified credentials.','Les réussites sont stockées uniquement dans ce navigateur. Ce ne sont pas des titres vérifiés.','تُخزَّن الإنجازات في هذا المتصفح فقط وليست شهادات موثقة من جهة مستقلة.');u('trDone','Done today!','Fait aujourd’hui !','أُنجزت اليوم!');u('trTodo','Complete {a} today.','Termine {a} aujourd’hui.','أنجز {a} اليوم.');
u('cat_mod','a course lesson','une leçon du cours','درساً من المقرر');u('cat_lx','a Linux module','un module Linux','وحدة لينكس');u('cat_tm','a terminal task','une tâche du terminal','مهمة طرفية');u('cat_ctf','a CTF challenge','un défi CTF','تحدي CTF');u('cat_det','a detective case','une enquête','قضية تحقيق');u('cat_def','a defense simulation','une simulation de défense','محاكاة دفاع');u('cat_mission','a mission','une mission','مهمة');u('cat_g','a mini-game','un mini-jeu','لعبة صغيرة');u('cat_les','a library lesson','une leçon de bibliothèque','درساً من المكتبة');
u('dataT','Your data on this device','Tes données sur cet appareil','بياناتك على هذا الجهاز');u('dataD','Everything is saved only in this browser. It does not sync between devices. Export a backup if you want to move it.','Tout est enregistré uniquement dans ce navigateur, sans synchronisation entre appareils. Exporte une sauvegarde pour la déplacer.','يُحفظ كل شيء في هذا المتصفح فقط ولا يتزامن بين الأجهزة. صدّر نسخة احتياطية إن أردت نقله.');u('dataExp','Export progress (JSON)','Exporter la progression (JSON)','تصدير التقدم (JSON)');u('dataImp','Import progress','Importer la progression','استيراد التقدم');u('dataOk','Progress imported.','Progression importée.','تم استيراد التقدم.');u('dataBad','That file is not a valid CyberKids export.','Ce fichier n’est pas un export CyberKids valide.','هذا الملف ليس تصديراً صالحاً من CyberKids.');u('dataNoStore','Your browser blocks local storage, so progress will be lost when you close this tab. Use Export to keep a copy.','Ton navigateur bloque le stockage local : la progression sera perdue à la fermeture. Utilise l’export pour garder une copie.','يمنع متصفحك التخزين المحلي لذا ستضيع بياناتك عند الإغلاق. استخدم التصدير للاحتفاظ بنسخة.');

/* ---------- helpers ---------- */
const mods=()=>C.course;
const modDone=m=>S.isDone('mod:'+m.id);
const doneCount=()=>mods().filter(modDone).length;
function curMod(){return mods().find(m=>!modDone(m))||mods()[mods().length-1]}
const recs=()=>Object.keys(S.s.miss).filter(k=>mods().some(m=>m.id===k)).sort((a,b)=>S.s.miss[b]-S.s.miss[a]).slice(0,3).map(k=>mods().find(m=>m.id===k));
function byteRecs(){const r=recs();
  return `<div class="bubble">${r.length?`<b>${t('byteRec')}:</b> ${t('byteRecD')}<div class="row" style="margin-top:.5rem">${r.map(m=>`<a class="btn sm ghost" href="#/course/${m.id}">${esc(L(m.title))}</a>`).join('')}</div>`:t('byteNoRec')}</div>`}
const steps=(m)=>m.quiz.map(q=>Object.assign({},q,{ex:true}));

/* ---------- diagrams (translated labels, LTR layout) ---------- */
u('dgC','Confidentiality','Confidentialité','السرية');u('dgI','Integrity','Intégrité','السلامة');u('dgA','Availability','Disponibilité','التوافر');u('dgCl','Your laptop','Ton portable','حاسوبك');u('dgRt','Router','Routeur','الموجّه');u('dgSv','Web server','Serveur web','خادم الويب');u('dgDns','DNS','DNS','DNS');u('dgPl','Plaintext','Texte clair','نص واضح');u('dgKey','Key','Clé','المفتاح');u('dgCi','Ciphertext','Texte chiffré','نص مشفّر');
function diagram(k){
  const box=(x,y,w,txt,c)=>`<rect x="${x}" y="${y}" width="${w}" height="44" rx="10" fill="${c||'var(--surface2)'}" stroke="var(--line)" stroke-width="2"/><text x="${x+w/2}" y="${y+27}" text-anchor="middle" font-size="14" font-weight="700" fill="var(--ink)">${txt}</text>`;
  let b='';
  if(k==='cia')b=`<path d="M200 20 L360 150 L40 150Z" fill="none" stroke="var(--purple)" stroke-width="4" stroke-linejoin="round"/>${box(120,2,160,t('dgC'),'color-mix(in srgb,var(--blue) 25%,var(--surface))')}${box(0,128,150,t('dgI'),'color-mix(in srgb,var(--green) 25%,var(--surface))')}${box(250,128,150,t('dgA'),'color-mix(in srgb,var(--yellow) 30%,var(--surface))')}`;
  if(k==='net')b=`${box(0,70,110,t('dgCl'))}${box(150,70,100,t('dgRt'))}${box(290,10,110,t('dgDns'))}${box(290,130,110,t('dgSv'))}<path d="M110 92h40M250 92l40-60M250 92l40 60" stroke="var(--purple)" stroke-width="3" fill="none"/>`;
  if(k==='crypto')b=`${box(0,70,110,t('dgPl'))}${box(150,10,100,t('dgKey'),'color-mix(in srgb,var(--yellow) 30%,var(--surface))')}${box(290,70,110,t('dgCi'))}<path d="M110 92h180M200 54v38" stroke="var(--purple)" stroke-width="3" fill="none"/><path d="M280 85l10 7-10 7" stroke="var(--purple)" stroke-width="3" fill="none"/>`;
  return `<div class="lesson-art" role="img" aria-label="${t('modExp1')}"><svg viewBox="0 0 400 190" style="width:min(460px,100%);direction:ltr" font-family="inherit">${b}</svg></div>`;
}

/* ---------- special activities ---------- */
function pwTool(el){
  el.innerHTML=`<p class="muted">${t('pwToolD')}</p><input class="input flag-in" id="pwt" type="text" autocomplete="off" spellcheck="false" aria-label="${t('modAct')}"><div id="pwm" style="margin:.6rem 0"></div><ul id="pwc" style="list-style:none;padding:0;margin:0"></ul>`;
  const inp=el.querySelector('#pwt');
  const draw=()=>{const v=inp.value,s=G.strength(v);el.querySelector('#pwm').innerHTML=`<div class="meter" aria-hidden="true">${[0,1,2,3].map(k=>`<i class="${k<s?'on'+(s>=4?4:s-1):''}"></i>`).join('')}</div><strong role="status">${t('str'+s)}</strong>`;
    const cls=[/[a-z]/,/[A-Z]/,/\d/,/[^A-Za-z0-9]/].filter(r=>r.test(v)).length;
    const c=[[v.length>=12,'pwChk1'],[cls>=3,'pwChk2'],[v&&C.common.indexOf(v.toLowerCase())<0,'pwChk3']];
    el.querySelector('#pwc').innerHTML=c.map(x=>`<li>${x[0]?'✔':'✖'} ${t(x[1])}</li>`).join('')};
  inp.oninput=draw;draw();
}
function cryptoDemo(el){
  el.innerHTML=`<p class="muted">${t('cdD')}</p><label for="cdt">${t('cdText')}</label><input id="cdt" class="input flag-in" value="Hello" autocomplete="off" spellcheck="false">
  <label for="cdk" style="display:block;margin-top:.6rem">${t('cdKey')}</label><input id="cdk" class="input flag-in" type="number" min="1" max="25" value="3" style="max-width:8rem">
  <div class="msgbox"><b>${t('cdEnc')}</b><div class="mono" id="o1"></div></div><div class="msgbox"><b>${t('cdHash')}</b><div class="mono" id="o2" style="word-break:break-all"></div></div><div class="msgbox"><b>${t('cdCae')}</b><div class="mono" id="o3"></div></div><p class="muted"><b>${t('cdToy')}</b></p>`;
  const tx=el.querySelector('#cdt'),ky=el.querySelector('#cdk');
  const run=async()=>{const v=tx.value.slice(0,200),k=Math.min(25,Math.max(1,parseInt(ky.value,10)||3));
    let b64='';try{b64=btoa(unescape(encodeURIComponent(v)))}catch(e){}
    el.querySelector('#o1').textContent=b64;el.querySelector('#o3').textContent=G.shift(v,k);
    try{if(window.crypto&&crypto.subtle){const h=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(v));el.querySelector('#o2').textContent=[...new Uint8Array(h)].map(x=>x.toString(16).padStart(2,'0')).join('')}else el.querySelector('#o2').textContent=t('cdNoHash')}catch(e){el.querySelector('#o2').textContent=t('cdNoHash')}};
  tx.oninput=run;ky.oninput=run;run();
}
const INC={logs:[['09:01','login ok student.amine from 10.1.2.15',0],['09:03','login ok prof.salma from 10.1.2.40',0],['02:14','login failed admin x5 from 203.0.113.9',1],['02:16','login ok admin from 203.0.113.9',1],['02:20','new admin account backup_svc created',1],['02:31','download 4.2 GB student_grades.csv by backup_svc',1],['09:10','printer status ok',0]],
 what:[T('An outsider guessed the admin password, created an account and downloaded grade data.','Un inconnu a deviné le mot de passe admin, créé un compte et téléchargé des notes.','خمّن شخص خارجي كلمة سر المدير وأنشأ حساباً ونزّل بيانات العلامات.'),T('A printer malfunction.','Une panne d’imprimante.','عطل في الطابعة.'),T('Normal maintenance.','Une maintenance normale.','صيانة عادية.')],
 act:[T('Isolate the server and preserve the logs.','Isoler le serveur et préserver les journaux.','عزل الخادم وحفظ السجلات.'),T('Delete the new account and wipe the logs.','Supprimer le compte et effacer les journaux.','حذف الحساب الجديد ومسح السجلات.'),T('Wait and see.','Attendre et voir.','الانتظار والمراقبة.')],
 ev:[T('Timestamps and source address from the logs.','Horodatages et adresse source des journaux.','الطوابع الزمنية وعنوان المصدر من السجلات.'),T('A rumor from a classmate.','Une rumeur d’un camarade.','إشاعة من زميل.'),T('A desktop screenshot only.','Seulement une capture d’écran.','لقطة شاشة فقط.')]};
C.incident=INC;
function incident(el,done){
  const sel=new Set();let logOk=false;
  el.innerHTML=`<p class="muted">${t('incHelp')}</p><div class="msgbox mono" id="lg" style="direction:ltr;text-align:left">${INC.logs.map((l,i)=>`<button class="seg" data-i="${i}" aria-pressed="false" style="display:block;width:100%;text-align:left;direction:ltr"><b>${l[0]}</b> ${esc(l[1])}</button>`).join('')}</div><button class="btn sm" id="lc">${t('check')}</button><div id="lf" role="status"></div>
  <div id="rep" hidden><h3>${t('incWhat')}</h3><select class="field input" id="r1"></select><h3>${t('incAction')}</h3><select class="field input" id="r2"></select><h3>${t('incEvid')}</h3><select class="field input" id="r3"></select><p><button class="btn" id="rb">${t('incMake')}</button></p><div id="rf" role="status"></div></div>`;
  [['r1',INC.what],['r2',INC.act],['r3',INC.ev]].forEach(([id,o])=>{el.querySelector('#'+id).innerHTML=`<option value="">${t('incPick')}</option>`+o.map((x,i)=>`<option value="${i}">${esc(L(x))}</option>`).join('')});
  el.onclick=e=>{const b=e.target.closest('[data-i]');
    if(b){const i=+b.dataset.i;sel.has(i)?sel.delete(i):sel.add(i);b.classList.toggle('on',sel.has(i));b.setAttribute('aria-pressed',sel.has(i));return}
    if(e.target.closest('#lc')){const bad=INC.logs.map((l,i)=>l[2]?i:-1).filter(i=>i>=0);logOk=bad.length===sel.size&&bad.every(i=>sel.has(i));
      el.querySelector('#lf').innerHTML=`<div class="fb ${logOk?'good':'try'}">${logOk?'✔ '+t('incLogOk'):'✖ '+t('incLogNo')}</div>`;el.querySelector('#rep').hidden=!logOk}
    if(e.target.closest('#rb')){const ok=['r1','r2','r3'].every(id=>el.querySelector('#'+id).value==='0');
      el.querySelector('#rf').innerHTML=`<div class="fb ${ok?'good':'try'}">${ok?'✔ '+t('incRepOk'):'✖ '+t('incRepNo')}</div>`;if(ok)done()}};
}

/* ---------- course dashboard ---------- */
function dashboard(){
  const n=doneCount(),total=mods().length,pct=n/total,cur=curMod(),all=n===total,best=S.s.final.best;
  return `<div class="wrap sec"><h1>${t('crsTitle')}</h1><p style="max-width:48rem">${t('crsIntro')}</p>
  <div class="grid g3"><div class="card"><h3>${t('crsGoals')}</h3><ul><li>${t('crsG1')}</li><li>${t('crsG2')}</li><li>${t('crsG3')}</li></ul><p class="row"><span class="pill easy">${t('crsLevel')}</span><span class="pill">${t('crsTime',{a:5})}</span></p></div>
  <div class="card"><h3>${t('crsPct')}: ${fmtP(pct)}</h3><div class="bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Math.round(pct*100)}" aria-label="${t('crsPct')}"><i style="width:${pct*100}%"></i></div><p class="muted">${t('crsMods',{a:n,b:total})}</p><p><b>${t('crsCur')}:</b> ${esc(L(cur.title))}</p><a class="btn green" href="#/course/${cur.id}">${t('crsCont')}</a></div>
  <div class="card"><h3>${A.icon('star',28)} ${t('byteRec')}</h3>${byteRecs()}</div></div>
  <h2 style="margin-top:1.6rem">${t('modList')}</h2><div class="grid g3">${mods().map((m,i)=>`<a class="card link" href="#/course/${m.id}"><div class="row">${A.icon(m.icon,40)}<span class="pill">${t('modN',{a:i+1})}</span>${modDone(m)?`<span class="pill easy">✔ ${t('done')}</span>`:''}</div><h3>${L(m.title)}</h3><span class="btn sm purple" style="align-self:flex-start">${modDone(m)?t('playAgain'):t('open')}</span></a>`).join('')}</div>
  <div class="grid g2" style="margin-top:1.4rem"><div class="card ${all?'':'locked'}"><h3>${t('crsFinal')}</h3><p>${t('crsFinalD')}</p>${all?`<p class="muted">${t('crsFinalBest',{a:fmtP(best/100)})}</p><a class="btn" href="#/course/final">${t('crsStartFinal')}</a>`:`<p class="muted">🔒 ${t('crsFinalLock')}</p>`}</div>
  <div class="card"><h3>${t('crsCert')}</h3><p>${t('crsCertD')}</p><a class="btn ghost" href="#/course/report">${t('crsOpenCert')}</a></div></div></div>`;
}

/* ---------- module page ---------- */
function moduleView(id,post){
  const i=mods().findIndex(m=>m.id===id);if(i<0)return `<div class="wrap sec">404</div>`;
  const m=mods()[i],prev=mods()[i-1],next=mods()[i+1];let miss=0,quizDone=!!S.s.quiz[m.id];
  const act=m.act;const special=act&&act.type;
  const hints=[t('byteH1'),`${t('byteH2')}: ${L(m.gloss[0][0])}: ${L(m.gloss[0][1])}`,special?t('byteSpecial'):L(act.why)];
  post(()=>{
    const bb=$('#bb');let h=0;
    if(bb)bb.onclick=()=>{if(h<hints.length){h++;$('#bh').innerHTML=hints.slice(0,h).map((x,k)=>`<div class="hint"><b>${t('byteHintN',{a:k+1})}:</b> ${esc(x)}</div>`).join('')}if(h>=hints.length)bb.disabled=true};
    const ae=$('#act');
    if(!special)G.quiz(ae,[Object.assign({},act,{ex:true})],{done:()=>{},onWrong:()=>S.track(m.id,1)});
    else if(act.type==='pwtool')pwTool(ae);else if(act.type==='crypto')cryptoDemo(ae);else if(act.type==='incident')incident(ae,()=>{});
    G.quiz($('#kc'),steps(m),{done:mis=>{miss=mis;quizDone=true;S.recordQuiz(m.id,Math.round(100*m.quiz.length/(m.quiz.length+mis)));$('#md').disabled=false;$('#mn').hidden=true;$('#kc').innerHTML=`<div class="fb good">✔ ${t('great')}</div>`},onWrong:()=>S.track(m.id,1)});
    if(quizDone){$('#md').disabled=false;$('#mn').hidden=true}
    $('#md').onclick=()=>app().celebrate([{id:'mod:'+m.id,xp:40}],miss,next?{href:'#/course/'+next.id,label:t('modNext')}:{href:'#/course/final',label:t('crsFinal')},{href:'#/course',label:t('nCourse')});
  });
  const done=modDone(m);
  return `<div class="wrap sec">${app().crumbs([{t:t('nCourse'),href:'#/course'},{t:t('modN',{a:i+1})}])}<div class="panel"><div class="row">${A.icon(m.icon,52)}<div><span class="pill">${t('modN',{a:i+1})} / ${mods().length}</span>${done?` <span class="pill easy">✔ ${t('modDone2')}</span>`:''}<h1 style="margin:.2rem 0 0;font-size:clamp(1.5rem,4vw,2.3rem)">${L(m.title)}</h1></div></div>
  <h2 style="font-size:1.3rem">${t('modObj')}</h2><ul>${m.obj.map(o=>`<li>${L(o)}</li>`).join('')}</ul>
  <details open class="msgbox"><summary><b>${t('modExp1')}</b></summary><p>${L(m.body[0])}</p></details>
  ${m.diagram?diagram(m.diagram):''}
  <details class="msgbox"><summary><b>${t('modExp2')}</b></summary><p>${L(m.body[1])}</p></details>
  <details class="msgbox"><summary><b>${t('modGloss')}</b></summary><dl>${m.gloss.map(g=>`<dt><b>${L(g[0])}</b></dt><dd style="margin-inline-start:1rem">${L(g[1])}</dd>`).join('')}</dl></details>
  ${m.term?`<p><a class="btn sm turq" href="${m.term}">${t('modTerm')}</a></p>`:''}${m.link?`<p><a class="btn sm turq" href="${m.link}">${L(m.linkLabel)}</a></p>`:''}</div>
  <h2 style="margin-top:1.4rem">${t('modAct')}</h2><div class="byte-say"><div class="byte">${A.byte('think')}</div><div class="bubble"><button class="btn sm yellow" id="bb">${t('byteAsk')}</button><div id="bh"></div><small class="muted">${t('byteNote')}</small></div></div><div id="act" style="margin-top:.8rem"></div>
  <h2 style="margin-top:1.4rem">${t('modCheck')}</h2><div id="kc"></div>
  <div class="panel" style="margin-top:1.4rem"><h3>${t('modSum')}</h3><p>${L(m.sum)}</p><button class="btn green" id="md" disabled>${done?t('playAgain'):t('modDone')}</button><p class="muted" id="mn">${t('modNeed')}</p></div>
  <div class="row" style="margin-top:1rem;justify-content:space-between">${prev?`<a class="btn ghost sm" href="#/course/${prev.id}"><span class="flip">‹</span> ${t('modPrev')}</a>`:'<span></span>'}${next?`<a class="btn ghost sm" href="#/course/${next.id}">${t('modNext')} <span class="flip">›</span></a>`:`<a class="btn ghost sm" href="#/course">${t('nCourse')}</a>`}</div></div>`;
}

/* ---------- final assessment ---------- */
function finalView(post){
  if(doneCount()<mods().length)return `<div class="wrap sec"><div class="panel center"><h2>🔒 ${t('crsFinal')}</h2><p>${t('crsFinalLock')}</p><a class="btn" href="#/course">${t('nCourse')}</a></div></div>`;
  const qs=[];mods().forEach((m,i)=>{qs.push({m:m.id,q:m.quiz[0]});if(i%2===1)qs.push({m:m.id,q:m.quiz[1]})});
  post(()=>{
    const el=$('#as');let i=0,ok=0;const wrongTopics=new Set();
    const draw=()=>{const x=qs[i].q;el.innerHTML=`<div class="panel"><p class="muted">${t('asQ',{a:i+1,b:qs.length})}</p><div class="bar"><i style="width:${i/qs.length*100}%"></i></div><h3 style="margin-top:1rem">${L(x.q)}</h3>${x.opts.map((o,k)=>`<button class="opt" data-k="${k}">${L(o)}</button>`).join('')}<div id="afb" role="status"></div></div>`};
    el.onclick=e=>{const b=e.target.closest('[data-k]'),nx=e.target.closest('[data-n]');
      if(nx){i++;if(i<qs.length)draw();else end();return}
      if(!b||b.disabled)return;const x=qs[i].q,k=+b.dataset.k;el.querySelectorAll('.opt').forEach(o=>o.disabled=true);
      const right=k===x.a;if(right)ok++;else{wrongTopics.add(qs[i].m);S.track(qs[i].m,1)}
      b.classList.add(right?'right':'wrong');b.insertAdjacentText('afterbegin',right?'✔ ':'✖ ');if(!right){el.querySelectorAll('.opt')[x.a].classList.add('right')}
      el.querySelector('#afb').innerHTML=`<div class="fb ${right?'good':'try'}">${right?t('correct'):t('almost')}${L(x.why)}</div><p><button class="btn green" data-n="1">${i<qs.length-1?t('asNext'):t('asFinish')}</button></p>`};
    const end=()=>{const sc=Math.round(100*ok/qs.length),pass=sc>=70;
      if(sc>S.s.final.best){S.s.final.best=sc;S.save()}
      el.innerHTML=`<div class="panel center"><h2>${t('asScore',{a:fmtP(sc/100)})}</h2><div class="fb ${pass?'good':'try'}">${pass?'✔ '+t('asPass'):t('asFail')}</div>${!pass&&wrongTopics.size?`<div class="row" style="justify-content:center;margin:.8rem 0">${[...wrongTopics].map(id=>{const m=mods().find(x=>x.id===id);return `<a class="btn sm ghost" href="#/course/${id}">${esc(L(m.title))}</a>`}).join('')}</div>`:''}<div class="row" style="justify-content:center"><a class="btn ghost" href="#/course/final" onclick="setTimeout(()=>location.reload(),0)">${t('retry')}</a>${pass?`<a class="btn green" href="#/course/report">${t('crsOpenCert')}</a>`:''}</div></div>`;
      if(pass)app().celebrate([{id:'final',xp:100}],0,{href:'#/course/report',label:t('crsOpenCert')},{href:'#/course',label:t('nCourse')})};
    draw();
  });
  return `<div class="wrap sec">${app().crumbs([{t:t('nCourse'),href:'#/course'},{t:t('crsFinal')}])}<h1>${t('crsFinal')}</h1><div id="as"></div></div>`;
}

/* ---------- report / certificate ---------- */
function reportView(post){
  const n=doneCount(),total=mods().length,passed=S.isDone('final'),name=S.s.name;
  post(()=>{$('#nm').oninput=e=>{S.set('name',e.target.value.slice(0,24));$('#who').textContent=e.target.value?t('repNameFor',{a:e.target.value.slice(0,24)}):''};$('#pr').onclick=()=>window.print()});
  return `<div class="wrap sec"><div class="noprint">${app().crumbs([{t:t('nCourse'),href:'#/course'},{t:t('crsCert')}])}<label for="nm" class="muted">${t('repName')}</label><input id="nm" class="input" maxlength="24" value="${esc(name)}" style="max-width:24rem" autocomplete="off"><p><button class="btn" id="pr">${t('repPrint')}</button></p></div>
  <article class="panel printable cert"><h1 style="text-align:center">${t('repT')}</h1><h2 style="text-align:center">${t('crsTitle')}</h2><p id="who" style="text-align:center;font-weight:800">${name?t('repNameFor',{a:esc(name)}):''}</p>
  <p style="text-align:center"><b>${passed&&n===total?'✔ '+t('repCertOn'):t('repCertOff')}</b></p><p>${t('crsMods',{a:n,b:total})} · ${t('crsPct')}: ${fmtP(n/total)} · ${t('crsFinal')}: ${S.s.final.best?fmtP(S.s.final.best/100):'—'}</p>
  <div style="overflow:auto"><table class="fw"><thead><tr><th>${t('mission')}</th><th>${t('repScore')}</th><th>${t('repStatus')}</th></tr></thead><tbody>${mods().map((m,i)=>`<tr><td>${i+1}. ${L(m.title)}</td><td>${S.s.quiz[m.id]!=null?fmtP(S.s.quiz[m.id]/100):'—'}</td><td>${modDone(m)?'✔ '+t('done'):'○'}</td></tr>`).join('')}</tbody></table></div>
  <p>${t('repDate')}: ${fmtD(new Date())}</p><p class="muted"><b>${t('repDisc')}</b></p></article></div>`;
}

/* ---------- route: course ---------- */
M.routes.course=(p,post)=>{
  if(!p[1])return dashboard();
  if(p[1]==='final')return finalView(post);
  if(p[1]==='report')return reportView(post);
  return moduleView(p[1],post);
};

/* ---------- passport ---------- */
M.stamps=[
 {id:'pw',icon:'lock',name:'st_pw',req:['mod:m4'],alt:['c1','c2']},
 {id:'ph',icon:'mail',name:'st_ph',req:['mod:m3','det:case1'],alt:['p1','p2']},
 {id:'pr',icon:'shield',name:'st_pr',req:['mod:m10'],alt:['f1','f2']},
 {id:'nw',icon:'maze',name:'st_nw',req:['mod:m5','def:run'],alt:['a3','a2']},
 {id:'cr',icon:'cipher',name:'st_cr',req:['mod:m6'],alt:['l1','l2']},
 {id:'fo',icon:'flag',name:'st_fo',req:['mod:m9','det:case2'],alt:['ctf:dd-1','ctf:dd-2']},
 {id:'et',icon:'academy',name:'st_et',req:['mod:m1','mod:m10'],alt:['les:white','les:wrong']}
];
u('lb_det1','Detective case 1','Enquête 1','قضية التحقيق 1');u('lb_det2','Detective case 2','Enquête 2','قضية التحقيق 2');u('lb_det3','Detective case 3','Enquête 3','قضية التحقيق 3');u('lb_def','Defense Simulator report','Rapport du simulateur de défense','تقرير محاكي الدفاع');u('lb_final','Final assessment','Évaluation finale','التقييم النهائي');u('lb_studio','First custom level','Premier niveau créé','أول مرحلة مخصصة');
function label(id){
  const [k,v]=id.indexOf(':')>0?id.split(/:(.+)/):['mission',id];
  if(k==='wf'){const w=C.worlds.find(x=>x.id===v);return w?L(w.name)+' – '+t('worldFinal'):id}
  if(k==='mod'){const m=mods().find(x=>x.id===v);return m?L(m.title):id}
  if(k==='det')return t('lb_det'+v.replace('case',''));if(k==='def')return t('lb_def');if(k==='studio')return t('lb_studio');
  if(k==='lx'){const m=C.linux.find(x=>x.id===v);return m?L(m.title):id}
  if(k==='tm'){const m=C.tasks.find(x=>x.id===v);return m?L(m.title):id}
  if(k==='ctf'){const m=C.ctf.concat(C.pctf).find(x=>x.id===v);return m?L(m.name):id}
  if(k==='les'){const m=C.lessons.find(x=>x.id===v);return m?L(m.title):id}
  if(k==='g'){const m=C.games.find(x=>x.id===v);return m?L(m.title):id}
  if(id==='final')return t('lb_final');
  const m=C.missions.find(x=>x.id===id);return m?L(m.title):id;
}
M.label=label;
const stampOn=s=>s.req.every(i=>S.isDone(i))||s.alt.every(i=>S.isDone(i));
M.stampsEarned=()=>M.stamps.filter(stampOn).length;
M.routes.passport=(p,post)=>{
  post(()=>{const n=$('#nm');if(n)n.oninput=e=>S.set('name',e.target.value.slice(0,24));const b=$('#pr');if(b)b.onclick=()=>window.print()});
  const ids=Object.keys(S.s.done);
  return `<div class="wrap sec"><div class="noprint"><h1>${t('ppT')}</h1><p class="muted">${t('ppD')}</p><label for="nm" class="muted">${t('repName')}</label><input id="nm" class="input" maxlength="24" value="${esc(S.s.name)}" style="max-width:24rem" autocomplete="off"><p style="margin-top:.6rem"><button class="btn" id="pr">${t('repPrint')}</button></p></div>
  <div class="printable"><h2 class="print-only">${t('ppT')}${S.s.name?' · '+esc(S.s.name):''}</h2><div class="grid g3">${M.stamps.map(s=>{const on=stampOn(s);return `<div class="card badge${on?'':' off'}"><div class="b-ico">${A.icon(s.icon,50)}</div><b>${t(s.name)}</b><p class="muted" style="font-size:.85rem;margin:.3rem 0">${on?'✔ '+t('ppEarned'):'○ '+t('ppLocked')}</p>
    ${on?'':`<details><summary>${t('ppNeed')}</summary><ul style="text-align:start;font-size:.9rem"><li>${s.req.map(i=>esc(label(i))).join(' + ')}</li><li>${t('ppOr')}: ${s.alt.map(i=>esc(label(i))).join(' + ')}</li></ul></details>`}</div>`}).join('')}</div>
  <h2 style="margin-top:1.4rem">${t('ppRev')}</h2>${ids.length?`<ul>${ids.map(i=>`<li>✔ ${esc(label(i))}</li>`).join('')}</ul>`:`<p class="muted">${t('ppNone')}</p>`}<p>${t('repDate')}: ${fmtD(new Date())}</p><p class="muted"><b>${t('repDisc')}</b></p></div></div>`;
};

/* ---------- quests + trophy room ---------- */
const DAILY_COL=['mod','lx','tm','ctf','det','def'],DAILY_KID=['mission','ctf','g','les'];
function quests(){
  const col=app().isCollege(),pool=col?DAILY_COL:DAILY_KID,day=Math.floor(Date.now()/864e5),cat=pool[day%pool.length],today=S.today();
  const doneToday=(S.s.acts[today]||[]).indexOf(cat)>=0;
  let bonus=0;
  if(doneToday&&!S.s.daily[today]){S.s.daily[today]=true;S.s.xp+=15;bonus+=15}
  const wk=S.weekId();if(S.s.week.id!==wk){S.s.week={id:wk,n:0,paid:false}}
  if(S.s.week.n>=5&&!S.s.week.paid){S.s.week.paid=true;S.s.xp+=50;bonus+=50}
  if(bonus)S.save();
  return {cat,doneToday,week:S.s.week,bonus};
}
M.routes.trophies=(p,post)=>{
  const q=quests(),all=C.badges.concat(C.cbadges);
  if(q.bonus)setTimeout(()=>app().toast(t('trBonus',{a:q.bonus})),300);
  const mastery=M.stamps.map(s=>{const need=Math.max(s.req.length,s.alt.length),have=Math.max(s.req.filter(i=>S.isDone(i)).length,s.alt.filter(i=>S.isDone(i)).length);return {s,pct:Math.min(1,have/need)}});
  return `<div class="wrap sec"><h1>${t('trT')}</h1><p class="muted">${t('trDisc')}</p>
  <div class="grid g3"><div class="card"><h3>${A.icon('trophy',32)} ${t('trStreak',{a:S.streak()})}</h3><p class="muted">${t('trStreakD')}</p></div>
  <div class="card"><h3>${t('trDaily')}</h3><p>${q.doneToday?'✔ '+t('trDone'):t('trTodo',{a:t('cat_'+q.cat)})}</p><p class="muted">+15 ${t('xp')}</p></div>
  <div class="card"><h3>${t('trWeekly')}</h3><p>${t('trWeeklyD',{a:5,b:Math.min(5,q.week.n)})}</p><div class="bar"><i style="width:${Math.min(5,q.week.n)*20}%"></i></div><p class="muted">+50 ${t('xp')}${q.week.paid?' ✔':''}</p></div></div>
  <h2 style="margin-top:1.4rem">${t('trMastery')}</h2><div class="grid g3">${mastery.map(m=>`<div class="card"><b>${t(m.s.name)}</b><div class="bar" style="margin:.5rem 0" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Math.round(m.pct*100)}"><i style="width:${m.pct*100}%"></i></div><small class="muted">${fmtP(m.pct)}</small></div>`).join('')}</div>
  <h2 style="margin-top:1.4rem">${t('trBadges')}</h2><div class="grid g3">${all.map(b=>{const on=S.s.badges.indexOf(b.id)>=0;return `<div class="card badge${on?'':' off'}"><div class="b-ico">${A.icon(b.icon,50)}</div><b>${L(b.name)}</b><p class="muted" style="font-size:.85rem;margin:0">${on?'✔ ':'○ '}${L(b.desc)}</p></div>`}).join('')}</div>
  <p style="margin-top:1rem"><a class="btn ghost" href="#/passport">${t('nPassport')}</a></p></div>`;
};
M.byteRecs=byteRecs;M.fmtP=fmtP;M.fmtD=fmtD;M.u=u;M.quests=quests;
})();
