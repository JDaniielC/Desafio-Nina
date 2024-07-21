FROM node:22.4.0-alpine AS install-step
WORKDIR /app

COPY package*.json ./
RUN npm install

FROM node:22.4.0-alpine AS build-step
WORKDIR /app

COPY --from=install-step /app/node_modules ./node_modules
COPY . .
RUN npm run build:prod

FROM node:22.4.0 AS serve-step
WORKDIR /app

RUN apt-get update && apt-get install -y nginx
COPY --from=build-step /app/dist /app/dist
COPY ./nginx.conf /etc/nginx/nginx.conf

CMD nginx && node dist/front/server/server.mjs
