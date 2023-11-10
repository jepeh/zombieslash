import * as three from "../src/three.js"



export default function getMeshImage(img, group) {

 

  var image = new MarvinImage()

  image.load(img, async function() {

    var startX = -image.getWidth() / 2
    var startY = image.getHeight() / 2

    for (var x = 0; x < image.getWidth(); x++) {

      for (var y = 0; y < image.getHeight(); y++) {

        var red = image.getIntComponent0(x, y);
        var green = image.getIntComponent1(x, y);
        var blue = image.getIntComponent2(x, y);
        var alpha = image.getAlphaComponent(x, y);


        // if pixel has color and need tk render mesh
        if (alpha > 0) {

          // generate Mesh 

          var newGeo = new three.BoxGeometry(.2, .2, .3)
          var newMat = new three.MeshPhongMaterial()

          newMat.color.r = red / 250
          newMat.color.b = blue / 250
          newMat.color.g = green / 250

          var newMesh = new three.Mesh(newGeo, newMat)

          newMesh.castShadow = true
        //  newMesh.receiveShadow = true
          newMesh.position.x = startX * .2
          newMesh.position.y = startY * .2

          group.add(newMesh)


        }

        // decrement Y coordinate 
        startY -= 1

        if (startY === -image.getHeight() / 2) startY = image.getHeight() / 2
      }
      // increment X coordinate 
      startX = startX + 1


    }
    
     
     

  })

   
}