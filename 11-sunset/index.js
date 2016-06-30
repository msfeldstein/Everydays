var fs = require('fs')
var Template = require('@msfeldstein/threejs-template')
var dat = require('dat-gui')
var Ground = require('./ground')(THREE)

var boilerplate = new Template({})
var scene = boilerplate.scene
var camera = boilerplate.camera
window.scene = scene

var vert = fs.readFileSync('./shader.vs')
var frag = fs.readFileSync('./shader.fs')

var uniforms = {
  // skySampler:	 { type: "t", value:tex },
  luminance:	 { type: "f", value:1 },
  turbidity:	 { type: "f", value:2 },
  reileigh:	 { type: "f", value:1 },
  mieCoefficient:	 { type: "f", value:0.005 },
  mieDirectionalG: { type: "f", value:0.8 },
  sunPosition: 	 { type: "v3", value: new THREE.Vector3() },
}

var skyGeo = new THREE.SphereGeometry( 450000, 32, 15 );
var skyMat = new THREE.ShaderMaterial( { vertexShader: vert, fragmentShader: frag, uniforms: uniforms, side: THREE.BackSide } );
var sky = new THREE.Mesh( skyGeo, skyMat );
// scene.add( sky );
console.log("Sky", sky)

sunSphere = new THREE.Mesh( new THREE.SphereGeometry( 20000, 30, 30 ), new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: !false }));
sunSphere.position.y = -700000;
sunSphere.visible = true;


camera.position.set(0,0,0)
sky.material.uniforms.sunPosition.value.copy(sunSphere.position);
var effectController  = {
  turbidity: 10,
  reileigh: 2,
  mieCoefficient: 0.005,
  mieDirectionalG: 0.8,
  luminance: 1,
  inclination: 0.49, // elevation / inclination
  azimuth: 0.25, // Facing front,					
  sun: !true
}

var distance = 400000;

function guiChanged() {
  uniforms.turbidity.value = effectController.turbidity;
  uniforms.reileigh.value = effectController.reileigh;
  uniforms.luminance.value = effectController.luminance;
  uniforms.mieCoefficient.value = effectController.mieCoefficient;
  uniforms.mieDirectionalG.value = effectController.mieDirectionalG;

  var theta = Math.PI * (effectController.inclination - 0.5);
  var phi = 2 * Math.PI * (effectController.azimuth - 0.5);
  sunSphere.position.x = distance * Math.cos(phi);
					sunSphere.position.y = distance * Math.sin(phi) * Math.sin(theta); 
					sunSphere.position.z = distance * Math.sin(phi) * Math.cos(theta); 

  sky.material.uniforms.sunPosition.value.copy(sunSphere.position);
}

var gui = new dat.GUI();


gui.add( effectController, "turbidity", 1.0, 20.0, 0.1 ).onChange( guiChanged );
gui.add( effectController, "reileigh", 0.0, 4, 0.001 ).onChange( guiChanged );
gui.add( effectController, "mieCoefficient", 0.0, 0.1, 0.001 ).onChange( guiChanged );
gui.add( effectController, "mieDirectionalG", 0.0, 1, 0.001 ).onChange( guiChanged );
gui.add( effectController, "luminance", 0.0, 2).onChange( guiChanged );;
gui.add( effectController, "inclination", 0, 1, 0.0001).onChange( guiChanged );
gui.add( effectController, "azimuth", 0, 1, 0.0001).onChange( guiChanged );
gui.add( effectController, "sun").onChange( guiChanged );


guiChanged()

var ground = new Ground()
scene.add(ground.mesh)
console.log("ground",ground.mesh)
camera.lookAt(ground.mesh.position)
        
boilerplate.render(function() {
  var t= Date.now() / 1000
  ground.update(t)
})