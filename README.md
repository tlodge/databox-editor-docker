##SDK editor : docker components

The SDK editor has several components that it relies on that have been dockerised.  This repo contains all of the dockerfiles required to create and run these components:

1.  redis:  used for storing express sessions state (so that server restarts result in  all users being logged out.)

2.  mongo: used for storing auth data (i.e github tokens); used in conjunction with passport.

3. databox-app-server - a databox app server - i.e. the place that databox app manifest files are saved to and read from by a databox.

4.  databox-datasource-mock - a mock data generator used when testing apps in the SDK.


To start these up, in the root src directory run:

  docker-compose up -d

There are also two docker files for creating the databox app and databox test containers:

1. node-red-base-slim - a node-red container that uses linux alpine to keep to a smaller size.   This is the base image used both for creating test containers (i.e the containers that are fired up when testing a databox app in the sdk) and published databox apps.

2. node-red-databox - this is the node-red-base-slim container plus

	* a webserver which is used for handling the ui of databox apps. 
	* the node red databox apps

