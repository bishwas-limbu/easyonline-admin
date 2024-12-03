FROM node:18-alpine

WORKDIR /app

COPY package*.json  ./


RUN npm install
COPY .env .env
COPY . .

RUN npm run build

EXPOSE 5174

CMD ["npm", "run","dev"]