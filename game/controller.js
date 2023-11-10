import * as THREE from '../src/three.js'

function CharacterControls(scene, model, orbitControl, camera) {

  const self = this

  self.model = model
  self.orbitControl = orbitControl
  self.camera = camera
  self.scene = scene

  //state
  // temporary data
  self.walkDirection = new THREE.Vector3()
  self.rotateAngle = new THREE.Vector3(0, 1, 0)
  self.rotateQuarternion = new THREE.Quaternion()
  self.cameraTarget = new THREE.Vector3()

  self.key = {
    x: 0,
    z: 0
  };

  self.isWalk = false

  self.stop = function() {
    self.isWalk = false
   /* TweenMax.to(self.model.mesh.rotation, .3, {
      x: 0
    })*/
    self.model.actions.idle.play()
    self.model.actions.running.stop()

  }

  self.walk = function() {
    self.isWalk = true
    /*
        self.camera.position.x = self.model.groupMesh.position.x + 17
        self.camera.position.z = self.model.groupMesh.position.z + 17
        self.camera.position.y = 20
    */

  /*  TweenMax.to(self.model.mesh.rotation, .3, {
      x: Math.PI / 12
    })*/
    
    
    self.model.actions.idle.stop()
    self.model.actions.running.play()
    
    
  }

  self.updateKey = function(k) {
    self.key = k
  }

  self.update = function(delta, eTime) {


    if (self.isWalk) {
      // diagonal movement angle offset

      // var directionOffset = self.directionOffset(self.key)
      var directionOffset = Math.atan2(self.key.x, self.key.z)

      // update quaternions
      var angleYCameraDirection = Math.atan2(
        (self.model.groupMesh.position.x - self.camera.position.x),
        (self.model.groupMesh.position.z - self.camera.position.z))

      var angle = angleYCameraDirection - directionOffset // directionOffset
      //	angle >= 1 ? angle = angle - 1 : angle = angle

      self.model.groupMesh.rotation.y = angle
      //  self.model.groupMesh.rotation.z = Math.PI/12


      // calculate direction
      self.camera.getWorldDirection(self.walkDirection)
      self.walkDirection.y = 0
      self.walkDirection.normalize()

      self.walkDirection.applyAxisAngle(self.rotateAngle, -directionOffset)

      var velocity = 17//hero.velocity < 0 ? .01 : hero.velocity

      // move model & camera
      var moveX = self.walkDirection.x * velocity * delta
      var moveZ = self.walkDirection.z * velocity * delta

//console.log(moveX)


      self.model.groupMesh.position.x += moveX
      self.model.groupMesh.position.z += moveZ

  /*    // self.model.mesh.position.y = 3
      self.model.swordGroup.rotation.z = (Math.sin(eTime * 3) * .06) + -Math.PI / 6
      self.model.swordGroup.position.z = 2.5
      self.model.swordGroup.position.y = 0
      self.model.mesh.position.y = (Math.sin(eTime * 4) * .2)
*/
      self.updateCameraTarget(moveX, moveZ)



    }
    // Idle
    else {
      
      
      
      /*    // idle animation 
        //  self.model.groupMesh.position.y = (Math.sin(eTime * 4) * .2) + 3
          self.model.swordGroup.rotation.z = (Math.sin(eTime * 3) * .06) + -Math.PI / 6
          self.model.swordGroup.position.z = 2.5
          self.model.swordGroup.position.y = 0*/



    }

    return;
  }


  self.updateCameraTarget = function(moveX, moveZ) {

    self.camera.position.x += moveX
    self.camera.position.z += moveZ

    self.cameraTarget.x = self.model.groupMesh.position.x
    self.cameraTarget.y = self.model.groupMesh.position.y
    self.cameraTarget.z = self.model.groupMesh.position.z
    self.orbitControl.target = self.cameraTarget

    // update camera target 
    self.camera.lookAt(self.model.groupMesh.position)
    return;
  }

  self.directionOffset = function(key) {
    var directionOffset = 0 // w

    switch (key) {
      case "S":
        directionOffset = Math.PI
        break;
      case "W":
        directionOffset = Math.PI / 2
        break;
      case "E":
        directionOffset = -Math.PI / 2
        break;
      case "NE":
        directionOffset = -Math.PI / 4
        break;
      case "NW":
        directionOffset = Math.PI / 4
        break;
      case "SW":
        directionOffset = Math.PI / 4 + Math.PI / 2
        break;
      case "SE":
        directionOffset = -Math.PI / 4 - Math.PI / 2
        break;
      default:
        directionOffset = 0
    }

    return directionOffset
  }
}

export default CharacterControls