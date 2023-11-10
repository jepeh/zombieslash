import * as three from "../src/three.js"
import { SCENE, Hero } from './environment.js'
import images from "./imageBuffer.js"
import Particles from '../src/particle.js'

var go = true

var Elements = {
  fire: function() {


    if (go) {
      go = false

      var cg3 = new three.SphereGeometry(.3)

      var cy2P = new three.Mesh(cg3, new three.MeshPhongMaterial({

        map: images.fireElement
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
        particlePosition: new three.Vector3(0, 2, 0),
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
        linearTarget: false,
        depthTest: true,

        mesh: cy2P,

        isUpward: true,
        inTiming: .4,
        outTiming: .8,
        targetTiming: .5,
        targetPosition: {
          minX: -1,
          maxX: 1,
          minY: -1,
          maxY: 2,
          minZ: -1,
          maxZ: 1
        },
        interval: 50,
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




      var mapAr = [


      new three.MeshPhongMaterial({
          transparent: true,
          map: images.fireElement,
          depthTest: false
        })

      ]

      sys.start()

      var cg = new three.CylinderGeometry(3, 3, 6, 20)

      var cy = new three.Mesh(cg, mapAr)
      cy.position.y = 0

      // animate 
      TweenMax.to(cy.position, 1, {
        y: 5
      })

      TweenMax.to(cy.rotation, .5, {
        y: -Math.PI * 3,
        onComplete: function() {

          var cg2 = new three.SphereGeometry(2.5)

          var cy2 = new three.Mesh(cg2, new three.MeshPhongMaterial({
            transparent: true,
            map: images.fireElement,
            depthTest: false
          }))

          cy2.scale.x = 0
          cy2.scale.y = 0
          cy2.scale.z = 0
          cy2.position.y = 2
          SCENE.add(cy2)

          TweenMax.to(cy2.scale, .8, {
            x: 2,
            y: 2,
            z: 2,
            onComplete: function() {
              cy2.material.dispose()
              cy2.geometry.dispose()
              SCENE.remove(cy2)

            }
          })

          TweenMax.to(cy2.rotation, 1.4, {

            y: -Math.PI * 2


          })

          TweenMax.to(cy.scale, .5, {
            x: 0,
            z: 0,
            onComplete: function() {
              cy.material.forEach(function(c) {
                c.dispose()
              })
              cy.geometry.dispose()
              SCENE.remove(cy)
              go = true
              sys.end()
            }
          })
        }
      })

      SCENE.add(cy)

    }

  },
  water: function() {

    if (go) {

      var cg3 = new three.SphereGeometry(.3)

      var cy2P = new three.Mesh(cg3, new three.MeshPhongMaterial({

        map: images.waterElement
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
        particlePosition: new three.Vector3(0, 2, 0),
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
        linearTarget: false,
        depthTest: true,

        mesh: cy2P,

        isUpward: true,
        inTiming: .4,
        outTiming: .8,
        targetTiming: .5,
        targetPosition: {
          minX: -1,
          maxX: 1,
          minY: -1,
          maxY: 2,
          minZ: -1,
          maxZ: 1
        },
        interval: 50,
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




      var mapAr = [


      new three.MeshPhongMaterial({
          transparent: true,
          map: images.waterElement,
          depthTest: false
        }),

      ]

      sys.start()

      var cg = new three.CylinderGeometry(3, 3, 6, 20)

      var cy = new three.Mesh(cg, mapAr)
      cy.position.y = 0

      // animate 
      TweenMax.to(cy.position, 1, {
        y: 5
      })

      TweenMax.to(cy.rotation, .5, {
        y: -Math.PI * 3,
        onComplete: function() {

          var cg2 = new three.SphereGeometry(2.5)

          var cy2 = new three.Mesh(cg2, new three.MeshPhongMaterial({
            transparent: true,
            map: images.waterElement,
            depthTest: false
          }))

          cy2.scale.x = 0
          cy2.scale.y = 0
          cy2.scale.z = 0
          cy2.position.y = 2
          SCENE.add(cy2)

          TweenMax.to(cy2.scale, .8, {
            x: 2,
            y: 2,
            z: 2,
            onComplete: function() {
              cy2.material.dispose()
              cy2.geometry.dispose()
              SCENE.remove(cy2)

            }
          })

          TweenMax.to(cy2.rotation, 1.4, {

            y: -Math.PI * 2


          })

          TweenMax.to(cy.scale, .5, {
            x: 0,
            z: 0,
            onComplete: function() {
              cy.material.forEach(function(c) {
                c.dispose()
              })
              cy.geometry.dispose()
              SCENE.remove(cy)
              go = true
              sys.end()
            }
          })
        }
      })

      SCENE.add(cy)
    }
  },
  air: function() {


    if (go) {
      go = false

      var cg3 = new three.SphereGeometry(.3)

      var cy2P = new three.Mesh(cg3, new three.MeshPhongMaterial({

        map: images.airElement
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
        particlePosition: new three.Vector3(0, 2, 0),
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
        linearTarget: false,
        depthTest: true,

        mesh: cy2P,

        isUpward: true,
        inTiming: .4,
        outTiming: .8,
        targetTiming: .5,
        targetPosition: {
          minX: -1,
          maxX: 1,
          minY: -1,
          maxY: 2,
          minZ: -1,
          maxZ: 1
        },
        interval: 50,
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




      var mapAr = [


      new three.MeshPhongMaterial({
          transparent: true,
          map: images.airElement,
          depthTest: false 
        }),

      ]

      sys.start()

      var cg = new three.CylinderGeometry(3, 3, 6, 20)

      var cy = new three.Mesh(cg, mapAr)
      cy.position.y = 0

      // animate 
      TweenMax.to(cy.position, 1, {
        y: 5
      })

      TweenMax.to(cy.rotation, .5, {
        y: -Math.PI * 3,
        onComplete: function() {

          var cg2 = new three.SphereGeometry(2.5)

          var cy2 = new three.Mesh(cg2, new three.MeshPhongMaterial({
            transparent: true,
            map: images.airElement,
            depthTest: false
          }))

          cy2.scale.x = 0
          cy2.scale.y = 0
          cy2.scale.z = 0
          cy2.position.y = 2
          SCENE.add(cy2)

          TweenMax.to(cy2.scale, .8, {
            x: 2,
            y: 2,
            z: 2,
            onComplete: function() {
              cy2.material.dispose()
              cy2.geometry.dispose()
              SCENE.remove(cy2)

            }
          })

          TweenMax.to(cy2.rotation, 1.4, {

            y: -Math.PI * 2


          })

          TweenMax.to(cy.scale, .5, {
            x: 0,
            z: 0,
            onComplete: function() {
              cy.material.forEach(function(c) {
                c.dispose()
              })
              cy.geometry.dispose()
              SCENE.remove(cy)
              go = true
              sys.end()
            }
          })
        }
      })

      SCENE.add(cy)

    }

  },
  earth: function() {


    if (go) {
      go = false

      var cg3 = new three.SphereGeometry(.3)

      var cy2P = new three.Mesh(cg3, new three.MeshPhongMaterial({

        map: images.earthElement
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
        particlePosition: new three.Vector3(0, 2, 0),
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
        linearTarget: false,
        depthTest: true,

        mesh: cy2P,

        isUpward: true,
        inTiming: .4,
        outTiming: .8,
        targetTiming: .5,
        targetPosition: {
          minX: -1,
          maxX: 1,
          minY: -1,
          maxY: 2,
          minZ: -1,
          maxZ: 1
        },
        interval: 50,
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




      var mapAr = [


      new three.MeshPhongMaterial({
          transparent: true,
          map: images.earthElement,
          depthTest: false
        }),

      ]

      sys.start()

      var cg = new three.CylinderGeometry(3, 3, 6, 20)

      var cy = new three.Mesh(cg, mapAr)
      cy.position.y = 0

      // animate 
      TweenMax.to(cy.position, 1, {
        y: 5
      })

      TweenMax.to(cy.rotation, .5, {
        y: -Math.PI * 3,
        onComplete: function() {

          var cg2 = new three.SphereGeometry(2.5)

          var cy2 = new three.Mesh(cg2, new three.MeshPhongMaterial({
            transparent: true,
            map: images.earthElement,
            depthTest: false
          }))

          cy2.scale.x = 0
          cy2.scale.y = 0
          cy2.scale.z = 0
          cy2.position.y = 2
          SCENE.add(cy2)

          TweenMax.to(cy2.scale, .8, {
            x: 2,
            y: 2,
            z: 2,
            onComplete: function() {
              cy2.material.dispose()
              cy2.geometry.dispose()
              SCENE.remove(cy2)

            }
          })

          TweenMax.to(cy2.rotation, 1.4, {

            y: -Math.PI * 2


          })

          TweenMax.to(cy.scale, .5, {
            x: 0,
            z: 0,
            onComplete: function() {
              cy.material.forEach(function(c) {
                c.dispose()
              })
              cy.geometry.dispose()
              SCENE.remove(cy)
              go = true
              sys.end()
            }
          })
        }
      })

      SCENE.add(cy)

    }

  }
}

export default Elements;