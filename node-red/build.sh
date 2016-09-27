#!/bin/sh
docker build -t databox/red .
docker tag databox/red registry.upintheclouds.org/databox/red && docker push registry.upintheclouds.org/databox/red
