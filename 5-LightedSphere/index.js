var fit = require('canvas-fit')
var loop = require('raf-loop')
var THREE = require('three')
var fs = require('fs')
var OrbitControls = require('three-orbit-controls')(THREE)
console.log(fs.readFileSync('./distorted.vs').toString())
document.body.style.margin = 0
document.body.style.background = "url(bg.png)"
// document.body.style.webkitFilter="blur(30px)"

var scene = new THREE.Scene()
var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );
scene.add( camera );
camera.position.z = 30

controls = new OrbitControls(camera)

var geometry = new THREE.SphereGeometry( 5, 64, 64 );
var material = new THREE.MeshLambertMaterial( {wireframe: false, color: 0xffffff} );
var sphere = new THREE.Mesh( geometry, material );
// scene.add( sphere );

var distortedGeometry = new THREE.SphereGeometry(5, 64, 64)

var phongShader = THREE.ShaderLib.phong;
var distortedMaterial = new THREE.ShaderMaterial({
  uniforms: {
		time: { type: "f", value: 1.0 },
    sizing: { type: 'f', value: 1.0}
	},
  vertexShader: fs.readFileSync('distorted.vs').toString(),
  fragmentShader: fs.readFileSync('distorted.fs').toString()
})
var distortedSphere = new THREE.Mesh(distortedGeometry, distortedMaterial)
// scene.add(distortedSphere)

var light = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( light );

var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
directionalLight.position.set( 100, 100, 0 );
scene.add( directionalLight );

directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
directionalLight.position.set( -100, 100, 0 );
// scene.add( directionalLight );

var floorGeom = new THREE.PlaneGeometry(190, 190, 30, 30)
for (var i = 0; i < floorGeom.vertices.length; i++) {
  var vtx = floorGeom.vertices[i]
  vtx.z += Math.random() * 5
}
floorGeom.computeFaceNormals()
floorGeom.computeVertexNormals()
var plane = THREE.SceneUtils.createMultiMaterialObject( floorGeom, [
    new THREE.MeshPhongMaterial({wireframe: false, side: THREE.DoubleSide, shading: THREE.FlatShading}),
    new THREE.MeshBasicMaterial( { color: 0x222222, wireframe: true, wireframeLinewidth: 1} )
]);

plane.rotation.x = Math.PI / 2
plane.position.y = -5
plane.position.z = -10
scene.add(plane)

// plane.computeFaceNormals()
var renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio(window.devicePixelRatio)
document.body.appendChild( renderer.domElement );

window.addEventListener('resize', function() {
  renderer.setSize( window.innerWidth, window.innerHeight );
})
distortedMaterial.uniforms.sizing.value = 3.2
var engine = loop(function(dt) {
  distortedMaterial.uniforms.time.value += dt / 4000
  renderer.render(scene, camera)
}).start()