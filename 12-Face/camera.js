module.exports = {
  request: function(callback, error) {
    navigator.getUserMedia  = navigator.getUserMedia ||
                              navigator.webkitGetUserMedia ||
                              navigator.mozGetUserMedia ||
                              navigator.msGetUserMedia;
    var video = document.createElement('video')
    video.autoplay = true
    var success = function(stream) {
      video.src = window.URL.createObjectURL(stream)
      callback(video)
    }
    var failure = function(e) {
      console.log("Failure getting video", e)
      if (error) {
        error(e)
      }
    }
    navigator.getUserMedia({video: true}, success, failure)
  }
}
