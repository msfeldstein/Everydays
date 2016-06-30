var THREE = require('THREE')
var loadSvg = require('load-svg')
var parsePath = require('extract-svg-path').parse
var svgMesh3d = require('svg-mesh-3d')
var createGeom = require('three-simplicial-complex')(THREE)
var OrbitControls = require('three-orbit-controls')(THREE)
var reindex = require('mesh-reindex')
var unindex = require('unindex-mesh')
window.THREE = THREE

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  devicePixelRatio: window.devicePixelRatio
})
renderer.setClearColor(0x97c2c5, 1)

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(50, 1, 0.01, 100)
camera.position.set(0, 0, 5)
const controls = new OrbitControls(camera, document.body)

renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)
document.body.style.margin = 0
loadSvg('./yinyang.svg', function (err, svg) {
  if (err) throw err

  var svgPath = parsePath(svg)
  var complex = svgMesh3d(svgPath, {
    simplify: 0.01,
    scale: 10
  })

  var geometry = new createGeom(complex)
  geometry = new THREE.LatheGeometry(geometry.vertices)
  var material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide
  })
  var mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)
  console.log(mesh)
  window.mesh = mesh

})

var animate = function() {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
}
animate()