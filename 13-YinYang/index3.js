var THREE = require('THREE')
var SVGLoader = require('./SVGLoader')(THREE)
var OrbitControls = require('three-orbit-controls')(THREE)
var parser = require('svg-path-parser')
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

var animate = function() {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
}
animate()

const loader = new SVGLoader()
loader.load('./yinyang.svg', function(svg) {
  var path = svg.querySelector('path').getAttribute('d')
  var instructions = parser(path)
  console.log(instructions)
  var shape = new THREE.Shape()
  for (let instruction of instructions) {
    runInstructionOnShape(instruction, shape)
  }
  var geom = new THREE.ShapeGeometry(shape)
  geom.mergeVertices()
  var mesh = new THREE.Mesh(geom, new THREE.MeshBasicMaterial({
    side: THREE.DoubleSide
  }))
})

function runInstructionOnShape(i, shape) {
  console.log(i.command, i.x, i.y)
  switch (i.command) {
    case "moveto": 
      shape.moveTo(i.x, i.y)
      break
    case "curveto":
      shape.bezierCurveTo(i.x1, i.y1, i.x2, i.y2, i.x, i.y)
      break
  }
}