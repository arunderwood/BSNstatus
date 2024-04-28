import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'w3-css/3/w3.css'
import './css/styles.css'
import 'github-fork-ribbon-css/gh-fork-ribbon.css'
import 'jquery-lazy'
import 'simpleweather'
import 'appml'

import BSNrecords from './BSNrecords.json'
window.BSNrecords = BSNrecords

window.loadColorpicker = function loadColorpicker() {
    var newcolor = document.getElementById('inputColor').value
    document.body.style.backgroundColor = newcolor
}

function dosimpleWeather() {
    $.simpleWeather({
        location: '',
        woeid: '2354286',
        unit: 'f',
        success: function (weather) {
            var html = '<p>' + weather.temp + '&deg;' + weather.units.temp + '</p>'

            $('#weather').html(html)
        },
        error: function (error) {
            $('#weather').html('<p>' + error + '</p>')
        }
    })
}

window.myFormController = function myFormController($appml) {
    if ($appml.message == 'ready') {/*Keep*/}
    if ($appml.message == 'loaded') {/*Keep*/}
    if ($appml.message == 'done') {
        $(function($) {
            $('img.lazy').Lazy({effect: 'fadeIn', effectTime: 100, threshold: 0})
        })
        dosimpleWeather()
    }
}

// Get the modal for the about button
var modal = document.getElementById('aboutBSN')

// When the user clicks anywhere outside of the aboutBSN modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none'
    }
}

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then(registration => {
            console.log('SW registered: ', registration)
        }).catch(registrationError => {
            console.log('SW registration failed: ', registrationError)
        })
    })
}
