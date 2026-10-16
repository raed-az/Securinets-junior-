/* i18n: T(en,fr,ar) builds a translation triple. UI strings live in UI; content files reuse T. */
(function(){
const T=(en,fr,ar)=>({en,fr,ar});
const LANGS={en:{name:'English',dir:'ltr',label:'EN'},fr:{name:'Français',dir:'ltr',label:'FR'},ar:{name:'العربية',dir:'rtl',label:'AR'}};
const UI={
skip:T('Skip to content','Aller au contenu','انتقل إلى المحتوى'),
tagline:T('Play. Discover. Protect.','Joue. Découvre. Protège.','العب. اكتشف. احمِ.'),
nHome:T('Home','Accueil','الرئيسية'),nWorlds:T('Explore Worlds','Explorer les mondes','استكشف العوالم'),nGames:T('Mini-Games','Mini-jeux','ألعاب صغيرة'),nCtf:T('CTF Challenges','Défis CTF','تحديات CTF'),nLib:T('Cyber Library','Bibliothèque cyber','مكتبة السايبر'),nDash:T('My Adventure','Mon aventure','مغامرتي'),
start:T('Start Adventure','Commencer l’aventure','ابدأ المغامرة'),menu:T('Menu','Menu','القائمة'),langL:T('Language','Langue','اللغة'),themeL:T('Switch light/dark mode','Changer le mode clair/sombre','تبديل الوضع الفاتح/الداكن'),
heroTag:T('Junior Securinets at ISI presents','Junior Securinets à l’ISI présente','جونيور سيكيورينتس في المعهد العالي للإعلامية تقدّم'),
h1:T('Become a Cyber Hero!','Deviens un Cyber Héros !','كن بطلاً في الأمن السيبراني!'),
heroSub:T('Explore the digital world, solve fun puzzles, and learn how to stay safe online. Your adventure starts here!','Explore le monde numérique, résous des énigmes amusantes et apprends à rester en sécurité en ligne. Ton aventure commence ici !','استكشف العالم الرقمي، وحلّ ألغازاً ممتعة، وتعلّم كيف تبقى آمناً على الإنترنت. مغامرتك تبدأ من هنا!'),
heroCta1:T('Start My Adventure','Commencer mon aventure','ابدأ مغامرتي'),heroCta2:T('Explore Games','Explorer les jeux','استكشف الألعاب'),
worldsT:T('Five worlds to explore','Cinq mondes à explorer','خمسة عوالم لاستكشافها'),worldsSub:T('Follow Byte through the map. Every world teaches a new superpower.','Suis Byte sur la carte. Chaque monde t’apprend un nouveau super-pouvoir.','تابع بايت عبر الخريطة. كل عالم يعلّمك قوة خارقة جديدة.'),
gamesT:T('Games you can play right now','Des jeux auxquels tu peux jouer tout de suite','ألعاب يمكنك لعبها الآن'),gamesSub:T('Pick one. There are no wrong turns, only new tries!','Choisis-en un. Pas de mauvais choix, seulement de nouveaux essais !','اختر واحدة. لا توجد أخطاء، فقط محاولات جديدة!'),
ctfT:T('Hunt for secret flags','Chasse les drapeaux secrets','اصطد الأعلام السرية'),ctfSub:T('A CTF (Capture The Flag) is a puzzle game. Solve the clues, find a secret code that looks like JSEC{...}, and type it in!','Un CTF (Capture The Flag) est un jeu d’énigmes. Résous les indices, trouve un code secret comme JSEC{...} et tape-le !','لعبة CTF (التقاط العلم) هي لعبة ألغاز. حلّ الأدلة، واعثر على رمز سري يشبه JSEC{...} وأدخله!'),
howT:T('How it works','Comment ça marche','كيف تعمل اللعبة'),
how1T:T('Explore','Explore','استكشف'),how1D:T('Visit a world and meet a new idea.','Visite un monde et découvre une nouvelle idée.','زر عالماً وتعرّف على فكرة جديدة.'),
how2T:T('Solve','Résous','حُلّ'),how2D:T('Play games and crack puzzles. Hints are always free.','Joue et résous des énigmes. Les indices sont toujours gratuits.','العب وحلّ الألغاز. التلميحات مجانية دائماً.'),
how3T:T('Become a Cyber Hero','Deviens un Cyber Héros','كن بطلاً سيبرانياً'),how3D:T('Earn stars and badges, and teach your family what you learned.','Gagne des étoiles et des badges, puis apprends à ta famille ce que tu sais.','اجمع النجوم والأوسمة، وعلّم عائلتك ما تعلمته.'),
achT:T('Collect badges','Collectionne les badges','اجمع الأوسمة'),achSub:T('You earn stars for trying, not just for being fast.','Tu gagnes des étoiles en essayant, pas seulement en étant rapide.','تحصل على النجوم لأنك تحاول، وليس فقط لأنك سريع.'),
safeT:T('Four habits of a Cyber Hero','Quatre habitudes d’un Cyber Héros','أربع عادات للبطل السيبراني'),
tip1T:T('Think before you click','Réfléchis avant de cliquer','فكّر قبل أن تنقر'),tip1D:T('Free prizes and scary urgent messages are usually tricks.','Les cadeaux gratuits et les messages urgents qui font peur sont souvent des pièges.','الجوائز المجانية والرسائل المستعجلة المخيفة غالباً ما تكون خدعاً.'),
tip2T:T('Keep secrets secret','Garde les secrets secrets','احتفظ بالأسرار سرّية'),tip2D:T('Never share your password, address or school with online strangers.','Ne partage jamais ton mot de passe, ton adresse ou ton école avec des inconnus en ligne.','لا تشارك كلمة سرك أو عنوانك أو مدرستك مع غرباء على الإنترنت.'),
tip3T:T('Make strong passphrases','Crée de solides phrases secrètes','اصنع عبارات سرّ قوية'),tip3D:T('Long and silly beats short and easy.','Long et rigolo, c’est mieux que court et facile.','الطويلة والمضحكة أفضل من القصيرة والسهلة.'),
tip4T:T('Ask a trusted adult','Demande à un adulte de confiance','اسأل شخصاً بالغاً تثق به'),tip4D:T('If something feels wrong, stop and tell someone. You are never in trouble for asking.','Si quelque chose te met mal à l’aise, arrête-toi et parle-en. Tu n’as jamais d’ennuis pour avoir demandé.','إذا شعرت أن شيئاً ما غير مريح، توقف وأخبر أحداً. لن تُعاقب أبداً لأنك سألت.'),
play:T('Play','Jouer','العب'),open:T('Open','Ouvrir','افتح'),continue:T('Continue','Continuer','تابع'),back:T('Back','Retour','رجوع'),next:T('Next','Suivant','التالي'),check:T('Check','Vérifier','تحقق'),retry:T('Try again','Réessayer','حاول مجدداً'),
hint:T('Need a hint?','Un indice ?','تريد تلميحاً؟'),hintsUsed:T('Hint','Indice','تلميح'),noMoreHints:T('That was the last hint. You can do it!','C’était le dernier indice. Tu peux y arriver !','كان هذا آخر تلميح. أنت قادر على ذلك!'),
reset:T('Reset','Recommencer','إعادة'),run:T('Run','Lancer','شغّل'),stepBtn:T('Step','Pas à pas','خطوة'),clear:T('Clear','Effacer','امسح'),
locked:T('Locked','Verrouillé','مقفل'),done:T('Done','Terminé','مكتمل'),newT:T('New','Nouveau','جديد'),difficulty:T('Difficulty','Difficulté','الصعوبة'),
easy:T('Easy','Facile','سهل'),medium:T('Medium','Moyen','متوسط'),challenge:T('Challenge','Défi','تحدٍّ'),mins:T('min','min','د'),
mission:T('Mission','Mission','مهمة'),missions:T('Missions','Missions','المهام'),objective:T('You will learn','Tu vas apprendre','ستتعلم'),story:T('Story','Histoire','القصة'),why:T('Why?','Pourquoi ?','لماذا؟'),
reward:T('Reward','Récompense','المكافأة'),xp:T('XP','XP','نقاط'),stars:T('Stars','Étoiles','نجوم'),badges:T('Badges','Badges','الأوسمة'),level:T('Level','Niveau','المستوى'),
close:T('Close','Fermer','إغلاق'),save:T('Save','Enregistrer','حفظ'),great:T('Great job!','Bravo !','أحسنت!'),recap:T('Recap','En résumé','الخلاصة'),
everyday:T('Everyday example','Exemple de tous les jours','مثال من الحياة'),quickQuiz:T('Quick quiz','Mini quiz','اختبار سريع'),related:T('Related mission','Mission liée','مهمة مرتبطة'),
lessons:T('Lessons','Leçons','الدروس'),done2:T('Completed','Terminé','تم الإنجاز'),
roundOf:T('Round {a} of {b}','Manche {a} sur {b}','الجولة {a} من {b}'),qOf:T('Question {a} of {b}','Question {a} sur {b}','السؤال {a} من {b}'),
correct:T('Yes! ','Oui ! ','نعم! '),almost:T('Not quite — ','Pas tout à fait — ','ليس تماماً — '),
missionDone:T('Mission complete!','Mission accomplie !','أنجزت المهمة!'),earned:T('You earned {a} XP and {b} stars.','Tu as gagné {a} XP et {b} étoiles.','ربحت {a} نقطة و{b} نجوم.'),
newBadge:T('New badge: {a}','Nouveau badge : {a}','وسام جديد: {a}'),playAgain:T('Play again','Rejouer','العب مجدداً'),nextMission:T('Next mission','Mission suivante','المهمة التالية'),backToMap:T('Back to the map','Retour à la carte','العودة إلى الخريطة'),
yourWords:T('Your answer','Ta réponse','إجابتك'),
// CTF
ctfCats:T('Categories','Catégories','الفئات'),all:T('All','Tous','الكل'),flagPh:T('Type the flag, like JSEC{CYBER_HERO}','Tape le drapeau, comme JSEC{CYBER_HERO}','اكتب العلم، مثل JSEC{CYBER_HERO}'),submit:T('Submit flag','Envoyer le drapeau','أرسل العلم'),
flagOk:T('Flag captured! Brilliant detective work.','Drapeau capturé ! Excellent travail de détective.','تم التقاط العلم! عمل رائع كمحقق.'),flagNo:T('Not the flag yet. Check the clues, or open a hint. Flags look like JSEC{WORDS}.','Pas encore le bon drapeau. Relis les indices ou ouvre un indice. Un drapeau ressemble à JSEC{MOTS}.','ليس العلم بعد. راجع الأدلة أو افتح تلميحاً. العلم يشبه JSEC{كلمات}.'),
flagNote:T('Flags are made up for this game. They never open real systems.','Les drapeaux sont inventés pour ce jeu. Ils n’ouvrent aucun vrai système.','الأعلام مخترعة لهذه اللعبة ولا تفتح أي نظام حقيقي.'),
learnedT:T('What you learned','Ce que tu as appris','ما تعلمته'),clues:T('Clues','Indices','الأدلة'),
// Dashboard
dashT:T('My Cyber Adventure','Mon aventure cyber','مغامرتي السيبرانية'),yourNick:T('Nickname (not your real name!)','Pseudo (pas ton vrai nom !)','اللقب (ليس اسمك الحقيقي!)'),avatarL:T('Choose your hero','Choisis ton héros','اختر بطلك'),
progW:T('World progress','Progression par monde','التقدم في العوالم'),resetP:T('Erase my progress','Effacer ma progression','امسح تقدمي'),resetAsk:T('Erase all stars, badges and progress on this device? This cannot be undone.','Effacer toutes les étoiles, badges et la progression sur cet appareil ? C’est définitif.','هل تريد مسح كل النجوم والأوسمة والتقدم على هذا الجهاز؟ لا يمكن التراجع.'),
resetDone:T('Progress erased. Fresh start!','Progression effacée. Nouveau départ !','تم مسح التقدم. بداية جديدة!'),localNote:T('Your progress is saved only on this device. Nothing is sent anywhere.','Ta progression est enregistrée seulement sur cet appareil. Rien n’est envoyé nulle part.','يُحفظ تقدمك على هذا الجهاز فقط. لا يُرسل أي شيء إلى أي مكان.'),
nextUp:T('Next up','À suivre','التالي'),
// Onboarding
obHi:T('Hi, Cyber Hero! I’m Byte. Together, we’ll explore the internet, solve puzzles, and learn how to stay safe online!','Salut, Cyber Héros ! Moi, c’est Byte. Ensemble, nous allons explorer Internet, résoudre des énigmes et apprendre à rester en sécurité en ligne !','مرحباً أيها البطل السيبراني! أنا بايت. سنستكشف معاً الإنترنت ونحل الألغاز ونتعلم كيف نبقى آمنين على الإنترنت!'),
obLang:T('Pick your language','Choisis ta langue','اختر لغتك'),obAvatar:T('Pick your hero','Choisis ton héros','اختر بطلك'),obNick:T('A nickname (optional)','Un pseudo (facultatif)','لقب (اختياري)'),obNickHelp:T('Please do not use your real name.','N’utilise pas ton vrai nom, s’il te plaît.','من فضلك لا تستخدم اسمك الحقيقي.'),
obGo:T('Start the first mission','Commencer la première mission','ابدأ المهمة الأولى'),obSkip:T('Skip for now','Passer pour l’instant','تخطَّ الآن'),
// Footer
fProject:T('A free learning project by Junior Securinets at ISI (Institut Supérieur d’Informatique).','Un projet éducatif gratuit de Junior Securinets à l’ISI (Institut Supérieur d’Informatique).','مشروع تعليمي مجاني من جونيور سيكيورينتس في المعهد العالي للإعلامية (ISI).'),
fPrivT:T('Privacy','Confidentialité','الخصوصية'),fPriv:T('No accounts, no ads, no tracking, no chat. Progress stays on this device. Never type your real passwords in games.','Pas de compte, pas de pub, pas de suivi, pas de chat. La progression reste sur cet appareil. Ne tape jamais tes vrais mots de passe dans les jeux.','لا حسابات ولا إعلانات ولا تتبّع ولا دردشة. يبقى تقدمك على هذا الجهاز. لا تكتب كلمات سرك الحقيقية في الألعاب.'),
fAdult:T('If anything online makes you uncomfortable, tell a trusted adult.','Si quelque chose en ligne te met mal à l’aise, parles-en à un adulte de confiance.','إذا أزعجك أي شيء على الإنترنت، أخبر شخصاً بالغاً تثق به.'),fNav:T('Explore','Explorer','استكشف'),
notFound:T('Oops, this page wandered off!','Oups, cette page s’est perdue !','عفواً، هذه الصفحة ضاعت!'),
passNote:T('These passwords are pretend. Never reuse them for real accounts.','Ces mots de passe sont inventés. Ne les réutilise jamais pour de vrais comptes.','كلمات السر هذه خيالية. لا تستخدمها أبداً لحساباتك الحقيقية.'),
// Games generic
gInstr:T('How to play','Comment jouer','طريقة اللعب'),moves:T('Steps','Pas','الخطوات'),keysL:T('Keys','Clés','المفاتيح'),
// maze/blocks
bMove:T('Move forward','Avancer','تقدّم'),bLeft:T('Turn left','Tourner à gauche','انعطف يساراً'),bRight:T('Turn right','Tourner à droite','انعطف يميناً'),bRepeat:T('Repeat','Répéter','كرّر'),bIf:T('If wall ahead','Si mur devant','إذا كان هناك جدار أمامك'),bElse:T('else','sinon','وإلا'),bCollect:T('Collect key','Prendre la clé','التقط المفتاح'),bTimes:T('times','fois','مرات'),
bTip:T('Tap a block to add it. Tap a yellow-bordered box to choose where it goes. You can also drag blocks.','Touche un bloc pour l’ajouter. Touche une boîte au bord jaune pour choisir où il va. Tu peux aussi glisser les blocs.','المس كتلة لإضافتها. المس صندوقاً بحدّ أصفر لتختار مكانها. ويمكنك أيضاً سحب الكتل.'),
bEmpty:T('Your program is empty. Add some blocks!','Ton programme est vide. Ajoute des blocs !','برنامجك فارغ. أضف بعض الكتل!'),
bWall:T('Byte bumped a wall. Bumps are fine — fix the blocks and try again!','Byte a touché un mur. Ce n’est pas grave — change les blocs et réessaie !','اصطدم بايت بجدار. لا بأس — عدّل الكتل وحاول مجدداً!'),
bMissingKeys:T('Byte reached the flag, but the keys are still on the map. Collect them all first!','Byte est au drapeau, mais il reste des clés. Prends-les toutes d’abord !','وصل بايت إلى العلم لكن ما زالت هناك مفاتيح. اجمعها كلها أولاً!'),
bTooLong:T('Whoa, that is too many steps. Try using Repeat!','Oh là là, trop de pas. Essaie avec Répéter !','كثير من الخطوات! جرّب استخدام كرّر!'),
bShort:T('Byte stopped before the flag. Add more blocks!','Byte s’est arrêté avant le drapeau. Ajoute des blocs !','توقف بايت قبل العلم. أضف كتلاً أخرى!'),
bWin:T('Byte reached the flag!','Byte a atteint le drapeau !','وصل بايت إلى العلم!'),bDevice:T('Suspicious device! Byte went around… back to start.','Appareil suspect ! Byte revient au départ.','جهاز مشبوه! عاد بايت إلى البداية.'),
levelN:T('Level {a}','Niveau {a}','المستوى {a}')
};
let lang='en';
function t(k,v){const o=UI[k];let s=o?(o[lang]||o.en):k;if(v)for(const x in v)s=s.replace('{'+x+'}',v[x]);return s}
function L(o){if(o==null)return '';if(typeof o==='string')return o;return o[lang]||o.en||''}
function setLang(l){if(!LANGS[l])l='en';lang=l;document.documentElement.lang=l;document.documentElement.dir=LANGS[l].dir}
window.CKI={T,LANGS,UI,t,L,setLang,get lang(){return lang}};
})();
