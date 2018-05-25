#!/usr/bin/env bash

# Variables
NGC="$PWD/node_modules/.bin/ngc"
ROLLUP="$PWD/node_modules/.bin/rollup"
BUILD_DIR="$PWD/build"
DIST_DIR="$PWD/dist"
DOCS_DIR="$PWD/docs"

# Cleanup previous distributions
rm -rf $DIST_DIR
rm -rf $BUILD_DIR

# Build ES2015 Module
$NGC -p $PWD/src/tsconfig-build.json
cp -R $BUILD_DIR $DIST_DIR/
find $DIST_DIR -type f -name "*.js" -delete
$ROLLUP $BUILD_DIR/index.js -o $DIST_DIR/index.umd.js -f umd --name="ng-in-viewport" -g "@angular/core:ng.core,@angular/common:ng.common,rxjs/Subscription:Subscription,rxjs/Subject:Subject,rxjs/BehaviorSubject:BehaviorSubject"
$ROLLUP $BUILD_DIR/index.js -o $DIST_DIR/index.js -f es

# Build ES5 Module
rm -rf $BUILD_DIR
$NGC -p $PWD/src/tsconfig-build-es5.json
$ROLLUP $BUILD_DIR/index.js -o $DIST_DIR/index.es5.umd.js -f umd --name="ng-in-viewport" -g "@angular/core:ng.core,@angular/common:ng.common,rxjs/Subscription:Subscription,rxjs/Subject:Subject,rxjs/BehaviorSubject:BehaviorSubject"
$ROLLUP $BUILD_DIR/index.js -o $DIST_DIR/index.es5.js -f es

# Generate Documentation
bash $PWD/gen-docs.sh
cp -R $DOCS_DIR $DIST_DIR/docs/

# Copy package.json
cp $PWD/src/package.json $DIST_DIR/package.json

# Copy README.md
cp $PWD/README.md $DIST_DIR/README.md

# Copy LICENSE
cp $PWD/LICENSE $DIST_DIR/LICENSE

# Cleanup after build
rm -rf $BUILD_DIR
