#!/bin/bash
mkdir $1
cd $1
npm init -y
npm install --save @msfeldstein/threejs-template 
echo "var Template = require('@msfeldstein/threejs-template')" > index.js
echo "var boilerplate = new Template({})" >> index.js