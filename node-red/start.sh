#!/bin/sh
cd /root/node-red-app-webserver/server
npm start &
cd /root/node-red
grunt nodemon
