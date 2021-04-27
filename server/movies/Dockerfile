FROM node:latest

WORKDIR src/src/entertainme/server/movies

COPY package*.json ./

RUN npm install

COPY ./ ./

EXPOSE 4001

CMD ["npm", "run", "dev"]