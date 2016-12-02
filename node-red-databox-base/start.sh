#!/bin/sh
cd /root/node-red-app-webserver/server
npm start &
cd /usr/lib/node_modules/node-red && node red
