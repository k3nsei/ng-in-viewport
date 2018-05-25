#!/usr/bin/env bash

# Clean up previous distributions
rm -rf dist
rm -rf build

# Variables
NGC="node_modules/.bin/ngc"
ROLLUP="node_modules/.bin/rollup"

# Build ES2015 UMD Module
$NGC -p src/tsconfig-build.json
cp -R ./build ./dist/
find ./dist -type f -name "*.js" -delete
$ROLLUP build/index.js -o dist/index.umd.js -f umd --name="ng-in-viewport" -g "@angular/core:ng.core,rxjs/BehaviorSubject:BehaviorSubject"

# Build ES2015 Module
$NGC -p src/tsconfig-build.json
cp -R ./build ./dist/
find ./dist -type f -name "*.js" ! -name "index.umd.js" -delete
$ROLLUP build/index.js -o dist/index.js -f es

# Build ES5 UMD Module
rm -rf build
$NGC -p src/tsconfig-build-es5.json
$ROLLUP build/index.js -o dist/index.es5.umd.js -f umd --name="ng-in-viewport" -g "@angular/core:ng.core,rxjs/BehaviorSubject:BehaviorSubject"

# Build ES5 Module
rm -rf build
$NGC -p src/tsconfig-build-es5.json
$ROLLUP build/index.js -o dist/index.es5.js -f es

# Copy package.json
cp src/package.json dist/package.json

# Copy README.md
cp README.md dist/README.md
