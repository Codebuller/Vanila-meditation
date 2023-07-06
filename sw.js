const staticCacheName = 'version1'
const assetsUrls = [
    'index.html',
    'main.js',
    'style.css',
    'manifest.json',
    'public/sounds/beach.mp3',
    'public/sounds/rain.mp3',
    'public/video/rain.mp4',
    'public/video/beach.mp4',
    'public/svg/beach.svg',
    'public/svg/moving-outline.svg',
    'public/svg/pause.svg',
    'public/svg/play.svg',
    'public/svg/rain.svg',
    'public/svg/replay.svg',
    'public/svg/track-outline.svg',
    "public/icon/icon-48x48.png",
    "public/icon/icon-72x72.png",
    "public/icon/icon-96x96.png",
    "public/icon/icon-128x128.png",
    "public/icon/icon-144x144.png",
    "public/icon/icon-152x152.png",
    "public/icon/icon-192x192.png",
    "public/icon/icon-284x284.png",
    "public/icon/icon-512x512.png",
    "sw.js" 
   
]
self.addEventListener('install', async e =>{

    const cache = await caches.open(staticCacheName);
    await cache.addAll(assetsUrls)

})
self.addEventListener('activate', e =>{
    
})
self.addEventListener('fetch',(e)=>{
    e.respondWith(cacheFirst(e.request))
})
async function cacheFirst(request){
    const cached = await caches.match(request)
    return cached ?? await fetch(request)
}