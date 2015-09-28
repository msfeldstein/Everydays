var VideoInput = require('./video-input');
var RingBuffer = require('./ring-canvas-buffer');
var loop = require('raf-loop')
var video;
VideoInput.request(function(vid) {
  video = vid;
  document.body.appendChild(video)
})

var canvas = document.createElement('canvas')
canvas.width = 640
canvas.height = 480
document.body.appendChild(canvas)

var buffers = RingBuffer(64, 640, 480);
// for (var i = 0; i < buffers.length; i++) {
//   document.body.appendChild(buffers[i])
// }

var ctx = canvas.getContext('2d') 
var SCAN_SIZE = 1;
var scanY = 0
loop(function(dt) {
  if (!video) return
  // ctx.drawImage(video, 0, scanY, canvas.width, SCAN_SIZE, 0, scanY, canvas.width, SCAN_SIZE)
  // scanY += SCAN_SIZE

  var c = buffers.next()
  c.getContext('2d').drawImage(video, 0, 0)

  for (var y = 0; y < canvas.height; y++) {
    var scanHeight = canvas.height / buffers.length
    var i = buffers.length - 1 - Math.floor(y / scanHeight)
    var b = buffers.at(i)
    ctx.drawImage(b, 0, y, canvas.width, scanHeight, 0, y, canvas.width, scanHeight);
  }


  if (scanY > canvas.height) {
    scanY = 0
  }
}).start()
