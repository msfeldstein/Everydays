/*{
  "NAME": "Plain",
  "KEY": "Plain",
  "CREDIT": "by Eyegroove",
  "INPUTS": [
    {
      "NAME": "inputImageTexture",
      "TYPE": "image"
    }
  ]
}*/

void main() {
  gl_FragColor = vec4(1.0, 1.0, 1.0, 2.0) - texture2D(inputImageTexture,vv_FragNormCoord);
}
