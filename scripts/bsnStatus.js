/*jslint node: true */
"use strict";


function Service(name, description, icon, locator, url) {
    this.name = name;
    this.description = description;
    this.icon = icon;
    this.locator = locator;
    this.url = url;
}

var bizzaroRouter = new Service("BizzaroRouter", "The Router", 50, "http://192.168.100.1", "http://192.168.100.1");
var sickBeard = new Service("SickBeard", "TV Shows", 580, "Astraeus:sickbeard", "Astraeus:sickbeard");




window.onload = function () {

    console.log('bizzaroRouter.constructor is ' + bizzaroRouter.constructor);
};

/*
var serviceName, serviceDescription, serviceIcon, serviceLocator, serviceUrl;

function Service(serviceName, serviceDescription, serviceIcon, serviceLocator) {
    this.serviceName = serviceName;
    this.serviceDescription = serviceDescription;
    this.serviceIcon = serviceIcon;
    this.serviceLocator = serviceLocator;
    this.serviceURL = serviceUrl;
    this.returnName = function () {
        document.getElementById("demo").innerHTML = bizzaroRouter.description;
    };
}

var bizzaroRouter = new Service("BizzaroRouter", "The Router", 50, "http://192.168.100.1", "http://192.168.100.1");


window.onload = function () {
    bizzaroRouter.returnName();
    console.log('bizzaroRouter.constructor is ' + bizzaroRouter.constructor);
};
*/
