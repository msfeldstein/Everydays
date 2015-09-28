window.THREE = require('three')
var loop = require('raf-loop')
var EffectComposer = require('three-effectcomposer')(THREE)
var RGBShader = require('./shaders/RGBShiftShader')
var mic = require('./microphone')

require('./no-margins')

renderer = new THREE.WebGLRenderer({antialias:  true})
renderer.setPixelRatio(window.devicePixelRatio)
document.body.appendChild(renderer.domElement)

scene = new THREE.Scene()
scene.fog = new THREE.Fog(0xffffff, 0, 200);
scene.fog.color.setHSL( 0.51, 0.6, 0);

camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 3000)

geometry = new THREE.Geometry()
var y = - 50
var r = 0
for (var theta = 0; theta < 600 * Math.PI; theta += 0.1) {
  var vtx = new THREE.Vector3()
  vtx.x = Math.cos(theta) * 30 * r
  vtx.y = y
  vtx.z = Math.sin(theta) * 30 * r
  geometry.vertices.push(vtx)
  y += 0.01
  r += 0.001
}

material = new THREE.PointsMaterial({size: 1, transparent: true, depthTest: false})
material.map = THREE.ImageUtils.loadTexture('./dot.png')
material.map.minFilter = THREE.LinearFilter
material.map.transparent = true
particles = new THREE.Points(geometry, material)
scene.add(particles)

composer = new EffectComposer(renderer)
composer.addPass(new EffectComposer.RenderPass(scene, camera))

var rgb = new EffectComposer.ShaderPass(RGBShader)
rgb.uniforms.amount.value = 0.001
rgb.renderToScreen = true
composer.addPass(rgb)

resize = function() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener("resize", resize)

resize()
var t = 0
loop(function(dt) {
  t += dt
  camera.position.z = Math.sin(t / 2500) * 50
  camera.position.x = Math.cos(t / 2500) * 50
  camera.lookAt(scene.position)
  composer.render()
}).start()

if (navigator.getUserMedia) {
    navigator.getUserMedia({audio: true}, function (e) {
        // what goes here?
    }, function (e) {
        alert('Error capturing audio.');
    });
} else {
    alert('getUserMedia not supported in this browser.');
}
