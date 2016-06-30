var AudioPlayer = require('web-audio-player')
var createAnalyser = require('web-audio-analyser')
var createAudioContext = require('ios-safe-audio-context')
var detectAutoplay = require('detect-audio-autoplay')
var detectMediaSource = require('detect-media-element-source')
var average = require('analyser-frequency-average')
var once = require('once')

var SoundcloudAudioPlayer = function(soundcloudURL) {
window.player = this
}

SoundcloudAudioPlayer.prototype.loadSoundcloudURL = function(soundcloudURL) {
  var xhr = new XMLHttpRequest()
  xhr.open('GET', soundcloudURL, 1)
  console.log("URL", soundcloudURL)
  xhr.onreadystatechange = function() {
    console.log("Ready state ", xhr.readyState, xr)
    if (xhr.readyState == 4) {
      var json = JSON.parse(xhr.responseText)
      console.log(json)
      this.loadRawURL(json.location)
    }
  }
  xhr.send()
}

SoundcloudAudioPlayer.prototype.loadRawURL = function(url) {
  this.url = url
  this.audioContext = createAudioContext()
  console.log("Detecting...")
   // Detect whether createMediaElementSource() works
   // as expected. You can also use userAgent sniffing here.
   detectMediaSource(function (supportsMediaElement) {
     // No media element support -> we should buffer
     console.log("Detected", supportsMediaElement)
     var shouldBuffer = !supportsMediaElement
     this.start(shouldBuffer)
   }.bind(this))
}

SoundcloudAudioPlayer.prototype.start = function(shouldBuffer) {
  this.player = AudioPlayer(this.url, {
    context: this.audioContext,
    buffer: shouldBuffer, 
    loop: true,
    crossOrigin: 'Anonymous'
  })
  console.log("PLAYER CTX", this.player.context)
  this.audioUtil = createAnalyser(this.player.node, this.player.context, {stereo: false})
  this.analyzer = this.audioUtil.analyser
  this.player.on('load', function() {
    this.player.play()
  }.bind(this))
}

SoundcloudAudioPlayer.prototype.setAnalyserCallback = function(callback) {
  this.analyserCallback = callback
  this.boundUpdate = this.update.bind(this)
  this.boundUpdate()
}

SoundcloudAudioPlayer.prototype.update = function() {
  requestAnimationFrame(this.boundUpdate)
  if (!this.analyzer) return
  var freqs = this.audioUtil.frequencies()

  // find an average signal between two Hz ranges
  var minHz = 500
  var maxHz = 1000
  var avg = average(this.analyzer, freqs, minHz, maxHz)
  this.analyserCallback(avg)

}
module.exports = SoundcloudAudioPlayer