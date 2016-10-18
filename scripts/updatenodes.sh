#!/bin/sh
cd ../databox-nodered-nodes && git add . && git commit -m 'cp commit' && git push
docker rm $(docker stop $(docker ps -a -q --filter ancestor="docker_red" --format="{{.ID}}"))
docker rm $(docker stop $(docker ps -a -q --filter ancestor="databox/testred" --format="{{.ID}}"))
cd ../node-red-tester/ && ./build.sh
cd .. && docker-compose up -d
