import {CharController} from './environment.js'

var JoyPad = (pos, container) => {


  var canvas = document.getElementById("joypad")
  var ctx = canvas.getContext("2d")

  var width = innerWidth / 3
  var height = width

  canvas.width = width
  canvas.height = height

  var centerX = width / 2
  var centerY = width / 2


  var movedX = 0
  var movedY = 0
  var radius = width / 6

  canvas.addEventListener("touchstart", touchstart)
  canvas.addEventListener("touchmove", touchmove)
  canvas.addEventListener("touchend", touchend)

  // append it
  // document.body.appendChild(canvas)

  ctx.beginPath()
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
  ctx.fillStyle = "#61C1FAA8"
  ctx.fill()

  var isCenter = false

  var maxMoveStick = width - radius
  var distance;

  function touchstart(e) {
    e.preventDefault()
    // if touch is the blue one 

    var x = e.touches[0].clientX //+ (innerWidth * .1)
    var y = e.touches[0].clientY //+ (innerHeight* .2)
  CharController.walk()
  }


  function touchmove(e) {

    e.preventDefault()

    if (e.targetTouches[0].target === canvas) {
      var xx = e.targetTouches[0].pageX
      var yy = e.targetTouches[0].pageY



      var dis = dist(centerX, xx, centerY, yy)

      movedX = xx
      movedY = yy

      movedX -= canvas.offsetLeft
      movedY -= canvas.offsetTop


      if (movedX > maxMoveStick) movedX = maxMoveStick
      if (movedX < radius) movedX = radius
      if (movedY > maxMoveStick) movedY = maxMoveStick
      if (movedY < radius) movedY = radius
    }


    // clear canvas 
    ctx.clearRect(0, 0, width, height)

    // rePaint Canvas
    ctx.beginPath()
    ctx.arc(movedX, movedY, radius, 0, Math.PI * 2)
    ctx.fillStyle = "#61C1FAA8"
    ctx.fill()
    GetDir(e)

  }

  function touchend(e) {
    movedX = centerX
    movedY = centerY

    ctx.clearRect(0, 0, width, height)

    ctx.beginPath()
    ctx.arc(movedX, movedY, radius, 0, Math.PI * 2)
    ctx.fillStyle = "#61C1FAA8"
    ctx.fill()

    CharController.stop()

  }


  function GetDir(e)
  {

    var eX = e.touches[0].clientX - canvas.offsetLeft
    var eY = e.touches[0].clientY - canvas.offsetTop

    if (eX >= centerX) {
      eX = eX - centerX

    } else {
      eX = -(centerX - eX)
    }

    if (eY >= centerY) {
      eY = centerY - eY
    } else {
      eY = -(eY - centerY)
    }

    eX = eX / centerX
    eY = eY / centerY

    eX >= 1 ? eX = 1 : eX = eX
    eY >= 1 ? eY = 1 : eY = eY

    eX <= -1 ? eX = -1 : eX = eX
    eY <= -1 ? eY = -1 : eY = eY

    CharController.updateKey({x: eX, z: eY})

    return;
  }


  function dist(x1, x2, y1, y2) {
    return Math.abs(Math.floor(Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1))))
  }
}

export default JoyPad;