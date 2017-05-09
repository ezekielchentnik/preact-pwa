FROM node:latest

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

COPY . /usr/src/app

RUN yarn && yarn build

EXPOSE 3000

CMD [ "yarn", "start" ]
