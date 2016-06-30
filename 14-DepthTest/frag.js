module.exports = `
uniform float time;
uniform vec2 resolution;

varying vec2 vUv;

void main( void ) {

	vec2 position = vUv;

	float xwhite = step(0.98, sin(vUv.x * 100.0));
	float ywhite = step(0.98, sin(vUv.y * 100.0));
	
	gl_FragColor = vec4(gl_FragCoord.z / 10.0);

}`