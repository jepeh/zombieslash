import { Profile } from './profile.js'
import { zombieArray, Zombie } from "./zombie.js"
import Audios from './audio.js'
import images from './imageBuffer.js'
import { Hero, SCENE, CAMERA } from './environment.js'
import * as three from '../src/three.js'
import playSound from "./sound.js"

//var Profile = JSON.parse(localStorage.getItem("profile"))



var Timer = {

  level1to10: 90,
  level11to20: 130,
  level21to30: 200,
  level31to40: 250,
  level41to60: 350

}

var timerHandler = null
var genZombie = null
var genZombieInterval = 20000

function gameTime() {

  $("#timer").show()

  genZombieCon()


  var timeCurrent;
  if (Profile.level <= 10) {
    timeCurrent = Timer.level1to10
  } else if (Profile.level > 10 && Profile.level <= 20) {
    timeCurrent = Timer.level11to20
  } else if (Profile.level > 20 && Profile.level <= 30) {
    timeCurrent = Timer.level21to30
  } else if (Profile.level > 30 && Profile.level <= 40) {
    timeCurrent = Timer.level31to40
  } else if(Profile.level > 40) {
    timeCurrent = Timer.level41to60
  }
  
  var timeCeil = timeCurrent

  timerHandler = setInterval(function() {



    if (timeCurrent <= 0) {
      gameDone()
    }

    timeCurrent -= 1
    
    if (timeCurrent === 10) {
      playSound(Audios.clock)
    }
    
    
    var diff = timeCeil - timeCurrent
    var deg = (diff / timeCeil) * 360
    

    $("#timer p").text(timeCurrent.toString())

    $("#timer").css({
      background: `conic-gradient(#6AFFF2 ${deg}deg, #6AFFF23D 50deg)`
    })




  }, 1000)

}

function gameDone() {
  clearInterval(timerHandler)
  timerHandler = null
  clearInterval(genZombie)
  genZombie = null

  Audios.music.pause()
  Audios.clock.pause()

  // clear environment 
  for (var i = 0; i < zombieArray.length; i++) {
    var me = zombieArray[i]
    me.dispose()

    me.mesh.geometry.dispose()
    me.mesh.material.forEach(e => {
      e.dispose()
    })
    me.attacking = false
    clearInterval(me.shortAtt)
    clearInterval(me.longAtt)
    SCENE.remove(me.mesh)

    delete zombieArray[i]

    zombieArray.splice(i, 1)
    

  }
  zombieArray.length = 0


  $("#hit, #lightning, #slashpad, #joypad, #timer, .onGameHeader, .onGameBody").hide()


  // success 
  $(".gameSuccess").css("display", "grid")
  Profile.coins += 100

  Profile.health += 5

  playSound(Audios.reward)

  TweenMax.to(CAMERA.position, 1, {
    x: Hero.groupMesh.position.x + 30,
    y: 30,
    z: Hero.groupMesh.position.z + 30,
    onUpdate: function() {
      CAMERA.lookAt(Hero.groupMesh.position)
    }
  })

  $("#levelpassed").text(`Level ${Profile.level} Passed!`)
  $("#rewardcoin").text(`+100`)
  Profile.level += 1
  $("#rewardlevel").text(`new Level ${Profile.level}`)
  $("#rewardhp").text(`+5 HP`)

  localStorage.setItem("profile", JSON.stringify(Profile))



  $("#next").on("click", function() {
    window.location.reload()
  })
}


function gameOver() {
clearInterval(timerHandler)
  timerHandler = null
  clearInterval(genZombie)
  genZombie = null

  Audios.music.pause()
  Audios.clock.pause()

  // clear environment 
  for (var i = 0; i < zombieArray.length; i++) {
    var me = zombieArray[i]
    me.dispose()

    me.mesh.geometry.dispose()
    me.mesh.material.forEach(e => {
      e.dispose()
    })
    me.attacking = false
    clearInterval(me.shortAtt)
    clearInterval(me.longAtt)
    SCENE.remove(me.mesh)

    delete zombieArray[i]

    zombieArray.splice(i, 1)
    zombieArray.length = 0

  }
  zombieArray.length = 0


  $("#hit, #lightning, #slashpad, #joypad, #timer, .onGameHeader, .onGameBody").hide()


  // success 
  $(".gameSuccess").css("display", "grid")


  playSound(Audios.gameover)

  TweenMax.to(CAMERA.position, 1, {
    x: Hero.groupMesh.position.x + 30,
    y: 30,
    z: Hero.groupMesh.position.z + 30,
    onUpdate: function() {
      CAMERA.lookAt(Hero.groupMesh.position)
    }
  })

  $("#levelpassed").text(`Level ${Profile.level} Failed!`)
  $("#rewardcoin").text(`-100`)
  Profile.coin -= 100
  $("#rewardlevel").text(`old Level ${Profile.level}`)
  $("#rewardhp").text(`N/A`)

  localStorage.setItem("profile", JSON.stringify(Profile))

  $("#next").on("click", function() {
    window.location.reload()
  })

}


var maxZom = 0
var minZom = 2

if (Profile.level <= 10) {
  maxZom = 2
} else if (Profile.level > 10 && Profile.level <= 20) {
  maxZom = 4
}
else if (Profile.level > 20 && Profile.level <= 30) {
  maxZom = 8
} else if (Profile.level > 30 && Profile.level <= 70) {
  maxZom = 10
}

function genZombieCon() {

  genZombie = setInterval(function() {


    var count = Math.floor(Math.random() * (maxZom - minZom) + minZom)
    var meshArr = []

    for (var i = 0; i <= count; i++) {

      var field = new three.PlaneGeometry(13, 13)
      var fieldMat = new three.MeshPhongMaterial({
        transparent: true,
        map: images.earthCrackZombie,
        side: 2

      })
      var fieldMesh = new three.Mesh(field, fieldMat)


      var pos = {
        x: Hero.groupMesh.position.x + Math.floor(Math.random() * (25 - (-25)) + (-25)),
        y: 2,
        z: Hero.groupMesh.position.z + Math.floor(Math.random() * (25 - (-25)) + (-25))
      }

      fieldMesh.rotation.x = -Math.PI / 2
      fieldMesh.position.x = pos.x
      fieldMesh.position.z = pos.z
      fieldMesh.position.y = 1

      fieldMesh.scale.set(0, 0, 0)

      TweenMax.to(fieldMesh.scale, .89, {
        x: 1.6,
        y: 1.6,
        z: 1.6
      })

      meshArr.push(fieldMesh)


      // Zombie 

      var o = Profile.level > 10 ? Math.floor(Math.random() * (3 - 1) + 1) : Math.floor(Math.random() * (3 - 1) + 1) 

      var zom = new Zombie(pos, i, o)
      var me = zom.getMesh()

      me.position.y = -4

      TweenMax.to(me.position, 2.3, {
        y: 2
      })


      SCENE.add(me)
      zombieArray.push(zom)


      SCENE.add(fieldMesh)

    }


    var done = setTimeout(function() {
      for (var i in meshArr) {
        var me = meshArr[i]

        TweenMax.to(me.scale, .8, {
          x: 0,
          y: 0,
          z: 0,
          onComplete: function() {
            me.material.dispose()
            me.geometry.dispose()
            SCENE.remove(me)
          }
        })
      }
      clearTimeout(done)
    }, 2900)


  }, genZombieInterval)

}


export {gameTime, gameOver}