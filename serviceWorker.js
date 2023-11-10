
self.addEventListener("install", (installEvent) => {
  console.log("installed, caching files")
//  installEvent.waitUntil(preCache())
 // self.skipWaiting()
});

self.addEventListener("active", e => {
  console.log("activated")
})
/*
async function getCache(e){
  var res = caches.match(e.request)
  if (res) {
    console.log("found in cache")
    return res
  }
  console.log("fetching from network")
  return fetch(e.request)
}
*/
self.addEventListener('fetch', function(event) {
  //console.log("fetching for " + event.request.url)
  //event.respondWith(getCache(event))
});