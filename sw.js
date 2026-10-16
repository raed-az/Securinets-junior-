/* Network-first service worker: always fresh online, still works offline once visited. */
const CACHE='cyberkids-v1';
const FILES=['./','index.html','css/styles.css','assets/logo.jpeg','manifest.webmanifest','js/i18n.js','js/i18n-extra.js','js/content.js','js/content2.js','js/store.js','js/art.js','js/engine.js','js/games.js','js/app.js'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(CACHE).then(x=>x.put(e.request,c));return r}).catch(()=>caches.match(e.request)));
});
