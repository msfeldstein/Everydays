var THREE = require('three')
var loop = require('raf-loop')
var fit = require('canvas-fit')
var fs = require('fs')
var OrbitControls = require('three-orbit-controls')(THREE)

var width = window.innerWidth
var height = window.innerHeight

var ITEM_SIZE = 100
document.body.style.margin = 0
var renderer = new THREE.WebGLRenderer
document.body.appendChild(renderer.domElement)
renderer.setSize(window.innerWidth, window.innerHeight)
// fit(renderer.domElement)

var scene = new THREE.Scene()

var camera =  new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 1, 1000 );
camera.position.set(0, 10, 300)
camera.lookAt(new THREE.Vector3())
controls = new OrbitControls(camera)
scene.add(camera)

sphereGeometry = new THREE.SphereGeometry(ITEM_SIZE, 32, 32)
sphereMaterial = new THREE.MeshPhongMaterial({color: 0xFFFFFF, shading: THREE.FlatShading})
sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
scene.add(sphere)

sphereGeometry = new THREE.SphereGeometry(ITEM_SIZE, 32, 32)
sphereMaterial = new THREE.MeshBasicMaterial({color: 0xFFFFFF})
sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
scene.add(sphere)
sphere.position.x += ITEM_SIZE * 2

sphereGeometry = new THREE.SphereGeometry(ITEM_SIZE, 32, 32)
sphereMaterial = new THREE.MeshLambertMaterial({color: 0xFFFFFF})
sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
sphere.position.x -= ITEM_SIZE * 2
scene.add(sphere)

cubeGeometry = new THREE.BoxGeometry(ITEM_SIZE, ITEM_SIZE, ITEM_SIZE)
material = new THREE.MeshPhongMaterial({color: 0xFFFFFF, shading: THREE.FlatShading})
cube = new THREE.Mesh(cubeGeometry, material)
cube.position.y += ITEM_SIZE * 2
scene.add(cube)

cubeGeometry = new THREE.BoxGeometry(ITEM_SIZE, ITEM_SIZE, ITEM_SIZE)
material = new THREE.MeshBasicMaterial({color: 0xFFFFFF})
cube = new THREE.Mesh(cubeGeometry, material)
cube.position.x += ITEM_SIZE * 2
cube.position.y += ITEM_SIZE * 2
scene.add(cube)

cubeGeometry = new THREE.BoxGeometry(ITEM_SIZE, ITEM_SIZE, ITEM_SIZE)
material = new THREE.MeshLambertMaterial({color: 0xFFFFFF})
cube = new THREE.Mesh(cubeGeometry, material)
cube.position.x -= ITEM_SIZE * 2
cube.position.y += ITEM_SIZE * 2
scene.add(cube)




var ambientLight = new THREE.AmbientLight( 0x404040 );
scene.add( ambientLight );

var light = new THREE.PointLight( 0xFFFFFF, 5, 800 )
light.position.set( 0, 0, 350 )
scene.add( light )

var engine = loop(function() {
  renderer.render(scene, camera)  
}).start()
