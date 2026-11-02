#!/usr/bin/env node
/* Development-time translation validator: node tools/check-i18n.js
   Checks every T(en,fr,ar) triple in UI + content for empty values and mismatched {placeholders},
   and that every static t('key') used in the code exists. Exit code 1 on problems. */
const fs=require('fs'),vm=require('vm'),path=require('path');
const dir=path.join(__dirname,'..','js');
const sb={console,navigator:{language:'en'},matchMedia:()=>({matches:false}),document:{documentElement:{dataset:{}},querySelector:()=>null,addEventListener(){},body:{contains:()=>true}},localStorage:{getItem:()=>null,setItem(){},removeItem(){}},crypto:{}};
sb.window=sb;vm.createContext(sb);
const order=['i18n','i18n-extra','i18n-pro','content','content2','content3','course','store','art','engine','terminal','games','modules','detective','defense','studio','extras'];
for(const f of order){try{vm.runInContext(fs.readFileSync(path.join(dir,f+'.js'),'utf8'),sb,{filename:f})}catch(e){console.error('LOAD ERROR',f,e.message);process.exitCode=1}}
const L=['en','fr','ar'],problems=[];
const ph=s=>(String(s).match(/\{[a-z]\w*\}/g)||[]).sort().join(',');
const check=(o,where)=>{
  const miss=L.filter(l=>!o[l]||!String(o[l]).trim());
  if(miss.length)problems.push(`${where}: empty ${miss.join(',')}`);
  else{const p=ph(o.en);L.forEach(l=>{if(ph(o[l])!==p)problems.push(`${where}: placeholder mismatch in ${l}`)})}};
let n=0;
(function walk(o,p,d){if(!o||typeof o!=='object'||d>12)return;if(typeof o.en==='string'){n++;check(o,p);return}if(Array.isArray(o))o.forEach((x,i)=>walk(x,p+'['+i+']',d+1));else for(const k in o)walk(o[k],p+'.'+k,d+1)})(sb.CKC,'content',0);
for(const k in sb.CKI.UI){n++;check(sb.CKI.UI[k],'UI.'+k)}
// functions that build content (e.g. labFS) are sampled too
try{(function walk(o,p){if(o&&typeof o==='object'){if(typeof o.en==='string'){n++;check(o,p)}else for(const k in o)walk(o[k],p+'/'+k)}})(sb.CKC.labFS(),'labFS')}catch(e){}
// keys used in code must exist (dynamic prefixes are skipped)
const used=new Set();
for(const f of fs.readdirSync(dir)){const s=fs.readFileSync(path.join(dir,f),'utf8');for(const m of s.matchAll(/\bt\('([A-Za-z0-9_]+)'[,)]/g))used.add(m[1])}
used.forEach(k=>{if(!sb.CKI.UI[k])problems.push('missing UI key: '+k)});
// unused keys (info only)
const src=fs.readdirSync(dir).map(f=>fs.readFileSync(path.join(dir,f),'utf8')).join('\n');
const unused=Object.keys(sb.CKI.UI).filter(k=>src.split("'"+k+"'").length<2&&!/^(how|tip|str|fw_|bLearn|cat_|st_|lb_|road|cmp|t_|dg|node)/.test(k)&&src.indexOf("'"+k)<0);
console.log(`checked ${n} translation triples; ${used.size} keys used in code`);
if(unused.length)console.log('possibly unused UI keys (info):',unused.join(', '));
if(problems.length){console.error('PROBLEMS:\n'+problems.join('\n'));process.exit(1)}
console.log('OK: no missing, empty or inconsistent translations');
