const V='life-board-v1';
const SHELL=['./','./index.html','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
// كاش أولًا ثم تحديث في الخلفية (يشتغل من غير نت بعد أول زيارة، بما فيها الخطوط ومكتبة Three.js)
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET'||!r.url.startsWith('http'))return;
  e.respondWith(caches.match(r,{ignoreSearch:false}).then(hit=>{
    const net=fetch(r).then(res=>{if(res&&(res.ok||res.type==='opaque')){const cp=res.clone();caches.open(V).then(c=>c.put(r,cp))}return res}).catch(()=>hit);
    return hit||net}))});
