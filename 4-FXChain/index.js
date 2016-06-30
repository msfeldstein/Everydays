var ISF = require('interactive-shader-format')
var fs = require('fs')
var loop = require('raf-loop')
var drawingCanvas = document.createElement('canvas')
var effectCanvas = document.createElement('canvas')
drawingCanvas.width = 640
effectCanvas.width = 640
drawingCanvas.height = 480
effectCanvas.height = 480

document.body.appendChild(drawingCanvas)
document.body.appendChild(effectCanvas)

var badtvSource = fs.readFileSync('./badtv.isf').toString()
var badTV = new ISF.ISFRenderer(effectCanvas.getContext('webgl'))
badTV.loadSource(badtvSource)
badTV.setValue('distortion1', 2.0)
badTV.setValue('distortion2', 1.0)
badTV.setValue('noiseLevel', 0.3)

var rgbShift = new ISF.ISFRenderer(effectCanvas.getContext('webgl'))
rgbShift.loadSource(fs.readFileSync("chromazoom.isf").toString())
var drawCircle = function(t) {
  var c = drawingCanvas
  var ctx = c.getContext('2d')
  ctx.save()
  ctx.fillStyle = "black"
  ctx.fillRect(0,0, c.width, c.height)
  
  ctx.translate(c.width / 2, c.height / 2)
  ctx.beginPath()
  ctx.arc(0, 0, 100 + 40 * Math.sin(t / 1000) , 0, 2 * Math.PI)
  ctx.fillStyle = "white"
  ctx.fill()
  ctx.restore()
}

var applyEffect = function(t) {
  badTV.setValue('inputImage', drawingCanvas)
  // badTV.setValue('scroll', t / 2000)
  badTV.draw(effectCanvas)
  // 
  // rgbShift.setValue('inputImage', effectCanvas)
  // rgbShift.setValue('rWeight', 0.9)
  // rgbShift.draw(effectCanvas)
}

var t = 0
loop(function(dt) {
  t += dt
  drawCircle(t)
  applyEffect(t)
}).start()
