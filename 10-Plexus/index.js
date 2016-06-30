var Template = require('@msfeldstein/threejs-template')
var SimplexNoise = require('simplex-noise')
var noise = new SimplexNoise()
var boilerplate = new Template({
  fx: true
})

var THREE = boilerplate.THREE
var scene = boilerplate.scene
var EffectComposer = boilerplate.EffectComposer
var renderer = boilerplate.renderer
renderer.setClearColor(0x000000)
window.renderer = renderer
var sphereGeom = new THREE.IcosahedronGeometry(10,3)
var particle = new THREE.SphereGeometry(0.1, 16, 16)
var material = new THREE.MeshPhongMaterial({color: 0xFF0000})
// Material
var pinkMat = new THREE.MeshPhongMaterial({
  color      :  new THREE.Color("rgb(226,35,213)"),
  emissive   :  new THREE.Color("rgb(255,128,64)"),
  specular   :  new THREE.Color("rgb(255,155,255)"),
  shininess  :  10,
  shading    :  THREE.FlatShading,
  transparent: 1,
  opacity    : 1
});
var sphereMain = new THREE.Object3D
scene.add(sphereMain)
for (var i  = 0; i < sphereGeom.vertices.length; i++) {
  var pos = sphereGeom.vertices[i]
  var sphere = new THREE.Mesh(particle, pinkMat)
  sphere.position.set(pos.x, pos.y, pos.z)
  sphereMain.add(sphere)
}

var edges = new THREE.EdgesGeometry( sphereGeom, 0x00ff00 );
var lineMesh = new THREE.Mesh(edges, pinkMat)
scene.add(lineMesh)
window.edges = edges


var L1 = new THREE.PointLight( 0xffffff, 1);
L1.position.z = 100;
L1.position.y = 100;
L1.position.x = 100;
scene.add(L1);

var L2 = new THREE.PointLight( 0xffffff, 0.8);
L2.position.z = 200;
L2.position.y = 50;
L2.position.x = -100;
scene.add(L2);


var fs = require('fs')
var zoomBlurShader = fs.readFileSync('./zoomblur.fs').toString()
var blur = boilerplate.addPostFX(zoomBlurShader)
blur.uniforms[ 'resolution' ].value.set(window.innerWidth, window.innerHeight);
blur.uniforms[ 'strength' ].value = 0.1
blur.uniforms.center.value.set(window.innerWidth / 2, window.innerHeight / 2)

var rgbShiftShader = fs.readFileSync('./rgbshift.fs').toString()
var rgb = boilerplate.addPostFX(rgbShiftShader)
rgb.uniforms.rShift.value.set(0.008, 0)
rgb.uniforms.bShift.value.set(-0.008, 0)

boilerplate.render(function(t) {
  sphereMain.rotation.y += 0.003
  sphereMain.rotation.z -= 0.001
  for (var i = 0; i < sphereMain.children.length; i++) {
    var obj = sphereMain.children[i]
    var p = obj.position
    var theta = Math.acos(p.z / Math.sqrt(p.x * p.x + p.y * p.y + p.z * p.z))
    var phi = Math.atan2(p.y, p.x)
    var r = 6 + noise.noise3D(theta, phi, t / 1000) / 2
    var x = r * Math.sin(theta) * Math.cos(phi)
    var y = r * Math.sin(theta) * Math.sin(phi)
    var z = r * Math.cos(theta)
    obj.position.set(x,y,z)
  }
})