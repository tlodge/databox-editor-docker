FROM ubuntu:16.04
RUN  apt-get update && apt-get install -y redis-server
COPY redis.conf /etc/redis/redis.conf
EXPOSE 6379
ENTRYPOINT  ["/usr/bin/redis-server"]
