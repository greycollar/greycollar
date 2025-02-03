FROM node:22

WORKDIR /app

COPY package.json .
COPY server.js .

COPY ./dashboard/dist ./dist
COPY ./dashboard/config.js ./config.mjs

COPY ./api ./api

RUN cd api && npm rebuild sqlite3 

RUN npm install -g concurrently
RUN npm install express

EXPOSE 3000

ENTRYPOINT npm run serve
