import runGame from '/game/gamerun.js'
import * as three from "/src/three.js"


if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {

    navigator.serviceWorker
      .register("serviceWorker.js")
      .then((res) => {
        //  alert("service worker installed!")
        // console.log("registered!")
      })
      .catch((err) => console.warn(err));
  });
}

var h = setTimeout(function(){
   runGame()
   
   
   
  clearTimeout(h)
}, 800)
