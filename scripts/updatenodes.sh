#!/bin/sh
ROOT=/home/databox
cd $ROOT/databox-nodered-nodes && git add . && git commit -m 'cp commit' && git push
docker rm $(docker stop $(docker ps -a -q --filter ancestor="docker_red" --format="{{.ID}}"))
docker rm $(docker stop $(docker ps -a -q --filter ancestor="databox/testred" --format="{{.ID}}"))
cd $ROOT/docker/node-red-tester/ && ./build.sh
cd $ROOT/docker && docker-compose up -d
