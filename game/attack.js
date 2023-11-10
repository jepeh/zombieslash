import * as three from "../src/three.js"
import * as Zombies from './zombie.js'
import Particle from "./particle.js"
import { CharController, SCENE, CAMERA, runesArray } from './environment.js'
import playSound from './sound.js'
import Audios from './audio.js'
import images from "./imageBuffer.js"
import { Skills } from './skills.js'

var combo = 0
var comboTimeout = null
//var rangeAttackDone = true

var currentEnemy = null
var curEnCount = null


function initAttacks(Hero) {
  Hero.renderMesh()


  $("#lightning").on("click", function() {

    // lightming attack
    Skills.lightning()
    $("#hit").css("left", "-50%")
   $("#lightning").hide()
    combo = 0
  })

  var slashPad = document.getElementById("slashpad")

  var attackCount = 0
  var shootCount = Hero.actions.attacks.length
  var shootCountBeg = Hero.actions.attacks.length




  if ("ontouchstart" in document.documentElement) {

    slashPad.addEventListener("touchstart", () => {

      if (Hero.type === 'tank') {


        Hero.sword.visible = true
        //Hero.swordGroup.visible = false
        Hero.attacking = true
        CharController.stop()

        /*  TweenMax.to(Hero.mesh.rotation, .3, {
            x: Math.PI / 12
          })*/


        // check runes 

        for (var o = 0; o < runesArray.length; o++) {

          var dis = dist(Hero.groupMesh.position.x, runesArray[o].pos.x, Hero.groupMesh.position.z, runesArray[o].pos.z)

          if (dis < 8) {
            // destory rune

            // Lookat the enemy
            var angleYCameraDirection = Math.atan2(
              (runesArray[o].pos.x - Hero.groupMesh.position.x),
              (runesArray[o].pos.z - Hero.groupMesh.position.z))

            TweenMax.to(Hero.groupMesh.rotation, .25, {
              y: angleYCameraDirection

            })


            runesArray[o].h -= runesArray[o].hit
            runesArray[o].hurt(o)




          }

        }

        // check for zombies

        for (var i = 0; i < Zombies.zombieArray.length; i++) {
          var distance = dist(Hero.groupMesh.position.x, Zombies.zombieArray[i].mesh.position.x, Hero.groupMesh.position.z, Zombies.zombieArray[i].mesh.position.z)

          if (distance < 10) {




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
            else {

            }


            // if first no enemy
            if (currentEnemy === null && curEnCount === null) {

            }


            // zombie is in slash range
            currentEnemy = Zombies.zombieArray[i]
            curEnCount = i

            // Attck current enemy
            //     else {



            // Lookat the enemy
            var angleYCameraDirection = Math.atan2(
              (currentEnemy.mesh.position.x - Hero.groupMesh.position.x),
              (currentEnemy.mesh.position.z - Hero.groupMesh.position.z))

            TweenMax.to(Hero.groupMesh.rotation, .25, {
              y: angleYCameraDirection

            })



            /*  var xx = currentEnemy.mesh.position.x - Hero.groupMesh.position.x
              var zz = currentEnemy.mesh.position.z - Hero.groupMesh.position.z

              var ePos = {
                x: currentEnemy.mesh.position.x - -xx * .0005,
                z: currentEnemy.mesh.position.z - -zz * .0006
              }

              TweenMax.to(Hero.groupMesh.position, .99, {
                x: ePos.x,
                z: ePos.z
              })*/


            /*  TweenMax.to(CAMERA.position, .99, {
                x: Hero.groupMesh.position.x + 17,
                z: Hero.groupMesh.position.z + 17
              })*/



            // zombie hurt fx, red color


            //  currentEnemy.mesh.material.color.set("red")




            currentEnemy.h -= Hero.attackHit
            currentEnemy.hurt(Hero.attackHit)


            var xx = currentEnemy.mesh.position.x - Hero.groupMesh.position.x
            var zz = currentEnemy.mesh.position.z - Hero.groupMesh.position.z

            var ePos = {
              x: currentEnemy.mesh.position.x - -xx * .2,
              z: currentEnemy.mesh.position.z - -zz * .2
            }

            TweenMax.to(currentEnemy.mesh.position, .4, {
              x: ePos.x,
              y: currentEnemy.mesh.position.y,
              z: ePos.z
            })



            if (currentEnemy.h <= 0) {

              currentEnemy.die(curEnCount)
              currentEnemy = null
              curEnCount = null

            }

            //    }




          }
        }





        if (attackCount >= 4) {
          attackCount = 0
        }

        // Attack Seing fx
        if (attackCount === 0) {
          TweenMax.to(Hero.sword.rotation, .18, {
            z: Math.PI / 2,
            onComplete: function() {
              Hero.actions.attacks[attackCount].play()
              Hero.actions.attacks[attackCount].reset()
              attackCount++


              Hero.sword.rotation.x = Math.PI / 2
              Hero.sword.rotation.z = 0
              Hero.sword.visible = false

              Hero.swordGroup.visible = true
              Hero.attacking = false

              /*  TweenMax.to(Hero.mesh.rotation, .3, {
                  x: 0
                })*/

            }
          })
        }



        else if (attackCount === 1) {
          TweenMax.to(Hero.sword.rotation, .18, {
            z: Math.PI * 2,
            onComplete: function() {
              Hero.actions.attacks[attackCount].play()
              Hero.actions.attacks[attackCount].reset()
              attackCount++

              Hero.sword.rotation.x = -Math.PI / 2
              Hero.sword.rotation.z = -Math.PI
              Hero.sword.rotation.y = Math.PI / 3


              Hero.sword.visible = false
              Hero.swordGroup.visible = true
              Hero.attacking = false
              /*  TweenMax.to(Hero.mesh.rotation, .3, {
                  x: 0
                })*/
            }
          })
        }
        else if (attackCount === 2) {
          TweenMax.to(Hero.sword.rotation, .18, {
            z: Math.PI,
            onComplete: function() {
              Hero.actions.attacks[attackCount].play()
              Hero.actions.attacks[attackCount].reset()
              attackCount++


              Hero.sword.rotation.x = -Math.PI / 2
              Hero.sword.rotation.z = -Math.PI
              Hero.sword.rotation.y = Math.PI / 1.5
              Hero.sword.visible = false
              Hero.swordGroup.visible = true
              Hero.attacking = false
              /*  TweenMax.to(Hero.mesh.rotation, .3, {
                  x: 0
                })*/
            }
          })
        }


        else if (attackCount === 3) {


          TweenMax.to(Hero.sword.rotation, .18, {
            z: Math.PI / 2,
            onComplete: function() {
              Hero.actions.attacks[attackCount].play()
              Hero.actions.attacks[attackCount].reset()
              attackCount = 0

              Hero.sword.rotation.x = -Math.PI / 2
              Hero.sword.rotation.z = -Math.PI
              Hero.sword.rotation.y = 0
              Hero.sword.visible = false
              Hero.swordGroup.visible = true
              Hero.attacking = false
              /*  TweenMax.to(Hero.mesh.rotation, .3, {
                  x: 0
                })*/
            }
          })
        }

        playSound(Audios.slash)




      } else if (Hero.type === 'range') {




        shootCount--


        if (shootCount <= 0) shootCount = shootCountBeg

        for (var i = 0; i < Zombies.zombieArray.length; i++) {
          var distance = dist(Hero.groupMesh.position.x, Zombies.zombieArray[i].mesh.position.x, Hero.groupMesh.position.z, Zombies.zombieArray[i].mesh.position.z)


          if (distance < 20) {

            var mes;

            if (Hero.heroName === "Mage") {
              mes = Hero.groupMesh.getObjectByName("2H_Staff")
            } else if (Hero.heroName === "Rogue") {
              mes = Hero.groupMesh.getChildByName("2H_Crossbow")

            }
            var pos = new three.Vector3()
            mes.getWorldPosition(pos)


            if (currentEnemy === null && curEnCount === null) {

              currentEnemy = Zombies.zombieArray[i]
              curEnCount = i
              if (Hero.rangeAttackDone === true) {
                //currentEnemy = Zombies.zombieArray[i]

                // Lookat the enemy
                var angleYCameraDirection = Math.atan2(
                  (currentEnemy.mesh.position.x - Hero.groupMesh.position.x),
                  (currentEnemy.mesh.position.z - Hero.groupMesh.position.z))

                TweenMax.to(Hero.groupMesh.rotation, .25, {
                  y: angleYCameraDirection

                })



                Hero.rangeAttackDone = false

                var don = setTimeout(function() {
                  Hero.rangeAttackDone = true
                  currentEnemy = null
                  curEnCount = null
                  clearTimeout(don)
                }, 500)

                Hero.actions.attacks[shootCount - shootCountBeg].play()
                Hero.actions.attacks[shootCount - shootCountBeg].reset()

                Hero.attack(currentEnemy, i, pos)
              }

            }

          } else {
            currentEnemy = null
            curEnCount = null


            for (var o = 0; o < runesArray.length; o++) {

              var dis = dist(Hero.groupMesh.position.x, runesArray[o].pos.x, Hero.groupMesh.position.z, runesArray[o].pos.z)

              if (dis < 20) {
                // destory rune

        var mes;

            if (Hero.heroName === "Mage") {
              mes = Hero.groupMesh.getObjectByName("2H_Staff")
            } else if (Hero.heroName === "Rogue") {
              mes = Hero.groupMesh.getChildByName("2H_Crossbow")

            }
            var pos = new three.Vector3()
            mes.getWorldPosition(pos)

        

              currentEnemy = runesArray[o]
              curEnCount = o
              if (Hero.rangeAttackDone === true) {
                //currentEnemy = Zombies.zombieArray[i]

                // Lookat the enemy
                var angleYCameraDirection = Math.atan2(
                  (currentEnemy.mesh.position.x - Hero.groupMesh.position.x),
                  (currentEnemy.mesh.position.z - Hero.groupMesh.position.z))

                TweenMax.to(Hero.groupMesh.rotation, .25, {
                  y: angleYCameraDirection

                })



                Hero.rangeAttackDone = false

                var don = setTimeout(function() {
                  Hero.rangeAttackDone = true
                  currentEnemy = null
                  curEnCount = null
                  clearTimeout(don)
                }, 500)

                Hero.actions.attacks[shootCount - shootCountBeg].play()
                Hero.actions.attacks[shootCount - shootCountBeg].reset()

                Hero.attack(currentEnemy, o, pos)
                runesArray[o].h -= runesArray[o].hit
                runesArray[o].hurt(o)


              }

           

                


              }

            }



          }
        }

        // runes





      }


      return;

    })

  }

}

function dist(x1, x2, y1, y2) {
  return Math.abs(Math.floor(Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1))))
}

function radtodeg(rad) {
  return rad * (180 / Math.PI)
}



export default initAttacks