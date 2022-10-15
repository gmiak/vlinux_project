FROM node:8

WORKDIR /server

COPY package*.json ./

COPY index.js ./

RUN npm install

ENTRYPOINT ["npm", "start"]