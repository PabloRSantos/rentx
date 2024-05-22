FROM node:14

WORKDIR /usr/app

COPY package.json ./

RUN npm install 

COPY ./dist ./dist

EXPOSE 3333

CMD ["node", "./dist/shared/server.js"]