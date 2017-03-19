#!/bin/sh
docker rmi -f $(docker images | grep "registry\." |  awk '{print $3}')
docker rmi -f $(docker images | grep "upintheclouds\." |  awk '{print $3}')
