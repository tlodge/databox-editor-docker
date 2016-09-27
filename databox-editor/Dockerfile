FROM ubuntu:16.04
MAINTAINER Tom Lodge <tlodge@gmail.com>

RUN apt-get update
RUN apt-get install -y git
RUN apt-get install -y nodejs
RUN apt-get install -y npm
RUN ln -s /usr/bin/nodejs /usr/bin/node
RUN cd /root && git clone https://github.com/me-box/iot.red.git 
RUN cd /root/iot.red/red-server && npm install
COPY conf/config.server.js /root/iot.red/red-server/config.js
RUN cd /root/iot.red/node-red-react-editor && npm install
COPY conf/config.client.js /root/iot.red/node-red-react-editor/js/config.js
#RUN cd /root/iot.red/node-red-react-editor && npm run build
COPY start.sh /root
RUN chmod +x /root/start.sh
RUN chmod +x /root/iot.red/node-red-react-editor/prodbuild.sh
