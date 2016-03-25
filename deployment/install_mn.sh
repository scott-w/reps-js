#!/usr/bin/env bash

git clone https://github.com/marionettejs/backbone.marionette.git ../mn
cd ../mn
git fetch origin next/next
git checkout next
npm i --no-progress
gulp build
cd ../reps-js
npm i ../mn --no-progress
