#!/bin/sh

if [ "$#" -ne 2 ]; then
    echo "./restartregistry fromregistry toregistry"
    echo "e.g: ./restartregistry registry.iotdatabox.com registry.upintheclouds.org"
    exit 1
fi

echo "waiting 10 secs before I do anything incase you want to cancel this"
sleep 10
echo "ok, you asked for it"

docker stop registry
docker rm registry
docker run -d -p 5000:5000 --restart=always --name registry registry:2

#arbiter
docker pull $1/databox-arbiter
docker tag $1/databox-arbiter $2/databox-arbiter
docker push $2/databox-arbiter

#node-red
docker pull $1/databox/red
docker tag $1/databox/red $2/databox/red
docker push $2/databox/red

#stores
docker pull $1/databox-store-blob
docker tag $1/databox-store-blob $2/databox-store-blob
docker push $2/databox-store-blob

#drivers
docker pull $1/databox-driver-twitter-stream
docker tag $1/databox-driver-twitter-stream $2/databox-driver-twitter-stream
docker push $2/databox-driver-twitter-stream

docker pull $1/databox-os-monitor-driver
docker tag $1/databox-os-monitor-driver $2/databox-os-monitor-driver
docker push $2/databox-os-monitor-driver

docker pull $1/databox-driver-phillipshue
docker tag $1/databox-driver-phillipshue $2/databox-driver-phillipshue
docker push $2/databox-driver-phillipshue
