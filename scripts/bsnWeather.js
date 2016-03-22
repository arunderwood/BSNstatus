function dosimpleWeather() {
    $.simpleWeather({
        location: 'Ames, IA',
        woeid: '',
        unit: 'f',
        success: function (weather) {
            html = '<p>' + weather.temp + '&deg;' + weather.units.temp + '</p>';

            $("#weather").html(html);
        },
        error: function (error) {
            $("#weather").html('<p>' + error + '</p>');
        }
    });
};
