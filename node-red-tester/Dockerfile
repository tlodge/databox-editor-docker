FROM databox/red-base
MAINTAINER Tom Lodge <tlodge@gmail.com>
#RUN cd /root/node-red/nodes && git clone https://github.com/tlodge/databox-nodered-nodes.git databox 
#USER node-red
WORKDIR /data/nodes
RUN git clone https://github.com/tlodge/databox-nodered-nodes.git databox
RUN cd /data/nodes/databox && npm install
