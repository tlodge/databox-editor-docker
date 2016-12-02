FROM databox/red-base 
MAINTAINER Tom Lodge <tlodge@gmail.com>

WORKDIR /root

#get latest webapp/webserver
RUN git clone https://github.com/tlodge/node-red-app-webserver.git
#don't build client app ad brings in a whole bunch of dev files, instead use latest build on git
#RUN cd ./node-red-app-webserver/client && npm install && npm run build
RUN cd ./node-red-app-webserver/server && npm install
RUN cp ./node-red-app-webserver/client/static/app.js ./node-red-app-webserver/server/static
ADD start.sh /root
