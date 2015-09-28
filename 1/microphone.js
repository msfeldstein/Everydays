var AudioMeter = require('./audio-meter')

navigator.getUserMedia = ( navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
var mediaStreamSource;
var meter;
var gotStream = function(stream) {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    var audioContext = new AudioContext();
    mediaStreamSource = audioContext.createMediaStreamSource( stream );
    meter = AudioMeter(audioContext)
    mediaStreamSource.connect(meter)
}

var didntGetStream = function(e) {
  console.log("Error calling getUserMedia", e)
}

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
navigator.getUserMedia( {audio:true}, gotStream, didntGetStream );
