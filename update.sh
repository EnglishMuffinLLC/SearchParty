#!/bin/bash
pm2 stop index.js
cd ./client/
npm install
node_modules/.bin/gulp build
cd ..
cd ./public-share/
npm install
cd ..
pm2 start index.js