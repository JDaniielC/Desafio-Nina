FROM node:22.4.0-alpine as install-step

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

FROM node:22.4.0-alpine as build-step

WORKDIR /app
COPY --from=install-step /app/node_modules ./node_modules

COPY . .
RUN npm run build

FROM nginx:1.26-alpine

COPY --from=build-step /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
