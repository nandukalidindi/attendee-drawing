FROM ubuntu:14.04

ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update
RUN apt-get install curl -y
RUN curl -sL https://deb.nodesource.com/setup_5.x | bash
RUN apt-get install nodejs -y

VOLUME ["/data"]

ADD . /data
RUN cd /data && npm install

EXPOSE 3000

WORKDIR /data

CMD ["npm", "start"]
