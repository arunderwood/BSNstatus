# BSNstatus

A responsive webapp that organizes site bookmarks and other useful data into a grid of cards

Availible on [Docker Hub](https://hub.docker.com/r/arunderwood/bsnstatus/).

## Offline Functionality

1. External resources such as Jquery, font, and W3CSS will attempt to be loaded from their respective CDNs
1. If the CDNs are not accessible by the client, they will be loaded directly from the web server

## Running

### Requirements

* Docker

### Installing on Ubuntu with SystemD
```
docker pull arunderwood/bsnstatus
wget https://raw.githubusercontent.com/arunderwood/BSNstatus/master/bsnstatus.service
sudo cp bsnstatus.service /etc/systemd/system/
sudo service bsnstatus start
```

## Local Development
These commands allow the container to be built and executed locally.
```
docker build .
docker run -p 80:80 [CONTAINER_ID]
```
