FROM ubuntu:14.04
MAINTAINER Tom Lodge <tlodge@gmail.com>

#RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
#RUN echo "deb http://repo.mongodb.org/apt/ubuntu "$(lsb_release -sc)"/mongodb-org/3.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-3.0.list
RUN apt-get update
#RUN apt-get install -y mongodb-org
RUN apt-get install -y git
RUN apt-get install -y nodejs
RUN apt-get install -y npm
RUN ln -s /usr/bin/nodejs /usr/bin/node
RUN cd /root && git clone https://github.com/tlodge/db-app-server.git 
RUN cd /root/db-app-server && npm install
#RUN mkdir -p /data/mongo
COPY conf/config.json /root/db-app-server/config.json
COPY start.sh /root
RUN chmod +x /root/start.sh
EXPOSE 8091
#CMD ["/root/start.sh"]
