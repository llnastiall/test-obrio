FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

WORKDIR /app/apps/api
RUN npm run build

CMD ["node", "/app/dist/apps/api/src/main.js"]
