FROM mhart/alpine-node
MAINTAINER Tom Lodge <tlodge@gmail.com>

RUN apk --update add git build-base perl python
COPY buildsass.sh buildsass.sh
WORKDIR /root

#get latest node red version
RUN apk add --no-cache git python
RUN npm install -g grunt-cli
RUN git clone https://github.com/me-box/node-red.git
RUN cd ./node-red && npm install && grunt build

#get latest webapp/webserver
RUN git clone https://github.com/tlodge/node-red-app-webserver.git
RUN cd ./node-red-app-webserver/client && npm install && npm run build
RUN cd ./node-red-app-webserver/server && npm install
RUN cp ./node-red-app-webserver/client/static/app.js ./node-red-app-webserver/server/static
RUN echo 'adding start'
EXPOSE 1880
ADD start.sh /root
