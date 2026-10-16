/* Extra UI strings used by games and views. */
(function(){
const {T,UI}=CKI;
Object.assign(UI,{
tryOther:T('Have another look. Every try helps you learn!','Regarde encore. Chaque essai t’aide à apprendre !','ألقِ نظرة أخرى. كل محاولة تساعدك على التعلّم!'),
str0:T('Very weak','Très faible','ضعيفة جداً'),str1:T('Weak','Faible','ضعيفة'),str2:T('Okay','Moyen','مقبولة'),str3:T('Strong','Solide','قوية'),str4:T('Super strong','Ultra solide','قوية جداً'),
pwPick:T('Which password is the strongest?','Quel mot de passe est le plus solide ?','أي كلمة سر هي الأقوى؟'),
pwBuild:T('Invent a strong pretend passphrase. Reach 3 bars!','Invente une phrase secrète imaginaire solide. Atteins 3 barres !','اخترع عبارة سرّ خيالية قوية. اوصل إلى 3 أشرطة!'),
pwPh:T('Try: Four random words and a number','Essaie : quatre mots au hasard et un chiffre','جرّب: أربع كلمات عشوائية ورقماً'),
pwBuilt:T('Wow, that is a strong passphrase! (It is erased now. Never reuse it.)','Waouh, quelle phrase solide ! (Elle est effacée. Ne la réutilise jamais.)','رائع، عبارة قوية! (مُسحت الآن. لا تستخدمها أبداً.)'),
pwTip:T('Almost! Try 4 random words with dashes, a capital letter and a number, like Moon-Pizza-Robot-9.','Presque ! Essaie 4 mots au hasard avec des tirets, une majuscule et un chiffre, comme Lune-Pizza-Robot-9.','قريب! جرّب 4 كلمات عشوائية بينها شرطات مع حرف كبير ورقم، مثل Moon-Pizza-Robot-9.'),
phHelp:T('Tap every suspicious part, then press Check. If everything looks fine, press Check without tapping anything.','Touche chaque partie louche, puis appuie sur Vérifier. Si tout est normal, appuie sur Vérifier sans rien toucher.','المس كل جزء مريب ثم اضغط تحقق. وإذا بدا كل شيء سليماً فاضغط تحقق دون لمس شيء.'),
phTry:T('Look again: some clues are missing, or something you tapped is fine.','Regarde encore : il manque des indices, ou une partie touchée est correcte.','انظر مجدداً: هناك أدلة ناقصة أو جزء لمسته سليم.'),
decShift:T('Shift','Décalage','الإزاحة'),
decIntro:T('Turn the wheel with − and + until the purple letters make a real word. Then type it!','Tourne la roue avec − et + jusqu’à ce que les lettres violettes forment un vrai mot. Puis tape-le !','أدر العجلة بـ − و + حتى تصبح الحروف البنفسجية كلمة حقيقية. ثم اكتبها!'),
decLearn:T('This is a Caesar cipher: every letter slides along the alphabet. It is a kind of substitution cipher.','C’est un chiffre de César : chaque lettre glisse dans l’alphabet. C’est un chiffre par substitution.','هذه شيفرة قيصر: كل حرف ينزلق في الأبجدية. وهي نوع من شيفرات الاستبدال.'),
decRight:T('Yes! You decoded it.','Oui ! Tu l’as déchiffré.','نعم! لقد فككت الشيفرة.'),decWrong:T('Not yet. Turn the wheel until you can read real words.','Pas encore. Tourne la roue jusqu’à lire de vrais mots.','ليس بعد. أدر العجلة حتى تقرأ كلمات حقيقية.'),
fwRules:T('Your rules','Tes règles','قواعدك'),fwStrong:T('If several rules match, the strongest action wins (block, then warn, then allow).','Si plusieurs règles s’appliquent, l’action la plus forte gagne (bloquer, puis avertir, puis autoriser).','إذا انطبقت عدة قواعد فإن الأقوى تفوز (المنع ثم التحذير ثم السماح).'),
fwIf:T('IF','SI','إذا'),fwThen:T('THEN','ALORS','فإن'),fw_allow:T('Allow','Autoriser','سماح'),fw_warn:T('Show a warning','Avertir','تحذير'),fw_block:T('Block','Bloquer','منع'),
fwRun:T('Test my firewall','Tester mon pare-feu','اختبر جداري الناري'),fwEvents:T('Pretend traffic','Faux trafic','حركة خيالية'),
fwAllGood:T('Perfect! Friends get in, tricksters are stopped. You built a firewall!','Parfait ! Les amis entrent, les fripons sont arrêtés. Tu as construit un pare-feu !','رائع! الأصدقاء يدخلون والمحتالون يُمنعون. لقد بنيت جداراً نارياً!'),
fwFriend:T('A safe message was stopped. Rules that are too strict also block friends!','Un message sûr a été arrêté. Des règles trop strictes bloquent aussi les amis !','تم إيقاف رسالة آمنة. القواعد المتشددة جداً تمنع الأصدقاء أيضاً!'),
fwTrick:T('A trickster got in. Add or change a rule to catch it.','Un fripon est entré. Ajoute ou change une règle pour l’arrêter.','تسلل محتال. أضف قاعدة أو غيّرها لإيقافه.'),
bLearnSeq:T('A program is steps in the right order.','Un programme, ce sont des étapes dans le bon ordre.','البرنامج خطوات بالترتيب الصحيح.'),bLearnRep:T('Repeat means the same steps again and again, with fewer blocks.','Répéter, c’est refaire les mêmes étapes avec moins de blocs.','التكرار يعني إعادة الخطوات نفسها بكتل أقل.'),bLearnIf:T('If lets your program choose. This is how robots and firewalls decide.','Si permet à ton programme de choisir. Ainsi décident robots et pare-feu.','«إذا» تتيح لبرنامجك الاختيار. هكذا تقرر الروبوتات والجدران النارية.'),
nextLevel:T('Next level','Niveau suivant','المستوى التالي'),filePick:T('Tap a file to read it.','Touche un fichier pour le lire.','المس ملفاً لتقرأه.'),
bCode:T('Byte made it! Your secret code:','Byte a réussi ! Ton code secret :','نجح بايت! رمزك السري:'),
replayNote:T('Replaying is great practice. Your best stars are kept!','Rejouer, c’est un super entraînement. Tes meilleures étoiles sont gardées !','الإعادة تدريب رائع. تُحفظ أفضل نجومك!'),
unlockM:T('Finish the mission before it to unlock this one.','Termine la mission précédente pour débloquer celle-ci.','أنهِ المهمة السابقة لتفتح هذه.'),
unlockMed:T('Solve 2 easy challenges to unlock.','Résous 2 défis faciles pour débloquer.','حلّ تحديين سهلين لتفتح هذا.'),unlockCh:T('Solve 2 medium challenges to unlock.','Résous 2 défis moyens pour débloquer.','حلّ تحديين متوسطين لتفتح هذا.')
});
})();
