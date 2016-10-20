#!/bin/sh
docker stop $(docker ps | grep testred | awk "{print \$NF}")
docker rm $(docker ps -a | grep testred | awk "{print \$NF}")

