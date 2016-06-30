module.exports = function() {
	var canvas = document.createElement('canvas')
	document.body.style.margin = 0
	function resize() {
		canvas.width = window.innerWidth * window.devicePixelRatio
		canvas.height = window.innerHeight * window.devicePixelRatio
		canvas.style.width = window.innerWidth + "px"
		canvas.style.height = window.innerHeight + "px"
	}
	document.body.appendChild(canvas)
	window.addEventListener('resize', resize)
	resize()
	return canvas
}
