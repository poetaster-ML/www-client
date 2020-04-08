FROM node:10.16.3-jessie

ARG ENV

WORKDIR /app/

ADD public public
ADD src src
ADD tests tests

ADD package.json .
ADD yarn.lock .

ADD vue.config.js .
ADD cypress.json .

RUN yarn install
