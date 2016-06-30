var clm = require('./clmtrackr.js')
var model = require('./facemodel.js')
var VideoInput = require('./camera.js')
var video, canvas, tracker;
VideoInput.request(function(vid) {
  video = vid;
  document.body.appendChild(video)
  video.addEventListener('canplay', function() {
    canvas = document.createElement('canvas')
    document.body.appendChild(canvas)
    canvas.width = 720
    canvas.height = 1280
    console.log(video.videoWidth)
    tracker = new clm.tracker()
    tracker.init(model)
    tracker.start(video)
    animate()

  })
  


})




var animate = function() {
  requestAnimationFrame(animate)
  var ctx = canvas.getContext('2d')
  if (video) ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight)
  tracker.draw(canvas)
}

