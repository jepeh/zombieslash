import * as three from "../src/three.js"
import { OrbitControls } from "../src/OrbitControls.js"
import Character from './character.js'
import CharacterControls from './controller.js'
import initAttacks from './attack.js'
import * as Zombies from "./zombie.js"
import { OimoPhysics } from "../src/OimoPhysics.js"
import getMeshImage from './assetGenerator.js'
import images from './imageBuffer.js'
import Particles from '../src/particle.js'
import Stats from '../src/Stats.js'
import { Profile, ModelItems } from './profile.js'
import { Runes } from './objects.js'
import playSound from "./sound.js"
import Audios from './audio.js'
import { OBJLoader } from '../src/Loader/OBJLoader.js'
import { GLTFLoader } from '../src/Loader/GLTFLoader.js'

var gltf = new GLTFLoader()
//var fbx = new FBXLoader()
var obj = new OBJLoader()
//var Profile = JSON.parse(localStorage.getItem("profile"))
localStorage.removeItem("profile")
var TexLoader = new three.TextureLoader()

var CharController;
var Hero;
var CAMERA;
var SCENE;
var ZombiesSCENE;
var RENDERER;
var CLOCK;
var floorArray = []
var Stat = new Stats()
var genZombie
var genRunes
var runesArray = []
var Mixer;
var gameStat = {
  firstSkill: 0,
  secondSkill: 0,
  thirdSkill: 0
}
var changeHero;

function SetupWorld(canvas) {

  //threeJS window Variables
  var sizes = {
    width: window.innerWidth,
    height: window.innerHeight
  }

  SCENE = new three.Scene()
  ZombiesSCENE = new three.Scene()
  //  SCENE2 = new three.Scene()
  CAMERA = new three.PerspectiveCamera(30, sizes.width / sizes.height, 1, 4000)
  CLOCK = new three.Clock()
  RENDERER = new three.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true
  })



  SCENE.color = 'blue'

  // orbit controls 
  var CONTROLS = new OrbitControls(CAMERA, RENDERER.domElement)
  CONTROLS.enabled = true

  //CONTROLS.minPolarAngle = -Math.PI / 4;
  // CONTROLS.maxPolarAngle = Math.PI / 3;

  // global keypress
  window.KeyPressed = {
    x: 0,
    y: 0,
    z: 0
  }

  /// Set up the scene, add lights and render

  RENDERER.setSize(sizes.width, sizes.height);
  RENDERER.setPixelRatio(window.devicePixelRatio)
  RENDERER.shadowMap.enabled = true

  CAMERA.position.set(10, 20, -30)
  CAMERA.lookAt(0, 5, 0)

  // Lights and Shadow

  const ambLight = new three.AmbientLight('white', .8)
  const dirLight = new three.DirectionalLight('white', .2)

  dirLight.position.set(40, 100, 60)
  dirLight.castShadow = true
  dirLight.shadow.mapSize.width = 1024 * 2
  dirLight.shadow.mapSize.height = 1024 * 2



  var d = 200

  dirLight.shadow.camera.left = -d
  dirLight.shadow.camera.right = d
  dirLight.shadow.camera.top = d
  dirLight.shadow.camera.bottom = -d
  dirLight.shadow.camera.far = 1000
  dirLight.shadow.camera.near = 1


  // Setup Physics World



  var px = -20
  var py = 20


  var matu2 = new three.MeshPhongMaterial({
    //   map: images.floorSink
    color: "#252633"
  })
  var matu3 = new three.MeshPhongMaterial({
    map: images.floorSink

  })


  genZombie = function() {
    var zombieCount = Profile.zombieCount
    for (var i = 0; i < zombieCount; i++) {

      var pos = {
        x: Math.floor(Math.random() * (100 - (-100)) + (-100)),
        y: 2,
        z: Math.floor(Math.random() * (100 - (-100)) + (-100))
      }

      var o = Math.floor(Math.random() * (3 - 1) + 1)

      var zom = new Zombies.Zombie(pos, i, o)

      Zombies.zombieArray.push(zom)
    }


  }

  genRunes = function() {
    for (var i = 0; i < 10; i++) {

      var pos = new three.Vector3()

      pos.x = Math.floor(Math.random() * (100 - (-100)) + (-100))
      pos.y = 2
      pos.z = Math.floor(Math.random() * (100 - (-100)) + (-100))

      var rune = new Runes(pos)
      runesArray.push(rune)


    }
  }

  // var huh = []

  var geu = new three.BoxGeometry(7, 1, 7)
  for (var e = 0; e < 40; e++) {

    for (var ee = 0; ee < 40; ee++) {

      var bu = Math.floor(Math.random() * (15 - 1) + 1)

      var floor;



      if (bu === 3) {
        floor.name = true
        floor = new three.Mesh(geu, matu3)
      } else {
        floor = new three.Mesh(geu, matu2)
        floor.name = false
      }

      floor.receiveShadow = true


      floor.position.x = px * 7
      floor.position.z = py * 7


      py--
      py === -20 ? py = 20 : false
      floorArray.push(floor)
      SCENE.add(floor)
    }
    px++
  }


  /*    setTimeout(function() {
        var rn = 1
        for (var p = 0; p < huh.length; p++) {

          if (rn === 1) {

            TweenMax.to(huh[p].rotation, 5, {
              x: Math.PI
            })
            rn++
          } else {
            TweenMax.to(huh[p].rotation, 5, {
              z: Math.PI
            })
            rn = 1
          }
        }
      }, 5000)
  */


  Hero = new Character(1)

  initAttacks(Hero)

  Hero.groupMesh.scale.x = 0

  Hero.groupMesh.scale.y = 0
  Hero.groupMesh.scale.z = 0

  // Character and Camera Controller (Joypad)
  CharController = new CharacterControls(SCENE, Hero, CONTROLS, CAMERA)
  Hero.controller = CharController


  var me;
  var mod = Profile.model




   changeHero = function(model) {
     Hero.actions.attacks.length = 0
    gltf.load(`assets/models/${model}.glb`, e => {
      mod = model
      me = e.scene
      me.castShadow = true
      me.children[0].children.forEach(e => {
        e.castShadow = true
      })

      me.position.y = .5
      me.scale.set(3.6, 3.6, 3.6)

      me.animations = e.animations
      Hero.groupMesh = me

      SCENE.add(Hero.groupMesh)
      var r = JSON.stringify(me.children[0].children[0].children[0])
      // console.log(r)

      //clear items
      for (var i = 0; i < ModelItems[mod].Objects.length; i++) {
        var obj = me.getObjectByName(ModelItems[mod].Objects[i])
        if (obj) obj.visible = false
      }


      //  var wand = me.getObjectByName("")
      //    wand.visible = false

      var plane = new three.PlaneGeometry(15, 15)
      var matt = new three.MeshPhongMaterial({
        side: 2,
        transparent: true,
        map: images[Profile.element + "Slash"]

      })

      var sword = new three.Mesh(plane, matt)
      sword.scale.set(.3, .3, .3)
      sword.visible = false
      sword.position.y = .5
      sword.rotation.x = -Math.PI / 2
      sword.rotation.z = -Math.PI


      Hero.sword = sword

      Hero.groupMesh.add(sword)
      Hero.groupMesh.add(Hero.health)



      Mixer = new three.AnimationMixer(Hero.groupMesh)


      // idle
      Hero.actions.idle = Mixer.clipAction(three.AnimationClip.findByName(Hero.groupMesh.animations, "Idle"))
      Hero.actions.cheer = Mixer.clipAction(three.AnimationClip.findByName(Hero.groupMesh.animations, "Cheer"))
      Hero.actions.cheer.setLoop(three.LoopOnce)
      
      Hero.actions.cheer.clampWhenFinished = true
      Hero.actions.cheer.enable = true


      Hero.actions.running = Mixer.clipAction(three.AnimationClip.findByName(Hero.groupMesh.animations, "Running_B"))
      Hero.actions.hit = Mixer.clipAction(three.AnimationClip.findByName(Hero.groupMesh.animations, "Hit_B"))
      Hero.actions.hit.setLoop(three.LoopOnce)
      Hero.actions.hit.clampWhenFinished = true
Hero.actions.die = Mixer.clipAction(three.AnimationClip.findByName(Hero.groupMesh.animations, "Death_B"))
      Hero.actions.die.setLoop(three.LoopOnce)
      Hero.actions.die.clampWhenFinished = true
 
 
 Hero.actions.idle.play()
Hero.actions.die.enable = true 
      Hero.actions.hit.enable = true
//Hero.actions.die.play()


      for (var i = 0; i < ModelItems[mod].Attacks.length; i++) {
        var att = ModelItems[mod].Attacks[i]
        var act = Mixer.clipAction(three.AnimationClip.findByName(Hero.groupMesh.animations, att))


        act.setLoop(three.LoopOnce)
        act.clampWhenFinished = false
        act.enable = true
        act.timeScale = 1
        Hero.actions.attacks.push(act)



      }

    })

  }

changeHero(Profile.model)

  CAMERA.position.x = 25.2582
  CAMERA.position.y = 19.3008
  CAMERA.position.z = 35.7187

  CAMERA.rotation.x = -0.34050
  CAMERA.rotation.y = 0.6090
  CAMERA.rotation.z = 0.1999

  //$(".gameDate").text(Date())

  //  CAMERA.lookAt(Hero.groupMesh.position)

  //console.log(three.TextGeometry)

  var he = setTimeout(function() {
    TweenMax.to(Hero.groupMesh.scale, .7, {
      x: 1,
      y: 1,
      z: 1
    })
    clearTimeout(he)
  }, 800)

  var fog = new three.Fog("black", 90, 360)
  SCENE.fog = fog


  // Game Mechanics
  // Initialize Zombies 

  /* var tex = new three.TextureLoader()

   var or = new three.SpriteMaterial({
     map: tex.load("assets/images/inner.png"),
     side: 2,
     depthTest: false
   })*/



  /*   var orb = new three.Sprite(or)
     orb.add(new three.PointLight("red", 1))
     
     orb.position.y = 1
     //orb.scale.set(3,3,3)
     
     
     var outer = new three.Mesh(new three.SphereGeometry(1), new three.MeshPhongMaterial({
       map: tex.load("assets/images/outer.png"),
       transparent: true,
       side: 2
     }))
     
     outer.castShadow = true
     outer.receiveShadow = true
     
     
     outer.position.y = 1
     
     
     SCENE.add(orb, outer)*/







  // Axis Visualizer
  /// var axes = new three.AxesHelper(50)
  //   axes.position.y = 3

  SCENE.add(dirLight, ambLight, floor, Hero.getMesh())
  RENDERER.render(SCENE, CAMERA)
  //  RENDERER.render(SCENE2, CAMERA)

  // window.KeyPressed = true 
  // global keypress

  //  var tt = document.getElementById("tt")


  // Animation Frame
  renderAnimation()

  function renderAnimation() {
    var delta = CLOCK.getDelta()
    var eTime = CLOCK.getElapsedTime()

    //    tt.innerText = "Position[ "+CAMERA.position.x+" , "+CAMERA.position.y+" , "+CAMERA.position.z+" ] \n: Rotation[ "+CAMERA.rotation.x+" , "+CAMERA.rotation.y+" , "+CAMERA.rotation.z+" ]"
    if (Mixer) {
      Mixer.update(delta)
    }

    // Update Stat
    // update stat
    Stat.begin()
    $("#gameStat").html(`FPS  ${window.fps}`)
    Stat.end()

    Hero.controller.update(delta, eTime)
    requestAnimationFrame(renderAnimation)

    RENDERER.autoClear = true
    RENDERER.render(SCENE, CAMERA)
    RENDERER.autoClear = false

    RENDERER.render(ZombiesSCENE, CAMERA)

  }


}

export {changeHero, ZombiesSCENE, Mixer, CLOCK, gameStat, genRunes, runesArray, genZombie, CharController, SetupWorld, Hero, CAMERA, SCENE, RENDERER, floorArray }