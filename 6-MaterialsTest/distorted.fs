varying vec2 vUv;
varying float noise;

void main() {

    // compose the colour using the UV coordinate
    // and modulate it with the noise like ambient occlusion
    vec3 color = vec3( 1.0 * ( 1. - 2. * noise ));
    gl_FragColor = vec4( color.rgb, 1.0 );

}