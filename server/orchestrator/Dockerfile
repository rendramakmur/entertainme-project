FROM node:latest

WORKDIR src/src/entertainme/server/orchestrator

COPY package*.json ./

RUN npm install

COPY ./ ./

EXPOSE 4000

CMD ["npm", "run", "dev"]