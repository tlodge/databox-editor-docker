FROM databox/red-databox-base 
MAINTAINER Tom Lodge <tlodge@gmail.com>
#WORKDIR /root
WORKDIR /data/nodes
#get the latest nodes
#RUN cd ./node-red/nodes && git clone https://github.com/tlodge/databox-nodered-nodes.git databox
RUN git clone https://github.com/tlodge/databox-nodered-nodes.git databox
RUN cd /data/nodes/databox && npm install
