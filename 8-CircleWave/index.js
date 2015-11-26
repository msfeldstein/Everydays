var Template = require('@msfeldstein/threejs-template')

var boilerplate = new Template({
  fx: true
})
var THREE = boilerplate.THREE
var scene = boilerplate.scene
var EffectComposer = boilerplate.EffectComposer
require('./shaders')(THREE)

var effect = new EffectComposer.ShaderPass( THREE.ZoomBlurShader );
effect.uniforms[ 'resolution' ].value.set(window.innerWidth, window.innerHeight);
effect.uniforms[ 'center' ].value.set(window.innerWidth / 2, window.innerHeight / 2);
effect.uniforms[ 'strength' ].value = 0.2

boilerplate.addPostFX( effect );



var bgColor = "#E0E4CC"
var color = "#69d2e7"

boilerplate.renderer.setClearColor(bgColor)

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
  scene.add(circle)
  circles.push(circle)
}

boilerplate.render(function(t) {
  for (var i = 0; i < circles.length; i++) {
    var circle = circles[i]
    circle.position.y = Math.sin(t / 200 + i / 10)
  }
})