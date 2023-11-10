import * as three from "../src/three.js"
import getMeshImage from './assetGenerator.js'
import { TransformControls } from '../src/TransformControls.js'
import {
  CAMERA,
  RENDERER,
  SCENE,
  Mixer,
  Hero
} from "./environment.js"
import { Skills } from './skills.js'
import { GLTFLoader } from '../src/Loader/GLTFLoader.js'
import playSound from './sound.js'
import Audios from './audio.js'
import { Profile, Skins, Swords } from './profile.js'
import images from "./imageBuffer.js"
//import ScreenShake from '../src/ScreenShake.js'
import {gameOver} from './gameTimer.js'
//var Profile = JSON.parse(localStorage.getItem("profile"))

var txt = new three.TextureLoader()
var gltf = new GLTFLoader()
var RangeAttack = []

//var Shake = ScreenShake()

var CLOCK = new three.Clock()
var txt = new three.TextureLoader()

export default class Character {
  constructor(pos, physics) {
    this.pos = new three.Vector3(pos.x, pos.y, pos.z)
    this.color = "green"

    this.physics = physics
    this.velocity = 20
    this.attackHit = 150
    this.attacking = false
    // Accessories 

    // sword / slash fx
    this.sword;
    this.pointmesh;
    this.groupMesh = new three.Group();
    this.swordGroup = new three.Group();
    this.mesh;
    this.light = new three.PointLight("red", 1.2, 30)


    this.shield;
    this.isShield = false

    this.health
    this.h = Profile.health
    // swords
    this.type = "tank"
    this.heroName = "Barbarian"
    this.element = Profile.element
    this.controller = null;

    this.p = document.createElement('p')
    this.p.classList.add("hitText")
    this.p.innerText = 'ye'

    window.document.body.append(this.p)
    this.p.style.display = 'none'
    this.idle = true
    this.actions = {
      attacks: []
    }

    this.rangeAttackDone = true
  }

  renderMesh() {


    // Healt txt 
    var healthMat = new three.SpriteMaterial({
      map: txt.load("assets/images/health.png")
    })

    this.health = new three.Sprite(healthMat)
    this.health.position.y = 3

    this.health.material.map.magFilter = three.NearestFilter
    this.health.material.map.repeat.set(1, 1 / 5)


    this.health.scale.x = 1
    this.health.scale.y = .17


    this.health.material.map.offset.y = 1

this.health.visible = false

    this.light.position.y = 0.5




    // get Actions 

    // this.actions.idle = Mixer.clipAction(three.AnimationClip.findByName(this.groupMesh.animations, "Idle"))




    /*
    var map = txt.load(Skins[Profile.skin].src)

        var geo = new three.BoxGeometry(4, 4, 4)
        var mat = new three.MeshPhongMaterial({
          map: map
        })
        var mesh = new three.Mesh(geo, mat)
        mesh.castShadow = true
        mesh.receiveShadow = true

        this.mesh = mesh
        this.health.visible = false
        this.mesh.add(this.light, this.health)

        getMeshImage(Swords[Profile.sword].img, this.swordGroup)

        this.swordGroup.rotation.y = -Math.PI / 2
        this.swordGroup.position.x = -2.3
        this.swordGroup.position.z = 2.5
        this.swordGroup.position.y = 0
        this.swordGroup.rotation.z = -Math.PI / 6
        this.groupMesh.add(this.swordGroup)
*/

    // fix orientation and position

    // first attack beg
    // first attack end 
    // this.sword.rotation.z = Math.PI/2


    // second attack beg 
    //  this.sword.rotation.x = Math.PI/2
    // second attack end
    // this.sword.rotation.z = Math.PI

    // third attack beg
    //  this.sword.rotation.x = -Math.PI / 2
    //  this.sword.rotation.z = -Math.PI 
    // this.sword.rotation.y = Math.PI/3
    // first attack end 
    // this.sword.rotation.z = Math.PI


    // fourth attack beg
    //  this.sword.rotation.x = -Math.PI / 2
    //  this.sword.rotation.z = -Math.PI 
    //  this.sword.rotation.y = Math.PI/1.5
    // first attack end 
    // this.sword.rotation.z = Math.PI/2



    /*   var se = this

       setTimeout(function() {
         TweenMax.to(se.sword.rotation, 2, {
           z: Math.PI/2
         })
       }, 2000)*/




    // first attack end
    // this.swordGroup.rotation.y = Math.PI
    // second attack end 
    //  this.swordGroup.rotation.y = 0


    // second attack beg
    //this.sword.rotation.x = Math.PI/2
    //  this.sword.position.z = 0




    // sword First Attack Beg
    /*  this.swordGroup.rotation.y = -Math.PI / 2
    this.sword.rotation.x = Math.PI / 2
    this.sword.rotation.z = Math.PI / 4
      this.sword.position.z = 4
    // sword First Atttack End 
    // sword Second Attack Beg
    /*  
    this.swordGroup.rotation.y = -Math.PI / 3
    // sword second Atttack End 
    this.swordGroup.roation.y = Math.PI / 3
*/

    // sword Third Attack Beg
    /* this.swordGroup.rotation.x = -Math.PI / 2
    this.swordGroup.rotation.z = Math.PI / 2
    // sword third attack end 
    this.swordGroup.rotation.y = Math.PI / 3
    this.swordGroup.rotation.x = Math.PI/3
  */

    // sword fourth attack beg

    /* 
    this.swordGroup.rotation.x = -Math.PI / 4
    this.swordGroup.rotation.y = Math.PI / 4
    this.swordGroup.rotation.z = Math.PI / 3

    // sword fourth attack end 
    this.swordGroup.rotation.x = Math.PI/4
    this.swordGroup.rotation.y = -Math.PI/4
*/

    // this.sword.add(new three.AxesHelper(4))
    // this.sword = sword

    //   mesh.rotation.x = Math.PI/12
    //    this.mesh.add(new three.AxesHelper(6))


    // claws 
    // this.groupMesh.visible = false
    //  this.physics.addMesh(this.groupMesh, 1)
  }
  getMesh() {
    return this.groupMesh
  }


  getScreen() {
    this.pos = this.pos.setFromMatrixPosition(this.groupMesh.matrixWorld);
    this.pos.project(CAMERA);

    let widthHalf = innerWidth / 2;
    let heightHalf = innerHeight / 2;

    this.pos.x = (this.pos.x * widthHalf) + widthHalf;
    this.pos.y = -(this.pos.y * heightHalf) + heightHalf;
    //  this.pos.z = 0;

    this.p.style.marginLeft = this.pos.x + "px"

    this.p.style.marginTop = this.pos.y + "px"

  }


  attack(target, zi, pos) {


    if (this.type === "range") {

      // gen energy ball spell 

      var ratt = new MageAttack(pos, target, zi)
      RangeAttack.push(ratt)


    }

  }


  hurt(en, hitCount) {

    this.p.style.display = 'block'

    this.p.innerText = "-" + hitCount
    this.getScreen()


    this.actions.hit.play().reset()


    var self = this

    var di = setTimeout(function() {
      self.p.style.display = "none"
      clearTimeout(di)
    }, 500)


    // shake camera
    //Shake.shake(CAMERA, new three.Vector3(.5,.5,.5), 200)

    // Hero knockback 
    var xx = this.groupMesh.position.x - en.x
    var zz = this.groupMesh.position.z - en.z

    var posx = this.groupMesh.position.x - -xx
    var posz = this.groupMesh.position.z - -zz

    TweenMax.to(this.groupMesh.position, 1, {
      x: posx,
      z: posz
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
      this.health.material.map.offset.y = 0.0

    } else if (this.h <= 10 && this.h > 1) {
      this.health.material.map.offset.y = 0
    } else if (this.h <= 0) {
      this.die()
    }
  }
  
  die() {
    
    
    this.actions.die.play()
    gameOver()
    
    
  }
}

var combo = 0


$("#lightning").on("click", function() {

  // lightming attack
  Skills.lightning()
  $("#hit").css("left", "-50%")
  $("#lightning").hide()
  combo = 0
})

class MageAttack {
  constructor(initPos, zombie, zi) {
    this.pos = initPos
    this.targetPos = zombie.mesh.position
    this.walkDir = new three.Vector3()
    this.angle = new three.Vector3(0, 1, 0)
    this.mesh;
    this.zi = zi
    this.zombie = zombie
    this.renderMesh()


  }
  renderMesh() {



    var gm;
  
      playSound(Audios.flyAttack)
      gm = new three.Sprite(new three.SpriteMaterial({
        transparent: true,
        map: images["orb" + Profile.element]
      }))
      gm.scale.set(2.5, 2.5, 2.5)

    gm.position.copy(this.pos)
    //  gm.position.y = 3.7
    //  gm.position.z = this.pos.z + 3.5
    //   gm.position.x = this.pos.x +2

    this.mesh = gm

    SCENE.add(gm)


    return;
  }


  update(d, index) {
    var self = this
    var target = self.targetPos

    self.walkDir.x = target.x - self.pos.x
    self.walkDir.z = target.z - self.pos.z
    self.walkDir.y = target.y - self.pos.y


    this.angle.normalize()
    this.walkDir.normalize()
    //this.mesh.quaternion.rotateTowards(this.rotateQuarternion, .1)

    // Update this mesh's position
    this.walkDir.applyAxisAngle(this.angle, 0)


    // move model & camera
    var mX = this.walkDir.x * 23 * d
    var mZ = this.walkDir.z * 23 * d
    var mY = this.walkDir.y * 23 * d

    self.mesh.position.x += mX
    self.mesh.position.z += mZ
    self.mesh.position.y += mY




    var di = dist(self.mesh.position.x, self.pos.x, self.mesh.position.z, self.pos.z)
    var hitdi = dist(self.mesh.position.x, self.zombie.mesh.position.x, self.mesh.position.z, self.zombie.mesh.position.z)


    if (hitdi < 4) {


      $("#hit").css('left', "3%")
      if (combo >= 80) {

        // do combo attack
        // display lightning attack 

        $("#lightning").show()

      }

      if (combo < 80) {
        combo++
        $("#hit").text("Attack Hit x" + combo + " !!")
      }



      self.die(index)
      self.zombie.hurt(Hero.attackHit)
      self.zombie.h -= Hero.attackHit

      if (self.zombie.h <= 0) {
        self.zombie.die(self.zi)
      }
    }
    else if (di >= 30) {
      self.die(index)
    }






    return;
  }
  dispose() {

    var self = this
    self.mesh.geometry.dispose()
    self.mesh.children.forEach(e => {
      e.dispose()
    })


    var hit = new three.Mesh(new three.SphereGeometry(3.7), new three.MeshStandardMaterial({
      color: "purple",
      transparent: true,
      opacity: .8,
      depthTest: false
    }))

    hit.position.copy(self.mesh.position)
    hit.scale.set(0, 0, 0)
    SCENE.add(hit)
    TweenMax.to(hit.scale, .3, {
      x: 1,
      y: 1,
      z: 1,
      onComplete: function() {
        hit.material.dispose()
        hit.geometry.dispose()
        SCENE.remove(hit)

      }
    })

    return;
  }

  die(index) {
    this.dispose()
    //  Hero.rangeAttackDone = true

    var me = this.mesh
    //   this.zombieClass.shoot = false
    RangeAttack.splice(index, 1)

    SCENE.remove(me)
    delete this
  }
}

function dist(x1, x2, y1, y2) {
  return Math.abs(Math.floor(Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1))))
}



function updateHero() {

  var delta = CLOCK.getDelta()
  var eTime = CLOCK.getElapsedTime()

  //  Shake.update(CAMERA)

  // for character and camera control
  /*  if (Hero !== undefined) {
      Hero.controller.update(delta, eTime)
    }*/

  for (var i = 0; i < RangeAttack.length; i++) {
    RangeAttack[i].update(delta, i)
  }


  requestAnimationFrame(updateHero)
}

updateHero()