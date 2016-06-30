var gulp = require('gulp')
var yargs = require('yargs').argv
var fs = require('fs')
var npm = require("npm")

gulp.task('generate', function() {
  var files = fs.readdirSync('.')
  var max = 0
  for (var i = 0; i < files.length; i++) {
    var file = files[i]
    if (parseInt(file) > max) max = parseInt(file)
  }
  var name = (max + 1) + "-" + yargs.n
  fs.mkdirSync(name)
  npm.load(function() {
    npm.commands.init()
    npm.commands.install('@msfeldstein/threejs-template')
  })
})