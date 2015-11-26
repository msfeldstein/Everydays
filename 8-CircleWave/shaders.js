module.exports = function(THREE) {
  THREE.DotScreenShader = {
    uniforms: {
      "tDiffuse": { type: "t", value: null },
      "tSize":    { type: "v2", value: new THREE.Vector2( 256, 256 ) },
      "center":   { type: "v2", value: new THREE.Vector2( 0.5, 0.5 ) },
      "angle":    { type: "f", value: 1.57 },
      "scale":    { type: "f", value: 1.0 }
    },
    vertexShader: [
      "varying vec2 vUv;",
      "void main() {",
        "vUv = uv;",
        "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
      "}"
    ].join("\n"),
    fragmentShader: [
      "uniform vec2 center;",
      "uniform float angle;",
      "uniform float scale;",
      "uniform vec2 tSize;",
      "uniform sampler2D tDiffuse;",
      "varying vec2 vUv;",
      "float pattern() {",
        "float s = sin( angle ), c = cos( angle );",
        "vec2 tex = vUv * tSize - center;",
        "vec2 point = vec2( c * tex.x - s * tex.y, s * tex.x + c * tex.y ) * scale;",
        "return ( sin( point.x ) * sin( point.y ) ) * 4.0;",
      "}",
      "void main() {",
        "vec4 color = texture2D( tDiffuse, vUv );",
        "float average = ( color.r + color.g + color.b ) / 3.0;",
        "gl_FragColor = vec4( vec3( average * 10.0 - 5.0 + pattern() ), color.a );",
      "}"
    ].join("\n")
  };

  THREE.RGBShiftShader = {
    uniforms: {
      "tDiffuse": { type: "t", value: null },
      "amount":   { type: "f", value: 0.005 },
      "angle":    { type: "f", value: 0.0 }
    },
    vertexShader: [
      "varying vec2 vUv;",
      "void main() {",
        "vUv = uv;",
        "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
      "}"
    ].join("\n"),
    fragmentShader: [
      "uniform sampler2D tDiffuse;",
      "uniform float amount;",
      "uniform float angle;",
      "varying vec2 vUv;",
      "void main() {",
        "vec2 offset = amount * vec2( cos(angle), sin(angle));",
        "vec4 cr = texture2D(tDiffuse, vUv + offset);",
        "vec4 cga = texture2D(tDiffuse, vUv);",
        "vec4 cb = texture2D(tDiffuse, vUv - offset);",
        "gl_FragColor = vec4(cr.r, cga.g, cb.b, cga.a);",
      "}"
    ].join("\n")
  };
  
  THREE.ZoomBlurShader = {
    uniforms: {
      tDiffuse: { type: "t", value: null},
      center: { type: "v2", value: new THREE.Vector2(0,0)},
      strength: {type: "f", value: 0},
      resolution: { type: "v2", value: new THREE.Vector2(256, 256)}
    },
    
    vertexShader: [
      "varying vec2 vUv;",
      "void main() {",
        "vUv = uv;",
        "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
      "}"
    ].join("\n"),
    
    fragmentShader: 
      "uniform sampler2D tDiffuse;\n" +
      "uniform vec2 center;\n" +
      "uniform float strength;\n" +
      "uniform vec2 resolution;\n" +
      "varying vec2 vUv;\n" +
      "\n" +
      "float random(vec3 scale,float seed){return fract(sin(dot(gl_FragCoord.xyz+seed,scale))*43758.5453+seed);}\n" +
      "\n" +
      "void main(){\n" +
      	"vec4 color=vec4(0.0);\n" +
      	"float total=0.0;\n" +
      	"vec2 toCenter=center-vUv*resolution;\n" +
      	"float offset=random(vec3(12.9898,78.233,151.7182),0.0);\n" +
      	"for(float t=0.0;t<=40.0;t++){\n" +
      		"float percent=(t+offset)/40.0;\n" +
      		"float weight=4.0*(percent-percent*percent);\n" +
      		"vec4 sample=texture2D(tDiffuse,vUv+toCenter*percent*strength/resolution);\n" +
      		"sample.rgb*=sample.a;\n" +
      		"color+=sample*weight;\n" +
      		"total+=weight;\n" +
      	"}\n" +
      	"gl_FragColor=color/total;\n" +
      	"gl_FragColor.rgb/=gl_FragColor.a+0.00001;\n" +
      "}\n"
  }
}