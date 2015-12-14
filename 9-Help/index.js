var Template = require('@msfeldstein/threejs-template')
var fs = require('fs')
var GUI = require('dat-gui').GUI
console.log(GUI)
boilerplate = new Template()
var THREE = boilerplate.THREE
var scene = boilerplate.scene
var EffectComposer = boilerplate.EffectComposer

var plane;
var shake = 1;
var params = {
  shake: 0.2
}
boilerplate.renderer.setClearColor(0xffffff, 0);
document.body.style.background=  "-webkit-radial-gradient(circle, rgb(89,89,89), rgb(25,39,64))"
var width = window.innerWidth
var height = window.innerHeight
var camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 0.1, 1000 );
boilerplate.camera = camera
camera.position.z = 100
camera.lookAt(new THREE.Vector3(0,0,0))
// var gui = new GUI()
// gui.add(params, "shake", 0, 1)

var fragmentShader = fs.readFileSync('./noise-shader.fs').toString()
var vertexShader = fs.readFileSync('./vertex-shader.vs').toString()

var shaderMaterial = new THREE.ShaderMaterial({
  uniforms: {
    TIME: {type: "f", value: 1.0},
    RENDERSIZE: {type: "v2", value: new THREE.Vector2()}
  },
  fragmentShader: fragmentShader,
  vertexShader: vertexShader,
  depthTest: false
})

var shaderPlaneGeom = new THREE.PlaneGeometry(width, height)
var shaderPlane = new THREE.Mesh(shaderPlaneGeom, shaderMaterial)
scene.add(shaderPlane)



var loader = new THREE.TextureLoader()
loader.load("help-white.png", function(texture) {
  var s = width / 20
  var planeGeom = new THREE.PlaneGeometry(s,s )
  
  var material = new THREE.MeshBasicMaterial({map: texture, depthTest: false, transparent: true})
  plane = new THREE.Mesh(planeGeom, material)
  scene.add(plane)
  
})

boilerplate.render(function(t) {
  shaderMaterial.uniforms.TIME.value = t / 1000.0
  if (plane) {
    var amount = params.shake * 2 - params.shake
    var x = (Math.random() * 2 - 1) * amount
    var y = (Math.random() * 2 - 1) * amount
    var z = (Math.random() * 2 - 1) * amount
    plane.rotation.set(x,y,z)
  }
})