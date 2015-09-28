module.exports = function(numBuffers, width, height) {
  var buffer = [];
  for (var i = 0; i < numBuffers; ++i) {
    var canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    buffer.push(canvas);
  }
  buffer.currentIndex = 0
  buffer.next = function() {
    var canvas = this[this.currentIndex];
    this.currentIndex++;
    if (this.currentIndex >= this.length) {
      this.currentIndex = 0;
    }
    return canvas;
  }

  buffer.at = function(i) {
    var realI = (this.currentIndex + i) % this.length;
    return this[realI];
  }
  return buffer;
}
