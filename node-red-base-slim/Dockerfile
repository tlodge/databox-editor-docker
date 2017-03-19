FROM node:6-alpine

RUN apk --update add git 
# Home directory for Node-RED application source code.
RUN mkdir -p /usr/src/node-red

# User data directory, contains flows, config and nodes.
RUN mkdir /data
RUN mkdir /data/nodes

WORKDIR /usr/src/node-red

# Add node-red user so we aren't running as root.
#RUN adduser -h /usr/src/node-red -D -H node-red \
#    && chown -R node-red:node-red /data \
#    && chown -R node-red:node-red /usr/src/node-red

#USER node-red

# package.json contains Node-RED NPM module and node dependencies
COPY conf/package.json /usr/src/node-red/
RUN npm install
COPY conf/settings.js /data
#CMD ["npm", "start", "--", "--userDir", "/data"]