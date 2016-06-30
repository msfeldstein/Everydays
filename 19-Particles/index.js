var Noise = require('noisejs').Noise
var GUI = require('dat-gui').GUI
var CCapture = require('ccapture.js')

var params = {
	margin: 200,
	noiseLevel: 3,
	noisePeriod: 20
}

// var gui = new GUI()
// gui.add(params, "margin", 0, 200)
// gui.add(params, "noiseLevel", 0, 200)
// gui.add(params, "noisePeriod", 1, 300)
// gui.remember(params)

var canvas = document.createElement('canvas')
canvas.width = window.innerWidth * 2
canvas.height = window.innerHeight * 2
canvas.style.width = window.innerWidth + "px"
canvas.style.height = window.innerHeight + "px"
canvas.style.backgroundColor = "#030303"
document.body.appendChild(canvas)
document.body.style.margin = 0

var ctx = canvas.getContext('2d')

var capturer = new CCapture( { format: 'jpg' } );
capturer.start()
var noise = new Noise(Math.random())
var t = 0
var frame = 0
var animate = function() {
	if (frame % 100 == 0) {
		capturer.save()
	}
	frame++
	requestAnimationFrame(animate)
	canvas.width = canvas.width

	ctx.globalAlpha = 0.15
	ctx.fillStyle = "white"
	var m = params.margin
	// var r = 6
	for (var y = m; y < canvas.height - m; y += 2) {
		for (var x = m; x < canvas.width - m; x += .25) {
			var level = params.noiseLevel * Math.max(1, (x - 30) / canvas.width)  * Math.max(1, (y - 30 / canvas.height)) / 20
			var xFactor = Math.max(1, (x - (canvas.width - m * 1.8) + t * 500) / 100)
			level *= xFactor
			var rx = x + noise.simplex2(x,y) * level / 20 * xFactor
			rx += Math.random() * xFactor
			var ry = y
			ry += noise.simplex3(t * -3 + Math.sqrt(x / (params.noisePeriod), 2), y / params.noisePeriod * 0.3, t) * level
			ry += noise.simplex3(t * -3 + Math.sqrt(x / (params.noisePeriod / 5), 2), y / params.noisePeriod / 5 , t) * level
			// ry += Math.random() * r
			ctx.fillRect(rx, ry, 1,1)
		}
	}
	t += 0.005
	capturer.capture(canvas)
}
animate()
