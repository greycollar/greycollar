FROM node:18

WORKDIR /app

COPY index.js .

COPY ./dashboard/dist ./dist
COPY ./dashboard/config.js ./config.mjs

COPY ./api ./api

RUN cd api && npm rebuild sqlite3 

COPY package.json .

RUN npm install concurrently
RUN npm install nodemon

ENV PG=postgresql://nucadmin:uqY32!4jF%3BU%26@postgres.nucleoid.com:5432/land

EXPOSE 3000

ENTRYPOINT npm run serve  