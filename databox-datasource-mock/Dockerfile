FROM ubuntu:16.04
MAINTAINER Tom Lodge <tlodge@gmail.com>
RUN apt-get update
RUN apt-get install -y git
RUN apt-get install -y nodejs
RUN apt-get install -y npm
RUN ln -s /usr/bin/nodejs /usr/bin/node
RUN echo "loading code from git"
RUN cd /root && git clone https://github.com/me-box/databox-datasource-mock.git
RUN cd /root/databox-datasource-mock && npm install
COPY start.sh /root
EXPOSE 8080
RUN chmod +x /root/start.sh
