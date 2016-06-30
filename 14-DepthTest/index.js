var THREE = require('three')
var EffectComposer = require('three-effectcomposer')(THREE)
require('./VerticalBlurShader.js')(THREE)
require('./HorizontalBlurShader.js')(THREE)

var W = window.innerWidth
var H = window.innerHeight
var scene = new THREE.Scene()
var renderer = new THREE.WebGLRenderer({antialias: true})
document.body.appendChild(renderer.domElement)
renderer.setSize(W, H)
var camera = new THREE.PerspectiveCamera(45, W / H, 1, 1000)
camera.position.z = 40

var composer = new EffectComposer( renderer );
composer.addPass( new EffectComposer.RenderPass( scene, camera ) );
var hblur = new EffectComposer.ShaderPass( THREE.HorizontalBlurShader );
composer.addPass( hblur );

var vblur = new EffectComposer.ShaderPass( THREE.VerticalBlurShader );
// set this shader pass to render to screen so we can see the effects
vblur.renderToScreen = true;
composer.addPass( vblur );

var uniforms = {
  time: { type: "f", value: 1.0 },
  resolution: { type: "v2", value: new THREE.Vector2() }
}
var vertexShader = require('./vert.js')
var fragmentShader = require('./frag.js')

var g = new THREE.PlaneGeometry(70, 70)
var m = new THREE.ShaderMaterial({
  uniforms: uniforms,
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  side: THREE.DoubleSide
})
var cube = new THREE.Mesh(g, m)
cube.rotation.x = Math.PI / 2
cube.position.y =  - 5
scene.add(cube)
console.log(cube)

const animate = () => {
  requestAnimationFrame(animate)
  composer.render()
}
animate()
