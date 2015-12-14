var Template = require('@msfeldstein/threejs-template')
var SoundcloudPlayer = require('./soundcloud-player')

var boilerplate = new Template({
  fx: true
})
var THREE = boilerplate.THREE
var scene = boilerplate.scene
var EffectComposer = boilerplate.EffectComposer
var fs = require('fs')
var zoomBlurShader = fs.readFileSync('./zoomblur.fs').toString()

var bgColor = "#E0E4CC"
var color = "#69d2e7"

// boilerplate.renderer.setClearColor(bgColor)
var blur = boilerplate.addPostFX(zoomBlurShader)
blur.uniforms[ 'resolution' ].value.set(window.innerWidth, window.innerHeight);
blur.uniforms[ 'strength' ].value = 0

document.body.addEventListener('mousemove', function(e) {
  blur.uniforms[ 'center' ].value.set(window.innerWidth / 2, e.clientY);
  blur.uniforms[ 'strength' ].value = e.clientX / window.innerWidth / 2
})

var circles = []
for (var i = 1; i < 100; i++) {
  var r = i / 3
  var circleGeometry = new THREE.CircleGeometry(r, 128)
  circleGeometry.vertices.shift()
  var material = new THREE.LineBasicMaterial({
      color: color,
      linewidth: 0.1
  })
  var circle = new THREE.Line(circleGeometry, material)
  circle.rotation.x = 30
  // scene.add(circle)
  circles.push(circle)
}

var light = new THREE.PointLight()
light.position.x = 2
light.position.y = 10
light.position.z = 5
scene.add(light)

var ambient = new THREE.AmbientLight(0x444444)
scene.add(ambient)

var cubeGeom = new THREE.BoxGeometry(5,5,5)
var cubeMat = new THREE.MeshLambertMaterial({color: 0xff0000})
var cube = new THREE.Mesh(cubeGeom, cubeMat)
scene.add(cube)

boilerplate.render(function(t) {
  for (var i = 0; i < circles.length; i++) {
    var circle = circles[i]
    circle.position.y = Math.sin(t / 200 + i / 10)
  }
  cube.rotation.x = t / 1000
  cube.rotation.y = t / 1000 * 0.8
})

var player = new SoundcloudPlayer('https://soundcloud.com/tennysonmusic/likewhat')
// player.loadRawURL('https://api.soundcloud.com/tracks/234292033?client_id=5d6fe8e690a5c974fa265e5d62fabfcc')
player.loadRawURL('1.mp3')
player.setAnalyserCallback(function(val){
  blur.uniforms.strength.value = val / 3
  var s = 1 + val
  cube.scale.set(s,s,s)
})
