uniform sampler2D tDiffuse;
uniform vec2 resolution;
varying vec2 vUv;
uniform vec2 rShift;
uniform vec2 gShift;
uniform vec2 bShift;



void main(){
	float r = texture2D(tDiffuse,vUv + rShift).r;
  float g = texture2D(tDiffuse,vUv + gShift).g;
  float b = texture2D(tDiffuse,vUv + bShift).b;
  gl_FragColor = vec4(r,g,b,1.0);
}