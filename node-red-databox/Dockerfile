FROM databox/red-databox-base 
MAINTAINER Tom Lodge <tlodge@gmail.com>
WORKDIR /data/nodes
RUN git clone https://github.com/tlodge/databox-nodered-nodes.git databox
RUN cd /data/nodes/databox && npm install
