import * as three from "../src/three.js"
import { Hero, SCENE, runesArray, gameStat } from './environment.js'
import images from './imageBuffer.js'
import { Profile } from './profile.js'
import playSound from './sound.js'
import Audios from './audio.js'

//var Profile = JSON.parse(localStorage.getItem("profile"))


var CLOCK = new three.Clock()

class Runes {
  constructor(pos) {
    this.mesh;
    this.pos = pos
    this.skinpos
    this.renderMesh()
    this.skin;
    this.health
    this.h = 100
    this.hit = 15

  }
  renderMesh() {


    var healthMat = new three.SpriteMaterial({
      map: new three.TextureLoader().load("assets/images/health.png")
    })

    this.health = new three.Sprite(healthMat)
    this.health.position.y = 3.3

    this.health.material.map.magFilter = three.NearestFilter
    this.health.material.map.repeat.set(1, 1 / 5)


    this.health.scale.x = 2
    this.health.scale.y = .5 * .6


    this.health.material.map.offset.y = 1


    this.skinpos = new three.Group()

    this.mesh = new three.Mesh(new three.BoxGeometry(2, .1, 2), new three.MeshPhongMaterial())
    this.mesh.position.copy(this.pos)
    this.mesh.material.transparent = true
    this.mesh.material.opacity = 0


    this.skin = new three.Mesh()
    this.skin.geometry = new three.CylinderGeometry(1, 1, 5, 10)
    this.skin.material = new three.MeshPhongMaterial({
      transparent: true,
      map: images.rune,
      side: 2
    })

    var skintop = new three.Mesh()
    skintop.geometry = new three.CylinderGeometry(1.3, 1.3, .7, 10)
    skintop.material = new three.MeshPhongMaterial({
      color: "black"
    })
    skintop.position.y = 2.3
    this.skinpos.add(skintop)

    var skinbot = new three.Mesh()
    skinbot.geometry = new three.CylinderGeometry(1.3, 1.3, .7, 10)
    skinbot.material = new three.MeshPhongMaterial({
      color: "black"
    })
    skinbot.position.y = -1.5
    this.skinpos.add(skinbot, this.skin)

    this.mesh.add(this.skinpos, this.health)
    SCENE.add(this.mesh)
  }
  getMesh() {
    return this.mesh
  }
  hurt(i) {
    
    
        // Display Hit 
    var hit = new three.Sprite(new three.SpriteMaterial({
      map: images.hit,
      depthTest: false
    }))

    hit.position.copy(this.mesh.position)
    hit.scale.set(0, 0, 0)
    SCENE.add(hit)
    TweenMax.to(hit.scale, .1, {
      x: 5,
      y: 5,
      z: 5,
      onComplete: function() {
        hit.material.dispose()
        hit.geometry.dispose()
        SCENE.remove(hit)

      }
    })
    
    
    
    if (this.h <= 80 && this.h > 61) {
      this.health.material.map.offset.y = .6
    } else if (this.h <= 60 && this.h > 41) {
      this.health.material.map.offset.y = .4

    }
    else if (this.h <= 40 && this.h > 21) {
      this.health.material.map.offset.y = .2
    }
    else if (this.h <= 20 && this.h > 11) {
      this.health.material.map.offset.y = .2

    } else if (this.h <= 10 && this.h > 1) {
      this.health.material.map.offset.y = 0
    } else if (this.h < 0) {
      this.die(i)
      runesArray.splice(i, 1)
    }
  }
  die(i) {

    var parts = []


    for (var i = 0; i < 5; i++) {



      var mesh = new three.Sprite(new three.SpriteMaterial({
        map: images.orb
      }));

      mesh.position.x = this.pos.x
      mesh.position.y = this.pos.y
      mesh.position.z = this.pos.z



      var targetX = this.pos.x + (-1 + Math.random() * 2) * 5;
      var targetY = this.pos.y + (2 + Math.random() * 2) * 1;
      var targetZ = this.pos.z + (-1 + Math.random() * 2) * 5;

      SCENE.add(mesh)
      parts.push(mesh)

      TweenMax.to(mesh.position, .7, {
        x: targetX,
        y: targetY,
        z: targetZ,
        /* delay: Math.random() * .1,
         ease: Power2.easeOut,*/
        onComplete: function() {
          // mesh.scale.set(3, 3, 3)
          /*  mesh.material.dispose()
            mesh.geometry.dispose()*/
          for (var u = 0; u < parts.length; u++) {
            if (parts[u].parent) {


              TweenMax.to(parts[u].position, .3, {
                x: Hero.groupMesh.position.x,
                y: Hero.groupMesh.position.y,
                z: Hero.groupMesh.position.z,
                onComplete: function(){
                  playSound(Audios.exp)
                  for (var o=0; o<parts.length; o++){
                    parts[o].material.dispose()
                    SCENE.remove(parts[o])
                  }
                }
                
              })

            }
          }
        }
      });

    }




    this.mesh.material.dispose()

    this.mesh.geometry.dispose()
    SCENE.remove(this.mesh)

    //   runesArray.splice(i, 1)


    var spr = new three.Mesh(new three.SphereGeometry(2), new three.MeshPhongMaterial({
      map: images.rune,
      transparent: true
    }))

    spr.scale.x = 0
    spr.scale.y = 0
    spr.scale.z = 0
    spr.position.copy(this.pos)

    SCENE.add(spr)
    delete this

    // update first skill 

    gameStat.firstSkill += 100

    if (gameStat.firstSkill >= 100) {
      $(".firstSkill").css("opacity", "1")
    } 

     if (gameStat.firstSkill >= 100 && gameStat.secondSkill >= 100 && Profile.thirdSkillOpen === true && Profile.secondSkillOpen === true) {
      // open third skill 

      gameStat.thirdSkill = 100
  //    Profile.thirdSkillOpen = true
  //    $("#thirdskill").css("width", "100%")
      $(".thirdSkill").css("opacity", "1")

    }

   


    TweenMax.to(spr.scale, .4, {
      x: 2,
      y: 2,
      z: 2,
      onComplete: function() {
        spr.material.dispose()
        spr.geometry.dispose()
        SCENE.remove(spr)

      }
    })

  }

  update(t) {

    this.skin.rotation.y += t * .0009

  }
}

function animateRunes() {

  var time = CLOCK.getElapsedTime()

  if (runesArray) {
    for (var i = 0; i < runesArray.length; i++) {
      runesArray[i].update(time)
    }
  }
  requestAnimationFrame(animateRunes)
}
animateRunes()
export { Runes }