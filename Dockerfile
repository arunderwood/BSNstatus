FROM node:8

COPY package-lock.json package.json /tmp/
RUN cd /tmp && npm install
RUN mkdir -p /build && cp -a /tmp/node_modules /build
COPY . /build
WORKDIR /build
RUN npm run-script build


FROM nginx:alpine as SERVE
MAINTAINER Arunderwood
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/nginx.vh.bsnstatus.conf /etc/nginx/conf.d/nginx.vh.bsnstatus.conf
COPY --from=0 /build/dist /usr/share/nginx/html

FROM SERVE as VALIDATE_NGINX
# Check Nginx config syntax
RUN /usr/sbin/nginx -t -c /etc/nginx/nginx.conf
