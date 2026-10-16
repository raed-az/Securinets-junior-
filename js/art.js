/* Original SVG art: Byte (shield-shaped robot), icon set, world scenes, avatars, adventure map. */
(function(){
let uid=0;
const A={};

A.byte=function(mood,cls){
  const id='bg'+(++uid);
  const eyes=mood==='cheer'
   ?'<path d="M30 48 Q38 38 46 48" stroke="#1b2a5e" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M54 48 Q62 38 70 48" stroke="#1b2a5e" stroke-width="4" fill="none" stroke-linecap="round"/>'
   :'<circle cx="38" cy="47" r="10" fill="#fff"/><circle cx="62" cy="47" r="10" fill="#fff"/><circle cx="39" cy="48" r="6" fill="#1b2a5e"/><circle cx="61" cy="48" r="6" fill="#1b2a5e"/><circle cx="41" cy="45" r="2.2" fill="#fff"/><circle cx="63" cy="45" r="2.2" fill="#fff"/>';
  const brow=mood==='think'?'<path d="M56 34 Q63 30 70 34" stroke="#1b2a5e" stroke-width="3" fill="none" stroke-linecap="round"/>':'';
  const mouth=mood==='cheer'?'<path d="M40 62 Q50 76 60 62 Z" fill="#1b2a5e"/>':'<path d="M42 63 Q50 70 58 63" stroke="#1b2a5e" stroke-width="3.5" fill="none" stroke-linecap="round"/>';
  return `<svg class="${cls||''}" viewBox="0 0 100 100" role="img" aria-label="Byte" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f7f4ff"/><stop offset="1" stop-color="#b5a6ff"/></linearGradient></defs>
  <path d="M14 14 Q26 34 38 20 L50 12 L62 20 Q74 34 86 14 Q92 52 72 76 Q62 88 50 96 Q38 88 28 76 Q8 52 14 14Z" fill="url(#${id})" stroke="#fff" stroke-width="3" stroke-linejoin="round"/>
  <path d="M26 74 Q38 90 50 96" stroke="#8d7bff" stroke-width="3" fill="none" opacity=".5"/>
  ${eyes}${brow}${mouth}<circle cx="27" cy="58" r="4" fill="#ffb3c7" opacity=".7"/><circle cx="73" cy="58" r="4" fill="#ffb3c7" opacity=".7"/></svg>`;
};
/* Byte on the maze board; the yellow triangle shows the facing direction. */
A.bot=function(dir){
  return `<svg viewBox="-12 -12 124 124" aria-hidden="true"><g>${A.byte('happy').replace(/^<svg[^>]*>/,'').replace('</svg>','')}</g><g transform="rotate(${dir*90} 50 50)"><path d="M50 -10 L62 6 L38 6Z" fill="#ffc531" stroke="#8a5a00" stroke-width="3" stroke-linejoin="round"/></g></svg>`;
};

const I={
 lock:'<rect x="14" y="28" width="36" height="28" rx="8" fill="#7a5cff"/><path d="M22 28v-7a10 10 0 0 1 20 0v7" stroke="#cfc6ff" stroke-width="6" fill="none" stroke-linecap="round"/><circle cx="32" cy="41" r="4.5" fill="#ffc531"/><rect x="30" y="43" width="4" height="8" rx="2" fill="#ffc531"/>',
 shield:'<path d="M32 5l23 8v17c0 15-10 25-23 31C19 55 9 45 9 30V13z" fill="#1fb877"/><path d="M21 31l8 8 15-16" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
 mail:'<rect x="6" y="14" width="52" height="36" rx="7" fill="#ff8a3d"/><path d="M8 18l24 18 24-18" stroke="#fff3" stroke-width="5" fill="none" stroke-linejoin="round"/><circle cx="50" cy="16" r="11" fill="#e5484d"/><rect x="48.5" y="9" width="3" height="9" rx="1.5" fill="#fff"/><circle cx="50" cy="21.5" r="1.8" fill="#fff"/>',
 cipher:'<circle cx="32" cy="32" r="27" fill="#12b5c0"/><circle cx="32" cy="32" r="16" fill="#e8fffe"/><text x="32" y="38" font-size="18" font-weight="900" text-anchor="middle" fill="#0a6f76" font-family="sans-serif">Aa</text><circle cx="32" cy="9" r="3.5" fill="#ffc531"/><circle cx="55" cy="32" r="3.5" fill="#ffc531"/><circle cx="9" cy="32" r="3.5" fill="#ffc531"/><circle cx="32" cy="55" r="3.5" fill="#ffc531"/>',
 maze:'<rect x="6" y="6" width="52" height="52" rx="10" fill="#2f6bff"/><path d="M14 14h26v10H24v10h26v14H14" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="50" cy="48" r="4" fill="#ffc531"/>',
 flag:'<rect x="14" y="8" width="5" height="50" rx="2.5" fill="#6a5acd"/><path d="M19 10h32l-8 11 8 11H19z" fill="#ffc531"/><circle cx="16.5" cy="57" r="5" fill="#6a5acd"/>',
 blocks:'<rect x="8" y="38" width="30" height="18" rx="5" fill="#2f6bff"/><rect x="22" y="20" width="30" height="18" rx="5" fill="#7a5cff"/><rect x="12" y="4" width="30" height="16" rx="5" fill="#e08a00"/><circle cx="46" cy="47" r="4" fill="#fff6"/>',
 wall:'<rect x="5" y="10" width="54" height="44" rx="6" fill="#d2467a"/><path d="M5 24h54M5 38h54M20 10v14M40 24v14M20 38v16" stroke="#fff" stroke-width="3" opacity=".6"/><path d="M32 2c4 6 8 8 8 14a8 8 0 0 1-16 0c0-4 3-6 4-8 1 3 2 4 4 4-1-4-1-6 0-10z" fill="#ffc531"/>',
 star:'<path d="M32 4l8.6 17.4 19.2 2.8-13.9 13.5 3.3 19.1L32 47.8l-17.2 9 3.3-19.1L4.2 24.2l19.2-2.8z" fill="#ffc531" stroke="#e08a00" stroke-width="3" stroke-linejoin="round"/>',
 key:'<circle cx="20" cy="22" r="13" fill="#ffc531" stroke="#c98b00" stroke-width="3"/><circle cx="16" cy="18" r="4" fill="#fff8"/><path d="M29 31l25 25M44 46l8-4M38 40l8-4" stroke="#ffc531" stroke-width="7" stroke-linecap="round"/>',
 device:'<rect x="6" y="10" width="52" height="34" rx="6" fill="#e5484d"/><rect x="12" y="16" width="40" height="22" rx="3" fill="#2b1020"/><path d="M24 54h16M32 44v10" stroke="#e5484d" stroke-width="6" stroke-linecap="round"/><path d="M26 22l12 10M38 22L26 32" stroke="#ffb3b6" stroke-width="3.5" stroke-linecap="round"/>',
 trophy:'<path d="M18 8h28v18a14 14 0 0 1-28 0z" fill="#ffc531"/><path d="M18 14H8c0 10 4 16 12 17M46 14h10c0 10-4 16-12 17" stroke="#e08a00" stroke-width="4" fill="none"/><rect x="28" y="38" width="8" height="10" fill="#e08a00"/><rect x="20" y="48" width="24" height="8" rx="3" fill="#ffb300"/>',
 forest:'<path d="M32 4l16 22H38l12 18H14L26 26H16z" fill="#1fb877"/><rect x="29" y="44" width="6" height="14" rx="2" fill="#8a5a2b"/>',
 castle:'<path d="M8 56V24h8v6h6v-6h8v-8h4v8h8v6h6v-6h8v32z" fill="#9a86ff"/><path d="M26 56V42a6 6 0 0 1 12 0v14z" fill="#3b2b86"/>',
 city:'<rect x="6" y="26" width="16" height="30" fill="#ff8a3d"/><rect x="24" y="10" width="16" height="46" fill="#ffb066"/><rect x="42" y="30" width="16" height="26" fill="#e06a1d"/><g fill="#fff8"><rect x="10" y="32" width="4" height="4"/><rect x="28" y="16" width="4" height="4"/><rect x="34" y="26" width="4" height="4"/><rect x="46" y="36" width="4" height="4"/></g>',
 lab:'<path d="M24 6h16v6h-3v14l14 24c2 4-1 8-5 8H18c-4 0-7-4-5-8l14-24V12h-3z" fill="#bff5f7" stroke="#12b5c0" stroke-width="3"/><path d="M19 44h26l5 8c1 2 0 4-3 4H17c-3 0-4-2-3-4z" fill="#12b5c0"/>',
 academy:'<path d="M32 8L4 22l28 14 22-11v16h4V22z" fill="#2f6bff"/><path d="M16 34v12c0 5 7 9 16 9s16-4 16-9V34l-16 8z" fill="#6f9bff"/>'
};
A.icon=function(n,size){return `<svg viewBox="0 0 64 64" width="${size||48}" height="${size||48}" aria-hidden="true">${I[n]||I.star}</svg>`};

/* 16:9 scenes for world / game cards */
const SC={
 forest:'<rect width="320" height="180" fill="#9fdcff"/><circle cx="260" cy="40" r="20" fill="#ffe27a"/><path d="M0 130q80-40 160 0t160 0v50H0z" fill="#53c785"/><g fill="#1fb877"><path d="M60 40l30 60H30z"/><path d="M60 70l36 70H24z"/><path d="M220 50l28 56h-56z"/><path d="M220 82l34 62h-68z"/></g><g fill="#8a5a2b"><rect x="55" y="140" width="10" height="20"/><rect x="215" y="142" width="10" height="20"/></g><circle cx="150" cy="140" r="10" fill="#ffb3c7"/>',
 castle:'<rect width="320" height="180" fill="#cdbbff"/><circle cx="60" cy="38" r="14" fill="#fff"/><path d="M0 150q160-40 320 0v30H0z" fill="#8f7bff"/><path d="M90 150V80h24v-14h14v14h24V60h16v20h24v-14h14v14h24v70z" fill="#efe9ff"/><path d="M142 150v-36a18 18 0 0 1 36 0v36z" fill="#3b2b86"/><path d="M108 66l7-16 7 16zM218 66l7-16 7 16z" fill="#ff6b8a"/>',
 city:'<rect width="320" height="180" fill="#ffd9a8"/><circle cx="260" cy="40" r="18" fill="#fff3c4"/><g><rect x="30" y="80" width="50" height="100" fill="#ff8a3d"/><rect x="90" y="50" width="56" height="130" fill="#ffb066"/><rect x="156" y="90" width="48" height="90" fill="#e06a1d"/><rect x="214" y="64" width="60" height="116" fill="#ff9d5c"/></g><g fill="#fff9"><rect x="42" y="96" width="10" height="10"/><rect x="60" y="120" width="10" height="10"/><rect x="104" y="70" width="10" height="10"/><rect x="124" y="100" width="10" height="10"/><rect x="228" y="84" width="10" height="10"/><rect x="250" y="120" width="10" height="10"/></g><path d="M230 20l14 0M236 14v12" stroke="#e5484d" stroke-width="5"/>',
 lab:'<rect width="320" height="180" fill="#b9f3f5"/><rect y="120" width="320" height="60" fill="#12b5c0"/><path d="M100 120V70h40v50z" fill="#fff"/><path d="M110 98h20v22h-20z" fill="#ffc531"/><path d="M190 50h30v14h-8v36l22 34h-58l22-34V64h-8z" fill="#e8fffe" stroke="#0a6f76" stroke-width="3"/><path d="M185 110h40l12 20h-64z" fill="#6a5acd"/><circle cx="60" cy="60" r="8" fill="#ffc531"/><circle cx="262" cy="86" r="6" fill="#ff8a3d"/>',
 academy:'<rect width="320" height="180" fill="#bcd2ff"/><path d="M0 140h320v40H0z" fill="#2f6bff"/><path d="M160 30l100 40H60z" fill="#6f9bff"/><rect x="76" y="70" width="168" height="70" fill="#eef3ff"/><g fill="#2f6bff"><rect x="92" y="80" width="14" height="60"/><rect x="132" y="80" width="14" height="60"/><rect x="174" y="80" width="14" height="60"/><rect x="214" y="80" width="14" height="60"/></g><circle cx="160" cy="54" r="8" fill="#ffc531"/>',
 lock:'<rect width="320" height="180" fill="#d7ccff"/><rect x="110" y="70" width="100" height="80" rx="18" fill="#7a5cff"/><path d="M132 70V54a28 28 0 0 1 56 0v16" stroke="#fff" stroke-width="14" fill="none" stroke-linecap="round"/><circle cx="160" cy="104" r="11" fill="#ffc531"/><rect x="155" y="108" width="10" height="24" rx="5" fill="#ffc531"/>',
 mail:'<rect width="320" height="180" fill="#ffe0c5"/><rect x="80" y="50" width="160" height="100" rx="16" fill="#ff8a3d"/><path d="M84 58l76 54 76-54" stroke="#fff" stroke-width="8" fill="none"/><circle cx="238" cy="52" r="26" fill="#e5484d"/><rect x="233" y="36" width="10" height="24" rx="5" fill="#fff"/><circle cx="238" cy="68" r="5" fill="#fff"/>',
 cipher:'<rect width="320" height="180" fill="#c3f2f4"/><circle cx="160" cy="92" r="66" fill="#12b5c0"/><circle cx="160" cy="92" r="40" fill="#e8fffe"/><text x="160" y="106" font-size="40" text-anchor="middle" font-weight="900" font-family="sans-serif" fill="#0a6f76">A→D</text><circle cx="160" cy="26" r="9" fill="#ffc531"/>',
 maze:'<rect width="320" height="180" fill="#cfe0ff"/><rect x="90" y="20" width="140" height="140" rx="16" fill="#2f6bff"/><path d="M104 36h80v28h-52v28h88v48h-116" stroke="#fff" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="214" cy="140" r="9" fill="#ffc531"/>',
 shield:'<rect width="320" height="180" fill="#c8f5de"/><path d="M160 16l62 22v42c0 38-26 62-62 78-36-16-62-40-62-78V38z" fill="#1fb877"/><path d="M130 84l22 22 40-44" stroke="#fff" stroke-width="14" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
 wall:'<rect width="320" height="180" fill="#ffd1e2"/><rect x="70" y="30" width="180" height="120" rx="14" fill="#d2467a"/><path d="M70 70h180M70 110h180M130 30v40M190 70v40M130 110v40" stroke="#fff" stroke-width="6" opacity=".6"/><path d="M160 4c10 14 20 18 20 32a20 20 0 0 1-40 0c0-10 8-14 10-20 3 6 6 8 10 8-3-10-3-14 0-20z" fill="#ffc531"/>',
 flag:'<rect width="320" height="180" fill="#fff0b8"/><rect x="120" y="26" width="10" height="128" rx="5" fill="#6a5acd"/><path d="M130 30h86l-20 28 20 28h-86z" fill="#e5484d"/><circle cx="125" cy="156" r="12" fill="#6a5acd"/><text x="173" y="66" font-size="22" font-weight="900" text-anchor="middle" font-family="monospace" fill="#fff">JSEC</text>',
 blocks:'<rect width="320" height="180" fill="#ffe6bd"/><rect x="60" y="100" width="110" height="44" rx="12" fill="#2f6bff"/><rect x="110" y="56" width="110" height="44" rx="12" fill="#7a5cff"/><rect x="70" y="14" width="100" height="42" rx="12" fill="#e08a00"/><rect x="190" y="110" width="70" height="34" rx="12" fill="#139b69"/>'
};
A.scene=function(k){return `<svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" aria-hidden="true" style="width:100%;height:100%;display:block">${SC[k]||SC.forest}</svg>`};

/* Avatars */
const SKIN=['#f2c19b','#c98a5e','#8f5a3a','#f6d7c0','#b9774c','#e4a978'],HAIR=['#6b3f23','#2b1c14','#3d2415','#c28b3b','#17120f','#7a3b16'],BG=['#ffd7a6','#cfe0ff','#d7ccff','#c8f5de','#ffd1e2','#c3f2f4'];
A.avatar=function(i,size){
  i=((i%6)+6)%6;const s=SKIN[i],h=HAIR[i],st=i%3;
  const hair=st===0?`<path d="M14 40Q16 14 40 14T66 40Q56 28 40 28T14 40Z" fill="${h}"/>`:
    st===1?`<path d="M12 44Q12 12 40 12T68 44L62 30Q40 22 18 30Z" fill="${h}"/><rect x="10" y="40" width="8" height="26" rx="4" fill="${h}"/><rect x="62" y="40" width="8" height="26" rx="4" fill="${h}"/>`
    :`<g fill="${h}"><circle cx="22" cy="26" r="11"/><circle cx="40" cy="18" r="12"/><circle cx="58" cy="26" r="11"/></g>`;
  return `<svg viewBox="0 0 80 80" width="${size||60}" height="${size||60}" aria-hidden="true"><circle cx="40" cy="40" r="40" fill="${BG[i]}"/><circle cx="40" cy="44" r="22" fill="${s}"/>${hair}<circle cx="32" cy="45" r="3" fill="#2b1c14"/><circle cx="48" cy="45" r="3" fill="#2b1c14"/><path d="M33 54Q40 60 47 54" stroke="#7a3b2a" stroke-width="2.5" fill="none" stroke-linecap="round"/><circle cx="26" cy="52" r="3.5" fill="#ff9a9a" opacity=".5"/><circle cx="54" cy="52" r="3.5" fill="#ff9a9a" opacity=".5"/></svg>`;
};

/* Adventure map: nodes are real links. */
A.map=function(worlds,labels,prog,current){
  const P={forest:[110,290],castle:[270,120],city:[430,290],lab:[590,120],academy:[700,290]};
  const path='M110 290 C170 280 210 130 270 120 S370 290 430 290 S530 130 590 120 S650 290 700 290';
  let g=`<svg viewBox="0 0 800 420" role="group" aria-label="Map"><path d="M0 330q200-50 400 0t400 0v90H0z" fill="#53c785" opacity=".55"/><circle cx="700" cy="50" r="28" fill="#ffe27a" opacity=".9"/>
  <path d="${path}" stroke="#fff" stroke-width="10" stroke-dasharray="4 18" stroke-linecap="round" fill="none" opacity=".9"/>`;
  worlds.forEach(w=>{const [x,y]=P[w.id],p=prog[w.id],done=p.done===p.total;
    g+=`<a href="#/world/${w.id}" class="map-node" aria-label="${labels[w.id]} ${p.done}/${p.total}" tabindex="0"><circle cx="${x}" cy="${y}" r="54" fill="${w.color}" stroke="#fff" stroke-width="6"/><g transform="translate(${x-30} ${y-34}) scale(.94)">${I[w.art]||I.star}</g>
    <rect x="${x-62}" y="${y+60}" width="124" height="30" rx="15" fill="#10204a" opacity=".85"/><text x="${x}" y="${y+81}" text-anchor="middle" font-size="15" font-weight="800" fill="#fff" font-family="inherit">${labels[w.id]}</text>
    <circle cx="${x+42}" cy="${y-42}" r="17" fill="${done?'#1fb877':'#ffc531'}" stroke="#fff" stroke-width="3"/><text x="${x+42}" y="${y-36}" text-anchor="middle" font-size="16" font-weight="900" fill="${done?'#fff':'#3b2a00'}" font-family="sans-serif">${p.done}/${p.total}</text></a>`;
    if(w.id===current){g+=`<g transform="translate(${x-92} ${y-70}) scale(.7)" aria-hidden="true">${A.byte('happy').replace(/^<svg[^>]*>/,'').replace('</svg>','')}</g>`}
  });
  return g+'</svg>';
};
window.CKA=A;
})();
