var fit = require('canvas-fit')
var loop = require('raf-loop')
var randInt = require('random-int')

var canvas = document.createElement('canvas')
document.body.appendChild(canvas)
window.addEventListener('resize', fit(canvas), false)
var ctx = canvas.getContext('2d')

var t = 0
var GRID_SIZE = 10
document.body.addEventListener('click', function() {
  GRID_SIZE += 10
})

var mouseX = 0, mouseY = 0, mouseDown = false
canvas.addEventListener('mousemove', function(e) {
  mouseX = e.x
  mouseY = e.y
})

canvas.addEventListener('mousedown', function() {
  mouseDown = true
})
canvas.addEventListener('mouseup', function() {
  mouseDown = false
})

var Runner = function(initialX, initialY) {
  this.x = initialX
  this.y = initialY
  this.vx = randInt(0, 1)
  this.vy = 1 - this.vx
}

Runner.prototype.step = function() {
  this.x += this.vx
  this.y += this.vy
  
  
  if (this.x % GRID_SIZE == 0 && this.vx != 0) {
    var newVY = randInt(-1, 1)
    if (this.vy != -1 * newVY) {
      this.vy = newVY
      if (this.vy != 0) this.vx = this.vy
    }
  }
  
  if (this.y % GRID_SIZE == 0 && this.vy != 0) {
    var newVX = randInt(-1, 1)
    if (this.vx != -1 * newVX) {
      this.vx = newVX
      if (this.vx != 0) this.vy = this.vx
    }
  }
  
  return this
}

Runner.prototype.draw = function(ctx) {
  var dx = this.x - mouseX
  var dy = this.y - mouseY
  
  if (mouseDown) ctx.globalAlpha = Math.max(0.2, Math.min(1.0, 1.3 - Math.sqrt(dx * dx + dy * dy) / 300))
  ctx.fillRect(this.x, this.y, 1, 1)
  return this
}
var runners = []
for (var i = 0; i < 1000; i++) {
  runners.push(new Runner(GRID_SIZE * randInt(window.innerWidth / GRID_SIZE), GRID_SIZE * randInt(window.innerHeight / GRID_SIZE)))
}

var render = function(dt) {
  ctx.fillStyle = "black"
  ctx.globalAlpha = 1
  for (var i = 0 ; i < runners.length; i++) {
    runners[i].step().draw(ctx)
  }
  ctx.fillStyle = "white"
  ctx.globalAlpha = 0.1
  ctx.fillRect(0, 0, canvas.width, canvas.height)
}


loop(render).start()