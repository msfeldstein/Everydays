var canvas = require('./full-screen-canvas')()
var CCapture = require('ccapture.js')
var Noise = require('noisejs').Noise
var noise = new Noise(Math.random())
var ctx = canvas.getContext('2d')

GRID_SIZE = 3
CELL_SIZE = 100
MARGIN = 70
NOISE_PERIOD = 30
var fullSize = GRID_SIZE * (CELL_SIZE + MARGIN) - MARGIN

function drawCellAt(left, top, noiseLevel, time) {
	noiseLevel = 25
	noiseLevel += 3
	for (var x = left; x < left + CELL_SIZE; x+= .25) {
		for (var y = top; y < top + CELL_SIZE; y+= .25) {
			var n = Math.pow((x - left ) / CELL_SIZE, .25) * noiseLevel
			var rx = x + n / 4 *Math.abs(n * noise.simplex2(x / NOISE_PERIOD - time, y / NOISE_PERIOD))
			var ry = y + n / 4 * noise.simplex2(100 + y / 20 - time, 100 + x / NOISE_PERIOD)
			rx +=  n * noise.simplex2(100 + y / 100 - time, 100 + x/ NOISE_PERIOD)
			ry +=  n * noise.simplex2(100 + y / 100 - time, 100 + x/ NOISE_PERIOD)

			rx += n * 2 * noise.simplex2(100 + y / 200 - time, 100 + x / 200)
			ry += n * 2 * noise.simplex2(100 + y / 200 - time, 100 + x/ 200)
			ctx.fillRect(rx, ry, 1, 1)
		}
	}
}


var capturer = new CCapture( { format: 'jpg' } );
capturer.start()
var t = 0
var animate = function() {
	if (t > 3) {
		console.log("Saving")
		capturer.stop()
		capturer.save()
		return
	}
	requestAnimationFrame(animate)
	ctx.save()
	ctx.globalAlpha = 1
	ctx.globalCompositeOperation = "source-over"
	ctx.fillStyle = "#18212d"
	ctx.fillRect(0, 0, canvas.width, canvas.height)
	ctx.globalAlpha = 0.1
	ctx.globalCompositeOperation = "lighter"

	ctx.translate(canvas.width / 2 - fullSize / 2, canvas.height / 2 - fullSize / 2)
	for (var xi = 0; xi < GRID_SIZE; xi++) {
		for (var yi = 0; yi < GRID_SIZE; yi++) {
			var saturation = (0.5 + 0.5 * (xi / GRID_SIZE)) * 100
			var lightness = (0.5 + 0.4 * yi / GRID_SIZE) * 100
			var color = "hsl(0.97, "+ saturation +"%, " + lightness + "%)"
			ctx.fillStyle = color
			var x = xi * (CELL_SIZE + MARGIN)
			var y = yi * (CELL_SIZE + MARGIN)
			var xNorm = xi / GRID_SIZE
			var yNorm = yi / GRID_SIZE
			yNorm *= yNorm * yNorm * yNorm
			xNorm *= xNorm
			drawCellAt(x, y, xNorm + yNorm, t)
		}
	}
	console.log("Finished frame", t)
	t += 0.017

	capturer.capture(canvas)
	ctx.restore()
}
animate()
