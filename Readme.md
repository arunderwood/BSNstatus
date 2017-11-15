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

Get the ClusterIP from the `cluster-info` command and the `NodePort` from the service description:
```
kubectl cluster-info
kubectl describe services bsnstatus-service
```

Combine them to get the exposed URL for the service:

_http://CLUSTERIP:NODEPORT_

## Local Development
These commands allow the container to be built and executed locally.
```
docker build .
docker run -p 80:80 [CONTAINER_ID]
```
