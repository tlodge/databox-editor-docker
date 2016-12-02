#!/bin/sh
docker build --no-cache -t databox/testred .
docker tag databox/testred registry.iotdatabox.com/databox/testred && docker push registry.iotdatabox.com/databox/testred
