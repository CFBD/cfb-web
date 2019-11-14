# stage-1: build dist folder
FROM node:10-alpine as build
RUN mkdir -p /home/node/app/node_modules && mkdir -p /home/node/app/dist
WORKDIR /home/node/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# stage-2: copy static files to nginx image
FROM nginx:alpine
EXPOSE 80
COPY default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /home/node/app/dist /usr/share/nginx/html
