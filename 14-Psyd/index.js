var Touches = require('touches')
var THREE = require('THREE')



var canvas = document.createElement('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
document.body.appendChild(canvas)
document.body.style.margin = 0

var ctx = canvas.getContext('2d')
ctx.fillRect(0,0,innerWidth, innerHeight)
ctx.globalCompositeOperation = 'lighten'
var touch = Touches(null, {type: 'mouse'})

var image = new Image()
image.src = './frog.jpg'
document.body.appendChild(image)

var lastX, lastY
touch.on('start', function(e, position) {
  lastX = position[0]
  lastY = position[1]
})

touch.on('move', function(e, position) {
  var dx = position[0] - lastX
  var dy = position[1] - lastY

  let r = dx + 127
  let g = dy + 127
  let fillStyle = `rgb(${r}, ${g}, 10)`
  ctx.fillStyle = fillStyle
  ctx.beginPath()
  ctx.arc(position[0], position[1], 30, 0, 2 * Math.PI)
  ctx.fill()

  lastX = position[0]
  lastY = position[1]
})

var renderer = new THREE.WebGLRenderer({antialias: true})
var scene = new THREE.Scene
renderer.setSize(innerWidth, innerHeight)
document.body.appendChild(renderer.domElement)
