FROM mhart/alpine-node
MAINTAINER Tom Lodge <tlodge@gmail.com>

RUN apk --update add git
# build-base perl python
#COPY buildsass.sh buildsass.sh
#WORKDIR /root

#get latest node red version
#RUN apk add --no-cache git python
#RUN npm install -g grunt-cli
#RUN echo "cloning"
#RUN git clone https://github.com/me-box/node-red.git
#RUN cd ./node-red && npm install && grunt build
RUN npm i -g node-red node-ipc
COPY settings.js /usr/lib/node_modules/node-red/
