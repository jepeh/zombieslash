import * as three from "../src/three.js"

export default class Particle {
  constructor(pos) {
    this.pos = pos
    this.mesh;
    this.renderMesh()

  }

  renderMesh() {
    // Particle fx

  var size = Math.random()*(.5-.2)+.2

    var mat = new three.MeshPhongMaterial()
    var geo = new three.SphereGeometry(size)
    var mesh = new three.Mesh(geo, mat)

    mesh.position.copy(this.pos)



    this.mesh = mesh

    this.fade()
    return;
  }
  getMesh() {
    return this.mesh
  }
  fade() {
    var self = this
    var faded = setTimeout(function(){
    
    TweenMax.to(self.mesh.scale, 1, {
      x: 0,
      y: 0,
      z: 0,
      onComplete: function() {
        self.mesh.geometry.dispose()
        self.mesh.material.dispose()
        window.SCENE.remove(self.mesh)
      }
    })
    
      clearTimeout(faded)
    }, 10)
    
    return;
  }
}