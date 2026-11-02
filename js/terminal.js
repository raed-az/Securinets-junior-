/* A SIMULATED Linux shell. It parses a whitelist of commands over a fake in-memory filesystem.
   Nothing typed here is ever executed by the browser or sent anywhere. */
(function(){
const {t,L}=CKI,C=CKC;
const X={};
const HOME=['home','analyst'];

function build(spec){
  const mk=v=>{
    if(Array.isArray(v))return {t:'f',c:v[0],m:v[1].m||'rw-r--r--',out:v[1].out};
    if(typeof v==='string'||(v&&typeof v.en==='string'))return {t:'f',c:v,m:'rw-r--r--'};
    const k={};for(const n in v)k[n]=mk(v[n]);return {t:'d',k};
  };
  return mk(spec);
}
function tokenize(line){
  const out=[];let cur='',q=null,has=false;
  for(let i=0;i<line.length;i++){
    const ch=line[i];
    if(q){if(ch===q)q=null;else cur+=ch;continue}
    if(ch==='"'||ch==="'"){q=ch;has=true;continue}
    if(/\s/.test(ch)){if(cur||has){out.push(cur);cur='';has=false}continue}
    if(ch==='|'){if(cur||has){out.push(cur);cur='';has=false}out.push('|');continue}
    if(ch==='>'){if(cur||has){out.push(cur);cur='';has=false}if(line[i+1]==='>'){out.push('>>');i++}else out.push('>');continue}
    cur+=ch;
  }
  if(cur||has)out.push(cur);
  return out;
}
const text=n=>L(n.c);
const glob=p=>new RegExp('^'+p.replace(/[.+^${}()|[\]\\]/g,'\\$&').replace(/\*/g,'.*').replace(/\?/g,'.')+'$');
const lines=s=>s===''?[]:s.split('\n');

X.session=function(spec,opts){
  opts=opts||{};
  const root=build(spec);
  if(!root.k.home)root.k.home={t:'d',k:{}};
  if(!root.k.home.k.analyst)root.k.home.k.analyst={t:'d',k:{}};
  const hist=[];
  let cwd=(opts.cwd||'/home/analyst').split('/').filter(Boolean);
  const resolve=p=>{
    let parts=p[0]==='/'?[]:cwd.slice();
    p.split('/').forEach(s=>{
      if(!s||s==='.')return;
      if(s==='~'){parts=HOME.slice();return}
      if(s==='..'){parts.pop();return}
      parts.push(s);
    });
    return parts;
  };
  const get=parts=>{let n=root;for(const s of parts){if(n.t!=='d'||!n.k[s])return null;n=n.k[s]}return n};
  const ab=parts=>'/'+parts.join('/');
  const pathStr=()=>{const s=ab(cwd),h=ab(HOME);return s===h?'~':s.indexOf(h+'/')===0?'~'+s.slice(h.length):s};
  const fileArg=(a,name)=>{const n=get(resolve(a));if(!n)return {e:t('sh_nofile',{a})};if(n.t==='d')return {e:t('sh_isdir',{a})};return {n}};

  function cmd(a,stdin,sudo){
    const c=a[0],args=a.slice(1),flags=args.filter(x=>/^-\w+$/.test(x)).join('').replace(/-/g,''),pos=args.filter(x=>!/^-[A-Za-z]+$/.test(x)||/^-\d+$/.test(x));
    const ok=s=>({out:s}),bad=s=>({out:s,err:true});
    const src=(f)=>{if(f){const r=fileArg(f);return r.e?{e:r.e}:{s:text(r.n)}}return stdin!=null?{s:stdin}:{e:t('sh_missing',{a:c})}};
    switch(c){
    case 'pwd':return ok(ab(cwd));
    case 'whoami':return ok('analyst');
    case 'id':return ok('uid=1000(analyst) gid=1000(analyst) groups=1000(analyst),27(sudo)');
    case 'hostname':return ok('kali');
    case 'uname':return ok(flags.indexOf('a')>=0?'Linux kali 6.8.0-kali-amd64 #1 SMP (simulated) x86_64 GNU/Linux':'Linux');
    case 'echo':return ok(args.join(' '));
    case 'clear':return {out:'',clear:true};
    case 'history':return ok(hist.map((h,i)=>('  '+(i+1)).slice(-4)+'  '+h).join('\n'));
    case 'help':return ok(t('sh_helpHead')+'\n'+C.cmds.map(x=>('  '+x.c+'          ').slice(0,12)+L(x.d)).join('\n'));
    case 'man':{if(!pos[0])return bad(t('sh_missing',{a:'man'}));const x=C.cmds.find(k=>k.c===pos[0]);return x?ok(x.c.toUpperCase()+'\n  '+t('sh_usage')+': '+x.u+'\n  '+L(x.d)):bad(t('sh_noman',{a:pos[0]}))}
    case 'ls':{
      const tgt=pos[0]?resolve(pos[0]):cwd,n=get(tgt);
      if(!n)return bad(t('sh_nofile',{a:pos[0]}));
      const showAll=flags.indexOf('a')>=0,long=flags.indexOf('l')>=0;
      const entries=n.t==='d'?Object.keys(n.k).filter(k=>showAll||k[0]!=='.').sort():[pos[0]];
      const node=k=>n.t==='d'?n.k[k]:n;
      if(long)return ok(entries.map(k=>{const f=node(k);return (f.t==='d'?'d'+'rwxr-xr-x':'-'+f.m)+' 1 analyst analyst '+(f.t==='d'?4096:text(f).length)+' '+k}).join('\n'));
      return ok(entries.map(k=>node(k).t==='d'?k+'/':k).join('  '));
    }
    case 'cd':{const p=pos[0]||'~';const parts=resolve(p),n=get(parts);if(!n)return bad(t('sh_nofile',{a:p}));if(n.t!=='d')return bad(t('sh_notdir',{a:p}));cwd=parts;return ok('')}
    case 'cat':{
      if(!pos.length){return stdin!=null?ok(stdin):bad(t('sh_missing',{a:'cat'}))}
      const o=[];for(const f of pos){const r=fileArg(f);if(r.e)return bad(r.e);o.push(text(r.n))}return ok(o.join('\n'));
    }
    case 'head':case 'tail':{
      let n=10;const i=args.indexOf('-n');let f=pos.filter(x=>!/^-?\d+$/.test(x))[0];
      if(i>=0)n=parseInt(args[i+1],10)||10;else{const m=args.find(x=>/^-\d+$/.test(x));if(m)n=-parseInt(m,10)}
      const s=src(f);if(s.e)return bad(s.e);const l=lines(s.s);return ok((c==='head'?l.slice(0,n):l.slice(-n)).join('\n'));
    }
    case 'grep':{
      const p=pos[0];if(p==null)return bad(t('sh_missing',{a:'grep'}));
      const s=src(pos[1]);if(s.e)return bad(s.e);
      const ic=flags.indexOf('i')>=0,inv=flags.indexOf('v')>=0,num=flags.indexOf('n')>=0,cnt=flags.indexOf('c')>=0;
      const needle=ic?p.toLowerCase():p;
      const hit=lines(s.s).map((l,i)=>({l,i:i+1,m:(ic?l.toLowerCase():l).indexOf(needle)>=0})).filter(x=>x.m!==inv);
      return ok(cnt?String(hit.length):hit.map(x=>(num?x.i+':':'')+x.l).join('\n'));
    }
    case 'wc':{
      const s=src(pos[0]);if(s.e)return bad(s.e);const l=s.s===''?0:s.s.split('\n').length,w=s.s.split(/\s+/).filter(Boolean).length,ch=s.s.length;
      const suffix=pos[0]?' '+pos[0]:'';
      if(flags.indexOf('l')>=0)return ok(l+suffix);if(flags.indexOf('w')>=0)return ok(w+suffix);if(flags.indexOf('c')>=0)return ok(ch+suffix);
      return ok(l+' '+w+' '+ch+suffix);
    }
    case 'sort':{const s=src(pos[0]);if(s.e)return bad(s.e);return ok(lines(s.s).sort().join('\n'))}
    case 'uniq':{
      const s=src(pos[0]);if(s.e)return bad(s.e);const o=[];lines(s.s).forEach(l=>{const last=o[o.length-1];if(last&&last.l===l)last.n++;else o.push({l,n:1})});
      return ok(o.map(x=>flags.indexOf('c')>=0?('   '+x.n).slice(-4)+' '+x.l:x.l).join('\n'));
    }
    case 'mkdir':case 'touch':{
      if(!pos[0])return bad(t('sh_missing',{a:c}));
      for(const p of pos){const parts=resolve(p),name=parts.pop(),par=get(parts);
        if(!par||par.t!=='d')return bad(t('sh_nofile',{a:p}));
        if(par.k[name]){if(c==='mkdir')return bad(t('sh_exists',{a:p}));continue}
        par.k[name]=c==='mkdir'?{t:'d',k:{}}:{t:'f',c:'',m:'rw-r--r--'};}
      return ok('');
    }
    case 'rm':{
      if(!pos[0])return bad(t('sh_missing',{a:'rm'}));
      for(const p of pos){const parts=resolve(p),name=parts.pop(),par=get(parts);
        if(!par||!par.k||!par.k[name])return bad(t('sh_nofile',{a:p}));
        if(par.k[name].t==='d'&&flags.indexOf('r')<0)return bad(t('sh_isdir',{a:p}));
        delete par.k[name];}
      return ok('');
    }
    case 'cp':case 'mv':{
      if(pos.length<2)return bad(t('sh_missing',{a:c}));
      const r=fileArg(pos[0]);if(r.e)return bad(r.e);
      let dp=resolve(pos[1]),dn=get(dp);
      if(dn&&dn.t==='d'){dp=dp.concat(pos[0].split('/').pop())}
      const name=dp.pop(),par=get(dp);if(!par||par.t!=='d')return bad(t('sh_nofile',{a:pos[1]}));
      par.k[name]={t:'f',c:r.n.c,m:r.n.m,out:r.n.out};
      if(c==='mv'){const sp=resolve(pos[0]),sn=sp.pop();const sparent=get(sp);if(sparent.k[sn]&&!(sparent===par&&sn===name))delete sparent.k[sn]}
      return ok('');
    }
    case 'chmod':{
      if(pos.length<2)return bad(t('sh_missing',{a:'chmod'}));
      const mode=pos[0],r=fileArg(pos[1]);if(r.e)return bad(r.e);
      let m=r.n.m.split('');
      if(/^[0-7]{3}$/.test(mode)){m=[];[...mode].forEach(d=>{const v=+d;m.push(v&4?'r':'-',v&2?'w':'-',v&1?'x':'-')})}
      else{const mm=/^([ugoa]*)([+-])([rwx]+)$/.exec(mode);if(!mm)return bad(t('sh_unsup',{a:mode}));
        const who=mm[1]||'a',idx={u:0,g:3,o:6};const groups=who.indexOf('a')>=0?[0,3,6]:[...who].map(w=>idx[w]);
        groups.forEach(g=>[...mm[3]].forEach(b=>{const o={r:0,w:1,x:2}[b];m[g+o]=mm[2]==='+'?b:'-'}));}
      r.n.m=m.join('');return ok('');
    }
    case 'find':{
      const sp=pos[0]&&pos[0][0]!=='-'?pos[0]:'.';const i=a.indexOf('-name');const re=i>=0?glob(a[i+1]||'*'):null;
      const start=resolve(sp),n=get(start);if(!n)return bad(t('sh_nofile',{a:sp}));
      const res=[];const walk=(nd,parts)=>{const p=parts.length?ab(parts):'/';const base=parts[parts.length-1]||'/';
        if(!re||re.test(base))res.push(sp[0]==='/'||sp==='~'?p:(sp==='.'?'.'+(parts.length>start.length?'/'+parts.slice(start.length).join('/'):''):p));
        if(nd.t==='d')Object.keys(nd.k).sort().forEach(k=>walk(nd.k[k],parts.concat(k)))};
      walk(n,start);
      return ok(res.filter(x=>x!=='/'||!re).join('\n'));
    }
    case 'sudo':return ok('');
    case 'apt':case 'apt-get':return sudo?ok(t('sh_apt')):bad(t('sh_perm',{a:'apt'}));
    case 'nmap':{
      const tg=args.filter(x=>x[0]!=='-').pop();
      if(tg!=='10.0.0.5'&&tg!=='practice-server.lab')return bad(t('sh_nmapOnly'));
      const v=flags.indexOf('s')>=0;
      return ok('Starting Nmap (simulated)\nNmap scan report for practice-server.lab (10.0.0.5)\nHost is up (0.0010s latency).\nPORT   STATE  SERVICE'+(v?' VERSION':'')+'\n22/tcp open   ssh'+(v?'     OpenSSH (fictional)':'')+'\n23/tcp closed telnet\n80/tcp open   http'+(v?'    Apache (fictional)':'')+'\n\n'+t('sh_nmapNote'));
    }
    default:{
      if(c.indexOf('/')>=0){
        const n=get(resolve(c));
        if(!n)return bad(t('sh_nofile',{a:c}));if(n.t==='d')return bad(t('sh_isdir',{a:c}));
        if(n.m[2]!=='x')return bad(t('sh_perm',{a:c}));
        return ok(n.out?L(n.out):'');
      }
      return bad(t('sh_notfound',{a:c}));
    }}
  }

  function run(line){
    line=line.trim();if(!line)return {out:''};
    hist.push(line);
    if(line.length>300)return {out:t('sh_unsup',{a:'…'}),err:true};
    const toks=tokenize(line),stages=[[]];
    toks.forEach(k=>{if(k==='|')stages.push([]);else stages[stages.length-1].push(k)});
    let redirect=null,last=stages[stages.length-1];
    const ri=last.findIndex(k=>k==='>'||k==='>>');
    if(ri>=0){redirect={op:last[ri],file:last[ri+1]};stages[stages.length-1]=last.slice(0,ri)}
    let data=null,prefix='';
    for(let i=0;i<stages.length;i++){
      let a=stages[i],sudo=false;
      if(!a.length)return {out:t('sh_missing',{a:'|'}),err:true};
      if(a[0]==='sudo'){sudo=true;prefix=t('sh_sudo')+'\n';a=a.slice(1);if(!a.length)return {out:prefix.trim()}}
      const r=cmd(a,data,sudo);
      if(r.clear)return r;
      if(r.err)return {out:r.out,err:true};
      data=r.out;
    }
    if(redirect){
      if(!redirect.file)return {out:t('sh_missing',{a:'>'}),err:true};
      const parts=resolve(redirect.file),name=parts.pop(),par=get(parts);
      if(!par||par.t!=='d')return {out:t('sh_nofile',{a:redirect.file}),err:true};
      const ex=par.k[name];if(ex&&ex.t==='d')return {out:t('sh_isdir',{a:redirect.file}),err:true};
      const old=ex&&redirect.op==='>>'?text(ex)+'\n':'';
      par.k[name]={t:'f',c:old+data,m:ex?ex.m:'rw-r--r--'};
      data='';
    }
    return {out:(prefix+data).replace(/\n$/,'')};
  }
  return {run,prompt:()=>'analyst@kali:'+pathStr()+'$',cwd:()=>ab(cwd)};
};

/* UI: builds DOM safely (textContent only). */
X.mount=function(el,spec,opts){
  opts=opts||{};
  const S=X.session(spec,opts);let hi=-1;const mem=[];
  el.innerHTML=`<div class="term" role="region" aria-label="Terminal"><div class="term-out" role="log" aria-live="polite"></div>
  <form class="term-in" autocomplete="off"><span class="p"></span><input type="text" aria-label="${t('termPh')}" placeholder="${t('termPh')}" autocapitalize="off" autocorrect="off" spellcheck="false" enterkeyhint="go"></form></div>
  ${opts.quick&&opts.quick.length?`<div class="chips" aria-label="${t('termQuick')}"><span class="muted">${t('termQuick')}:</span> ${opts.quick.map(q=>`<button type="button" class="tab" data-q="${q.replace(/"/g,'&quot;')}">${q.replace(/</g,'&lt;')}</button>`).join('')}</div>`:''}`;
  const out=el.querySelector('.term-out'),inp=el.querySelector('input'),pr=el.querySelector('.p');
  const add=(cls,txt)=>{const d=document.createElement('div');d.className='ln '+cls;d.textContent=txt;out.appendChild(d);return d};
  const setP=()=>{pr.textContent=S.prompt()+' '};
  const say=(line)=>{
    const p=S.prompt();const r=S.run(line);
    if(r.clear){out.innerHTML='';add('muted',t('sh_cleared'))}
    else{const d=add('cmd','');const s=document.createElement('span');s.className='p';s.textContent=p+' ';d.appendChild(s);d.appendChild(document.createTextNode(line));
      if(r.out)add(r.err?'err':'res',r.out)}
    setP();out.scrollTop=out.scrollHeight;
    opts.onCommand&&opts.onCommand({cmd:line.trim(),out:r.out||'',err:!!r.err,cwd:S.cwd()});
  };
  add('muted',t('termNote'));setP();
  el.querySelector('form').onsubmit=e=>{e.preventDefault();const v=inp.value;if(v.trim()){mem.push(v);hi=mem.length}inp.value='';say(v)};
  inp.onkeydown=e=>{if(e.key==='ArrowUp'&&mem.length){e.preventDefault();hi=Math.max(0,hi-1);inp.value=mem[hi]}
    if(e.key==='ArrowDown'&&mem.length){e.preventDefault();hi=Math.min(mem.length,hi+1);inp.value=mem[hi]||''}};
  el.querySelector('.term').onclick=()=>{if(!getSelection().toString())inp.focus()};
  el.addEventListener('click',e=>{const q=e.target.closest('[data-q]');if(q){say(q.dataset.q);mem.push(q.dataset.q);hi=mem.length}});
  return Object.assign(S,{note:txt=>{add('muted','ℹ '+txt);out.scrollTop=out.scrollHeight}});
};
window.CKX=X;
})();
