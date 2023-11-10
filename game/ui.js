import JoyPad from "./joypad.js"
import { changeHero, genRunes, genZombie, CAMERA, Hero, SCENE, floorArray } from './environment.js'
import { Achievements, Skins, Swords, Profile, Modes } from './profile.js'
import * as three from '../src/three.js'
import playSound from "./sound.js"
import Audios from "./audio.js"
import Elements from './elements.js'
import { Network, Battery } from './network.js'
import images from "./imageBuffer.js"
import {gameTime }from './gameTimer.js'


function UI() {

  JoyPad({
    x: 100,
    y: 100
  }, document)


  /****************
  update Hero Info
  
  ****************/

  // skin
  $("#ginfoSkin").attr("src", `assets/images/clif.png`)
  $("#ginfoSword").attr("src", `assets/images/axe.png`)
  $("#ginfoElement").attr("src", `assets/images/water.png`)
  $("#ginfoMode").attr("src", `assets/images/beginner.png`)

  $(".gameDate").text("Coins [" + Profile.coins + "] : Level [" + Profile.level + "]")
  $("#ginfoMode").attr("src", `assets/images/${Profile.mode}.png`)
  $("#ginfoSkin").attr("src", Skins[Profile.skin].src)
  $("#ginfoElement").attr("src", `assets/images/${Profile.element}.png`)
  //$("#iconWeapon").attr("src", Swords[Profile.sword].img)
  $("#ginfoSword").attr("src", Swords[Profile.sword].img)



  // Game div UI

  // Generate Skins

  function genSkin() {

    for (var i = 1; i <= 4; i++) {

      var skins = Skins["skin" + i]

      // console.log(Skins["skin"+i])

      var skinAction;

      if (Profile.skinsStatus[skins.name]) {

        skinAction = "use"
        if (Profile.model === skins.name) {
          skinAction = "in use"
        }

      } else {

        if (Profile.level < skins.unlockedAtLevel) {
          skinAction = "locked"
        } else {
          var price = skins.price.toString().split("")

          skinAction = "Buy " + price[0] + price[1] + "K"
        }

      }

      var skin = `<div class="skinDiv"id="${skins.name}"> <img class="skinimg" src="${skins.src}"><p class="skinname">${skins.name}<br /> [ ${skins.type} ]</p> <p class="skinAction" id="act${skins.name}" idd="skin${i}" >${skinAction}</p><p class="aboutskin" id="action${skins.name}" skinNum="skin${i}">ℹ️</p></div>`
      $(".gameContentSkins").append(skin)
    }
    skinListener()

  }
genSkin()


  //******************************

  //  SELECT modes

  //******************************


  var curMode = Profile.mode
  $(`#${curMode} div`).css({
    backgroundColor: Modes[curMode].color

  })

  $(`#${curMode}`).css({
    transform: "scale(1.19)",
    background: `linear-gradient(to top, ${Modes[curMode].color}, transparent, transparent, ${Modes[curMode].color})`
  })


  if (curMode === "beginner") {
    // change Icon inner 

    $(".modeIcon").css({
      borderLeft: "1px solid " + Modes[curMode].color,
      borderRight: "1px solid " + Modes[curMode].color,
      background: `linear-gradient(45deg, ${Modes[curMode].color}, #00FFA100, #00FFA100, ${Modes[curMode].color})`,
      transform: "rotate(45deg)",
      borderRadius: "5px"
    })

    $(".modeIconInner").css({

      borderRadius: "50px",
      width: "40%",
      height: "40%",
      background: "transparent",
      backgroundColor: Modes[curMode].color,
    })

  } else if (curMode === "pro") {
    $(".modeIcon").css({
      borderLeft: "1px solid " + Modes[curMode].color,
      borderRight: "1px solid " + Modes[curMode].color,
      background: `linear-gradient(45deg, ${Modes[curMode].color}, #00FFA100, #00FFA100, ${Modes[curMode].color})`,
      transform: "rotate(0deg)",
      borderRadius: "50px"
    })

    $(".modeIconInner").css({
      background: "transparent",
      backgroundColor: Modes[curMode].color,
      borderRadius: "1px",
      width: "40%",
      height: "40%",
      transform: "rotate(0deg)"
    })
  } else if (curMode === "expert") {

    $(".modeIcon").css({
      borderLeft: "1px solid " + Modes[curMode].color,
      borderRight: "1px solid " + Modes[curMode].color,
      background: `linear-gradient(45deg, ${Modes[curMode].color}, #00FFA100, #00FFA100, ${Modes[curMode].color})`,
      transform: "rotate(45deg)",
      borderRadius: "5px",
    })

    $(".modeIconInner").css({
      backgroundColor: "transparent",
      background: `linear-gradient(to top, ${Modes[curMode].color}, transparent, transparent, ${Modes[curMode].color})`,
      width: "100%",
      height: "100%",
      borderRadius: "5px",
      transform: "rotate(-45deg)",

    })

  }


  $(".modeClick").on("click", e => {

    playSound(Audios.selectMenu)

    var id = e.currentTarget.id

    $("#ginfoMode").attr("src", `assets/images/${id}.png`)


    if (curMode === id) {

    } else {


      $(`#${curMode} div`).css({
        backgroundColor: "#555555D1"
      })

      $(`#${curMode}`).css({
        transform: "scale(1)",
        background: "#292929ED"
      })


      curMode = id

      // change colors of mode UI
      $(`#${curMode} div, .mclInner`).css({
        backgroundColor: Modes[curMode].color

      })

      $(`#${curMode}`).css({
        transform: "scale(1.19)",
        background: `linear-gradient(to top, ${Modes[curMode].color}, transparent, transparent, ${Modes[curMode].color})`
      })
    }


    if (id === "beginner") {
      // change Icon inner 

      $(".modeIcon").css({
        borderLeft: "1px solid " + Modes[id].color,
        borderRight: "1px solid " + Modes[id].color,
        background: `linear-gradient(45deg, ${Modes[id].color}, #00FFA100, #00FFA100, ${Modes[id].color})`,
        transform: "rotate(45deg)",
        borderRadius: "5px"
      })

      $(".modeIconInner").css({

        borderRadius: "50px",
        width: "40%",
        height: "40%",
        background: "transparent",
        backgroundColor: Modes[id].color,
      })

    } else if (id === "pro") {
      $(".modeIcon").css({
        borderLeft: "1px solid " + Modes[id].color,
        borderRight: "1px solid " + Modes[id].color,
        background: `linear-gradient(45deg, ${Modes[id].color}, #00FFA100, #00FFA100, ${Modes[id].color})`,
        transform: "rotate(0deg)",
        borderRadius: "50px"
      })

      $(".modeIconInner").css({
        background: "transparent",
        backgroundColor: Modes[id].color,
        borderRadius: "1px",
        width: "40%",
        height: "40%",
        transform: "rotate(0deg)"
      })
    } else if (id === "expert") {

      $(".modeIcon").css({
        borderLeft: "1px solid " + Modes[id].color,
        borderRight: "1px solid " + Modes[id].color,
        background: `linear-gradient(45deg, ${Modes[id].color}, #00FFA100, #00FFA100, ${Modes[id].color})`,
        transform: "rotate(45deg)",
        borderRadius: "5px",
      })

      $(".modeIconInner").css({
        backgroundColor: "transparent",
        background: `linear-gradient(to top, ${Modes[id].color}, transparent, transparent, ${Modes[id].color})`,
        width: "100%",
        height: "100%",
        borderRadius: "5px",
        transform: "rotate(-45deg)",

      })

    }


    // change percentage of level mode 

    $("#zSpeed").css("width", Modes[id].stat.speed + "%")
    $("#zDamage").css("width", Modes[id].stat.damage + "%")
    $("#zCount").css("width", Modes[id].stat.count + "%")
    $("#zLife").css("width", Modes[id].stat.life + "%")

    if (Profile.mode === id) {

    } else {

      Profile.mode = id


      $("#gameInfoMode").text(id)

    }
  })


  ////// Changing Mode zlevel Platform 
  /// flipping floor 
  /*
    var flipped = false
    var flippedReverse = false
    var flipTo = Math.PI

    function flipFloor(m) {

      if (flipped === false) {

        flipped = true

        if (flippedReverse) {
          flipTo = 0
          flippedReverse = false
        } else {
          flipTo = Math.PI
          flippedReverse = true
        }




        var mode;

        switch (m) {
          case "beginner":
            mode = "floorGreen"
            break;
          case "pro":
            mode = "floorBlue"
            break;
          case "expert":
            mode = "floorRed"
            break;

        }

        $("#iconMode").attr("src", `assets/images/${mode}.jpg`)


        var wait = setTimeout(function() {
          var rn = 1
          for (var p = 0; p < floorArray.length; p++) {

            if (!floorArray[p].name) {
              flippedReverse ? floorArray[p].material[3].map = images[mode] : floorArray[p].material[2].map = images[mode]

            }
            if (rn === 1) {

              TweenMax.to(floorArray[p].rotation, 3, {
                z: -flipTo
              })
              rn++
            } else {
              TweenMax.to(floorArray[p].rotation, 3, {
                z: flipTo
              })
              rn = 1
            }
          }
          clearTimeout(wait)

          //   flippedReverse = true
        }, 1000)

        var fli = setTimeout(function() {
          flipped = false
          clearTimeout(fli)
        }, 1500)
      }
    }

  */


  //******************************
  // GENERATE SWORDS
  //******************************

  for (var i = 1; i <= 9; i++) {

    var sword = Swords["sword" + i]
    sword.renderMesh()

    var one = `<div class="swordsDiv" id="sword${i}"><img class="swordsImg" src="${sword.img}"><p class="swordsTxt">${sword.name}<br>Attack - ${sword.attack} <br> Speed - ${sword.speed}</p></div>`


    $(".gameContentSwords").append(one)

  }

  var curSword = $(`#${Profile.sword}`)[0]
  curSword.style.border = "1px solid #09F5FF"

  // choose sword
  $(".swordsDiv").on('click', el => {
    var swordItem = Swords[el.currentTarget.id]
    var id = el.currentTarget.id


    el.currentTarget.style.border = "1px solid #09F5FF"
    curSword.style.border = ""
    curSword = el.currentTarget

    Profile.sword = id

    $("#ginfoSword").attr("src", swordItem.img)


    $("#gameInfoWeapon").text(swordItem.name)
    $("#iconWeapon").attr("src", swordItem.img)

    Hero.swordGroup.children.length = 0

    // Hero.swordGroup.children = swordItem.mesh.children


    for (var y = 0; y <= swordItem.mesh.children.length; y++) {
      if (swordItem.mesh.children[y] !== undefined && swordItem.mesh.children[y].type === "Mesh") {
        var newMesh = new three.Mesh()
        newMesh.copy(swordItem.mesh.children[y])
        Hero.swordGroup.add(newMesh)
      }
    }

    //swordItem.renderMesh(Hero.swordGroup)

  })


  //******************************
  // select ELEMENT
  //******************************

  var curEl = $(`#${Profile.element}Img`)[0]
  var curElId = curEl.id.split("Img")[0]

  curEl.style.boxShadow = "0 0 10px 3px orange"
  curEl.style.transform = "scale(1.19)"

  $(".elementsDiv").on("click", el => {

    var color;


    switch (el.currentTarget.id) {
      case "fire":
        color = "orange"
        break;
      case "air":
        color = "white"
        break;
      case "water":
        color = "blue"
        break;
      case "earth":
        color = "green"
    }


    curEl.style.boxShadow = "none"
    curEl.style.transform = "scale(1)"


    el.currentTarget.style.boxShadow = "0 0 10px 3px " + color
    curEl = el.currentTarget
    curEl.style.transform = "scale(1.19)"

    if (curElId === el.currentTarget.id) {
      curElId = el.currentTarget.id


    } else {
      playSound(Audios[el.currentTarget.id + "Element"])
      Hero.actions.cheer.play().reset()

      curElId = el.currentTarget.id
      // Elements fx
      var ele = Elements[curElId]
      Hero.element = curElId
      Profile.element = curElId

      $("#ginfoElement").attr("src", `assets/images/${curElId}.png`)


      ele()

      Hero.light.color.set(color)

      Hero.sword.material.map = images[curElId + "Slash"]
      var src = "assets/images/" + curElId + ".png"

      $("#gameInfoElement").text(curElId)
      $("#iconElement").attr("src", src)

    }

  })


  //******************************
  // GENERATE SKINS
  //******************************

  var center = (innerHeight * .8) / 2

  var curSkin = Profile.skin

  // Select skin



function skinListener(){

  $(`#${Profile.model}`).css("border", ".8px solid rgba(255, 255, 255, .5)")



  $(".skinDiv").on("click", function(e) {

    var id = e.currentTarget.id



    if (Profile.model !== id) {
      $(`#${Profile.model}`).css("border", "none")


      $(`#${Profile.model}`).css("border", ".8px solid rgba(255, 255, 255, .5)")

    }


  })

  $(".aboutskin").on("click", e => {

    var id = e.currentTarget.id


    $("#prompt, #cover").css("display", "grid")

    $("#promptContent").html('')

    var skin = Skins[$(`#${id}`).attr("skinNum")]


    var skinDiv = `<div class="skinPrompt"><div id="skinPrompt2"><img src="${skin.src}" id="skinPromptImg"/><p id="skinPromptName">${skin.name} <br/> <p class="skinDes">${skin.des}</p></p></div></div>`

    $("#promptContent").append(skinDiv)

  })


  $(".skinAction").on("click", e => {
    $("#promptContent").html('')

    $("#prompt, #cover").css("display", "grid")


    var id = e.currentTarget.id
    var idd = $(`#${id}`).attr("idd")

    var skins = Skins[idd]


    if (Profile.skinsStatus[skins.name]) {

      if (skins.name === Profile.model) {
     //   $("#promptContent").html("")

        $("#promptContent").append(`<p style="position: absolute; color: white; font-size: 5vw; width: 100%; text-align: center; font-family: Poppins Regular; margin: auto; margin-top: 15%">✨<br/> <br/>You already use this skin</p>`)
      } else {
   //     $("#promptContent").html("")

        $("#promptContent").append(`<div style="display: grid; grid-template-rows: 50% 50%; width: 90%; height: 80%; color: white; font-family: Poppins Medium; text-align: center; margin: auto; margin-top: 15%; "><p>❓<br/><br/>Are you sure you want to use this skin?</p><p id="useSkinNow" style="background-color: #42445A80; width: 40%; height: 40%; border-radius: 5px; margin: auto; font-size: 4vw; padding-top: 5px">use now</p></div>`)
        // use skin
        $("#useSkinNow").on('click', e => {

          Profile.model = skins.name

          SCENE.remove(Hero.groupMesh)
          Hero.groupMesh = undefined
          Hero.type = skins.type 
          Hero.heroName = skins.name
          changeHero(Profile.model)
          
          $(".gameContentSkins").html("")
          genSkin()
          
          $("#prompt, #cover").hide()
          

        })
      }

    } else {

      // unlocked, need to buy 
      if (Profile.level >= skins.unlockedAtLevel) {
        $("#promptContent").append(`<div style="display: grid; grid-template-rows: 50% 50%; width: 90%; height: 80%; color: white; font-family: Poppins Medium; text-align: center; margin: auto; margin-top: 20%; "><p>💲💲💲 <br/> <br/> Buy this skin for ${skins.price}?</p><p style="background-color: #42445A80; width: 40%; height: 40%; border-radius: 5px; margin: auto; font-size: 4vw; padding-top: 5px">buy now</p></div>`)

      } else {

        // locked, need to pass level 

        $("#promptContent").append(`<p style="position: absolute; color: white; font-size: 5vw; font-family: Poppins Regular; margin-left: 15%; margin-top: 30%"> This skin is still locked, you can unlock it by level ${skins.unlockedAtLevel}</p>`)

      }

    }
  })





  $("#promptExit").on("click", function() {
    $("#prompt, #cover").hide()
    $("#promptContent").html("")
  })


}
skinListener()

  //******************************
  // OPEN ACHIEVEMENTS
  //******************************

  $("#achievement").on("click", function() {
    $("#achievementDiv").html("")
    $("#cover, #achievementDiv, #task, #taskclose").show()
    $("#achievement").hide()


    for (var i = 1; i <= 7; i++) {

      var index = Achievements["level" + i]
      var isDone = index.done ? "claimed" : "in progress"
      $("#achievementDiv").append(`<div class="achievementDivs"><p class="achievementIcon">${index.icon}</p><p id="achievementDes">${index.title}<br/>${index.description}</p><p class="taskStatus">${isDone}</p></div>`)

    }


  })

  $("#taskclose").on("click", e => {


    $("#cover, #achievementDiv, #task, #taskclose").hide()
    $("#achievement").show()
  })




  //******************************
  // SELECT SWORDS
  //******************************


  var curElMenu = $(".skin")[0]

  $(".sword").on("click", function(el) {

    playSound(Audios.selectMenu)

    //MOVE CAMERA 



    curElMenu.style.borderBottom = "none"
    curElMenu.style.transform = "scale(1)"
    curElMenu = el.target
    curElMenu.style.transform = "scale(1.3)"
    curElMenu.style.borderBottom = "1px solid #0FE8EF"


    $(".gameContentSkins").hide()

    $(".gameContentSwords").css("display", "grid")

    $(".gameContentElements").hide()
    $(".gameContentModes").hide()

  })


  $(".skin, .element, .mode").on("click", function(el) {
    //MOVE CAMERA 
    playSound(Audios.selectMenu)




    curElMenu.style.borderBottom = "none"
    curElMenu.style.transform = "scale(1)"
    curElMenu = el.target
    curElMenu.style.transform = "scale(1.3)"
    curElMenu.style.borderBottom = "1px solid #0FE8EF"


    var id = el.target.id

    $(".gameContentSkins").hide()
    $(".gameContentSwords").hide()
    $(".gameContentElements").hide()
    $(".gameContentModes").hide()



    if (id === "skin") {
      $(".gameContentSkins").show()
    }
    else if (id === "element") {
      $(".gameContentElements").css("display", "grid")

    } else if (id === "mode") {
      $(".gameContentModes").show()

    }


  })


  // Enter Setting 
  $("#character").on("click", () => {

    Hero.actions.cheer.play().reset
playSound(Audios.mainMusic)

    TweenMax.to(CAMERA.position, 1, {
      x: -35.9346,
      y: 20.0827,
      z: 27.4719
    })
    TweenMax.to(CAMERA.rotation, 1, {
      x: -0.35161,
      y: -0.8848,
      z: -0.27660
    })


    $(".gameMenu, .gameHeader, #achievement").hide()

    $(".gameDiv").css("display", "grid")

  })

  //***********************************
  // Exit Setting 
  //***********************************

  $("#exitSetting").on('click', function() {

    $(".gameDiv").hide()
    $(".gameMenu, .gameHeader, #achievement").css("display", "grid")

    TweenMax.to(CAMERA.position, 1, {
      x: 25.2582,
      y: 19.3008,
      z: 35.7187,
      onComplete: function() {
        $(".gameMenu").css("display", "grid")
      }
    })

    TweenMax.to(CAMERA.rotation, 1, {
      x: -0.34050,
      y: 0.6090,
      z: 0.1999
    })

  })

  // update Network and Battery 
  Network.check();
  Battery.update()



  //*************************

  // play game

  $("#gamePlay").on("click", function() {

    // Hide Game Menu 
    Audios.mainMusic.pause()

    gameTime()

    $(".gameMenu, #achievement").hide()

    playSound(Audios.music)

    // show Game Loader 
    $(".gameLoader").css("display", "grid")


    // load Game Environment and Zombies 
    Hero.health.visible = true

    // display Game User Interfaces and joystick 

    $("#joypad, #slashpad").show()

    setTimeout(function() {
      $(".gameLoader").hide()
      genZombie()
      genRunes()

      Network.check()
      Battery.update()
      Hero.health.visible = true

      $(".onGameBody, .onGameHeader").css("display", "grid")

    }, 4000)

    ///   update game user skills and info
    $("#firstskillbutton").attr("src", `assets/images/${Profile.element}FirstSkillIcon.png`)



  })
}
export default UI