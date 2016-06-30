var Template = require('@msfeldstein/threejs-template')
require('./three.extensions')
var boilerplate = new Template({})
var scene = boilerplate.scene
var geometry = new THREE.Geometry();
geometry.dynamic = true
geometry.vertices.push(
	new THREE.Vector3( -2,  2, 0 ), // TL
	new THREE.Vector3( -2, -2, 0 ), // BL
	new THREE.Vector3(  2, -2, 0 ), // BR
  new THREE.Vector3(  2,  2, 0)   // TR
);

geometry.faces.push( new THREE.Face3( 0, 1, 2 ) , new THREE.Face3(0,2,3));

geometry.computeBoundingSphere();

var material = new THREE.MeshBasicMaterial({color: 0x000000, wireframe: true})
var mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)



// Returns pairs of vertex indices who represent an outer edge, along with
// the 3rd point in the face, to help decide what direction to grow out along
function findOuterEdges() {
  var edges = []
  var faces = geometry.faces
  for (var firstI = 0; firstI < faces.length; firstI++) {
    var firstFace = faces[firstI]
    firstFace.eachEdge(function(vertIndexA, vertIndexB, other) {
      var isEdge = true
      for (var secondI = 0; secondI < faces.length; secondI++) {
        if (firstI == secondI) continue
        var secondFace = faces[secondI]
        if (secondFace.contains(vertIndexA) && secondFace.contains(vertIndexB)) return
      }
      edges.push([vertIndexA, vertIndexB, other])
    })
  }
  return edges
}

function grow() {
  var outerEdges = findOuterEdges()
  console.log(outerEdges.length)
  outerEdges.forEach(function(edge) {
    var va = geometry.vertices[edge[0]]
    var vb = geometry.vertices[edge[1]]
    var other = geometry.vertices[edge[2]]
    geometry.vertices.push(new THREE.Vector3(va.x + Math.randomRange(-5, 5),va.y  + Math.randomRange(-5, 5), va.z + Math.randomRange(-5, 5)))
    geometry.faces.push(new THREE.Face3(edge[0], edge[1], geometry.vertices.length - 1))
  })
  geometry.verticesNeedUpdate = true;
  geometry.elementsNeedUpdate = true;
  
  geometry.computeBoundingSphere();
  var oldGeom = geometry
  geometry = new THREE.Geometry()
  geometry.faces = oldGeom.faces
  geometry.vertices = oldGeom.vertices
  scene.remove(mesh)
  mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)

}

document.body.addEventListener('click', grow)

boilerplate.render(function() {

})