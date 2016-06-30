var THREE = require('THREE')
window.THREE = THREE
var container, scene, renderer, camera, light, cube;
var WIDTH, HEIGHT, VIEW_ANGLE, ASPECT, NEAR, FAR;
var mixer;
container = document.body

WIDTH = window.innerWidth,
HEIGHT = window.innerHeight;

VIEW_ANGLE = 45,
ASPECT = WIDTH / HEIGHT,
NEAR = 1,
FAR = 10000;

scene = new THREE.Scene();
window.scene = scene
renderer = new THREE.WebGLRenderer({antialias: true});

renderer.setSize(WIDTH, HEIGHT);
renderer.shadowMap.nabled = true;
renderer.shadowMap.oft = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
renderer.shadowMap.autoUpdate = true;

container.appendChild(renderer.domElement);

camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);

camera.position.set(60, 40, 100);
camera.lookAt(scene.position);

scene.add(camera);

light = new THREE.DirectionalLight(0xffffff);

light.position.set(0, 100, 60);
light.castShadow = true;
light.shadowCameraLeft = -60;
light.shadowCameraTop = -60;
light.shadowCameraRight = 60;
light.shadowCameraBottom = 60;
light.shadowCameraNear = 1;
light.shadowCameraFar = 1000;
light.shadowBias = -.0001
light.shadowMapWidth = light.shadowMapHeight = 1024;
light.shadowDarkness = .7;

scene.add(light);

var loader = new THREE.JSONLoader();
var animation;

// load the model and create everything
loader.load('hand1.json', function (geometry, materials) {
  var mesh, material;

  mesh = new THREE.SkinnedMesh(
    geometry,
    new THREE.MultiMaterial(materials)
  );

  scene.add(mesh);

  mixer = new THREE.AnimationMixer( mesh );


  render();
});

function render() {
  mixer.update(.01);
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}