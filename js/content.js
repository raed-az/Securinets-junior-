/* Educational content, kept separate from presentation. Every user-visible string is a T(en,fr,ar) triple. */
(function(){
const {T}=CKI;
const C=window.CKC={};

C.worlds=[
{id:'forest',color:'#1fb877',art:'forest',name:T('The Internet Forest','La Forêt d’Internet','غابة الإنترنت'),diff:'easy',
 desc:T('Learn what the internet is and which secrets to keep safe while you wander.','Découvre ce qu’est Internet et quels secrets garder en te promenant.','تعرّف على الإنترنت وما الأسرار التي يجب أن تحميها أثناء تجوالك.')},
{id:'castle',color:'#7a5cff',art:'castle',name:T('Password Castle','Le Château des Mots de passe','قلعة كلمات السر'),diff:'easy',
 desc:T('Build super-strong passphrases and guard the castle gate.','Crée des phrases secrètes très solides et garde la porte du château.','اصنع عبارات سرّ قوية جداً واحرس بوابة القلعة.')},
{id:'city',color:'#ff8a3d',art:'city',name:T('Phishing City','La Ville des Hameçonneurs','مدينة الاحتيال'),diff:'medium',
 desc:T('Spot tricky messages and fake prizes before they fool anyone.','Repère les messages piégés et les faux cadeaux avant qu’ils ne trompent quelqu’un.','اكتشف الرسائل الخادعة والجوائز المزيفة قبل أن تخدع أحداً.')},
{id:'lab',color:'#12b5c0',art:'lab',name:T('The Secret Laboratory','Le Laboratoire Secret','المختبر السري'),diff:'medium',
 desc:T('Crack secret codes and learn how messages can hide in plain sight.','Déchiffre des codes secrets et découvre comment un message peut se cacher.','فكّ رموزاً سرية وتعلّم كيف تختبئ الرسائل أمام أعيننا.')},
{id:'academy',color:'#2f6bff',art:'academy',name:T('Cyber Defense Academy','L’Académie de Cyber Défense','أكاديمية الدفاع السيبراني'),diff:'challenge',
 desc:T('Train a security robot with code blocks and build your own firewall.','Entraîne un robot de sécurité avec des blocs de code et construis ton pare-feu.','درّب روبوت الأمان بكتل البرمجة وابنِ جدارك الناري.')}
];

/* Mission types: quiz (steps with feedback) or game (opens a game level set). */
C.missions=[
{id:'f1',world:'forest',xp:30,type:'quiz',title:T('The Whispering Gate','La Porte qui chuchote','البوابة الهامسة'),
 story:T('Byte reaches a gate in the Internet Forest. A friendly voice asks lots of questions. Which answers are safe?','Byte arrive devant une porte dans la Forêt d’Internet. Une voix amicale pose plein de questions. Quelles réponses sont sûres ?','يصل بايت إلى بوابة في غابة الإنترنت. صوت ودود يسأل أسئلة كثيرة. أي الإجابات آمنة؟'),
 obj:T('Know which personal information stays private.','Savoir quelles informations personnelles restent privées.','أن تعرف المعلومات الشخصية التي تبقى خاصة.'),
 steps:[
 {q:T('A player in a game chat asks: “Which school do you go to?”','Un joueur dans le chat d’un jeu demande : « Dans quelle école es-tu ? »','لاعب في دردشة لعبة يسأل: «في أي مدرسة تدرس؟»'),
  opts:[T('Tell them, they seem nice','Je lui dis, il a l’air gentil','أخبره، يبدو لطيفاً'),T('Say “I don’t share that” and tell a trusted adult','Je réponds « je ne partage pas ça » et j’en parle à un adulte de confiance','أقول «لا أشارك هذا» وأخبر شخصاً بالغاً أثق به'),T('Tell them only the school’s first letter','Je donne seulement la première lettre','أخبره بالحرف الأول فقط')],a:1,
  why:T('Your school is personal information. Even small pieces can be put together by strangers, so keep them private.','Ton école est une information personnelle. Même de petits morceaux peuvent être assemblés par des inconnus : garde-les privés.','مدرستك معلومة شخصية. حتى القطع الصغيرة يمكن أن يجمعها الغرباء، لذا أبقِها خاصة.')},
 {q:T('Which one is OK to share in a game profile?','Laquelle peux-tu partager dans un profil de jeu ?','ما الذي يمكنك مشاركته في ملف اللعبة؟'),
  opts:[T('My home address','Mon adresse','عنوان بيتي'),T('My phone number','Mon numéro de téléphone','رقم هاتفي'),T('My favorite color','Ma couleur préférée','لوني المفضل')],a:2,
  why:T('A favorite color cannot lead anyone to you. Addresses and phone numbers can.','Une couleur préférée ne mène personne à toi. Une adresse ou un numéro, si.','اللون المفضل لا يقود أحداً إليك. أما العنوان والهاتف فيمكنهما ذلك.')},
 {q:T('What is the internet?','Qu’est-ce qu’Internet ?','ما هو الإنترنت؟'),
  opts:[T('A giant network of computers that talk to each other','Un immense réseau d’ordinateurs qui se parlent','شبكة ضخمة من الحواسيب تتحدث مع بعضها'),T('A cloud in the sky','Un nuage dans le ciel','سحابة في السماء'),T('One huge computer in a castle','Un énorme ordinateur dans un château','حاسوب ضخم واحد في قلعة')],a:0,
  why:T('Millions of computers are connected by cables and signals, like roads between cities.','Des millions d’ordinateurs sont reliés par des câbles et des signaux, comme des routes entre des villes.','ملايين الحواسيب متصلة بكابلات وإشارات، مثل طرق بين المدن.')}]},
{id:'f2',world:'forest',xp:35,type:'quiz',title:T('The Safe Path','Le Chemin sûr','الطريق الآمن'),
 story:T('The forest has many paths. Some lead to fun websites. Others have pop-ups hiding in the bushes!','La forêt a beaucoup de chemins. Certains mènent à des sites amusants. D’autres cachent des fenêtres surprises !','في الغابة طرق كثيرة. بعضها يقود إلى مواقع ممتعة وبعضها فيه نوافذ منبثقة مختبئة بين الشجيرات!'),
 obj:T('Browse safely and ask for help.','Naviguer prudemment et demander de l’aide.','أن تتصفح بأمان وتطلب المساعدة.'),
 steps:[
 {q:T('A pop-up shouts: “DOWNLOAD THIS NOW or lose your game!” What do you do?','Une fenêtre crie : « TÉLÉCHARGE ÇA MAINTENANT ou perds ton jeu ! » Que fais-tu ?','نافذة تصرخ: «حمّل هذا الآن وإلا ستفقد لعبتك!» ماذا تفعل؟'),
  opts:[T('Click it quickly','Je clique vite','أنقر بسرعة'),T('Close it and tell an adult','Je la ferme et j’en parle à un adulte','أغلقها وأخبر شخصاً بالغاً'),T('Type my name to be safe','Je tape mon nom pour être tranquille','أكتب اسمي لأكون آمناً')],a:1,
  why:T('Scary, rushed messages are a trick to make you act without thinking.','Les messages pressants et effrayants sont une ruse pour te faire agir sans réfléchir.','الرسائل المخيفة والمستعجلة حيلة لتجعلك تتصرف دون تفكير.')},
 {q:T('A website that shows cartoons asks for your birthday, address and phone. What now?','Un site de dessins animés demande ta date de naissance, ton adresse et ton téléphone. Et maintenant ?','موقع رسوم متحركة يطلب تاريخ ميلادك وعنوانك وهاتفك. ماذا تفعل؟'),
  opts:[T('Fill it all in','Je remplis tout','أملأ كل شيء'),T('Leave and ask an adult for a safer site','Je pars et je demande un site plus sûr à un adulte','أغادر وأطلب من بالغ موقعاً أكثر أماناً'),T('Make up my address','J’invente une adresse','أخترع عنواناً')],a:1,
  why:T('Good websites only ask for what they truly need. Cartoons do not need your address.','Les bons sites ne demandent que le nécessaire. Un dessin animé n’a pas besoin de ton adresse.','المواقع الجيدة تطلب فقط ما تحتاجه فعلاً. الرسوم المتحركة لا تحتاج عنوانك.')},
 {q:T('A browser is like…','Un navigateur, c’est comme…','المتصفح يشبه…'),
  opts:[T('A window for visiting websites','Une fenêtre pour visiter des sites','نافذة لزيارة المواقع'),T('A lock for your house','Une serrure pour ta maison','قفل لبيتك'),T('A game console','Une console de jeu','جهاز ألعاب')],a:0,
  why:T('A browser (like Chrome, Firefox or Safari) is the app that opens websites for you.','Un navigateur (Chrome, Firefox, Safari) est l’application qui ouvre les sites pour toi.','المتصفح (مثل كروم أو فايرفوكس أو سفاري) هو التطبيق الذي يفتح لك المواقع.')}]},
{id:'c1',world:'castle',xp:40,type:'game',game:'password',title:T('The Strongest Key','La clé la plus solide','أقوى مفتاح'),
 story:T('The castle gate opens only for the strongest password. Help Byte choose, then invent your own!','La porte du château s’ouvre seulement pour le mot de passe le plus solide. Aide Byte à choisir, puis invente le tien !','تُفتح بوابة القلعة فقط لأقوى كلمة سر. ساعد بايت على الاختيار ثم اخترع كلمتك!'),
 obj:T('Strong passphrases are long, random and unique.','Une phrase secrète solide est longue, aléatoire et unique.','العبارة القوية طويلة وعشوائية وفريدة.')},
{id:'c2',world:'castle',xp:35,type:'quiz',title:T('Guards of the Gate','Les gardes de la porte','حرّاس البوابة'),
 story:T('Three castle guards ask Byte about keeping accounts safe.','Trois gardes du château interrogent Byte sur la sécurité des comptes.','ثلاثة حرّاس يسألون بايت عن حماية الحسابات.'),
 obj:T('Never reuse passwords, and meet two-step login.','Ne jamais réutiliser un mot de passe et découvrir la double vérification.','ألا تعيد استخدام كلمة السر وأن تتعرف على التحقق بخطوتين.'),
 steps:[
 {q:T('You use the same password for every game. What could go wrong?','Tu utilises le même mot de passe pour tous les jeux. Que peut-il arriver ?','تستخدم كلمة السر نفسها في كل الألعاب. ما المشكلة؟'),
  opts:[T('Nothing, it is easy to remember','Rien, c’est facile à retenir','لا شيء، فهي سهلة التذكر'),T('If one game leaks it, all my accounts are in danger','Si un jeu la perd, tous mes comptes sont en danger','إذا تسرّبت من لعبة تتعرض كل حساباتي للخطر')],a:1,
  why:T('One key for every door means a lost key opens every door. Use a different passphrase for each account.','Une seule clé pour toutes les portes : si on la perd, tout s’ouvre. Utilise une phrase différente par compte.','مفتاح واحد لكل الأبواب يعني أن ضياعه يفتحها كلها. استخدم عبارة مختلفة لكل حساب.')},
 {q:T('Two-step login asks for your password AND a code sent to a grown-up’s phone. Why is that great?','La double vérification demande ton mot de passe ET un code envoyé au téléphone d’un adulte. Pourquoi c’est bien ?','التحقق بخطوتين يطلب كلمة سرك ورمزاً يصل إلى هاتف شخص بالغ. لماذا هذا رائع؟'),
  opts:[T('A thief needs two things, not just one','Un voleur a besoin de deux choses, pas d’une seule','اللص يحتاج إلى شيئين وليس شيئاً واحداً'),T('It makes the game faster','Ça rend le jeu plus rapide','يجعل اللعبة أسرع'),T('It removes the need for a password','On n’a plus besoin de mot de passe','يلغي الحاجة لكلمة السر')],a:0,
  why:T('It is like a door with two locks. Even if someone learns the password, they still cannot get in.','C’est comme une porte à deux serrures. Même si quelqu’un connaît le mot de passe, il ne peut pas entrer.','مثل باب بقفلين. حتى لو عرف أحدهم كلمة السر فلن يستطيع الدخول.')},
 {q:T('Who can you share your password with?','Avec qui peux-tu partager ton mot de passe ?','مع من يمكنك مشاركة كلمة السر؟'),
  opts:[T('My best friend at school','Mon meilleur ami à l’école','صديقي المقرب في المدرسة'),T('Only a parent or trusted adult who helps me','Seulement un parent ou adulte de confiance qui m’aide','فقط أحد والديّ أو بالغ موثوق يساعدني'),T('Anyone who says they are from the game','Toute personne qui dit venir du jeu','أي شخص يقول إنه من اللعبة')],a:1,
  why:T('Real support teams never ask for your password. Keep it between you and a trusted adult.','Les vrais services d’aide ne demandent jamais ton mot de passe. Garde-le entre toi et un adulte de confiance.','فرق الدعم الحقيقية لا تطلب كلمة سرك أبداً. احتفظ بها بينك وبين بالغ موثوق.')}]},
{id:'p1',world:'city',xp:40,type:'game',game:'phishing',title:T('The Clue Collector','Le collectionneur d’indices','جامع الأدلة'),
 story:T('Messages are flying across Phishing City. Tap the sneaky clues to catch the tricksters!','Les messages volent dans la Ville des Hameçonneurs. Touche les indices louches pour démasquer les fripons !','الرسائل تتطاير في مدينة الاحتيال. المس الأدلة المريبة لتكشف المحتالين!'),
 obj:T('Spot prizes, urgency, links and password requests.','Repérer cadeaux, urgence, liens et demandes de mot de passe.','اكتشاف الجوائز والاستعجال والروابط وطلبات كلمة السر.')},
{id:'p2',world:'city',xp:40,type:'game',game:'safe',title:T('Safe or Suspicious?','Sûr ou louche ?','آمن أم مشبوه؟'),
 story:T('A crowd of citizens needs your advice. What is the safest move each time?','Une foule d’habitants a besoin de tes conseils. Quel est le choix le plus sûr à chaque fois ?','حشد من السكان يحتاج نصيحتك. ما أكثر التصرفات أماناً في كل مرة؟'),
 obj:T('Say no, stop, and tell a trusted adult.','Dire non, s’arrêter, en parler à un adulte de confiance.','أن تقول لا وتتوقف وتخبر بالغاً موثوقاً.')},
{id:'l1',world:'lab',xp:40,type:'game',game:'decoder',title:T('The Code Wheel','La roue à codes','عجلة الشيفرة'),
 story:T('Dr. Pixel left secret notes in the lab. Turn the wheel to read them!','Le Dr Pixel a laissé des notes secrètes. Tourne la roue pour les lire !','ترك الدكتور بيكسل ملاحظات سرية في المختبر. أدر العجلة لتقرأها!'),
 obj:T('A Caesar cipher slides every letter along the alphabet.','Un chiffre de César décale chaque lettre dans l’alphabet.','شيفرة قيصر تُزيح كل حرف في الأبجدية.')},
{id:'l2',world:'lab',xp:40,type:'ctf',ctf:'sm-1',title:T('The Hidden Flag','Le drapeau caché','العلم المخفي'),
 story:T('A scrap of paper hides your first lab flag. Decode it and capture the flag!','Un bout de papier cache ton premier drapeau du labo. Déchiffre-le et capture-le !','قصاصة ورق تخفي أول علم لك في المختبر. فكّ شيفرتها والتقط العلم!'),
 obj:T('Codes can hide a secret, but a key can reveal it.','Un code peut cacher un secret, une clé peut le révéler.','الشيفرة تخفي السر والمفتاح يكشفه.')},
{id:'a1',world:'academy',xp:40,type:'blocks',levels:[0,1],title:T('Robot Basics','Les bases du robot','أساسيات الروبوت'),
 story:T('Byte must walk to the flag. Give the robot clear steps, one block at a time.','Byte doit marcher jusqu’au drapeau. Donne au robot des étapes claires, un bloc à la fois.','على بايت أن يمشي إلى العلم. أعطِ الروبوت خطوات واضحة، كتلة بعد كتلة.'),
 obj:T('A program is a list of steps, in order.','Un programme est une liste d’étapes, dans l’ordre.','البرنامج قائمة خطوات مرتبة.')},
{id:'a2',world:'academy',xp:50,type:'blocks',levels:[2,3,4],title:T('Loops and Rules','Boucles et règles','التكرار والقواعد'),
 story:T('The server room is far away and full of twists. Use Repeat and If to guide the robot.','La salle des serveurs est loin et pleine de détours. Utilise Répéter et Si pour guider le robot.','غرفة الخوادم بعيدة ومليئة بالمنعطفات. استخدم كرّر وإذا لتوجيه الروبوت.'),
 obj:T('Repeat saves time. If makes smart choices.','Répéter fait gagner du temps. Si fait des choix malins.','التكرار يوفر الوقت، و«إذا» تجعل القرارات ذكية.')},
{id:'a3',world:'academy',xp:50,type:'game',game:'firewall',title:T('Build Your Firewall','Construis ton pare-feu','ابنِ جدارك الناري'),
 story:T('Pretend messages are knocking at the network door. Make rules that let friends in and keep tricksters out.','Des messages imaginaires frappent à la porte du réseau. Crée des règles qui laissent entrer les amis et bloquent les fripons.','رسائل خيالية تطرق باب الشبكة. ضع قواعد تُدخل الأصدقاء وتمنع المحتالين.'),
 obj:T('A firewall checks rules: IF this, THEN that.','Un pare-feu vérifie des règles : SI ceci, ALORS cela.','الجدار الناري يفحص قواعد: إذا كان هذا فافعل ذاك.')}
];

/* Mini-games catalogue */
C.games=[
{id:'password',color:'#7a5cff',art:'lock',diff:'easy',mins:5,mission:'c1',title:T('Password Lab','Labo des mots de passe','مختبر كلمات السر'),desc:T('Pick the strongest password and make your own.','Choisis le mot de passe le plus solide et crée le tien.','اختر أقوى كلمة سر واصنع كلمتك.')},
{id:'phishing',color:'#ff8a3d',art:'mail',diff:'medium',mins:6,mission:'p1',title:T('Phishing Detective','Détective anti-hameçonnage','محقق الاحتيال'),desc:T('Tap the sneaky clues in fictional messages.','Touche les indices louches dans des messages fictifs.','المس الأدلة المريبة في رسائل خيالية.')},
{id:'decoder',color:'#12b5c0',art:'cipher',diff:'medium',mins:6,mission:'l1',title:T('Secret Message Decoder','Décodeur de messages secrets','فاك الرسائل السرية'),desc:T('Turn the wheel and read the secret notes.','Tourne la roue et lis les notes secrètes.','أدر العجلة واقرأ الملاحظات السرية.')},
{id:'maze',color:'#2f6bff',art:'maze',diff:'easy',mins:5,title:T('Cyber Maze','Labyrinthe cyber','متاهة السايبر'),desc:T('Steer Byte, grab the keys, avoid suspicious devices.','Dirige Byte, prends les clés, évite les appareils suspects.','قُد بايت، التقط المفاتيح وتجنّب الأجهزة المشبوهة.')},
{id:'safe',color:'#1fb877',art:'shield',diff:'easy',mins:5,mission:'p2',title:T('Safe or Suspicious?','Sûr ou louche ?','آمن أم مشبوه؟'),desc:T('Choose the safest action in everyday online moments.','Choisis la meilleure action dans des situations en ligne.','اختر التصرف الأكثر أماناً في مواقف يومية.')},
{id:'firewall',color:'#d2467a',art:'wall',diff:'challenge',mins:7,mission:'a3',title:T('Build Your Own Firewall','Construis ton pare-feu','ابنِ جدارك الناري'),desc:T('Make IF–THEN rules for pretend network traffic.','Crée des règles SI–ALORS pour un faux trafic réseau.','ضع قواعد إذا–فإن لحركة شبكة خيالية.')},
{id:'flag',color:'#ffc531',art:'flag',diff:'easy',mins:6,ctf:'dd-1',title:T('Find the Hidden Flag','Trouve le drapeau caché','اعثر على العلم المخفي'),desc:T('Explore pretend files and capture a flag.','Explore de faux fichiers et capture un drapeau.','استكشف ملفات خيالية والتقط علماً.')},
{id:'blocks',color:'#e08a00',art:'blocks',diff:'challenge',mins:10,title:T('Code Blocks Maze','Labyrinthe en blocs','متاهة الكتل البرمجية'),desc:T('Snap blocks together to guide the security robot.','Assemble des blocs pour guider le robot de sécurité.','ركّب الكتل لتوجيه روبوت الأمان.')}
];

/* Password Lab */
C.passRounds=[
 {opts:['cat','Rainy-Penguin-Dance-42','12345678'],a:1,why:T('Long and random wins. Short or famous passwords are guessed in seconds.','Long et aléatoire gagne. Les mots de passe courts ou célèbres sont devinés en quelques secondes.','الطويلة والعشوائية تفوز. كلمات السر القصيرة أو الشهيرة تُخمَّن في ثوانٍ.')},
 {opts:['BlueBlue1','Purple!Banana?Rocket7','Hero2012'],a:1,why:T('Four random words plus a few extras are strong and easy to remember as a silly story.','Quatre mots au hasard avec quelques extras : solide, et facile à retenir comme une histoire rigolote.','أربع كلمات عشوائية مع بعض الإضافات: قوية وسهلة التذكر كقصة مضحكة.')},
 {opts:['P@ssw0rd!','Frog-Kite-Lamp-Seven','Zx9!'],a:1,why:T('Swapping a for @ is a trick everyone knows. Random words are much harder to guess.','Remplacer a par @ est une astuce connue de tous. Des mots au hasard sont bien plus difficiles à deviner.','استبدال a بـ @ حيلة يعرفها الجميع. الكلمات العشوائية أصعب بكثير في التخمين.')}
];
C.common=['123456','12345678','password','qwerty','abc123','iloveyou','letmein','admin','111111','123123','cat','dog'];

/* Phishing Detective: tap suspicious parts. bad:true means a clue to catch. */
C.phish=[
 {kind:T('Email','E-mail','بريد'),from:'prizes@super-win.example',segs:[
  [T('CONGRATULATIONS!!! You WON a free tablet!','FÉLICITATIONS !!! Tu as GAGNÉ une tablette gratuite !','مبروك!!! لقد ربحت جهازاً لوحياً مجانياً!'),1],
  [T('Click here: http://free-tablet.example/claim','Clique ici : http://free-tablet.example/claim','انقر هنا: http://free-tablet.example/claim'),1],
  [T('and type your password','et tape ton mot de passe','واكتب كلمة سرك'),1],
  [T('before you run out of time!','avant qu’il ne soit trop tard !','قبل أن ينتهي الوقت!'),1]],
  why:T('Four clues: an unexpected prize, a strange link, a password request and a rush. One is enough to stop and ask an adult.','Quatre indices : un cadeau inattendu, un lien étrange, une demande de mot de passe et la précipitation. Un seul suffit pour s’arrêter et demander à un adulte.','أربعة أدلة: جائزة غير متوقعة، رابط غريب، طلب كلمة سر، واستعجال. دليل واحد يكفي لتتوقف وتسأل بالغاً.')},
 {kind:T('School message','Message de l’école','رسالة المدرسة'),from:'teacher@school.example',segs:[
  [T('Hello class, tomorrow is Library Day.','Bonjour la classe, demain c’est le jour de la bibliothèque.','مرحباً يا صف، غداً يوم المكتبة.'),0],
  [T('Please bring a book you like.','Apportez un livre que vous aimez.','أحضروا كتاباً تحبونه.'),0],
  [T('See you then! — Ms. Salma','À demain ! — Mme Salma','أراكم غداً! — الأستاذة سلمى'),0]],
  why:T('Nothing sneaky here: no prize, no link, no password, no rush. Not every message is a trick!','Rien de louche : pas de cadeau, pas de lien, pas de mot de passe, pas de précipitation. Tous les messages ne sont pas des pièges !','لا شيء مريب: لا جائزة ولا رابط ولا كلمة سر ولا استعجال. ليست كل الرسائل خدعة!')},
 {kind:T('Text message','SMS','رسالة نصية'),from:'+000 555 0101',segs:[
  [T('Hi, we are Game Support.','Salut, nous sommes le Support du jeu.','مرحباً، نحن دعم اللعبة.'),1],
  [T('Your account has a big problem!','Ton compte a un gros problème !','حسابك فيه مشكلة كبيرة!'),1],
  [T('Send us your password so we can fix it.','Envoie-nous ton mot de passe pour qu’on le répare.','أرسل لنا كلمة سرك لنصلحها.'),1]],
  why:T('Someone pretends to be support (impersonation), scares you, then asks for your password. Real support never does that.','Quelqu’un se fait passer pour le support (usurpation), te fait peur, puis demande ton mot de passe. Le vrai support ne le fait jamais.','شخص ينتحل صفة الدعم، يخيفك ثم يطلب كلمة سرك. الدعم الحقيقي لا يفعل ذلك أبداً.')},
 {kind:T('Website preview','Aperçu de site','معاينة موقع'),from:'fun-games-login.example',segs:[
  [T('Welcome to Fun Games! Choose a nickname.','Bienvenue sur Fun Games ! Choisis un pseudo.','أهلاً في ألعاب ممتعة! اختر لقباً.'),0],
  [T('Please enter your home address.','Entre ton adresse personnelle.','أدخل عنوان بيتك.'),1],
  [T('Please enter your parent’s card number.','Entre le numéro de carte de tes parents.','أدخل رقم بطاقة والديك.'),1]],
  why:T('A nickname is fine. Addresses and card numbers are never needed to play a game.','Un pseudo, c’est bien. Une adresse ou un numéro de carte ne sont jamais nécessaires pour jouer.','اللقب لا بأس به. العنوان ورقم البطاقة غير ضروريين أبداً للعب.')},
 {kind:T('Notification','Notification','إشعار'),from:'Your device',segs:[
  [T('A game update is ready.','Une mise à jour du jeu est prête.','تحديث للعبة جاهز.'),0],
  [T('Open the app store yourself and tap Update.','Ouvre toi-même la boutique d’applications et touche Mettre à jour.','افتح متجر التطبيقات بنفسك واضغط تحديث.'),0]],
  why:T('This one tells you to open the real store yourself. No link, no prize, no password.','Celui-ci te dit d’ouvrir toi-même la vraie boutique. Pas de lien, pas de cadeau, pas de mot de passe.','هذا يطلب منك فتح المتجر الحقيقي بنفسك. لا رابط ولا جائزة ولا كلمة سر.')}
];

/* Safe or Suspicious */
C.safe=[
 {q:T('A stranger in a game asks for your home address.','Un inconnu dans un jeu te demande ton adresse.','غريب في لعبة يطلب عنوان بيتك.'),opts:[T('Give it, he seems friendly','Je la donne, il est sympa','أعطيه إياه، يبدو ودوداً'),T('Say no and tell a trusted adult','Je dis non et j’en parle à un adulte','أرفض وأخبر بالغاً موثوقاً')],a:1,why:T('Strangers online do not need to know where you live. Saying no is smart, not rude.','Les inconnus en ligne n’ont pas besoin de savoir où tu habites. Dire non est malin, pas impoli.','الغرباء على الإنترنت لا يحتاجون معرفة مكان سكنك. قول «لا» ذكاء وليس وقاحة.')},
 {q:T('A message says: “Click now to win a free game console!”','Un message dit : « Clique pour gagner une console gratuite ! »','رسالة تقول: «انقر الآن لتربح جهاز ألعاب مجاني!»'),opts:[T('Click fast before it is gone','Je clique vite avant qu’il n’en reste plus','أنقر بسرعة قبل أن تنتهي'),T('Do not click, show it to an adult','Je ne clique pas et je le montre à un adulte','لا أنقر وأريها لبالغ')],a:1,why:T('Free prizes you never asked for are a classic trick.','Les cadeaux gratuits que tu n’as pas demandés sont un piège classique.','الجوائز المجانية التي لم تطلبها خدعة كلاسيكية.')},
 {q:T('A friend says: “Let’s swap passwords to prove we are best friends.”','Un ami dit : « Échangeons nos mots de passe pour prouver qu’on est meilleurs amis. »','صديق يقول: «لنتبادل كلمات السر لنثبت أننا أعز أصدقاء.»'),opts:[T('Swap, friends trust each other','J’échange, les amis se font confiance','نتبادل، الأصدقاء يثقون ببعض'),T('Say “Real friends keep passwords private.”','Je réponds : « Les vrais amis gardent leurs mots de passe privés. »','أقول: «الأصدقاء الحقيقيون يحافظون على سرّية كلمات السر.»')],a:1,why:T('Friendship is not about passwords. Keep yours secret, even from friends.','L’amitié ne dépend pas des mots de passe. Garde le tien secret, même pour tes amis.','الصداقة لا تعتمد على كلمات السر. أبقِ كلمتك سرية حتى عن أصدقائك.')},
 {q:T('Someone online says: “Don’t tell your parents about our chat.”','Quelqu’un en ligne dit : « Ne dis pas à tes parents qu’on discute. »','شخص على الإنترنت يقول: «لا تخبر والديك بأننا نتحدث.»'),opts:[T('Keep the secret','Je garde le secret','أحتفظ بالسر'),T('Tell a trusted adult right away','J’en parle tout de suite à un adulte de confiance','أخبر بالغاً موثوقاً فوراً')],a:1,why:T('Safe people never ask you to hide chats from your family. You are never in trouble for telling.','Les personnes bienveillantes ne te demandent jamais de cacher une conversation à ta famille. Tu n’as jamais d’ennuis pour en parler.','الأشخاص الطيبون لا يطلبون منك إخفاء المحادثة عن أسرتك. لن تُعاقب لأنك أخبرت.')},
 {q:T('A drawing website asks for your phone number and address.','Un site de dessin demande ton numéro de téléphone et ton adresse.','موقع رسم يطلب رقم هاتفك وعنوانك.'),opts:[T('Fill it in to be able to draw','Je remplis pour pouvoir dessiner','أملأها لأتمكن من الرسم'),T('Stop and ask an adult','Je m’arrête et je demande à un adulte','أتوقف وأسأل بالغاً')],a:1,why:T('A drawing site does not need those details. Too many questions is a warning sign.','Un site de dessin n’a pas besoin de ça. Trop de questions, c’est un signal d’alerte.','موقع الرسم لا يحتاج هذه البيانات. كثرة الأسئلة علامة تحذير.')},
 {q:T('A pop-up says: “Your computer has a virus! Call this number!”','Une fenêtre dit : « Ton ordinateur a un virus ! Appelle ce numéro ! »','نافذة تقول: «حاسوبك فيه فيروس! اتصل بهذا الرقم!»'),opts:[T('Call right away','J’appelle tout de suite','أتصل فوراً'),T('Close it and tell an adult','Je la ferme et j’en parle à un adulte','أغلقها وأخبر بالغاً')],a:1,why:T('Real warnings do not ask you to phone strangers. This is a scare trick.','Les vraies alertes ne te demandent pas d’appeler des inconnus. C’est une ruse pour faire peur.','التحذيرات الحقيقية لا تطلب منك الاتصال بغرباء. هذه حيلة تخويف.')},
 {q:T('Your teacher shows the class website link on the board during a lesson.','Ton professeur affiche le lien du site de la classe au tableau pendant le cours.','معلمك يعرض رابط موقع الصف على السبورة أثناء الدرس.'),opts:[T('Open it with your class, it is safe','Je l’ouvre avec ma classe, c’est sûr','أفتحه مع صفي، فهو آمن'),T('Never open any link ever','Je n’ouvre jamais aucun lien','لا أفتح أي رابط أبداً')],a:0,why:T('Not everything is risky! A link from a trusted adult, in a place you know, is fine.','Tout n’est pas risqué ! Un lien d’un adulte de confiance, dans un endroit que tu connais, c’est bon.','ليس كل شيء خطيراً! رابط من بالغ موثوق في مكان تعرفه لا بأس به.')}
];

/* Decoder levels (Caesar). */
C.decoder=[
 {cipher:'IFMMP',shift:1,ans:'HELLO',hint:T('Byte moved every letter ONE step forward. It is a greeting!','Byte a décalé chaque lettre d’UN cran. C’est une salutation !','حرّك بايت كل حرف خطوة واحدة. إنها تحية!')},
 {cipher:'FDVWOH',shift:3,ans:'CASTLE',hint:T('Try a shift of 3. It is a place with towers.','Essaie un décalage de 3. C’est un lieu avec des tours.','جرّب إزاحة 3. إنه مكان فيه أبراج.')},
 {cipher:'XJHWJY HTIJ',shift:5,ans:'SECRET CODE',hint:T('Two words. The wheel is on a bigger number this time!','Deux mots. La roue est sur un plus grand nombre cette fois !','كلمتان. العجلة على رقم أكبر هذه المرة!')}
];

/* Firewall */
C.fwPatterns=[
 {id:'password',label:T('asks for a password','demande un mot de passe','يطلب كلمة سر')},
 {id:'prize',label:T('promises a free prize','promet un cadeau gratuit','يعد بجائزة مجانية')},
 {id:'link',label:T('has a strange link','contient un lien étrange','فيه رابط غريب')},
 {id:'unknown',label:T('comes from a stranger','vient d’un inconnu','قادم من شخص غريب')},
 {id:'known',label:T('comes from someone I know','vient de quelqu’un que je connais','قادم من شخص أعرفه')}
];
C.fwEvents=[
 {tags:['known'],bad:0,label:T('Message from Mom: “Dinner is at 6!”','Message de maman : « Dîner à 18 h ! »','رسالة من ماما: «العشاء الساعة السادسة!»')},
 {tags:['prize','link'],bad:1,label:T('Pop-up: “FREE tablet! Click now!”','Fenêtre : « Tablette GRATUITE ! Clique ! »','نافذة: «جهاز لوحي مجاني! انقر الآن!»')},
 {tags:['password','unknown'],bad:1,label:T('Stranger: “Tell me your password.”','Inconnu : « Dis-moi ton mot de passe. »','غريب: «أخبرني بكلمة سرك.»')},
 {tags:['update'],bad:0,label:T('Update from the real app store','Mise à jour de la vraie boutique','تحديث من متجر التطبيقات الحقيقي')},
 {tags:['link','unknown'],bad:1,label:T('Email from bank-secure.example with a strange link','E-mail de bank-secure.example avec un lien étrange','بريد من bank-secure.example فيه رابط غريب')},
 {tags:['known'],bad:0,label:T('Friend invites you to play','Un ami t’invite à jouer','صديق يدعوك للعب')}
];

/* Mazes: # wall, S start, F flag, K key, X suspicious device. */
C.blockLevels=[
 {map:['#######','#S...F#','#######'],dir:1,title:T('One step at a time','Un pas après l’autre','خطوة بعد خطوة'),
  tip:T('Add “Move forward” blocks until Byte reaches the flag.','Ajoute des blocs « Avancer » jusqu’au drapeau.','أضف كتل «تقدّم» حتى يصل بايت إلى العلم.'),allow:['move']},
 {map:['#####','#S..#','###.#','#F..#','#####'],dir:1,title:T('Turn the corner','Tourne au coin','انعطف عند الزاوية'),
  tip:T('Use turns. Byte starts facing right.','Utilise les virages. Byte regarde à droite au départ.','استخدم الانعطاف. يبدأ بايت متجهاً لليمين.'),allow:['move','left','right']},
 {map:['##########','#S......F#','##########'],dir:1,title:T('The long hallway','Le long couloir','الممر الطويل'),
  tip:T('Use Repeat so you do not need so many blocks!','Utilise Répéter pour éviter d’utiliser trop de blocs !','استخدم كرّر حتى لا تحتاج إلى كتل كثيرة!'),allow:['move','left','right','repeat']},
 {map:['#######','#S....#','#####.#','#F....#','#######'],dir:1,title:T('If you see a wall','Si tu vois un mur','إذا رأيت جداراً'),
  tip:T('Repeat: IF wall ahead turn right, ELSE move forward.','Répète : SI mur devant tourne à droite, SINON avance.','كرّر: إذا كان أمامك جدار انعطف يميناً وإلا تقدّم.'),allow:['move','left','right','repeat','if']},
 {map:['#######','#S.K..#','#X###.#','#F.K..#','#######'],dir:1,title:T('Keys and a sneaky device','Clés et appareil sournois','مفاتيح وجهاز مخادع'),
  tip:T('Collect both keys, then reach the flag. Avoid the suspicious device X.','Prends les deux clés puis va au drapeau. Évite l’appareil suspect X.','اجمع المفتاحين ثم اذهب إلى العلم. تجنّب الجهاز المشبوه X.'),allow:['move','left','right','repeat','if','collect']}
];
C.mazeLevels=[
 {map:['#########','#S..#...#','#.#.#.#.#','#.#...#K#','#.#####.#','#K....#.#','#####.#.#','#F....#X#','#########']},
 {map:['###########','#S...#...K#','###.##.##.#','#...#..#..#','#.###.##.##','#.#K..#..F#','#.#.###.###','#...#X..K.#','###########']}
];
C.badges=[
 {id:'first',color:'#ffc531',icon:'star',name:T('First Steps','Premiers pas','الخطوات الأولى'),desc:T('Finish your first mission or challenge.','Termine ta première mission ou ton premier défi.','أنهِ أول مهمة أو تحدٍّ.')},
 {id:'pw',color:'#7a5cff',icon:'lock',name:T('Password Guardian','Gardien des mots de passe','حارس كلمات السر'),desc:T('Finish both Password Castle missions.','Termine les deux missions du Château.','أنهِ مهمتَي قلعة كلمات السر.')},
 {id:'phish',color:'#ff8a3d',icon:'mail',name:T('Phishing Detective','Détective anti-hameçonnage','محقق الاحتيال'),desc:T('Finish both Phishing City missions.','Termine les deux missions de la Ville.','أنهِ مهمتَي مدينة الاحتيال.')},
 {id:'code',color:'#12b5c0',icon:'cipher',name:T('Secret Code Breaker','Briseur de codes secrets','كاسر الشيفرات'),desc:T('Finish both Secret Laboratory missions.','Termine les deux missions du Laboratoire.','أنهِ مهمتَي المختبر السري.')},
 {id:'prog',color:'#2f6bff',icon:'blocks',name:T('Master Programmer','Maître programmeur','المبرمج الماهر'),desc:T('Finish both block-programming missions.','Termine les deux missions de blocs.','أنهِ مهمتَي البرمجة بالكتل.')},
 {id:'ctf',color:'#e5484d',icon:'flag',name:T('Flag Hunter','Chasseur de drapeaux','صائد الأعلام'),desc:T('Capture 5 CTF flags.','Capture 5 drapeaux CTF.','التقط 5 أعلام CTF.')},
 {id:'hero',color:'#1fb877',icon:'shield',name:T('Cyber Hero','Cyber Héros','البطل السيبراني'),desc:T('Finish every mission in all five worlds.','Termine toutes les missions des cinq mondes.','أنهِ كل المهام في العوالم الخمسة.')}
];
})();
