FROM node:8
COPY . /build
WORKDIR /build
RUN npm run-script build

FROM nginx:alpine
MAINTAINER Arunderwood
COPY --from=0 /build/nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=0 /build/dist /usr/share/nginx/html
