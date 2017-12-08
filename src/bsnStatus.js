require('material-design-icons-iconfont/dist/material-design-icons.css')
require('w3-css/3/w3.css')
require('./css/styles.css')
require('github-fork-ribbon-css/gh-fork-ribbon.css')
require('jquery-lazy')

window.BSNrecords = require('./BSNrecords.json')
require('simpleweather')

window.loadColorpicker = function loadColorpicker() {
    var newcolor = document.getElementById('inputColor').value
    document.body.style.backgroundColor = newcolor
}

function dosimpleWeather() {
    $.simpleWeather({
        location: 'Ames, IA',
        woeid: '',
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
require('appml')

// Get the modal for the about button
var modal = document.getElementById('aboutBSN')

// When the user clicks anywhere outside of the aboutBSN modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none'
    }
}

$(window).on('load', function() {
    require('offline-plugin/runtime').install()
})
