#!/bin/sh
docker stop registry
docker rm registry
docker run -d -p 5000:5000 --restart=always --name registry registry:2

#arbiter
docker tag registry.upintheclouds.org/databox-arbiter $1/databox-arbiter
docker push $1/databox-arbiter

#directory
docker tag registry.upintheclouds.org/databox-directory $1/databox-directory
docker push $1/databox-directory

#node-red
docker tag databox/red $1/databox/red
docker push $1/databox/red

#stores
docker tag databox/databox-store-passthrough $1/databox-store-passthrough
docker push $1/databox-store-passthrough
docker tag registry.upintheclouds.org/datastore-timeseries $1/datastore-timeseries
docker push $1/datastore-timeseries
docker tag registry.upintheclouds.org/databox-store-blob $1/databox-store-blob
docker push $1/databox-store-blob

#drivers
docker tag databox/databox-driver-mobile $1/databox-driver-mobile
docker push $1/databox-driver-mobile
docker tag registry.upintheclouds.org/databox-driver-phidgets $1/databox-driver-phidgets 
docker push $1/databox-driver-phidgets
docker tag registry.upintheclouds.org/databox-driver-pipsta $1/databox-driver-pipsta
docker push $1/databox-driver-pipsta
docker tag registry.upintheclouds.org/databox-driver-twitter-stream $1/databox-driver-twitter-stream
docker push $1/databox-driver-twitter-stream
docker tag registry.upintheclouds.org/databox-os-monitor-driver $1/databox-os-monitor-driver
docker push $1/databox-os-monitor-driver
docker tag registry.upintheclouds.org/databox-driver-phillipshue $1/databox-driver-phillipshue
docker push $1/databox-driver-phillipshue


docker tag registry.upintheclouds.org/databox-notifications $1/databox-notifications
docker push $1/databox-notifications
