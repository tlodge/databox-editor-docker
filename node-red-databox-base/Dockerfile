FROM databox/red-base 
MAINTAINER Tom Lodge <tlodge@gmail.com>

WORKDIR /root

#get latest webapp/webserver
RUN echo "ok here we go"
RUN git clone https://github.com/tlodge/node-red-app-webserver.git
RUN cd ./node-red-app-webserver/client && npm install && npm run build
RUN cd ./node-red-app-webserver/server && npm install
RUN cp ./node-red-app-webserver/client/static/app.js ./node-red-app-webserver/server/static
ADD start.sh /root
