/* College mode content: Linux/Kali modules, command reference, terminal lab tasks and advanced CTF. All fictional + safe. */
(function(){
const {T}=CKI;const C=window.CKC;

/* ---- Command reference (also powers `help` and `man` in the simulated shell) ---- */
const cm=(c,u,en,fr,ar)=>({c,u,d:T(en,fr,ar)});
C.cmds=[
cm('pwd','pwd','Print the folder you are in.','Affiche le dossier où tu te trouves.','يعرض المجلد الذي أنت فيه.'),
cm('ls','ls [-a] [-l] [path]','List files. -a shows hidden files, -l shows details.','Liste les fichiers. -a montre les fichiers cachés, -l les détails.','يعرض الملفات. الخيار -a يُظهر المخفية و-l يُظهر التفاصيل.'),
cm('cd','cd <folder>','Change folder. cd .. goes up, cd ~ goes home.','Change de dossier. cd .. remonte, cd ~ va à la maison.','ينتقل بين المجلدات. cd .. للأعلى و cd ~ للمنزل.'),
cm('cat','cat <file>','Show the whole content of a file.','Affiche tout le contenu d’un fichier.','يعرض محتوى الملف كاملاً.'),
cm('head','head [-n N] <file>','Show the first lines of a file.','Affiche les premières lignes d’un fichier.','يعرض الأسطر الأولى من الملف.'),
cm('tail','tail [-n N] <file>','Show the last lines of a file.','Affiche les dernières lignes d’un fichier.','يعرض الأسطر الأخيرة من الملف.'),
cm('grep','grep [-i] [-n] [-c] [-v] <text> <file>','Search for text. -i ignores case, -c counts, -v inverts.','Cherche du texte. -i ignore la casse, -c compte, -v inverse.','يبحث عن نص. -i يتجاهل حالة الأحرف و-c يعدّ و-v يعكس.'),
cm('wc','wc [-l] [-w] [-c] <file>','Count lines, words or characters.','Compte les lignes, mots ou caractères.','يعدّ الأسطر أو الكلمات أو المحارف.'),
cm('sort','sort <file>','Sort lines alphabetically.','Trie les lignes par ordre alphabétique.','يرتّب الأسطر أبجدياً.'),
cm('uniq','uniq [-c]','Remove repeated neighbor lines. -c counts them.','Supprime les lignes voisines répétées. -c les compte.','يحذف الأسطر المتجاورة المكررة. -c يعدّها.'),
cm('echo','echo <text>','Print text. With > it writes into a file.','Affiche du texte. Avec > il l’écrit dans un fichier.','يطبع نصاً. ومع > يكتبه في ملف.'),
cm('mkdir','mkdir <folder>','Create a folder.','Crée un dossier.','ينشئ مجلداً.'),
cm('touch','touch <file>','Create an empty file.','Crée un fichier vide.','ينشئ ملفاً فارغاً.'),
cm('cp','cp <from> <to>','Copy a file.','Copie un fichier.','ينسخ ملفاً.'),
cm('mv','mv <from> <to>','Move or rename a file.','Déplace ou renomme un fichier.','ينقل ملفاً أو يغيّر اسمه.'),
cm('rm','rm [-r] <file>','Delete a file for good. There is no trash!','Supprime un fichier définitivement. Pas de corbeille !','يحذف الملف نهائياً. لا يوجد سلة محذوفات!'),
cm('chmod','chmod +x <file>','Change permissions. +x makes a file runnable.','Change les permissions. +x rend un fichier exécutable.','يغيّر الصلاحيات. +x يجعل الملف قابلاً للتشغيل.'),
cm('whoami','whoami','Show your user name.','Affiche ton nom d’utilisateur.','يعرض اسم المستخدم.'),
cm('id','id','Show your user and group numbers.','Affiche tes numéros d’utilisateur et de groupe.','يعرض أرقام المستخدم والمجموعات.'),
cm('uname','uname [-a]','Show system information.','Affiche des informations système.','يعرض معلومات النظام.'),
cm('find','find <path> -name <pattern>','Search for files by name, e.g. find / -name "*.key".','Cherche des fichiers par nom, ex. find / -name "*.key".','يبحث عن ملفات بالاسم مثل find / -name "*.key".'),
cm('man','man <command>','Read the manual of a command.','Lit le manuel d’une commande.','يعرض دليل استخدام أمر.'),
cm('history','history','List the commands you typed.','Liste les commandes que tu as tapées.','يعرض الأوامر التي كتبتها.'),
cm('clear','clear','Clear the screen.','Efface l’écran.','يمسح الشاشة.'),
cm('sudo','sudo <command>','Run one command as administrator (careful!).','Exécute une commande en administrateur (attention !).','ينفّذ أمراً بصلاحيات المدير (احذر!).'),
cm('apt','sudo apt update | install <pkg>','Update the package list or install software.','Met à jour la liste des paquets ou installe un logiciel.','يحدّث قائمة الحزم أو يثبّت برنامجاً.'),
cm('nmap','nmap [-sV] <target>','Scan a network target for open ports. Practice target only here.','Scanne une cible réseau pour trouver des ports ouverts. Cible d’entraînement uniquement ici.','يفحص هدفاً شبكياً بحثاً عن منافذ مفتوحة. هدف التدريب فقط هنا.')
];

/* ---- Learning modules ---- */
const M=(id,icon,title,paras,cmds,q,right,wrong,task)=>({id,icon,title,paras,cmds,q,right,wrong,task});
C.linux=[
M('kali','shield',T('What is Kali Linux?','Qu’est-ce que Kali Linux ?','ما هو Kali Linux؟'),[
 T('Kali Linux is a free operating system made for security work. It is based on Debian and ships with hundreds of tools for testing and learning.','Kali Linux est un système d’exploitation gratuit conçu pour la sécurité. Basé sur Debian, il contient des centaines d’outils de test et d’apprentissage.','Kali Linux نظام تشغيل مجاني مخصص لعمل الأمن السيبراني. مبني على Debian ويضم مئات الأدوات للاختبار والتعلم.'),
 T('Professionals use it to find weaknesses before criminals do, always with permission.','Les professionnels l’utilisent pour trouver des failles avant les criminels, toujours avec autorisation.','يستخدمه المحترفون لإيجاد الثغرات قبل المجرمين وبإذن دائماً.'),
 T('You do not need to replace your computer. A virtual machine (VM) keeps Kali safe and separate from your files.','Pas besoin de remplacer ton ordinateur. Une machine virtuelle (VM) garde Kali isolé de tes fichiers.','لا تحتاج إلى استبدال حاسوبك. الآلة الافتراضية (VM) تُبقي Kali منفصلاً وآمناً عن ملفاتك.')],
 ['uname','whoami'],T('The safest way to try Kali for the first time is…','La façon la plus sûre d’essayer Kali la première fois est…','أكثر طريقة آمنة لتجربة Kali أول مرة هي…'),T('In a virtual machine','Dans une machine virtuelle','داخل آلة افتراضية'),T('On your school network without asking','Sur le réseau de l’école sans demander','على شبكة المدرسة دون استئذان'),'t1'),
M('ethics','lock',T('Hacking with permission','Pirater avec autorisation','الاختراق بإذن'),[
 T('Rule one: written permission and a clear scope (what you may test, when, and how).','Règle n°1 : une autorisation écrite et un périmètre clair (quoi, quand, comment).','القاعدة الأولى: إذن مكتوب ونطاق واضح (ما يُسمح باختباره ومتى وكيف).'),
 T('Stay inside the scope, report what you find responsibly, and never keep or share private data.','Reste dans le périmètre, signale ce que tu trouves de façon responsable, ne garde ni ne partage jamais de données privées.','التزم بالنطاق وأبلغ عمّا تجده بمسؤولية ولا تحتفظ ببيانات خاصة ولا تشاركها أبداً.'),
 T('Computer misuse laws apply even if you only “looked around”. Curiosity is great; unauthorized access is a crime.','Les lois sur la cybercriminalité s’appliquent même si tu as seulement « regardé ». La curiosité est super ; l’accès non autorisé est un délit.','قوانين الجرائم المعلوماتية تنطبق حتى لو «ألقيت نظرة» فقط. الفضول رائع، أما الدخول غير المصرّح فجريمة.')],
 [],T('What makes a security test legal?','Qu’est-ce qui rend un test de sécurité légal ?','ما الذي يجعل اختبار الأمان قانونياً؟'),T('Written permission and a clear scope','Une autorisation écrite et un périmètre clair','إذن مكتوب ونطاق واضح'),T('Good intentions are enough','Les bonnes intentions suffisent','حسن النية يكفي'),null),
M('nav','maze',T('Moving around the terminal','Se déplacer dans le terminal','التنقل في الطرفية'),[
 T('The terminal is a text window where you type commands. The shell reads them and answers.','Le terminal est une fenêtre de texte où l’on tape des commandes. Le shell les lit et répond.','الطرفية نافذة نصية تكتب فيها الأوامر ويقرؤها الـ shell ويجيب.'),
 T('Start with three commands: pwd (where am I?), ls (what is here?), cd (go there).','Commence par trois commandes : pwd (où suis-je ?), ls (qu’y a-t-il ici ?), cd (aller là).','ابدأ بثلاثة أوامر: pwd (أين أنا؟) و ls (ماذا هنا؟) و cd (اذهب إلى هناك).'),
 T('Paths: / is the top of the system, ~ is your home folder, .. is one level up.','Chemins : / est le sommet du système, ~ ton dossier personnel, .. un niveau au-dessus.','المسارات: / قمة النظام و ~ مجلدك الشخصي و .. مستوى أعلى.')],
 ['pwd','ls','cd','man'],T('Which command shows your current folder?','Quelle commande affiche ton dossier actuel ?','أي أمر يعرض مجلدك الحالي؟'),T('pwd','pwd','pwd'),T('cd','cd','cd'),'t1'),
M('files','blocks',T('Working with files','Travailler avec des fichiers','العمل مع الملفات'),[
 T('Read files with cat (everything), head (the start) and tail (the end).','Lis les fichiers avec cat (tout), head (le début) et tail (la fin).','اقرأ الملفات بـ cat (الكل) و head (البداية) و tail (النهاية).'),
 T('Organize with mkdir (new folder), touch (new file), cp (copy) and mv (move or rename).','Organise avec mkdir (nouveau dossier), touch (nouveau fichier), cp (copier) et mv (déplacer ou renommer).','نظّم بـ mkdir (مجلد جديد) و touch (ملف جديد) و cp (نسخ) و mv (نقل أو إعادة تسمية).'),
 T('rm deletes for good: there is no recycle bin. Read the command twice before pressing Enter.','rm supprime définitivement : pas de corbeille. Relis la commande deux fois avant Entrée.','rm يحذف نهائياً: لا توجد سلة محذوفات. اقرأ الأمر مرتين قبل الضغط على Enter.')],
 ['cat','head','tail','mkdir','touch','cp','mv','rm'],T('rm deletes a file…','rm supprime un fichier…','الأمر rm يحذف الملف…'),T('permanently, with no recycle bin','définitivement, sans corbeille','نهائياً ودون سلة محذوفات'),T('and keeps a copy in the trash','et en garde une copie dans la corbeille','ويحتفظ بنسخة في سلة المهملات'),'t5'),
M('text','cipher',T('Searching text and pipes','Chercher du texte et les pipes','البحث في النصوص والأنابيب'),[
 T('grep searches text inside files. Add -i to ignore capital letters, -c to count matches.','grep cherche du texte dans les fichiers. -i ignore la casse, -c compte les résultats.','يبحث grep عن نص داخل الملفات. أضف -i لتجاهل حالة الأحرف و -c لعدّ النتائج.'),
 T('A pipe | feeds one command’s output into the next: cat server.log | grep ERROR | wc -l','Un pipe | envoie la sortie d’une commande à la suivante : cat server.log | grep ERROR | wc -l','الأنبوب | يمرّر مخرجات أمر إلى الأمر التالي: cat server.log | grep ERROR | wc -l'),
 T('> writes output into a file (replacing it). >> adds to the end of the file.','> écrit la sortie dans un fichier (en le remplaçant). >> ajoute à la fin.','الرمز > يكتب المخرجات في ملف (ويستبدله) و >> يضيف في النهاية.')],
 ['grep','wc','sort','uniq','echo','find'],T('What does the pipe | do?','Que fait le pipe | ?','ماذا يفعل الأنبوب | ؟'),T('Sends one command’s output to the next','Envoie la sortie d’une commande à la suivante','يمرّر مخرجات أمر إلى الأمر التالي'),T('Deletes the file','Supprime le fichier','يحذف الملف'),'t6'),
M('perm','key',T('Permissions and users','Permissions et utilisateurs','الصلاحيات والمستخدمون'),[
 T('ls -l shows permissions like -rwxr--r--: owner, group, others, each with r (read), w (write), x (execute).','ls -l affiche des permissions comme -rwxr--r-- : propriétaire, groupe, autres, chacun avec r (lire), w (écrire), x (exécuter).','يعرض ls -l صلاحيات مثل -rwxr--r--: المالك والمجموعة والآخرون، لكل منهم r (قراءة) و w (كتابة) و x (تنفيذ).'),
 T('chmod +x script.sh makes a file runnable. whoami and id tell you who you are.','chmod +x script.sh rend un fichier exécutable. whoami et id te disent qui tu es.','الأمر chmod +x script.sh يجعل الملف قابلاً للتشغيل، و whoami و id يخبرانك من أنت.'),
 T('sudo runs ONE command as administrator (root). Root can break everything, so use it with care.','sudo exécute UNE commande en administrateur (root). Root peut tout casser : prudence.','ينفّذ sudo أمراً واحداً بصلاحيات المدير (root). والمدير قادر على إتلاف كل شيء فاستخدمه بحذر.')],
 ['chmod','whoami','id','sudo'],T('To make script.sh runnable you use…','Pour rendre script.sh exécutable, on utilise…','لجعل script.sh قابلاً للتشغيل تستخدم…'),T('chmod +x script.sh','chmod +x script.sh','chmod +x script.sh'),T('rm script.sh','rm script.sh','rm script.sh'),'t8'),
M('tools','device',T('A tour of Kali tools','Visite des outils Kali','جولة في أدوات Kali'),[
 T('Kali groups tools by job: information gathering, web, passwords, forensics, sniffing and more. Learn the idea behind each one.','Kali range les outils par métier : collecte d’informations, web, mots de passe, forensique, écoute réseau… Comprends l’idée derrière chacun.','يصنّف Kali الأدوات حسب المهمة: جمع المعلومات والويب وكلمات السر والتحقيق الرقمي والتنصّت الشبكي وغيرها. افهم فكرة كل أداة.'),
 T('Nmap: map devices and open ports. Wireshark: watch network traffic. Burp Suite: inspect and test web apps. John the Ripper: check how weak password hashes are. Autopsy: examine disk images. Metasploit: a framework for authorized lab testing.','Nmap : cartographier appareils et ports ouverts. Wireshark : observer le trafic réseau. Burp Suite : inspecter et tester des applications web. John the Ripper : mesurer la faiblesse de hachages de mots de passe. Autopsy : examiner des images disque. Metasploit : cadre pour des tests de labo autorisés.','Nmap: رسم خريطة للأجهزة والمنافذ المفتوحة. Wireshark: مراقبة حركة الشبكة. Burp Suite: فحص واختبار تطبيقات الويب. John the Ripper: قياس ضعف تجزئات كلمات السر. Autopsy: فحص صور الأقراص. Metasploit: إطار عمل للاختبار المصرّح به في المختبرات.'),
 T('Every tool is for authorized testing and learning only. Try Nmap in the Terminal Lab on the practice target.','Chaque outil sert uniquement aux tests autorisés et à l’apprentissage. Essaie Nmap dans le labo Terminal sur la cible d’entraînement.','كل أداة للاختبار المصرّح به والتعلم فقط. جرّب Nmap في مختبر الطرفية على هدف التدريب.')],
 ['nmap','apt'],T('Wireshark is mostly used to…','Wireshark sert surtout à…','يُستخدم Wireshark غالباً من أجل…'),T('Look at network traffic','Observer le trafic réseau','مراقبة حركة الشبكة'),T('Write documents','Écrire des documents','كتابة المستندات'),'t12'),
M('lab','academy',T('Build your safe lab','Construis ton labo sûr','ابنِ مختبرك الآمن'),[
 T('Run Kali in a VM, and add a second VM as a practice target on a private (host-only) network.','Fais tourner Kali dans une VM et ajoute une seconde VM comme cible sur un réseau privé (host-only).','شغّل Kali في آلة افتراضية وأضف آلة ثانية كهدف تدريب على شبكة خاصة (host-only).'),
 T('Take snapshots before experiments so you can undo mistakes in seconds. Keep notes of what you try.','Fais des instantanés avant d’expérimenter pour annuler une erreur en quelques secondes. Garde des notes.','التقط لقطات (snapshots) قبل التجارب لتتراجع عن الأخطاء بثوانٍ. دوّن ملاحظاتك.'),
 T('Practice legally: your own lab, learning platforms and CTF events (like the ones from Junior Securinets).','Entraîne-toi légalement : ton propre labo, des plateformes d’apprentissage et des CTF (comme ceux de Junior Securinets).','تدرّب قانونياً: في مختبرك الخاص ومنصات التعلم وفعاليات CTF (مثل فعاليات جونيور سيكيورينتس).')],
 [],T('A good place to practice is…','Un bon endroit pour s’entraîner est…','مكان جيد للتدريب هو…'),T('Your own isolated lab or a CTF platform','Ton labo isolé ou une plateforme CTF','مختبرك المعزول أو منصة CTF'),T('A random website','Un site web au hasard','موقع عشوائي'),null)
];

/* ---- Terminal lab filesystem + tasks ---- */
C.labFS=()=>({
 home:{analyst:{
  missions:{
   'readme.txt':T('Welcome to the lab, defender! Everything here is pretend, so explore freely. Try: help','Bienvenue au labo, défenseur ! Tout est imaginaire ici, explore librement. Essaie : help','أهلاً بك في المختبر أيها المدافع! كل شيء هنا وهمي فاستكشف بحرية. جرّب: help'),
   'server.log':'2026-01-10 08:00:01 INFO service started\n2026-01-10 08:01:12 INFO user alice logged in\n2026-01-10 08:03:45 ERROR disk almost full\n2026-01-10 08:04:10 INFO backup finished\n2026-01-10 08:07:33 WARN slow response\n2026-01-10 08:09:02 ERROR cannot reach database\n2026-01-10 08:10:15 INFO user bob logged in\n2026-01-10 08:12:50 INFO cache cleared',
   'script.sh':['#!/bin/bash\necho "hello"',{m:'rw-r--r--',out:T('Script ran: hello, defender!','Script exécuté : bonjour, défenseur !','تم تشغيل السكربت: مرحباً أيها المدافع!')}],
  },
  docs:{'todo.txt':T('1. Learn pwd, ls, cd\n2. Learn grep\n3. Capture a flag','1. Apprendre pwd, ls, cd\n2. Apprendre grep\n3. Capturer un drapeau','1. تعلّم pwd و ls و cd\n2. تعلّم grep\n3. التقط علماً')},
  '.secret_note':T('You found a hidden file! Hidden files start with a dot.','Tu as trouvé un fichier caché ! Les fichiers cachés commencent par un point.','وجدت ملفاً مخفياً! الملفات المخفية تبدأ بنقطة.')
 }},
 etc:{hostname:'kali','os-release':'PRETTY_NAME="Kali GNU/Linux (practice lab)"\nID=kali'},
 var:{log:{'auth.log':'Jan 10 08:00 sshd: Accepted login for analyst\nJan 10 08:05 sshd: Accepted login for alice'}},
 opt:{keys:{'backup.key':'KEY-FICTIONAL-1234'}}
});
const TK=(id,en,fr,ar,gen,gfr,gar,hen,hfr,har,test)=>({id,title:T(en,fr,ar),goal:T(gen,gfr,gar),hint:T(hen,hfr,har),test});
C.tasks=[
TK('t1','Where am I?','Où suis-je ?','أين أنا؟','Print your current folder.','Affiche ton dossier actuel.','اطبع مجلدك الحالي.','Type pwd and press Enter.','Tape pwd puis Entrée.','اكتب pwd ثم اضغط Enter.',x=>/^pwd\b/.test(x.cmd)),
TK('t2','List the files','Lister les fichiers','اعرض الملفات','List what is in this folder.','Liste ce qui se trouve dans ce dossier.','اعرض ما في هذا المجلد.','Type ls.','Tape ls.','اكتب ls.',x=>/^ls\b/.test(x.cmd)&&!x.err),
TK('t3','Find the hidden file','Trouve le fichier caché','اعثر على الملف المخفي','Show hidden files and spot the one that starts with a dot.','Affiche les fichiers cachés et repère celui qui commence par un point.','أظهر الملفات المخفية وحدد الذي يبدأ بنقطة.','Use ls -a.','Utilise ls -a.','استخدم ls -a.',x=>/^ls\s+-\w*a/.test(x.cmd)&&x.out.indexOf('.secret_note')>=0),
TK('t4','Change folder','Changer de dossier','غيّر المجلد','Go into the missions folder.','Entre dans le dossier missions.','ادخل إلى مجلد missions.','Type cd missions.','Tape cd missions.','اكتب cd missions.',x=>/\/missions$/.test(x.cwd)),
TK('t5','Read a file','Lire un fichier','اقرأ ملفاً','Read readme.txt (you must be in missions).','Lis readme.txt (tu dois être dans missions).','اقرأ readme.txt (يجب أن تكون في missions).','Type cat readme.txt.','Tape cat readme.txt.','اكتب cat readme.txt.',x=>/^cat\s+.*readme/.test(x.cmd)&&!x.err),
TK('t6','Search with grep','Chercher avec grep','ابحث بـ grep','Show only the ERROR lines of server.log.','Affiche uniquement les lignes ERROR de server.log.','اعرض أسطر ERROR فقط من server.log.','Type grep ERROR server.log.','Tape grep ERROR server.log.','اكتب grep ERROR server.log.',x=>/^grep\b/.test(x.cmd)&&/ERROR/.test(x.out)),
TK('t7','Make a folder','Crée un dossier','أنشئ مجلداً','Create a folder called practice.','Crée un dossier nommé practice.','أنشئ مجلداً باسم practice.','Type mkdir practice.','Tape mkdir practice.','اكتب mkdir practice.',x=>/^mkdir\s+\S+/.test(x.cmd)&&!x.err),
TK('t8','Make it runnable','Rends-le exécutable','اجعله قابلاً للتشغيل','Make script.sh executable, then run it with ./script.sh','Rends script.sh exécutable puis lance-le avec ./script.sh','اجعل script.sh قابلاً للتنفيذ ثم شغّله بـ ./script.sh','First chmod +x script.sh, then ./script.sh','D’abord chmod +x script.sh, puis ./script.sh','أولاً chmod +x script.sh ثم ./script.sh',x=>/^\.\/script\.sh/.test(x.cmd)&&!x.err),
TK('t9','Use a pipe','Utilise un pipe','استخدم الأنبوب','Count the lines of server.log with cat and wc.','Compte les lignes de server.log avec cat et wc.','عدّ أسطر server.log بـ cat و wc.','cat server.log | wc -l','cat server.log | wc -l','cat server.log | wc -l',x=>/\|/.test(x.cmd)&&/wc/.test(x.cmd)&&!x.err),
TK('t10','Write to a file','Écrire dans un fichier','اكتب في ملف','Save a message into a file with >','Enregistre un message dans un fichier avec >','احفظ رسالة في ملف باستخدام >','echo hello > hi.txt','echo hello > hi.txt','echo hello > hi.txt',x=>/echo[^>]*>\s*\S+/.test(x.cmd)&&!x.err),
TK('t11','Find a file','Trouve un fichier','ابحث عن ملف','Find every file ending in .key on the whole system.','Trouve tous les fichiers finissant par .key sur tout le système.','ابحث عن كل الملفات المنتهية بـ .key في النظام.','find / -name "*.key"','find / -name "*.key"','find / -name "*.key"',x=>/^find\b/.test(x.cmd)&&/\.key/.test(x.out)),
TK('t12','Scan the practice target','Scanne la cible d’entraînement','افحص هدف التدريب','Run nmap on 10.0.0.5, the only allowed target.','Lance nmap sur 10.0.0.5, la seule cible autorisée.','شغّل nmap على 10.0.0.5 وهو الهدف الوحيد المسموح.','nmap 10.0.0.5','nmap 10.0.0.5','nmap 10.0.0.5',x=>/Nmap scan report/.test(x.out))
];

/* ---- Advanced CTF ---- */
C.pctfCats=[
 {id:'linux',color:'#0a8f5a',name:T('Linux','Linux','لينكس')},{id:'crypto',color:'#7a5cff',name:T('Crypto','Crypto','التشفير')},
 {id:'forensics',color:'#ff8a3d',name:T('Forensics','Forensique','التحقيق الرقمي')},{id:'network',color:'#2f6bff',name:T('Network','Réseau','الشبكات')},
 {id:'web',color:'#12b5c0',name:T('Web','Web','الويب')},{id:'reverse',color:'#d2467a',name:T('Reverse','Rétro-ingénierie','الهندسة العكسية')},
 {id:'ethics',color:'#1fb877',name:T('Ethics','Éthique','الأخلاقيات')}
];
const PH=(a,b,c)=>[T(...a),T(...b),T(...c)];
C.pctf=[
{id:'pe-1',pro:true,cat:'ethics',diff:'easy',mins:3,flag:'JSEC{SCOPE}',
 name:T('The Permission Slip','Le feu vert','تصريح الاختبار'),
 story:T('Four people want to “test security”. Only ONE is doing a legal, authorized test. Find it and submit its code word.','Quatre personnes veulent « tester la sécurité ». UNE SEULE fait un test légal et autorisé. Trouve-la et envoie son mot-code.','أربعة أشخاص يريدون «اختبار الأمان». واحد فقط يقوم باختبار قانوني مصرّح به. اعثر عليه وأرسل كلمته السرية.'),
 obj:T('Authorization and scope.','Autorisation et périmètre.','الإذن والنطاق.'),
 w:{type:'lines',lines:[['A',T('A company signs a contract with a written scope, and you test only the listed servers. [SCOPE]','Une entreprise signe un contrat avec un périmètre écrit et tu ne testes que les serveurs listés. [SCOPE]','شركة توقّع عقداً بنطاق مكتوب وأنت تختبر الخوادم المذكورة فقط. [SCOPE]')],['B',T('Your school site looks weak, so you try a few attacks “just to help”. [CURIOUS]','Le site de ton école a l’air fragile, tu tentes quelques attaques « pour aider ». [CURIOUS]','موقع مدرستك يبدو ضعيفاً فتجرّب بعض الهجمات «لمجرد المساعدة». [CURIOUS]')],['C',T('A friend dares you to test the neighbor’s Wi-Fi. [DARE]','Un ami te met au défi de tester le Wi-Fi du voisin. [DARE]','صديق يتحداك لاختبار شبكة واي فاي الجار. [DARE]')],['D',T('You find a leaked password list and try it on other sites. [LEAK]','Tu trouves une liste de mots de passe fuitée et tu l’essaies sur d’autres sites. [LEAK]','تجد قائمة كلمات سر مسرّبة وتجرّبها على مواقع أخرى. [LEAK]')]]},
 hints:PH(['Which one has a contract?','Laquelle a un contrat ?','أيها لديه عقد؟'],['Option A has written permission.','L’option A a une autorisation écrite.','الخيار A لديه إذن مكتوب.'],['Put SCOPE inside JSEC{ }.','Mets SCOPE dans JSEC{ }.','ضع SCOPE داخل JSEC{ }.']),
 explain:T('Good intentions are not permission. Written authorization and a clear scope make testing legal.','Les bonnes intentions ne sont pas une autorisation. Une autorisation écrite et un périmètre clair rendent le test légal.','حسن النية ليس إذناً. الإذن المكتوب والنطاق الواضح يجعلان الاختبار قانونياً.')},
{id:'pl-1',pro:true,cat:'linux',diff:'easy',mins:4,flag:'JSEC{HIDDEN_FILES_FOUND}',
 name:T('Dot Files','Fichiers cachés','الملفات المخفية'),
 story:T('An analyst left a file in the home folder, but plain ls does not show it. Use the practice terminal.','Un analyste a laissé un fichier dans le dossier personnel, mais ls seul ne le montre pas. Utilise le terminal d’entraînement.','ترك محلل ملفاً في المجلد الشخصي لكن ls وحده لا يظهره. استخدم طرفية التدريب.'),
 obj:T('Hidden files and cat.','Fichiers cachés et cat.','الملفات المخفية و cat.'),
 w:{type:'terminal',fs:{home:{analyst:{'notes.txt':T('Nothing to see here. Look closer.','Rien à voir ici. Regarde de plus près.','لا شيء هنا. دقّق أكثر.'),docs:{},'.flag_hidden':'JSEC{HIDDEN_FILES_FOUND}'}}}},
 hints:PH(['Hidden files start with a dot.','Les fichiers cachés commencent par un point.','الملفات المخفية تبدأ بنقطة.'],['ls -a shows them.','ls -a les montre.','ls -a يعرضها.'],['Then cat the dot file.','Puis cat sur ce fichier.','ثم استخدم cat على الملف.']),
 explain:T('Files whose names start with “.” are hidden by default. Attackers and admins both use them, so always check with ls -a.','Les fichiers dont le nom commence par « . » sont cachés par défaut. Attaquants et admins les utilisent, vérifie toujours avec ls -a.','الملفات التي تبدأ أسماؤها بـ «.» مخفية افتراضياً. يستخدمها المهاجمون والمدراء، فتحقق دائماً بـ ls -a.')},
{id:'pl-2',pro:true,cat:'linux',diff:'easy',mins:4,flag:'JSEC{GREP_MASTER}',
 name:T('Needle in a Log','Une aiguille dans le journal','إبرة في السجل'),
 story:T('A log file hides a debug token among many boring lines. Search it instead of reading everything.','Un journal cache un jeton de débogage parmi de nombreuses lignes ennuyeuses. Cherche au lieu de tout lire.','يخفي سجل رمز تصحيح بين أسطر مملة كثيرة. ابحث بدلاً من قراءة كل شيء.'),
 obj:T('grep on logs.','grep sur les journaux.','grep على السجلات.'),
 w:{type:'terminal',cwd:'/var/log',fs:{var:{log:{'auth.log':'Jan 10 08:00 sshd: Accepted login for alice\nJan 10 08:02 cron: job finished\nJan 10 08:03 sshd: Accepted login for bob\nJan 10 08:07 kernel: usb device connected\nJan 10 08:09 app: debug token JSEC{GREP_MASTER}\nJan 10 08:11 cron: job finished\nJan 10 08:15 sshd: session closed for bob\nJan 10 08:20 kernel: network up'}}},home:{analyst:{}}},
 hints:PH(['The file is auth.log.','Le fichier est auth.log.','الملف هو auth.log.'],['Search for the word token.','Cherche le mot token.','ابحث عن كلمة token.'],['grep token auth.log','grep token auth.log','grep token auth.log']),
 explain:T('grep turns a thousand lines into the one you need. Defenders search logs every day.','grep transforme mille lignes en celle dont tu as besoin. Les défenseurs fouillent les journaux chaque jour.','يحوّل grep ألف سطر إلى السطر الذي تحتاجه. يبحث المدافعون في السجلات يومياً.')},
{id:'pc-1',pro:true,cat:'crypto',diff:'easy',mins:4,flag:'JSEC{BASE64_IS_NOT_ENCRYPTION}',
 name:T('Base64 Is Not Encryption','Base64 n’est pas du chiffrement','Base64 ليس تشفيراً'),
 story:T('This string looks random but it is just encoded. Decode it with the toolbox.','Cette chaîne semble aléatoire mais elle est seulement encodée. Décode-la avec la boîte à outils.','تبدو هذه السلسلة عشوائية لكنها مرمّزة فقط. فكّها بصندوق الأدوات.'),
 obj:T('Encoding vs encryption.','Encodage et chiffrement.','الترميز والتشفير.'),
 w:{type:'toolbox',input:'SlNFQ3tCQVNFNjRfSVNfTk9UX0VOQ1JZUFRJT059'},
 hints:PH(['It ends with letters and no spaces. Base64 is common.','Elle n’a ni espace ni symbole étrange : typique de Base64.','لا مسافات فيها وهي نمط شائع لـ Base64.'],['Press Base64 decode.','Appuie sur Décoder Base64.','اضغط فك Base64.'],['Copy the result into the flag box.','Copie le résultat dans la case du drapeau.','انسخ الناتج إلى خانة العلم.']),
 explain:T('Encoding changes the format, not the secrecy. Anyone can reverse it with no key.','L’encodage change le format, pas le secret. N’importe qui l’inverse sans clé.','الترميز يغيّر الشكل لا السرية. يستطيع أي أحد عكسه دون مفتاح.')},
{id:'pc-2',pro:true,cat:'crypto',diff:'medium',mins:6,flag:'JSEC{CHAIN_OF_ENCODINGS}',
 name:T('Hex then ROT13','Hex puis ROT13','هكس ثم ROT13'),
 story:T('Two layers: first the text was shifted with ROT13, then written in hexadecimal. Peel both layers.','Deux couches : le texte a d’abord été décalé en ROT13 puis écrit en hexadécimal. Retire les deux.','طبقتان: أُزيح النص أولاً بـ ROT13 ثم كُتب بالنظام السداسي عشر. أزل الطبقتين.'),
 obj:T('Chaining decoders.','Enchaîner des décodeurs.','تسلسل أدوات فك الترميز.'),
 w:{type:'toolbox',input:'574652507b50554e56415f42535f5241504251564154467d'},
 hints:PH(['Undo the outer layer first: hex.','Défais d’abord la couche extérieure : hex.','أزل الطبقة الخارجية أولاً: هكس.'],['Hex → text, then “Use output as input”.','Hex → texte, puis « Utiliser la sortie comme entrée ».','هكس ← نص ثم «استخدم المخرج كمدخل».'],['Now apply ROT13.','Applique maintenant ROT13.','طبّق ROT13 الآن.']),
 explain:T('Layers are undone in reverse order. This habit is the core of decoding challenges.','On défait les couches dans l’ordre inverse. C’est le réflexe de base des défis de décodage.','تُفكّ الطبقات بالترتيب العكسي. هذه هي العادة الأساسية في تحديات فك الترميز.')},
{id:'pf-1',pro:true,cat:'forensics',diff:'medium',mins:6,flag:'JSEC{METADATA_TELLS_ALL}',
 name:T('Photo Metadata','Métadonnées d’une photo','البيانات الوصفية لصورة'),
 story:T('A fictional photo carries metadata. One field looks strange: it is written backwards.','Une photo fictive porte des métadonnées. Un champ semble étrange : il est écrit à l’envers.','صورة خيالية تحمل بيانات وصفية. أحد الحقول يبدو غريباً: مكتوب بالعكس.'),
 obj:T('Metadata is evidence.','Les métadonnées sont des preuves.','البيانات الوصفية دليل.'),
 w:{type:'multi',parts:[{type:'table',head:['Field','Value'],rows:[['File','holiday_photo.jpg'],['Camera','FictionalCam X1'],['Date','2026-01-12'],['Comment','}LLA_SLLET_ATADATEM{CESJ']]},{type:'toolbox',input:''}]},
 hints:PH(['Look at the Comment field.','Regarde le champ Comment.','انظر إلى حقل Comment.'],['Paste it in the toolbox.','Colle-le dans la boîte à outils.','الصقه في صندوق الأدوات.'],['Use Reverse.','Utilise Inverser.','استخدم عكس.']),
 explain:T('Photos and documents carry hidden details (time, device, comments). Forensics experts read them carefully.','Photos et documents portent des détails cachés (date, appareil, commentaires). Les experts forensiques les lisent avec soin.','تحمل الصور والمستندات تفاصيل مخفية (الوقت والجهاز والتعليقات). يقرؤها خبراء التحقيق الرقمي بعناية.')},
{id:'pn-1',pro:true,cat:'network',diff:'medium',mins:6,flag:'JSEC{TELNET_IS_CLEARTEXT}',
 name:T('Reading a Capture','Lire une capture','قراءة التقاط الشبكة'),
 story:T('This fictional packet capture mixes protocols. One of them sends its message in plain text, readable by anyone on the network. Find it.','Cette capture fictive mélange des protocoles. L’un envoie son message en clair, lisible par tous sur le réseau. Trouve-le.','يمزج هذا الالتقاط الخيالي بروتوكولات. أحدها يرسل رسالته نصاً واضحاً يقرؤه أي أحد في الشبكة. اعثر عليه.'),
 obj:T('Encrypted vs cleartext traffic.','Trafic chiffré ou en clair.','حركة مشفرة أو نصية.'),
 w:{type:'table',head:['No.','Time','Source','Destination','Protocol','Info'],rows:[['1','0.000','10.0.0.7','10.0.0.5','TCP','SYN'],['2','0.001','10.0.0.5','10.0.0.7','TCP','SYN, ACK'],['3','0.002','10.0.0.7','10.0.0.5','TLS','Application Data (encrypted)'],['4','0.140','10.0.0.9','10.0.0.5','TELNET','Data: note=JSEC{TELNET_IS_CLEARTEXT}'],['5','0.150','10.0.0.7','10.0.0.5','DNS','Standard query practice-server.lab'],['6','0.200','10.0.0.5','10.0.0.9','TELNET','Data: ok']]},
 hints:PH(['TLS is encrypted, so skip it.','TLS est chiffré, ignore-le.','TLS مشفّر فتجاوزه.'],['Look at the old protocol.','Regarde l’ancien protocole.','انظر إلى البروتوكول القديم.'],['The Info column of packet 4.','La colonne Info du paquet 4.','عمود Info في الحزمة 4.']),
 explain:T('Telnet sends everything in plain text, so we use SSH or TLS instead. Always prefer encrypted protocols.','Telnet envoie tout en clair : on utilise SSH ou TLS à la place. Préfère toujours les protocoles chiffrés.','يرسل Telnet كل شيء نصاً واضحاً لذا نستخدم SSH أو TLS. فضّل دائماً البروتوكولات المشفّرة.')},
{id:'px-1',pro:true,cat:'web',diff:'medium',mins:6,flag:'JSEC{VIEW_SOURCE_SKILLS}',
 name:T('View the Source','Voir le code source','عرض مصدر الصفحة'),
 story:T('A developer left a note in a fictional web page. Pages show you only part of what they contain.','Un développeur a laissé une note dans une page web fictive. Une page ne montre qu’une partie de ce qu’elle contient.','ترك مطوّر ملاحظة في صفحة ويب خيالية. الصفحات لا تعرض لك إلا جزءاً مما تحتويه.'),
 obj:T('Comments in page source.','Commentaires dans le code source.','التعليقات في مصدر الصفحة.'),
 w:{type:'multi',parts:[{type:'code',code:'<html>\n  <body>\n    <h1>Welcome to the practice shop</h1>\n    <!-- TODO remove before launch: SlNFQ3tWSUVXX1NPVVJDRV9TS0lMTFN9 -->\n    <p>Everything is on sale!</p>\n  </body>\n</html>'},{type:'toolbox',input:''}]},
 hints:PH(['Find the HTML comment.','Trouve le commentaire HTML.','اعثر على تعليق HTML.'],['The long string looks like Base64.','La longue chaîne ressemble à du Base64.','السلسلة الطويلة تشبه Base64.'],['Decode it in the toolbox.','Décode-la dans la boîte à outils.','فكّها في صندوق الأدوات.']),
 explain:T('Never put secrets in HTML comments or client-side code: everyone can read them.','Ne mets jamais de secrets dans des commentaires HTML ou du code côté client : tout le monde peut les lire.','لا تضع أسراراً في تعليقات HTML أو الشيفرة التي تعمل عند العميل: يستطيع الجميع قراءتها.')},
{id:'pl-3',pro:true,cat:'linux',diff:'medium',mins:6,flag:'JSEC{CHMOD_PLUS_X}',
 name:T('Permission Denied','Permission refusée','تم رفض الإذن'),
 story:T('vault.sh holds the flag, but it refuses to run. Fix its permissions, then run it.','vault.sh contient le drapeau mais refuse de s’exécuter. Corrige ses permissions puis lance-le.','يحتوي vault.sh على العلم لكنه يرفض التشغيل. أصلح صلاحياته ثم شغّله.'),
 obj:T('chmod and execution.','chmod et exécution.','chmod والتنفيذ.'),
 w:{type:'terminal',cwd:'/home/analyst',fs:{home:{analyst:{'vault.sh':['#!/bin/bash\n# prints the flag',{m:'rw-r--r--',out:'JSEC{CHMOD_PLUS_X}'}],'readme.txt':T('Run ./vault.sh to open the vault.','Lance ./vault.sh pour ouvrir le coffre.','شغّل ./vault.sh لفتح الخزنة.')}}}},
 hints:PH(['Try ./vault.sh first and read the error.','Essaie ./vault.sh et lis l’erreur.','جرّب ./vault.sh واقرأ الخطأ.'],['ls -l shows no x permission.','ls -l ne montre pas de permission x.','ls -l لا يُظهر صلاحية x.'],['chmod +x vault.sh then ./vault.sh','chmod +x vault.sh puis ./vault.sh','chmod +x vault.sh ثم ./vault.sh']),
 explain:T('A file needs the execute (x) permission to run as a program. Careful admins give only the permissions needed.','Un fichier a besoin de la permission d’exécution (x) pour tourner comme programme. Les bons admins donnent seulement les permissions nécessaires.','يحتاج الملف إلى صلاحية التنفيذ (x) ليعمل كبرنامج. والمدير الحريص يمنح الصلاحيات اللازمة فقط.')},
{id:'pl-4',pro:true,cat:'linux',diff:'medium',mins:7,flag:'JSEC{FAILED_7}',
 name:T('Count the Failures','Compte les échecs','عدّ المحاولات الفاشلة'),
 story:T('Someone keeps guessing logins. Count how many lines of auth.log contain FAILED, then build the flag JSEC{FAILED_N}.','Quelqu’un devine des identifiants. Compte combien de lignes de auth.log contiennent FAILED, puis forme le drapeau JSEC{FAILED_N}.','شخص يخمّن بيانات الدخول. عدّ كم سطراً في auth.log يحتوي FAILED ثم كوّن العلم JSEC{FAILED_N}.'),
 obj:T('Pipes: grep and wc.','Pipes : grep et wc.','الأنابيب: grep و wc.'),
 w:{type:'terminal',cwd:'/var/log',fs:{var:{log:{'auth.log':'08:00 LOGIN OK alice\n08:01 LOGIN FAILED root\n08:01 LOGIN FAILED root\n08:02 LOGIN FAILED admin\n08:03 LOGIN OK bob\n08:03 LOGIN FAILED guest\n08:04 LOGIN FAILED root\n08:05 LOGIN OK alice\n08:06 LOGIN FAILED admin\n08:07 LOGIN FAILED root\n08:08 LOGIN OK bob\n08:09 LOGIN OK alice'}}},home:{analyst:{}}},
 hints:PH(['Filter only lines with FAILED.','Filtre les lignes avec FAILED.','صفِّ الأسطر التي تحتوي FAILED.'],['Then count lines with wc -l.','Puis compte avec wc -l.','ثم عدّ الأسطر بـ wc -l.'],['grep FAILED auth.log | wc -l (or grep -c).','grep FAILED auth.log | wc -l (ou grep -c).','grep FAILED auth.log | wc -l (أو grep -c).']),
 explain:T('Many failed logins in a row can mean someone is guessing passwords. Defenders count and alert on it.','Beaucoup d’échecs de connexion d’affilée peuvent indiquer qu’on devine des mots de passe. Les défenseurs les comptent et alertent.','كثرة محاولات الدخول الفاشلة المتتالية قد تعني تخمين كلمات السر. يعدّها المدافعون وينبّهون عند ذلك.')},
{id:'pr-1',pro:true,cat:'reverse',diff:'medium',mins:6,flag:'JSEC{KALI}',
 name:T('Read the Code','Lis le code','اقرأ الشيفرة'),
 story:T('What does this small program print? Work it out by hand. Remember A is 65 in ASCII.','Que affiche ce petit programme ? Trouve-le à la main. Rappel : A vaut 65 en ASCII.','ماذا تطبع هذه الشيفرة الصغيرة؟ احسبها يدوياً. تذكّر أن A تساوي 65 في ASCII.'),
 obj:T('Reading code without running it.','Lire du code sans l’exécuter.','قراءة الشيفرة دون تشغيلها.'),
 w:{type:'code',code:'codes = [76, 66, 77, 74]\nword = ""\nfor c in codes:\n    word = word + chr(c - 1)\nprint(word)'},
 hints:PH(['chr(65) is A, chr(66) is B…','chr(65) donne A, chr(66) donne B…','chr(65) هو A و chr(66) هو B…'],['Subtract 1 from each number first.','Soustrais d’abord 1 à chaque nombre.','اطرح 1 من كل رقم أولاً.'],['75, 65, 75… 75 is K.','75 est K, 65 est A…','75 هو K و 65 هو A…']),
 explain:T('Reverse engineers read code to understand it. Here each number hides a letter shifted by one.','Les rétro-ingénieurs lisent le code pour le comprendre. Ici chaque nombre cache une lettre décalée de un.','يقرأ المهندسون العكسيون الشيفرة ليفهموها. هنا يخفي كل رقم حرفاً مُزاحاً بمقدار واحد.')},
{id:'pr-2',pro:true,cat:'reverse',diff:'challenge',mins:10,flag:'JSEC{KALI_LINUX}',
 name:T('Two Lists','Deux listes','قائمتان'),
 story:T('Work out what the program prints. The second list is read backwards. The output is your flag content.','Trouve ce que le programme affiche. La seconde liste est lue à l’envers. La sortie est le contenu du drapeau.','اعرف ما يطبعه البرنامج. القائمة الثانية تُقرأ بالعكس. المخرجات هي محتوى العلم.'),
 obj:T('Multi-step code reasoning.','Raisonnement sur du code en plusieurs étapes.','استدلال متعدد الخطوات على الشيفرة.'),
 w:{type:'code',code:'a = [76, 66, 77, 74]\nb = [89, 86, 79, 74, 77]\nfirst = "".join(chr(c - 1) for c in a)\nsecond = "".join(chr(c - 1) for c in reversed(b))\nprint(first + "_" + second)'},
 hints:PH(['Decode a first (subtract 1).','Décode d’abord a (soustrais 1).','فك a أولاً (اطرح 1).'],['reversed(b) reads b from the end: 77, 74, 79…','reversed(b) lit b depuis la fin : 77, 74, 79…','reversed(b) تقرأ b من النهاية: 77, 74, 79…'],['Join with _ and wrap in JSEC{ }.','Relie avec _ et mets dans JSEC{ }.','اربط بـ _ وضعها داخل JSEC{ }.']),
 explain:T('Tracing code step by step, by hand, is the base skill behind malware analysis and bug hunting.','Suivre le code pas à pas, à la main, est la compétence de base de l’analyse de malwares et de la chasse aux bugs.','تتبّع الشيفرة خطوة بخطوة يدوياً هو المهارة الأساسية في تحليل البرمجيات الخبيثة وصيد الثغرات.')},
{id:'pc-3',pro:true,cat:'crypto',diff:'challenge',mins:10,flag:'JSEC{LAYERS_LIKE_AN_ONION}',
 name:T('Onion Layers','Les couches de l’oignon','طبقات البصلة'),
 story:T('Three layers were applied to the flag: ROT13, then reversed, then Base64. Peel them in the right order.','Trois couches ont été appliquées au drapeau : ROT13, puis inversion, puis Base64. Retire-les dans le bon ordre.','طُبّقت ثلاث طبقات على العلم: ROT13 ثم العكس ثم Base64. أزلها بالترتيب الصحيح.'),
 obj:T('Undo layers in reverse order.','Défaire les couches à l’envers.','فك الطبقات بالترتيب العكسي.'),
 w:{type:'toolbox',input:'fUFCVkFCX0FOX1JYVllfRkVSTE5Ze1BSRlc='},
 hints:PH(['The last layer applied was Base64: decode first.','La dernière couche est Base64 : décode d’abord.','آخر طبقة هي Base64: فكّها أولاً.'],['Then reverse the text.','Puis inverse le texte.','ثم اعكس النص.'],['Finally ROT13.','Enfin ROT13.','وأخيراً ROT13.']),
 explain:T('Peel layers in reverse order of how they were added: last in, first out.','Retire les couches dans l’ordre inverse de leur ajout : dernier entré, premier sorti.','أزل الطبقات بعكس ترتيب إضافتها: آخر ما أُضيف أول ما يُزال.')},
{id:'pl-5',pro:true,cat:'linux',diff:'challenge',mins:10,flag:'JSEC{FIND_AND_CAT}',
 name:T('Treasure Hunt','Chasse au trésor','البحث عن الكنز'),
 story:T('Several .key files are scattered across the system. Only one holds the flag, and some are decoys. Search, then read.','Plusieurs fichiers .key sont dispersés dans le système. Un seul contient le drapeau, les autres sont des leurres. Cherche puis lis.','ملفات .key كثيرة منتشرة في النظام. واحد فقط يحتوي العلم والبقية خدع. ابحث ثم اقرأ.'),
 obj:T('find, paths and cat together.','find, chemins et cat ensemble.','find والمسارات و cat معاً.'),
 w:{type:'terminal',cwd:'/home/analyst',fs:{home:{analyst:{'hint.txt':T('The real key is not in the usual places.','La vraie clé n’est pas aux endroits habituels.','المفتاح الحقيقي ليس في الأماكن المعتادة.')}},etc:{ssh:{'decoy.key':'not here'}},opt:{keys:{'old.key':'expired'}},srv:{archive:{old:{'.cache':{'treasure.key':'JSEC{FIND_AND_CAT}'}}}}}},
 hints:PH(['find / -name "*.key" lists them all.','find / -name "*.key" les liste toutes.','find / -name "*.key" يعرضها كلها.'],['Three files, one in a hidden folder.','Trois fichiers, un dans un dossier caché.','ثلاثة ملفات وأحدها في مجلد مخفي.'],['cat the one inside .cache.','cat sur celui dans .cache.','استخدم cat على الموجود في .cache.']),
 explain:T('find locates files by name anywhere on the system, a core tool for investigators and admins.','find localise des fichiers par nom n’importe où dans le système : un outil central pour enquêteurs et admins.','يحدّد find الملفات بالاسم في أي مكان من النظام، وهو أداة أساسية للمحققين والمدراء.')}
];

C.cbadges=[
 {id:'lx',color:'#0a8f5a',icon:'shield',name:T('Linux Learner','Apprenti Linux','متعلّم لينكس'),desc:T('Finish 6 Linux & Kali modules.','Termine 6 modules Linux & Kali.','أنهِ 6 وحدات في لينكس وكالي.')},
 {id:'term',color:'#2f6bff',icon:'maze',name:T('Terminal Ninja','Ninja du terminal','نينجا الطرفية'),desc:T('Complete 8 Terminal Lab tasks.','Réussis 8 tâches du labo Terminal.','أكمل 8 مهام في مختبر الطرفية.')},
 {id:'pro',color:'#d2467a',icon:'flag',name:T('Pro Flag Hunter','Chasseur de drapeaux Pro','صائد أعلام محترف'),desc:T('Capture 6 pro CTF flags.','Capture 6 drapeaux CTF Pro.','التقط 6 أعلام CTF متقدمة.')},
 {id:'defender',color:'#ffc531',icon:'trophy',name:T('Cyber Defender','Cyber Défenseur','المدافع السيبراني'),desc:T('All modules, all tasks and 10 pro flags.','Tous les modules, toutes les tâches et 10 drapeaux Pro.','كل الوحدات وكل المهام و10 أعلام متقدمة.')}
];
})();
