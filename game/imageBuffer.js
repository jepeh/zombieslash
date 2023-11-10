import { TextureLoader } from "../src/three.js"

var TexLoader = new TextureLoader()

var images = {
  floorBlue: TexLoader.load("assets/images/floorBlue.jpg"),
  floorRed: TexLoader.load("assets/images/floorRed.jpg"),
  floorSink: TexLoader.load("assets/images/floor2.jpeg"),
floorGreen: TexLoader.load("assets/images/floorGreen.jpg"),

  dirt: TexLoader.load("assets/images/dirt.jpeg"),
  hero: TexLoader.load("assets/images/tnt.png"),
  health: TexLoader.load("assets/images/health.png"),
  slashSword: TexLoader.load("assets/images/slash2.png"),
  airSlash: TexLoader.load("assets/images/airSlash.png"),
  fireElement: TexLoader.load("assets/images/fireElement.png"),
  particleTexture: TexLoader.load("assets/images/particleTexture.png"),
  fireElementParticle: TexLoader.load("assets/images/fireElementParticle.png"),
fireElementParticlePixel: TexLoader.load("assets/images/fireElementParticlePixel.png"),
waterElement: TexLoader.load("assets/images/waterElement.png"),
airElement: TexLoader.load("assets/images/airElement.png"),
earthElement: TexLoader.load("assets/images/earthElement.png"),
waterSlash: TexLoader.load("assets/images/waterSlash.png"),
rune: TexLoader.load("assets/images/rune.png"),
explode: TexLoader.load("assets/images/explode.png"),
fireSlash: TexLoader.load("assets/images/fireSlash.png"),
earthSlash: TexLoader.load("assets/images/earthSlash.png"),
waterField: TexLoader.load("assets/images/waterField.png"),

airTornado: TexLoader.load("assets/images/airTornado.png"),
airField: TexLoader.load("assets/images/airField.png"),
earthField: TexLoader.load("assets/images/earthField.png"),
earthCrack: TexLoader.load("assets/images/earthCrack.png"),
earthCrackZombie: TexLoader.load("assets/images/earthCrackZombie.png"),

earthTexture: TexLoader.load("assets/images/earthTexture.png"),
heal: TexLoader.load("assets/images/heal.png"),
tornado: TexLoader.load("assets/images/tornadoTut.png"),

earthElementHit: TexLoader.load("assets/images/earthElementHit.png"),
zface: TexLoader.load("assets/images/zface.png"),
zwing: TexLoader.load("assets/images/zwing.png"),

zeye: TexLoader.load("assets/images/zeye.png"),
zskin: TexLoader.load("assets/images/zskin.png"),
hit: TexLoader.load("assets/images/hit.png"),
claw: TexLoader.load("assets/images/claw.png"),

orb: TexLoader.load("assets/images/orb.png"),
sonic: TexLoader.load("assets/images/outer.png"),
waterSword: TexLoader.load("assets/images/waterSword.png"),
droplet: TexLoader.load("assets/images/droplet.png"),
orbair: TexLoader.load("assets/images/orbair.png"),
orbwater: TexLoader.load("assets/images/orbwater.png"),
orbfire: TexLoader.load("assets/images/orbfire.png"),
orbearth: TexLoader.load("assets/images/orbearth.png"),
airLaser: TexLoader.load("assets/images/airLaser.png"),
earthLaser: TexLoader.load("assets/images/earthLaser.png"),
waterLaser: TexLoader.load("assets/images/waterLaser.png"),
fireLaser: TexLoader.load("assets/images/fireLaser.png"),

fireBlade: TexLoader.load("assets/images/fireBlade.png"),
fireCircle: TexLoader.load("assets/images/fireCircle.png"),
fireTexture: TexLoader.load("assets/images/fireTexture.jpg"),

lightningStrike: TexLoader.load("assets/images/lightningStrike.png"),
lightningImpact: TexLoader.load("assets/images/lightningImpact.png")

}


export default images;