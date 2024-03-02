# BSNstatus

[![Docker Automated build](https://img.shields.io/docker/automated/jrottenberg/ffmpeg.svg)](https://hub.docker.com/r/arunderwood/bsnstatus/)

A responsive webapp that organizes site bookmarks and other useful data into a grid of cards

## Offline Functionality

This app strives to meet the [Progressive Web App Checklist](https://developers.google.com/web/progressive-web-apps/checklist). As such, the app should remain available on your device when it is offline after your first visit.

## Running

### Requirements

* Docker

### Installing on Ubuntu with SystemD
```
docker pull arunderwood/bsnstatus
wget https://raw.githubusercontent.com/arunderwood/BSNstatus/master/bsnstatus.service
sudo cp bsnstatus.service /etc/systemd/system/
sudo systemctl enable bsnstatus
sudo service bsnstatus start
```

### Running in Kubernetes

If you are running in minikube, you will need to enable ingress and stop/start minikube before continuing.

```
minikube addons enable ingress
```

Launch the deployment and expose it:

```
kubectl create -f bsnstatus-deployment.yaml
kubectl expose deployment bsnstatus --type=NodePort --name=bsnstatus-service
```

Get the Ingress address:
```
kubectl get ingress bsnstatus-ingress
```

Combine them to get the exposed URL for the service:

_http://INGRESSADDRESS:80_

## Local Development
Built and execute the full nginx docker server locally.

```
docker-compose up
```

You can now access the site at http://localhost/

After changing assets you will need to re-webpack them

```
npm run build
```

OR run webpack in _watch_ mode to rebuild continuously

```
npm run serve
```
