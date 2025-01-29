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

EXPOSE 3000

ENTRYPOINT npm run serve  