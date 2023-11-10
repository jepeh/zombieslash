import * as three from "../src/three.js"
import { ZombiesSCENE, gameStat, Hero, CAMERA, RENDERER, SCENE } from './environment.js'
import { TransformControls } from "../src/TransformControls.js"
import playSound from "./sound.js"
import Audios from "./audio.js"
import { Profile } from './profile.js'
import images from './imageBuffer.js'

//var Profile = JSON.parse(localStorage.getItem("profile"))


var TexLoader = new three.TextureLoader()
var zombieArray = []
var attackQueue = []
var CLOCK = new three.Clock()

class Zombie {
  constructor(pos, i, type) {
    this.pos = new three.Vector3(pos.x, pos.y, pos.z)
    this.velocity = 4

    this.walkDirection = new three.Vector3()
    this.rotateAngle = new three.Vector3(0, 1, 0)

    this.mesh = null;



    this.type = type
    this.renderMesh()


    this.h = Profile.zombieHealth
    this.name = "zombie" + i;


    this.claw;

    this.walk = true
    this.attacking = false
    this.attackHit = 20

    this.screenPos = new three.Vector3();
    this.health;

    this.bulletArr = []
    this.shortAtt;
    this.longAtt;

    this.freeze = false
    this.p = document.createElement('p')
    this.p.classList.add("hitText")
    this.p.innerText = 'ye'

    window.document.body.append(this.p)
    this.p.style.display = 'none'

this.shoot = false

  }



  renderMesh() {


    // generate HP.bar 
    // Healt txt 
    var healthMat = new three.SpriteMaterial({
      map: TexLoader.load("assets/images/health.png")
    })

    this.health = new three.Sprite(healthMat)
    this.health.position.y = 3

    this.health.material.map.magFilter = three.NearestFilter
    this.health.material.map.repeat.set(1, 1 / 5)


    this.health.scale.x = 3
    this.health.scale.y = .5
    this.health.material.map.offset.y = 1



    // render Type of Zombie 
    if (this.type === 1) {
      this.mesh = this.renderWalker()

    }
    else if (this.type === 2) {

      this.mesh = this.renderFlier()
    }


    this.mesh.add(this.health)


    //window.document.body.appendChild(this.hpBar)
   SCENE.add(this.mesh)

    return;
  }

  renderWalker() {


    this.claw = new three.Group()
    var zombie = [
    new three.MeshPhongMaterial({
        map: images.zskin
      }),
    new three.MeshPhongMaterial({
        map: images.zskin
      }),
    new three.MeshPhongMaterial({
        map: images.zskin
      }),
   new three.MeshPhongMaterial({
        map: images.zskin
      }),
    new three.MeshPhongMaterial({
        map: images.zskin
      }),
    new three.MeshPhongMaterial({
        map: images.zeye
      }),
    ]


    // body mesh object for Type 1 zombie, walkers
    var geo0 = new three.BoxGeometry(3, 3, 3)
    var mesh0 = new three.Mesh(geo0, zombie)

    mesh0.position.copy(this.pos)
    mesh0.position.y = 10



    mesh0.castShadow = true

    // claws 
    var geo1 = new three.PlaneGeometry(4.5, 4.5)
    var mat1 = new three.MeshPhongMaterial({
      transparent: true,
      side: 2,
      map: images.claw
    })
    var claw1 = new three.Mesh(geo1, mat1)
    claw1.rotation.z = Math.PI / 2

    var geo2 = new three.PlaneGeometry(3, 3)
    var mat2 = new three.MeshPhongMaterial({
      transparent: true,
      side: 2,
      map: images.claw
    })

    var claw2 = new three.Mesh(geo2, mat2)
    claw2.rotation.z = Math.PI / 2
    claw2.position.z = -.5

    var geo3 = new three.PlaneGeometry(3, 3)
    var mat3 = new three.MeshPhongMaterial({
      transparent: true,
      side: 2,
      map: images.claw
    })

    var claw3 = new three.Mesh(geo3, mat3)
    claw3.rotation.z = Math.PI / 2
    claw3.position.z = .5

    mesh0.add(this.claw)
    this.claw.position.z = -3

    this.claw.rotation.x = -1.04719
    this.claw.rotation.y = -0.78760
    this.claw.rotation.z = -1.13950

    // first attack beg
    /* X: -1.04719
     Y: -0.78760
     Z: -1.13950*/
    this.claw.scale.x = 2.6
    this.claw.scale.y = 2.6
    this.claw.scale.z = 2.6

    this.claw.visible = false
    this.claw.add(claw1, claw2, claw3)

    return mesh0
  }

  renderFlier() {

    var zombie = [
    new three.MeshPhongMaterial(),
    new three.MeshPhongMaterial(),
    new three.MeshPhongMaterial(),
    new three.MeshPhongMaterial(),
    new three.MeshPhongMaterial(),
    new three.MeshPhongMaterial({
        map: images.zface
      }),
    ]


    // physics object
    var geo0 = new three.BoxGeometry(3, 3, 3)


    var mesh0 = new three.Mesh(geo0, zombie)

    mesh0.position.copy(this.pos)
    mesh0.castShadow = true
    mesh0.receiveShadow = true
    
    
    var wing = new three.Mesh(new three.PlaneGeometry(3, 3), new three.MeshPhongMaterial({
      side: 2,
      transparent: true,
      map: images.zwing
    }))
    wing.rotation.y = Math.PI
    wing.position.x = 3
    wing.position.y = .5
    wing.castShadow = true

    var wing2 = new three.Mesh(new three.PlaneGeometry(3, 3), new three.MeshPhongMaterial({
      side: 2,
      transparent: true,
      map: images.zwing
    }))
    wing2.rotation.y = Math.PI * 2
    wing2.position.x = -3
    wing2.position.y = .5
    wing2.castShadow = true

    //wing.rotation.x = Math.PI/4
    mesh0.add(wing, wing2)
    // SCENE.add(this.mesh)

    return mesh0
  }

  getMesh() {
    return this.mesh
  }

  getScreen() {
    this.pos = this.pos.setFromMatrixPosition(this.mesh.matrixWorld);
    this.pos.project(CAMERA);

    let widthHalf = innerWidth / 2;
    let heightHalf = innerHeight / 2;

    this.pos.x = (this.pos.x * widthHalf) + widthHalf;
    this.pos.y = -(this.pos.y * heightHalf) + heightHalf;
    //  this.pos.z = 0;

    this.p.style.marginLeft = this.pos.x + "px"
    this.p.style.marginTop = this.pos.y + "px"

  }

  attack() {

    var self = this
    var attackCount = 0


    if (self.type === 1) {

      this.shortAtt = setInterval(function() {


        if (self.attacking) {

        //var bul = new zomBullet(self.mesh.position, Hero.groupMesh.position)

          self.claw.visible = true
          playSound(Audios.zombieSlash)

          if (attackCount === 0) {
            TweenMax.to(self.claw.rotation, .12, {

              x: -1.04719,
              y: -0.78760,
              z: 2.821813,

              /*First attack end 
              X: -1.04719
              Y: -0.78760 
              Z: 2.821813*/

              onComplete: function() {
                attackCount++
                self.claw.visible = false
                /* Second attack beg
                X: 2.09439 
                Y: -0.74342
                Z: 1.711343*/
                self.claw.rotation.x = 2.09439
                self.claw.rotation.y = -0.6432
                self.claw.rotation.z = 1.711343
              }

            })
          }
          else if (attackCount === 1) {
            TweenMax.to(self.claw.rotation, .12, {

              x: 2.09439,
              y: -0.6432,
              z: -0.66619,

              /*second attack end 
              X: 2.09439
              Y: -0.74342
              Z: -0.66619*/

              onComplete: function() {
                attackCount = 0
                self.claw.visible = false
                self.claw.rotation.x = -1.04719
                self.claw.rotation.y = -0.78760
                self.claw.rotation.z = -1.13950

                // first attack beg
                /* X: -1.04719
                 Y: -0.78760
                 Z: -1.13950*/

              }

            })
          }

          Hero.h = Hero.h - self.attackHit
          Hero.hurt(self.mesh.position, self.attackHit)

          /*   for (var p = 0; p < 10; p++) {
               var rx = Math.random() * (1 - (-1) + (-1))
               var ry = Math.random() * (1 - (-1) + (-1))
               var rz = Math.random() * (1 - (-1) + (-1))

               CAMERA.position.x += rx
               CANERA.position.y += ry
               CAMERA.position.z += rz

             }*/

          /*    var ePos = {
                x: Hero.groupMesh.position.x,
                z: Hero.groupMesh.position.z
              }
              var self = this
              TweenMax.to(ePos, 1, {
                x: ePos.x -= -xx,
                z: ePos.z -= -zz,
                onUpdate: function() {
                  Hero.groupMesh.position.x = ePos.x
                  Hero.groupMesh.position.z = ePos.z

                }
              })*/

        } else {

          clearInterval(this.shortAtt)
        }
      }, 2000)

    }


    // long rage
    else if (self.type === 2) {
      self.attackLong()
    }
  }

  update(delta, eTime) {

    this.walkDirection.x = this.pos.x
    this.walkDirection.z = this.pos.z

    this.rotateAngle.normalize()
    this.walkDirection.normalize()
    //this.mesh.quaternion.rotateTowards(this.rotateQuarternion, .1)

    // Update this mesh's position
    this.walkDirection.applyAxisAngle(this.rotateAngle, 0)

    // check if Hero i,s near an enemy, then look 
    // calculate distance 
    var distance = dist(Hero.groupMesh.position.x, this.mesh.position.x, Hero.groupMesh.position.z, this.mesh.position.z)


    // this.mesh.position.y = Math.sin(delta * 2) 
    this.mesh.position.y = (Math.sin(eTime * 4) * .2) + 2



    // move model & camera
    var mX = this.walkDirection.x * this.velocity * delta
    var mZ = this.walkDirection.z * this.velocity * delta


    // health roation uodate
    /*   var angleYBar = Math.atan2(
      (this.mesh.position.x - CAMERA.position.x),
      (this.mesh.position.z - CAMERA.position.z))

    this.hpBar.rotation.y = Math.PI + angleYBar
*/


    // update bullets 

    /*  if (this.bulletArr.length > 0) {
        for (var f = 0; f < this.bulletArr.length; f++) {
          this.bulletArr[f].update(delta)
        }
      }*/

    // check if water element first skill shield is on


    if (distance <= 30) {

      if (Hero.isShield === false) {

        if (this.freeze === false) {
          this.lookAtHero()

          // type 1, walkers
          if (this.type === 1) {

            // chase
            this.pos.x = Hero.groupMesh.position.x - this.mesh.position.x
            this.pos.z = Hero.groupMesh.position.z - this.mesh.position.z

            if (distance <= 5) {
              this.walk = false

              if (this.attacking === false) {
                this.attacking = true
                this.attack()
              }

            } else {
              this.walk = true
              this.attacking = false

            }

          }

          // type 2, fliers
          else if (this.type === 2) {

            this.walk = false
            this.lookAtHero()

            if (this.attacking === false) {
              this.attacking = true
              this.attack()
            }

          }


        } else {
          this.walk = false
          this.attacking = false
        }


      }


      else {

        this.walk = true
        this.attacking = false



      }


    }

    else {
      this.walk = true
      this.attacking = false




    }




    // check bounding
    if (this.mesh.position.x > 100) {
      this.pos.x = -100
    }
    else if (this.mesh.position.x < -100) {
      this.pos.x = 100
    } else if (this.mesh.position.z > 100) {
      this.pos.z = -100
    } else if (this.mesh.position.z < -100) {
      this.pos.z = 100
    }


    if (this.walk) {


      this.mesh.position.x += mX
      this.mesh.position.z += mZ
      this.mesh.position.y = 2

    }

    // type 2, fliers idle animation
    if (this.type === 2) {
      this.mesh.children[0].rotation.z = Math.sin(eTime * 8) * .7
      this.mesh.children[1].rotation.z = Math.sin(eTime * 8) * .7

      this.mesh.position.y = (Math.sin(eTime * 7) * .2) + 7

    }


    return;
  }

  lookAtHero() {

    var angleYCameraDirection = Math.atan2(
      (this.mesh.position.x - Hero.groupMesh.position.x),
      (this.mesh.position.z - Hero.groupMesh.position.z))

    /*  TweenMax.to(this.mesh.rotation, .4, {
        y: angleYCameraDirection
      })*/

    this.mesh.rotation.y = angleYCameraDirection

    return;
  }

  hurt(hitCount) {
    playSound(Audios.zombieHit)

    this.p.style.display = 'block'
    this.p.innerText = "-" + hitCount
    this.getScreen()

    var self = this

    var di = setTimeout(function() {
      self.p.style.display = "none"
      clearTimeout(di)
    }, 500)

    var he = this.h / Profile.zombieHealth

    if (he <= .8 && he > .61) {
      this.health.material.map.offset.y = .6

    } else if (he <= .6 && he > .41) {
      this.health.material.map.offset.y = .4

    }
    else if (he <= .4 && he > .21) {
      this.health.material.map.offset.y = .2
    }
    else if (he <= .20 && he > .11) {
      this.health.material.map.offset.y = .2

    } else if (he <= .10 && he > 0.01) {
      this.health.material.map.offset.y = 0
    }


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


  }

  dispose() {
    this.attacking = false
    clearInterval(this.shortAtt)
    this.shortAtt = null

    this.mesh.geometry.dispose()
    this.mesh.material.forEach(e => {
      e.dispose()
    })

    SCENE.remove(this.mesh)
    delete this

    return;

  }


  die(i) {
    playSound(Audios.zombieDie)
    this.dispose()
    zombieArray.splice(i, 1)


    // Display Hit 
    var hit = new three.Mesh(new three.SphereGeometry(5), new three.MeshStandardMaterial({
      color: "green",
      transparent: true,
      opacity: .6,
      depthTest: false
    }))

    hit.position.copy(this.mesh.position)
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


    gameStat.secondSkill += 100

    if (gameStat.secondSkill >= 100 && Profile.secondSkillOpen === true) {
    //  Profile.secondSkillOpen = true
      $(".secondSkill").css("opacity", "1")
    }

    if (gameStat.firstSkill >= 100 && gameStat.secondSkill >= 100 && Profile.thirdSkillOpen === true && Profile.secondSkillOpen === true) {
      // open third skill 

      gameStat.thirdSkill = 100
  //    Profile.thirdSkillOpen = true
  //    $("#thirdskill").css("width", "100%")
      $(".thirdSkill").css("opacity", "1")

    }

  }

  attackLong() {
    var self = this

    this.longAtt = setInterval(function() {
      if (self.attacking === true) {

        if (self.shoot === false) {
          self.shoot = true
          var sonic = new FlyAttack(self.mesh.position, Hero.groupMesh.position, self)
          attackQueue.push(sonic)
          
        }

      } else {

        clearInterval(this.longAtt)
      }

    }, 3500)

  }
}


class FlyAttack {
  constructor(initPos, targetPos, zom) {
    this.pos = initPos
    this.targetPos = targetPos
    this.walkDir = new three.Vector3()
    this.angle = new three.Vector3(0, 1, 0)
    this.mesh;
    this.renderMesh()
    
    this.zombieClass = zom

  }
  renderMesh() {

playSound(Audios.flyAttack)

    var gm = new three.Sprite(new three.SpriteMaterial({
      transparent: true,
      map: images.orb
    }))
    gm.scale.set(5,5)
    gm.position.copy(this.pos)

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
    var mX = this.walkDir.x * 20 * d
    var mZ = this.walkDir.z * 20 * d
  var mY = this.walkDir.y * 20 * d
 
    self.mesh.position.x += mX
    self.mesh.position.z += mZ
self.mesh.position.y += mY


    var di = dist(self.mesh.position.x, self.pos.x, self.mesh.position.z, self.pos.z)
    var hitdi = dist(self.mesh.position.x, Hero.groupMesh.position.x, self.mesh.position.z, Hero.groupMesh.position.z)


    if (hitdi < 3) {
      self.die(index)
      Hero.h -= 10
      Hero.hurt(self.mesh.position, 10)
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
    
    var me = this.mesh
    this.zombieClass.shoot = false
    attackQueue.splice(index, 1)

    SCENE.remove(me)
    delete this
  }
}


function dist(x1, x2, y1, y2) {
  return Math.abs(Math.floor(Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1))))
}



// Zombie Animation 

function updateZombie() {

  var delta = CLOCK.getDelta()
  var time = CLOCK.getElapsedTime()

  // update Zombies 

  if (!zombieArray.length <= 0) {
    for (var i = 0; i < zombieArray.length; i++) {
      zombieArray[i].update(delta, time)
    }
  }

  for (var i = 0; i < attackQueue.length; i++) {
    attackQueue[i].update(delta)
  }


  requestAnimationFrame(updateZombie)
}

updateZombie()

export { zombieArray, Zombie }