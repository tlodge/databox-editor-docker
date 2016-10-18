#!/bin/sh
echo "removing exited containers"
docker rm -v $(docker ps -a -q -f status=exited)

echo "removing dangling images"
docker rmi $(docker images -f "dangling=true" -q)

echo "removing dangling containers"
docker volume rm $(docker volume ls -qf dangling=true)

