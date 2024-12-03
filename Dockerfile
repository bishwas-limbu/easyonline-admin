FROM node:18-alpine

WORKDIR /app

COPY package*.json  ./

RUN npm install

COPY .env .env

COPY . .

EXPOSE 5714

CMD ["npm","run","dev"]