FROM databox/red-base 
MAINTAINER Tom Lodge <tlodge@gmail.com>
WORKDIR /root

#get latest webapp/webserver
RUN git clone https://github.com/tlodge/node-red-app-webserver.git
#don't compile the client code again (as this requires native build)
#RUN cd ./node-red-app-webserver/client && npm install && npm run build - instead we serve pre-built js
RUN cd ./node-red-app-webserver/server && npm install
ADD start.sh /root
