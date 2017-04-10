#!/usr/bin/env bash

# Clean up previous distributions
rm -rf dist
rm -rf build

# Variables
NGC="node_modules/.bin/ngc"
ROLLUP="node_modules/.bin/rollup"

# Build ES2015 Module
$NGC -p src/tsconfig-build.json
cp -R ./build ./dist/
find ./dist -type f -name "*.js" -delete
$ROLLUP build/index.js -o dist/index.js

# Build ES5 Module
rm -rf build
$NGC -p src/tsconfig-build-es5.json
$ROLLUP build/index.js -o dist/index.es5.js

# Copy package.json
cp src/package.json dist/package.json
