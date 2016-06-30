attribute vec3 position;
attribute vec2 cellPosition;
attribute vec2 gridPosition;
uniform float TIME;
uniform float numParticles;
uniform vec2 resolution;
uniform float gridSize;
uniform float cellSize;

varying vec2 v_cellPos;
varying vec2 v_gridPos;
varying float v_cellSize;
varying float v_gridSize;


#pragma glslify: noise = require(glsl-noise/simplex/3d)
#pragma glslify: random = require(glsl-random)

void main() {
  v_cellPos = cellPosition;
  v_gridPos = gridPosition;
  v_cellSize = cellSize;
  v_gridSize = gridSize;
  gl_PointSize = 0.5 / resolution.x;
  vec4 p = vec4(position, 1.0);
  p.x = p.x / resolution.x;
  p.y = p.y / resolution.y;
  float noiseStrength = (gridPosition.x + gridPosition.y) * 50.0;
  noiseStrength *= cellPosition.x / cellSize;
  noiseStrength += 52.0;
  float noisePeriodX = 3.0;
  float noisePeriodY = 30.0;

  float rx = p.x + abs(noiseStrength * noise(vec3(p.x * noisePeriodX - TIME * 3.0, p.y * noisePeriodY, TIME)) / resolution.x);
  float ry = p.y + noiseStrength * noise(vec3(p.x * noisePeriodX, p.y * noisePeriodY + 100.0, TIME)) / resolution.y;

  rx += noiseStrength / 2.0 * noise(vec3(p.x * noisePeriodX * 2.0 - TIME * 3.0, p.y * noisePeriodY * 2.0, TIME)) / resolution.x;
  ry += noiseStrength / 2.0 * noise(vec3(p.x * noisePeriodX * 2.0, p.y * noisePeriodY * 2.0 + 100.0, TIME)) / resolution.y;
  // float randomStrength = cellPosition.x / cellSize / resolution.x * 10.0;
  // rx += randomStrength * random(p.xy);
  // ry += randomStrength * random(p.yx);
  p.x = rx;
  p.y = ry;

  gl_Position = p;
}
