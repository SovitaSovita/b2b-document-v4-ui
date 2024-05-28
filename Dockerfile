FROM node:18-alpine as builder

WORKDIR /app

COPY package*.json ./

RUN npm -f install

COPY . .

RUN npm run build

EXPOSE 3200

CMD ["npm", "start"]
