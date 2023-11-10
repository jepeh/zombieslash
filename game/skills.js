import { Profile } from './profile.js'
import * as three from '../src/three.js'
import images from './imageBuffer.js'
import { gameStat, Hero, SCENE, CharController, CAMERA, runesArray } from './environment.js'
import Particles from '../src/particle.js'
import { zombieArray } from './zombie.js'
import playSound from './sound.js'
import Audios from './audio.js'
import { OBJLoader } from '../src/Loader/OBJLoader.js'

//var Profile = JSON.parse(localStorage.getItem("profile"))
var TexLoader = new three.TextureLoader()
var obj = new OBJLoader()

var CLOCK = new three.Clock()

var skillsCoolDown = {
  first: 10000,
  second: 15000,
  third: 20000
}

var skillsQueue = []

var Skills = {
  lightning: function() {


    var hitAtt = Profile.level > 10 ? 50 : 30
    var arr = []
    playSound(Audios.lightningStrike)
    // var lightt;
    var num = 4

    var lit = setInterval(function() {

      if (num > 0) {
        num--

        var light = new three.Sprite(new three.SpriteMaterial({
          transparent: true,
          map: TexLoader.load("assets/images/lightningTex.png")
        }))

        light.position.y = 20

        light.material.map.magFilter = three.NearestFilter
        light.material.map.repeat.set(1 / 5, 1 / 5)

        light.scale.y = 40
        light.scale.x = 8

        var yy = 5
        var xx = 0

        var hit = new three.Mesh(new three.PlaneGeometry(17, 17), new three.MeshStandardMaterial({
          transparent: true,
          side: 2,
          opacity: .58,
          map: TexLoader.load("assets/images/lightningHit.png")
        }))

        hit.rotation.x = Math.PI / 2
        hit.position.y = 1

        var imp = new three.Sprite(new three.SpriteMaterial({
          map: images.lightningImpact,
          depthTest: false
        }))

        var posx = Math.floor(Math.random() * (10 - (-10)) + (-10))

        var posz = Math.floor(Math.random() * (10 - (-10)) + (-10))
        light.position.x = Hero.groupMesh.position.x + posx
        light.position.z = Hero.groupMesh.position.z + posz
        hit.position.x = Hero.groupMesh.position.x + posx
        hit.position.z = Hero.groupMesh.position.z + posz
        SCENE.add(light, hit, imp)
        //  imp.position.copy(mesh.position)
        imp.position.y = 1

        imp.position.x = Hero.groupMesh.position.x + posx
        imp.position.z = Hero.groupMesh.position.z + posz


        imp.scale.set(0, 0, 0)
        TweenMax.to(imp.scale, .3, {
          x: 10,
          y: 10,
          z: 10,
          onComplete: function() {
            SCENE.remove(imp)
          }
        })
        imp.position.y - 10

        //  light.add(imp)
        arr.push(light)

        var lightt = setInterval(function() {

          light.material.map.offset.y = (1 / 5) * yy
          light.material.map.offset.x = (1 / 5) * xx
          xx++
          if (xx === 5) {
            xx = 0
            yy -= 1
          }
          if (yy < 0) {

            clearInterval(lightt)
          }
        }, 50)
      }


      clearInterval(lit)


    }, 200)

    var done = setTimeout(function() {
      for (var i in arr) {

        if (arr[i].material) arr[i].material.dispose()
        if (arr[i].geometry) arr[i].geometry.dispose()

        SCENE.remove(arr[i])

      }
      //    clearInterval(lightt)
      clearTimeout(done)
    }, 2000)


    for (var i = 0; i < zombieArray.length; i++) {


      var distance = dist(Hero.groupMesh.position.x, zombieArray[i].mesh.position.x, Hero.groupMesh.position.z, zombieArray[i].mesh.position.z)

      if (distance <= 20) {




        zombieArray[i].hurt(hitAtt)
        zombieArray[i].h -= hitAtt

        if (zombieArray[i].h <= 0) {
          zombieArray[i].die(i)
        }
      }
    }


  },
  water: {
    firstSkill: function() {

      var spr = new three.Mesh(new three.SphereGeometry(5), new three.MeshPhongMaterial({
        map: images[Profile.element + "Element"],
        transparent: true,
        opacity: .5
      }))

      spr.scale.x = 0
      spr.scale.y = 0
      spr.scale.z = 0
      spr.position.y = 1.2

      Hero.groupMesh.add(spr)
      Hero.isShield = true
      TweenMax.to(spr.scale, .8, {
        x: .4,
        y: .4,
        z: .4
      })


      skillsQueue.push(function(t) {

        spr.rotation.y += .1

      })

      var shield = setTimeout(function() {
        Hero.isShield = false

        TweenMax.to(spr.scale, .7, {
          x: .5,
          y: .5,
          z: .5,
          onComplete: function() {
            Hero.groupMesh.remove(spr)
            spr.geometry.dispose()
            spr.material.dispose()

            skillsQueue.shift()

          }
        })

        clearTimeout(shield)
      }, 6000)

    },
    secondSkill: function() {

      // Heal Hero
      playSound(Audios.heal)

      Hero.h += 25
      if (Hero.h > 81) {
        Hero.health.material.map.offset.y = 1
      }
      else if (Hero.h <= 80 && Hero.h > 61) {
        Hero.health.material.map.offset.y = .6
      } else if (Hero.h <= 60 && Hero.h > 41) {
        Hero.health.material.map.offset.y = .4
      }
      else if (Hero.h <= 40 && Hero.h > 21) {
        Hero.health.material.map.offset.y = .2
      }
      else if (Hero.h <= 20 && Hero.h > 11) {
        Hero.health.material.map.offset.y = 0.0

      } else if (Hero.h <= 10 && Hero.h > 1) {
        Hero.health.material.map.offset.y = 0
      } else if (Hero.h <= 0) {
        // die
      }


      var spr = new three.Mesh(new three.CylinderGeometry(4, 4, 60, 20), new three.MeshPhongMaterial({
        map: images.waterElement,
        transparent: true,
        opacity: .9,
        side: 2
      }))

      spr.scale.x = 0

      spr.scale.z = 0
      spr.position.copy(Hero.groupMesh.position)
      spr.position.y = 2
      SCENE.add(spr)

      CharController.stop()


      var cg3 = new three.SphereGeometry(.3)

      var cy2P = new three.Mesh(cg3, new three.MeshPhongMaterial({
        map: images.waterElement
      }))


      var heal = new three.Sprite(new three.SpriteMaterial({
        map: images.heal
      }))





      var sys = new Particles({
        loop: true,
        size: {
          isRandom: true,
          minSize: .5,
          maxSize: 1
        },
        center: new three.Vector3(0, 2, 0),
        particleRotation: new three.Euler(0, 0, 0),
        particlePosition: Hero.groupMesh.position,
        //	particlePosition: character.position,
        isCenterSpawn: false,
        randomSpawn: {
          minX: -3,
          maxX: 3,
          minY: 0,
          maxY: 0,
          minZ: -3,
          maxZ: 3
        },
        particleSource: false,
        linearTarget: true,
        depthTest: false,

        mesh: heal,

        isUpward: true,
        inTiming: .4,
        outTiming: .8,
        targetTiming: 1.8,
        targetPosition: {
          minX: -1,
          maxX: 1,
          minY: 5,
          maxY: 7,
          minZ: -1,
          maxZ: 1
        },
        interval: 150,
        initialScale: new three.Vector3(1, 1, 1),
        endFunction: (pos) => {

          /*	  
          		var hit = new Three.Mesh(new Three.PlaneGeometry(20,20), new Three.MeshToonMaterial({
          			transparent: true,
          			map: TextureLoader.load("assets/ll.png"),
          		depthTest: false
          		}))
          		hit.position.copy(pos)
          		hit.scale.set(0,0,0)
          		hit.rotation.x = -Math.PI/2
          		sys._group.add(hit)
          		TweenMax.to(hit.scale, .7, {
          			x: 1,
          			y: 1,
          			z: 1,
          			onComplete: ()=>{
          				TweenMax.to(hit.scale, .5, {
          					x: 0,
          					y: 0,
          					z: 0,
          					onComplete: ()=>{
          						hit.material.dispose()
          						hit.geometry.dispose()
          						sys._group.remove(hit)
          					}
          				})
          			}
          		})
          		
          		*/
        }
      })


      sys.start()

      TweenMax.to(spr.scale, 1.7, {
        x: 1,
        z: 1,
        onComplete: function() {

          spr.material.dispose()
          spr.geometry.dispose()
          SCENE.remove(spr)
          sys.end()

        }
      })
    },
    thirdSkill: function() {


      var d = 0


      const center = {
        x: Hero.groupMesh.position.x,
        z: Hero.groupMesh.position.z
      }
      var swords = []



      var gens = setInterval(function() {


        if (d < 6) {

          playSound(Audios.sword)
          var field = new three.PlaneGeometry(4, 8)
          var fieldMat = new three.MeshPhongMaterial({
            transparent: true,
            map: images.waterSword,
            side: 2
          })

          var sword = new three.Mesh(field, fieldMat)
          sword.rotation.x = Math.PI
          sword.position.y = 25
          sword.castShadow = true
          swords.push(sword)


          var pos = {
            x: 0,
            z: 0
          }

          if (d === 0) {
            pos.x = 0
            pos.z = 15

          } else if (d === 1) {
            pos.z = 10
            pos.x = 15

          } else if (d === 2) {
            pos.z = -10
            pos.x = 15

          } else if (d === 3) {
            pos.z = -15
            pos.x = 0

          } else if (d === 4) {
            pos.z = -10
            pos.x = -15

          } else if (d === 5) {
            pos.z = 10
            pos.x = -15

          }


          //  sword.add(new three.AxesHelper(5))
          sword.position.x = center.x + pos.x
          sword.position.z = center.z + pos.z

          var angleYCameraDirection = Math.atan2(
            (pos.x - 0),
            (pos.z - 0))

          sword.rotation.y = -angleYCameraDirection

          SCENE.add(sword)


          TweenMax.to(sword.position, .2, {
            y: 5,
            onComplete: function() {
              var drop = new three.PlaneGeometry(4, 4)
              var dropMat = new three.MeshPhongMaterial({
                transparent: true,
                map: images.droplet,
                side: 2,
                depthTest: false
              })

              var droplet = new three.Mesh(drop, dropMat)
              droplet.scale.set(0, 0, 0)
              droplet.rotation.x = Math.PI / 2
              droplet.position.copy(sword.position)
              droplet.position.y = .5
              SCENE.add(droplet)

              TweenMax.to(droplet.scale, .45, {
                x: 1.5,
                y: 1.5,
                z: 1.5,
                onComplete: function() {
                  droplet.material.dispose()
                  droplet.geometry.dispose()
                  SCENE.remove(droplet)
                }
              })
            }
          })


          d++

        } else {


          var bl = new three.PointLight("#85F4FF", 10, 50)
          bl.position.x = center.x
          bl.position.z = center.z
          bl.position.y = 2
          SCENE.add(bl)

          swords.push(bl)


          var drop = new three.PlaneGeometry(15, 15)
          var dropMat = new three.MeshPhongMaterial({
            transparent: true,
            map: TexLoader.load("assets/images/waterBasin.png"),
            side: 2,
            depthTest: false,
            opacity: .6
          })

          var mesh = new three.Mesh(drop, dropMat)
          mesh.scale.set(0, 0, 0)


          mesh.rotation.x = Math.PI / 2

          mesh.position.copy(center)
          mesh.position.y = .5
          SCENE.add(mesh)

          TweenMax.to(mesh.scale, 1.4, {
            x: 2,
            y: 2,
            z: 2
          })

          swords.push(mesh)


          var waterfall = new three.Sprite(new three.SpriteMaterial({
            transparent: true,
            side: 2,
            opacity: .7,
            map: TexLoader.load("assets/images/waterfall.png")

          }))
          waterfall.castShadow = true
          waterfall.position.x = center.x
          waterfall.position.z = center.z

          waterfall.material.map.magFilter = three.NearestFilter
          waterfall.material.map.repeat.set(1 / 7, 1 / 2)

          waterfall.position.y = 15.6
        
          waterfall.scale.x = 25
          waterfall.scale.y = 50

          var yy = 0
          var xx = 0
          
          

          // waterfall.material.map.offset.x = (1 / 7) * xx
          // waterfall.material.map.offset.y = (1 / 2) * yy

          var waterAni = setInterval(function() {
            waterfall.material.map.offset.x = (1 / 7) * xx
            waterfall.material.map.offset.y = (1 / 2) * yy
            xx++
            if (xx === 7) {

              xx = 0
              yy++
              if (yy === 2) yy = 0

            }


          }, 100)


          SCENE.add(waterfall)







          // drown zombies 

          for (var i = 0; i < zombieArray.length; i++) {

            var me = zombieArray[i]
            var dis = dist(Hero.groupMesh.position.x, me.mesh.position.x, Hero.groupMesh.position.z, me.mesh.position.z)

            if (dis <= 60) {


              me.h -= 100
              me.hurt(100)
              me.die(i)

            }


          }


          clearInterval(gens)
        }


        var done = setTimeout(function() {

          for (var e = 0; e < swords.length; e++) {
            if (swords[e].geometry) swords[e].geometry.dispose()
            if (swords[e].material) swords[e].material.dispose()
            SCENE.remove(swords[e])
          }
          waterfall.material.dispose()
         SCENE.remove(waterfall)
          clearTimeout(done)

        }, 8000)


      }, 250)





    }
  },
  fire: {
    firstSkill: function() {

      var spr = new three.Mesh(new three.SphereGeometry(5), new three.MeshPhongMaterial({
        map: images[Profile.element + "Element"],
        transparent: true,
        opacity: .5
      }))

      spr.scale.x = 0
      spr.scale.y = 0
      spr.scale.z = 0
      spr.position.y = 1.2

      Hero.groupMesh.add(spr)
      Hero.isShield = true
      TweenMax.to(spr.scale, .8, {
        x: .4,
        y: .4,
        z: .4
      })

      skillsQueue.push(function(t) {

        spr.rotation.y += .1

      })

      var shield = setTimeout(function() {
        Hero.isShield = false

        TweenMax.to(spr.scale, .7, {
          x: 0,
          y: 0,
          z: 0,
          onComplete: function() {
            Hero.groupMesh.remove(spr)
            spr.geometry.dispose()
            spr.material.dispose()

            skillsQueue.shift()

          }
        })

        clearTimeout(shield)
      }, 7000)


    },
    secondSkill: function() {



      var fireGroup = new three.Group()
      fireGroup.position.copy(Hero.groupMesh.position)


      for (var i = 0; i < 3; i++) {

        var plane = new three.Mesh(new three.PlaneGeometry(6, 6), new three.MeshStandardMaterial({
          transparent: true,
          side: 2,
          map: images.fireBlade
        }))
        plane.position.y = 1
        plane.castShadow = true

        // plane.position.copy(Hero.groupMesh.position)
        fireGroup.add(plane)
        var pos = {
          x: 0,
          z: 0
        }

        if (i === 0) {
          pos.z = 10
        } else if (i === 1) {
          pos.x = 10
          pos.z - 5
        } else if (i === 2) {
          pos.x = -10
          pos.z = -5
        }

        TweenMax.to(plane.position, 1, {
          x: pos.x,
          z: pos.z
        })


        plane.rotation.x = Math.PI / 2

      }
      SCENE.add(fireGroup)

      skillsQueue.push(function(t) {

        fireGroup.rotation.y += .12
        fireGroup.position.copy(Hero.groupMesh.position)
        for (var o = 0; o < fireGroup.children.length; o++) {
          fireGroup.children[o].rotation.z += .35

          var firepos = new three.Vector3()
          fireGroup.children[o].getWorldPosition(firepos)

          for (var u = 0; u < zombieArray.length; u++) {
            var zo = zombieArray[u]
            var di = dist(firepos.x, zo.mesh.position.x, firepos.z, zo.mesh.position.z)

            if (di < 5) {

              zo.h -= 20
              zo.hurt(20)
              if (zo.h <= 0) {
                zo.die(u)
              }

            }
          }






        }


      })

      var done = setTimeout(function() {


        for (var i = 0; i < fireGroup.children.length; i++) {
          var me = fireGroup.children[i]

          TweenMax.to(me.position, 1, {
            x: 0,
            z: 0,
            onComplete: function() {
              me.material.dispose()
              me.geometry.dispose()
            }
          })

          fireGroup.remove(me)
        }

        SCENE.remove(fireGroup)
        skillsQueue.shift()
        clearTimeout(done)

      }, 9000)

    },
    thirdSkill: function() {

      playSound(Audios.fireElement)

      var fireCircle = new three.Mesh(new three.PlaneGeometry(10, 10), new three.MeshStandardMaterial({
        transparent: true,
        side: 2,
        map: images.fireCircle
      }))

      fireCircle.scale.set(0, 0, 0)
      fireCircle.position.copy(Hero.groupMesh.position)

      fireCircle.position.y = .8
      fireCircle.rotation.x = Math.PI / 2



      SCENE.add(fireCircle)


      TweenMax.to(fireCircle.scale, 1, {
        x: 3,
        y: 3,
        z: 3
      })


      var lava = new three.Mesh(new three.CylinderGeometry(2, 2, 60, 20), new three.MeshStandardMaterial({
        transparent: true,
        side: 2,
        map: images.fireTexture,
        opacity: .7
      }))
      lava.position.copy(Hero.groupMesh.position)
      lava.castShadow = true
      lava.scale.set(0, 1, 0)
      lava.position.y = 25

      var light = new three.PointLight("red", 10, 10)
      light.position.copy(fireCircle.position)
      SCENE.add(lava, light)
      TweenMax.to(lava.scale, 1.9, {
        x: 2,
        y: 1,
        z: 2
      })

      var fireMesh = new three.Sprite(new three.SpriteMaterial({
        transparent: true,
        map: images.orb,
        color: "orange",
        opacity: .9,
        side: 2
      }))

      var particleSystem = setInterval(function() {

        var mesh = new three.Sprite()

        mesh.copy(fireMesh)
        mesh.castShadow = true
        var pos = {
          x: Math.floor(Math.random() * (10 - (-10)) + (-10)),
          z: Math.floor(Math.random() * (10 - (-10)) + (-10))
        }


        mesh.position.set(fireCircle.position.x + pos.x, 0, fireCircle.position.z + pos.z)

        SCENE.add(mesh)


        TweenMax.to(mesh.position, 2.2, {
          y: Math.floor(Math.random() * (20 - 8) + 8),
          onComplete: function() {
            mesh.material.dispose()
            SCENE.remove(mesh)
          }
        })


      }, 300)

      var fireb = []


      var fire = setInterval(function() {



        for (var p = 0; p < zombieArray.length; p++) {


          var disu = dist(fireCircle.position.x, zombieArray[p].mesh.position.x, fireCircle.position.z, zombieArray[p].mesh.position.z)
          if (disu < 30) {

            playSound(Audios.sword)

            var fireBall = new three.Mesh(new three.SphereGeometry(1.3), new three.MeshStandardMaterial({
              transparent: true,
              map: images.fireElement
            }))
            fireb.push(fireBall)

            var zo = zombieArray[p]

            fireBall.position.copy(fireCircle.position)
            fireBall.position.y = 9

            SCENE.add(fireBall)
            var pp = p

            TweenMax.to(fireBall.position, .45, {
              x: zo.mesh.position.x,
              y: zo.mesh.position.y,
              z: zo.mesh.position.z,
              onComplete: function() {


                zo.h -= 80
                zo.hurt(80)

                if (zo.h <= 0) zo.die(pp)


                TweenMax.to(fireBall.scale, .3, {
                  x: 2,
                  y: 2,
                  z: 2,
                  onComplete: function() {
                    fireBall.material.dispose()
                    fireBall.geometry.dispose()
                    SCENE.remove(fireBall)
                  }
                })


              }

            })


          }
        }


      }, 800)





      skillsQueue.push(function(t) {

        fireCircle.rotation.z += .04
        lava.rotation.y += -.09

      })


      var done = setTimeout(function() {

        for (var u in fireb) {
          fireb[u].material.dispose()
          fireb[u].geometry.dispose()
          SCENE.remove(fireb[u])
        }

        TweenMax.to(fireCircle.scale, 1, {
          x: 0,
          y: 0,
          z: 0,
          onComplete: function() {

            fireCircle.material.dispose()
            fireCircle.geometry.dispose()
            SCENE.remove(fireCircle, light)


          }
        })

        TweenMax.to(lava.scale, 1, {
          x: 0,
          y: 0,
          z: 0,
          onComplete: function() {

            lava.material.dispose()
            lava.geometry.dispose()
            SCENE.remove(lava)


          }
        })

        skillsQueue.shift()
        clearInterval(fire)
        clearInterval(particleSystem)
        clearTimeout(done)

      }, 12000)


    }
  },
  earth: {
    firstSkill: function() {
      var spr = new three.Mesh(new three.SphereGeometry(5), new three.MeshPhongMaterial({
        map: images[Profile.element + "Element"],
        transparent: true,
        opacity: .5
      }))

      spr.scale.x = 0
      spr.scale.y = 0
      spr.scale.z = 0
      spr.position.y = 1.2

      Hero.groupMesh.add(spr)
      Hero.isShield = true
      TweenMax.to(spr.scale, .8, {
        x: .4,
        y: .4,
        z: .4
      })


      skillsQueue.push(function(t) {

        spr.rotation.y += .1

      })

      var shield = setTimeout(function() {
        Hero.isShield = false

        TweenMax.to(spr.scale, .7, {
          x: 0,
          y: 0,
          z: 0,
          onComplete: function() {
            Hero.groupMesh.remove(spr)
            spr.geometry.dispose()
            spr.material.dispose()

            skillsQueue.shift()

          }
        })

        clearTimeout(shield)
      }, 7000)
    },
    secondSkill: function() {
      var arr = []
      playSound(Audios.earthElement)

      /*  for (var i = 0; i <= 10; i++) {

          var mesh = new three.Mesh(new three.BoxGeometry(2.8, 10, 2.8), new three.MeshPhongMaterial({
            transparent: true,
            side: 2,
            map: images.earthTexture
          }))

          mesh.position.y = -5
          mesh.castShadow = true 

          var pos = {
            x: Hero.groupMesh.position.x + Math.floor(Math.random() * (15 - (-15)) + (-15)) + 5,
            z: Hero.groupMesh.position.z + Math.floor(Math.random() * (15 - (-15)) + (-15)) + 5,

          }

          mesh.position.x = pos.x
          mesh.position.z = pos.z


          // roatye meshes
          // Lookat the enemy


          TweenMax.to(mesh.position, .6, {

            y: Math.floor(Math.random() * (5 - 3) + 3),


          })


          var field = new three.PlaneGeometry(9, 9)
          var fieldMat = new three.MeshPhongMaterial({
            transparent: true,
            map: images.earthCrack,
            side: 2
          })
          var fieldMesh = new three.Mesh(field, fieldMat)

          fieldMesh.rotation.x = -Math.PI / 2
      fieldMesh.position.x = pos.x
      fieldMesh.position.z = pos.z
          fieldMesh.position.y = 1
          


          arr.push(mesh, fieldMesh)
          SCENE.add(mesh, fieldMesh)

        }
        
        */


      var me = new three.Mesh()

      obj.load("assets/models/rocks.obj", e => {
        var r = e.children[3]
        r.position.x = -26
        me.copy(r)
        me.material.map = TexLoader.load("assets/images/earthTexture.png")
        me.castShadow = true
        me.receiveShadow = true
        me.position.x = Hero.groupMesh.position.x - 26
        me.position.z = Hero.groupMesh.position.z

        me.position.y = -15

        SCENE.add(me)

        TweenMax.to(me.position, .6, {
          y: 5
        })
      })


      for (var i = 0; i < zombieArray.length; i++) {


        var distance = dist(Hero.groupMesh.position.x, zombieArray[i].mesh.position.x, Hero.groupMesh.position.z, zombieArray[i].mesh.position.z)

        if (distance <= 20) {

          zombieArray[i].hurt(20)
          zombieArray[i].h -= 20

          if (zombieArray[i].h <= 0) {
            zombieArray[i].die(i)
          }


        }

      }


      var done = setTimeout(function() {

        me.material.dispose()
        me.geometry.dispose()

        SCENE.remove(me)

        clearTimeout(done)
      }, 6000)

    },
    thirdSkill: function() {


      var field = new three.PlaneGeometry(20, 20)
      var fieldMat = new three.MeshPhongMaterial({
        transparent: true,
        map: images.earthField,
        side: 2
      })
      var fieldMesh = new three.Mesh(field, fieldMat)

      fieldMesh.rotation.x = -Math.PI / 2
      fieldMesh.position.copy(Hero.groupMesh.position)
      fieldMesh.position.y = 1

      fieldMesh.scale.x = 0
      fieldMesh.scale.y = 0

      SCENE.add(fieldMesh)

      TweenMax.to(fieldMesh.scale, 2, {
        x: 4,
        y: 4,
        onUpdate: function() {
          fieldMesh.rotation.z += .08
        },
        onComplete: function() {


          TweenMax.to(fieldMesh.scale, .3, {
            x: 0,
            y: 0,
            z: 0,
            onComplete: function() {

              fieldMesh.material.dispose()
              fieldMesh.geometry.dispose()
              SCENE.remove(fieldMesh)

            }
          })

          var earthGeo = new three.BoxGeometry(3, 3, 3)
          var earthMat = new three.MeshPhongMaterial({
            transparent: true,
            map: images.earthTexture,
            side: 2,
            opacity: .8
          })

          var earthMesh = new three.Mesh(earthGeo, earthMat)


          // Start Falling water 
          var sys = new Particles({
            loop: true,
            size: {
              isRandom: true,
              minSize: 3,
              maxSize: 3
            },
            center: new three.Vector3(0, 0, 0),
            //   particleRotation: new three.Euler(0, 0, 0),
            particlePosition: new three.Vector3(Hero.groupMesh.position.x, 20, Hero.groupMesh.position.z),
            //	particlePosition: character.position,
            isCenterSpawn: false,
            randomSpawn: {
              minX: -10,
              maxX: 10,
              minY: 0,
              maxY: 0,
              minZ: -10,
              maxZ: 10
            },
            particleSource: false,
            linearTarget: true,
            depthTest: false,

            mesh: earthMesh,

            isUpward: false,
            inTiming: .3,
            outTiming: .1,
            targetTiming: .3,
            targetPosition: {
              minX: -10,
              maxX: 10,
              minY: -20,
              maxY: -20,
              minZ: -10,
              maxZ: 10
            },
            interval: 200,
            initialScale: new three.Vector3(1, 1, 1),
            endFunction: (pos) => {


              pos.geometry.dispose()
              pos.material.dispose()
              sys._group.remove(pos)


              var hit = new three.Mesh(new three.PlaneGeometry(8, 8), new three.MeshPhongMaterial({
                transparent: true,
                map: images.earthElementHit,
                depthTest: false
              }))
              hit.position.copy(pos.position)

              hit.rotation.x = -Math.PI / 2
              hit.scale.set(0, 0, 0)

              //    hit2.position.y = 1
              //   hit2.position.copy(pos.position)
              //     hit2.position.y = .9






              sys._group.add(hit)
              TweenMax.to(hit.scale, .35, {
                x: 1.7,
                y: 1.7,
                z: 1.7,
                onComplete: () => {

                  hit.material.dispose()
                  hit.geometry.dispose()
                  sys._group.remove(hit)


                  // check if zombie is near 
                  for (var i = 0; i < zombieArray.length; i++) {


                    var distance = dist(fieldMesh.position.x, zombieArray[i].mesh.position.x, fieldMesh.position.z, zombieArray[i].mesh.position.z)

                    if (distance <= 20) {

                      zombieArray[i].hurt(20)
                      zombieArray[i].h -= 20

                      if (zombieArray[i].h <= 0) {
                        zombieArray[i].die(i)
                      }


                    }

                  }


                }
              })





            }
          })


          sys.start()


          var endSkill = setTimeout(function() {
            sys.end()
            clearTimeout(endSkill)



          }, 7000)

        }
      })

    }
  },
  air: {
    firstSkill: function() {
      playSound(Audios.airElement)
      var spr = new three.Mesh(new three.SphereGeometry(5), new three.MeshPhongMaterial({
        map: images[Profile.element + "Element"],
        transparent: true,
        opacity: .5
      }))

      spr.scale.x = 0
      spr.scale.y = 0
      spr.scale.z = 0
      spr.position.y = 1.2

      Hero.groupMesh.add(spr)
      Hero.isShield = true
      TweenMax.to(spr.scale, .8, {
        x: .4,
        y: .4,
        z: .4
      })

      skillsQueue.push(function(t) {

        spr.rotation.y += .1

      })

      var shield = setTimeout(function() {
        Hero.isShield = false

        TweenMax.to(spr.scale, .7, {
          x: 0,
          y: 0,
          z: 0,
          onComplete: function() {
            Hero.groupMesh.remove(spr)
            spr.geometry.dispose()
            spr.material.dispose()

            skillsQueue.shift()

          }
        })

        clearTimeout(shield)
      }, 7000)
    },

    secondSkill: function() {
      playSound(Audios.airElement)
      var arr = []

      for (var ii = 0; ii < 5; ii++) {

        var group = new three.Group()

        var pos = {
          x: Hero.groupMesh.position.x + Math.floor(Math.random() * (10 - (-10)) + (-10)),
          y: 2.5,
          z: Hero.groupMesh.position.z + Math.floor(Math.random() * (10 - (-10)) + (-10))
        }

        group.scale.set(0, 0, 0)
        group.position.set(pos.x, pos.y, pos.z)
        SCENE.add(group)

        for (var i = 0; i < 30; i++) {

          var siY = Math.floor(Math.random() * (9 - 2) + 0)
          var siXZ
          if (siY >= 3 && siY <= 6) {


            siXZ = Math.floor(Math.random() * (9 - 2) + 2)

          } else {
            siXZ = Math.floor(Math.random() * (5 - 3) + 2)

          }
          var mesh = new three.Mesh(new three.PlaneGeometry(siXZ, siXZ), new three.MeshStandardMaterial({
            transparent: true,
            side: 2,
            map: images.tornado
          }))

          mesh.position.y = siY

          var rotY = Math.floor(Math.random() * (3 - 1) + 1)
          var rot = 0
          if (rotY === 1) {
            rot = 1.40
          } else if (rotY === 2) {
            rot = -1.40
          }
          //   console.log(rotY)

          mesh.rotation.set(rot, 0, rot)

          group.add(mesh)

        }
        arr.push(group)
      }


      for (var i = 0; i < arr.length; i++) {
        TweenMax.to(arr[i].scale, .8, {
          x: 1,
          y: 1,
          z: 1
        })
      }

      skillsQueue.push(function() {


        for (var i = 0; i < arr.length; i++) {
          arr[i].rotation.y += 1
        }

      })




      for (var o = 0; o < zombieArray.length; o++) {


        var di = dist(zombieArray[o].mesh.position.x, Hero.groupMesh.position.x, zombieArray[o].mesh.position.z, Hero.groupMesh.position.z)
        var me = zombieArray[o]
        if (di <= 30) {



          me.hurt(30)
          me.h -= 30




        }

      }

      var done = setTimeout(function() {
        for (var i = 0; i < arr.length; i++) {
          var me = arr[i]

          me.children.forEach(e => {
            e.material.dispose()
            e.geometry.dispose()

          })
          SCENE.remove(me)
          skillsQueue.shift()
          clearTimeout(done)


        }

      }, 2500)

    },


    thirdSkill: function() {


      var field = new three.PlaneGeometry(20, 20)
      var fieldMat = new three.MeshPhongMaterial({
        transparent: true,
        map: images.airField,
        side: 2
      })
      var fieldMesh = new three.Mesh(field, fieldMat)

      fieldMesh.rotation.x = -Math.PI / 2
      fieldMesh.position.copy(Hero.groupMesh.position)
      fieldMesh.position.y = 1

      fieldMesh.scale.x = 0
      fieldMesh.scale.y = 0

      SCENE.add(fieldMesh)


      var group = new three.Group()
      SCENE.add(group)

      for (var i = 0; i < 30; i++) {

        var siY = Math.floor(Math.random() * (9 - 2) + 0)
        var siXZ
        if (siY >= 3 && siY <= 6) {


          siXZ = Math.floor(Math.random() * (9 - 2) + 2)

        } else {
          siXZ = Math.floor(Math.random() * (5 - 3) + 2)

        }
        var mesh = new three.Mesh(new three.PlaneGeometry(siXZ, siXZ), new three.MeshStandardMaterial({
          transparent: true,
          side: 2,
          map: images.tornado,
          depthTest: false
        }))

        mesh.position.y = siY

        var rotY = Math.floor(Math.random() * (3 - 1) + 1)
        var rot = 0
        if (rotY === 1) {
          rot = 1.40
        } else if (rotY === 2) {
          rot = -1.40
        }
        //   console.log(rotY)

        mesh.rotation.set(rot, 0, rot)

        group.add(mesh)

      }

      group.scale.set(0, 0, 0)

      TweenMax.to(group.scale, 1, {

        x: 2,
        y: 3.5,
        z: 2
      })


      skillsQueue.push(function() {

        fieldMesh.position.x = Hero.groupMesh.position.x
        fieldMesh.position.z = Hero.groupMesh.position.z

        fieldMesh.rotation.z += .1

        group.position.x = Hero.groupMesh.position.x
        group.position.z = Hero.groupMesh.position.z
        group.rotation.y += .5


        for (var i = 0; i < zombieArray.length; i++) {
          var me = zombieArray[i]
          var dis = dist(Hero.groupMesh.position.x, me.mesh.position.x, Hero.groupMesh.position.z, me.mesh.position.z)
          if (dis <= 30) {

            me.h -= 2

            if (me.h <= 0) {
              me.die(i)
            }
          }
        }



      })

      TweenMax.to(fieldMesh.scale, 1, {
        x: 1.6,
        y: 1.6
      })


      var done = setTimeout(function() {

        TweenMax.to(fieldMesh.scale, 1, {
          x: 0,
          z: 0,
          y: 0,
          onComplete: function() {
            fieldMesh.material.dispose()
            fieldMesh.geometry.dispose()
            SCENE.remove(fieldMesh)
          }
        })

        TweenMax.to(group.scale, 1, {
          x: 0,
          z: 0,
          onComplete: function() {
            group.children.forEach(e => {
              e.material.dispose()
            })
            group.children.forEach(e => {
              e.geometry.dispose()
            })
            SCENE.remove(group)
          }
        })

        skillsQueue.shift()

        clearTimeout(done)
      }, 5000)

    }
  }
}


var firstCooled = true
var secondCooled = true
var thirdCooled = true

function skillListener() {


  // First Skill 
  $(".firstSkill").on("click", function() {

    if (gameStat.firstSkill >= 100 && Profile.firstSkillOpen && firstCooled === true) {
      var el = Profile.element
      Skills[el].firstSkill()


      firstCooled = false
      $(".firstSkill").css("opacity", ".3")

      // cooldown for n seconds
      var cool = setTimeout(function() {
        firstCooled = true

        $(".firstSkill").css("opacity", "1")

        clearTimeout(cool)
      }, skillsCoolDown.first)

    }

  })


  // Second Skill 
  $(".secondSkill").on("click", function() {

    if (gameStat.secondSkill >= 100 && Profile.secondSkillOpen && secondCooled === true) {
      var el = Profile.element
      Skills[el].secondSkill()


      secondCooled = false
      $(".secondSkill").css("opacity", ".3")

      // cooldown for n seconds
      var cool = setTimeout(function() {
        secondCooled = true

        $(".secondSkill").css("opacity", "1")

        clearTimeout(cool)
      }, skillsCoolDown.second)

    }

  })


  // Third Skill 
  $(".thirdSkill").on("click", function() {

    if (gameStat.thirdSkill >= 100 && Profile.thirdSkillOpen && thirdCooled === true) {
      var el = Profile.element
      Skills[el].thirdSkill()


      thirdCooled = false
      $(".thirdSkill").css("opacity", ".3")

      // cooldown for n seconds
      var cool = setTimeout(function() {
        thirdCooled = true

        $(".thirdSkill").css("opacity", "1")

        clearTimeout(cool)
      }, skillsCoolDown.third)

    }

  })


}



function dist(x1, x2, y1, y2) {
  return Math.abs(Math.floor(Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1))))
}

function animateSkills() {
  var time = CLOCK.getElapsedTime()
  var delta = CLOCK.getDelta()

  for (var i = 0; i < skillsQueue.length; i++) {
    skillsQueue[i](time)
  }

  requestAnimationFrame(animateSkills)
}

animateSkills()
export { skillListener, Skills }