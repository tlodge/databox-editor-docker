#!/bin/sh
docker stop registry
docker rm registry
docker run -d -p 5000:5000 --restart=always --name registry registry:2
docker tag amar.io:5000/databox-arbiter registry.upintheclouds.org/databox-arbiter
docker push registry.upintheclouds.org/databox-arbiter
docker tag databox/red registry.upintheclouds.org/databox/red
docker push registry.upintheclouds.org/databox/red
docker tag databox-store-passthrough registry.upintheclouds.org/databox-store-passthrough
docker push registry.upintheclouds.org/databox-store-passthrough
docker tag databox-driver-mobile registry.upintheclouds.org/databox-driver-mobile
docker push registry.upintheclouds.org/databox-driver-mobile
