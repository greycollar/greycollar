FROM node:22

WORKDIR /app

COPY package.json .
COPY server.js .

COPY ./dashboard/dist ./dist
COPY ./dashboard/config.js ./config.mjs

COPY ./api ./api

RUN npm install -g concurrently

EXPOSE 3000

ENTRYPOINT npm run serve
