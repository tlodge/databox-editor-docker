FROM ubuntu:14.04
MAINTAINER Tom Lodge <tlodge@gmail.com>

#update packages
RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
RUN echo "deb http://repo.mongodb.org/apt/ubuntu "$(lsb_release -sc)"/mongodb-org/3.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-3.0.list
RUN apt-get update
RUN apt-get install -y mongodb-org
RUN mkdir -p /data/mongo
EXPOSE 27017
CMD ["/usr/bin/mongod", "--dbpath", "/data/mongo"]
