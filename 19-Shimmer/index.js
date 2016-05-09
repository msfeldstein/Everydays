document.body.style.margin = 0

window.THREE = require('three')

function createCanvas(w, h) {
  var canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  return canvas
}
var container = document.createElement('div')
container.style.width = innerWidth + "px"
container.style.height = innerHeight + "px"

var dataCanvas = createCanvas(innerWidth, innerHeight)
var outputCanvas = createCanvas(innerWidth, innerHeight)

document.body.appendChild(container)
container.appendChild(outputCanvas)


var img = new Image()
img.src = "./dragon.jpg"

var isDown = false
var gradRad = 15
var ctx = dataCanvas.getContext('2d')
var outputCtx = outputCanvas.getContext('webgl')
var lastPos = {x: -1, y: -1}
ctx.fillRect(0, 0, dataCanvas.width, dataCanvas.height)
ctx.globalCompositeOperation = "lighten"
ctx.fillStyle = 'black'

container.addEventListener('mousedown', function(e) {
  isDown = true
  lastPos.x = e.offsetX
  lastPos.y = e.clientY
})

container.addEventListener('mousemove', function(e) {
  if (!isDown) return
  var x = e.offsetX
  var y = e.offsetY
  var dx = lastPos.x - x
  var dy = lastPos.y - y
  var theta = Math.atan2(dy, dx)
  var g = Math.floor((Math.cos(theta) * 0.5 + 1.0) * 255)
  var r = Math.floor((Math.sin(theta) * 0.5 + 1.0) * 255)
  var color = "rgba(" + r + ", " + g + ", 0, 0.4)"
  // var grad = ctx.createRadialGradient(x, y, 0, x, y, gradRad)
  // grad.addColorStop(0, color)
  // grad.addColorStop(1, "rgba(0, 0, 0, 0)")
  // ctx.fillStyle = grad
  // ctx.fillRect(x - gradRad, y - gradRad, 30, 30)
  ctx.beginPath()
  ctx.moveTo(lastPos.x, lastPos.y)
  ctx.lineTo(x, y)
  ctx.strokeStyle = color
  ctx.lineWidth = 15
  ctx.stroke()
  lastPos.x = e.offsetX
  lastPos.y = e.clientY
})

container.addEventListener('mouseup', function(e) {
  isDown = false
})

var animate = function() {
  requestAnimationFrame(animate)
  outputCtx.drawImage(img, 0, 0, outputCanvas.width, outputCanvas.height)
}
animate()