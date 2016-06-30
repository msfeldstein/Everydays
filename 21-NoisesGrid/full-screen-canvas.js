module.exports = function() {
	var canvas = document.createElement('canvas')
	document.body.style.margin = 0
	function resize() {
		canvas.width = 1080
		canvas.height = 1920
		canvas.style.width = 1080 + "px"
		canvas.style.height = 1920 + "px"
	}
	document.body.appendChild(canvas)
	window.addEventListener('resize', resize)
	resize()
	return canvas
}
