FROM node:latest

WORKDIR src/src/entertainme/server/series

COPY package*.json ./

RUN npm install

COPY ./ ./

EXPOSE 4002

CMD ["npm", "run", "dev"]