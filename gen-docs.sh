#!/usr/bin/env bash

rm -rf docs
yarn run typedoc --out ./docs/ ./src/in-viewport/in-viewport.ts
touch docs/.nojekyll
