THREE.Face3.prototype.contains = function(i) {
  return this.a == i || this.b == i || this.c == i
}

THREE.Face3.prototype.eachEdge = function(f) {
  f(this.a, this.b, this.c)
  f(this.a, this.c, this.b)
  f(this.b, this.c, this.a)
}

Math.randomRange = function(min, max) {
  return min + (max - min) * Math.random()
}