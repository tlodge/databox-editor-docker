FROM databox/red-databox-base 
MAINTAINER Tom Lodge <tlodge@gmail.com>
WORKDIR /root
#get the latest nodes
RUN cd /usr/lib/node_modules/node-red/nodes && git clone https://github.com/tlodge/databox-nodered-nodes.git databox
#RUN cd ./node-red/nodes && git clone https://github.com/tlodge/databox-nodered-nodes.git databox
