const staticCacheName = 'version1'
const assetsUrls = [
    'index.html',
    'main.js',
    '/style.css',
    '/manifest.json',
    '/sounds/beach.mp3',
    '/sounds/rain.mp3',
    '/video/rain.mp4',
    '/video/beach.mp4',
    '/svg/beach.svg',
    '/svg/moving-outline.svg',
    '/svg/pause.svg',
    '/svg/play.svg',
    '/svg/rain.svg',
    '/svg/replay.svg',
    '/svg/track-outline.svg',
    "/icon/icon-48x48.png",
    "/icon/icon-72x72.png",
    "/icon/icon-96x96.png",
    "/icon/icon-128x128.png",
    "/icon/icon-144x144.png",
    "/icon/icon-152x152.png",
    "/icon/icon-192x192.png",
    "/icon/icon-284x284.png",
    "/icon/icon-512x512.png",
    "/sw.js" 
   
]
self.addEventListener('install', async e =>{

    const cache = await caches.open(staticCacheName);
    //await cache.addAll(assetsUrls)
    await assetsUrls.map(async (el)=>{
        try{
            await cache.add(el)
        }
        catch(error){
            console.log(el+'- не закеширован')
        }

    })
})
self.addEventListener('fetch',(e)=>{
    e.respondWith(cacheFirst(e.request))
})
async function cacheFirst(request){
    const cached = await caches.match(request)
    if(cached=== null || cached === undefined){
    try{
        const result =  await fetch(request);
        return result;
    }
    catch(error){
        console.log("Неполучилось запросить",request.url)
    }
}
    else
        return cached;
}