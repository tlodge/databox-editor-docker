#!/bin/sh
/usr/bin/mongod --dbpath /data/mongo &
cd /root/db-app-server && PORT=8091 npm start
