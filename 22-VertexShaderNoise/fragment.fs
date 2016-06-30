
precision mediump float;
varying vec2 v_cellPos;
varying vec2 v_gridPos;
varying float v_cellSize;
varying float v_gridSize;
uniform float time;


#pragma glslify: hsv2rgb = require(glsl-hsv2rgb)

void main() {
  float s = 0.5 + 0.5 * v_gridPos.x / v_gridSize;
  float v = 0.5 + 0.5 * v_gridPos.y / v_gridSize;
  gl_FragColor = vec4(hsv2rgb(vec3(0.97, s, v)), 0.2);
}
