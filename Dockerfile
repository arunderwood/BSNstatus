FROM nginx:alpine
MAINTAINER Arunderwood
COPY nginx.conf /etc/nginx/nginx.conf
COPY . /usr/share/nginx/html
