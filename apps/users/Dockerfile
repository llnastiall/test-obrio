FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

WORKDIR /app/apps/users
RUN npm run build

CMD ["node", "/app/dist/apps/users/src/main.js"]
