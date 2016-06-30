require('@msfeldstein/zero-margin')
var drawingCanvas = document.createElement('canvas')
drawingCanvas.width = window.innerWidth
drawingCanvas.height = window.innerHeight

var outputCanvas = document.createElement('canvas')
outputCanvas.width = window.innerWidth
outputCanvas.height = window.innerHeight
document.body.appendChild(outputCanvas)

var ctx = drawingCanvas.getContext('2d')
ctx.fillStyle = 'black'
ctx.fillRect(0, 0, drawingCanvas.width, drawingCanvas.height)
ctx.fillStyle='white'
ctx.strokeStyle = 'white'
var mouseDown = false
var lastPos = {}

window.addEventListener('mousedown', (e) => {
  mouseDown = true
  ctx.beginPath()
  ctx.moveTo(e.clientX, e.clientY)
  lastPos = {x: e.clientX, y: e.clientY}
})

window.addEventListener('mousemove', (e) => {
  if (mouseDown) {
    ctx.strokeStyle = 'white'
    ctx.lineTo(e.clientX, e.clientY)
    lastPos = {x: e.clientX, y: e.clientY}
    ctx.stroke()
    update()
  }
})

window.addEventListener('mouseup', (e) => {
  mouseDown = false
})

function at(pixels, x, y) {
  var i = (y * drawingCanvas.width + x) * 4
  return pixels[i]
}
function update() {
  var pixels = ctx.getImageData(0, 0, drawingCanvas.width, drawingCanvas.height).data
  var outCtx = outputCanvas.getContext('2d')
  outCtx.fillStyle = 'black'
  outCtx.fillRect(0, 0, drawingCanvas.width, drawingCanvas.height)
  for (var x = 0; x < drawingCanvas.width; x++) {
    for (var y = 0; y < drawingCanvas.height; y++) {
      var val = at(pixels, x, y)
      if (val > 100) {
        outCtx.fillStyle = 'white'
        outCtx.fillRect(x, y, 1, 1)
        var above = at(pixels, x, y - 1)
        var lineCol = Math.floor(above * 255)
        var stroke = `rgba(${lineCol}, ${lineCol}, ${lineCol}, 255.0)`
        outCtx.strokeStyle = stroke
        outCtx.beginPath()
        outCtx.moveTo(x, y+1)
        outCtx.lineTo(x, drawingCanvas.height)
        outCtx.stroke()
        outCtx.closePath()
      }
    }
  }
}
document.body.appendChild(drawingCanvas)
update()
