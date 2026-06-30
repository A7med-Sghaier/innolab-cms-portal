FROM node:10.24.1-buster

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 12220 1337

CMD ["npm", "start"]
