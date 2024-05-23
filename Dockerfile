FROM node:22-alpine

WORKDIR /docker

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start:dev"]