var fs = require('fs')
var twgl = require('twgl.js')
var glslify = require('glslify')
var canvas = require('./full-screen-canvas')()
canvas.style.background = "#18212d"
var gl = twgl.getWebGLContext(canvas)
var positions = []
var cellPositions = []
var gridPositions = []

GRID_SIZE = 2
CELL_SIZE = 560
MARGIN = 80
NUM_PARTICLES = GRID_SIZE * GRID_SIZE * CELL_SIZE * CELL_SIZE
var fullWidth = (CELL_SIZE + MARGIN) * GRID_SIZE - MARGIN
var halfWidth = fullWidth / 2
for (var row = 0; row < GRID_SIZE; row++) {
    for (var col = 0; col < GRID_SIZE; col++) {
        var left = -halfWidth + row * (CELL_SIZE + MARGIN)
        var top = -halfWidth + col * (CELL_SIZE + MARGIN)
        for (var x = 0; x < CELL_SIZE; x += 1) {
            for (var y = 0; y < CELL_SIZE; y += 1) {
                positions.push(left + x, top + y, 0)
                cellPositions.push(x, y, 0)
                gridPositions.push(row, col, 0)
            }
        }
    }
}
console.log(gridPositions)

var arrays = {
    position: positions,
    cellPosition: cellPositions,
    gridPosition: gridPositions
}
var programInfo = twgl.createProgramInfo(gl, [
    glslify(__dirname + '/vertex.vs'),
    glslify(__dirname + '/fragment.fs')
]);
var bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays)

function render(time) {
    var uniforms = {
        TIME: time * 0.0001,
        numParticles: NUM_PARTICLES,
        resolution: [gl.canvas.width, gl.canvas.height],
        cellSize: CELL_SIZE,
        gridSize: GRID_SIZE
    };
    requestAnimationFrame(render)
    twgl.resizeCanvasToDisplaySize(gl.canvas)
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
    gl.useProgram(programInfo.program)
    gl.enable(gl.BLEND)
    gl.blendEquation(gl.FUNC_ADD)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo)
    twgl.setUniforms(programInfo, uniforms);
    twgl.drawBufferInfo(gl, gl.POINTS, bufferInfo)
}

requestAnimationFrame(render)
