module.exports = function(THREE) {
  var Ground = function() {
    var geom = new THREE.PlaneGeometry(1000, 1000, 32, 32)
    var material = new THREE.MeshBasicMaterial({color: 0xFF0000})
    var plane = new THREE.Mesh(geom, material)
    plane.position.set(0, -1, 0)
    plane.rotation.set(2,5,2)
    this.mesh = plane
  }
  
  Ground.prototype.update = function(t) {
  }
  
  return Ground
}