/**
 * Set Location
 */
$('.input').on('keyup', function (e) {
    if (e.key === 'Enter' || e.keyCode === 13) {
        setLocation($('.input').val());
        loadWeather();
    }
});

/**
 * Change location
 */
function changeLocation() {
    $('.field').css('display', 'block');
    $('#location').html('Location: ');
    $('#locationLevel').css('display', 'none');
}

/**
 * Retrieve time
 */
function getTime() {
    const date = new Date();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();
    let session = 'AM';

    if (h == 0) {
        h = 12;
    }

    if (h > 12) {
        h = h - 12;
        session = 'PM';
    }

    h = h < 10 ? '0' + h : h;
    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;

    const time = h + ':' + m + ':' + s + ' ' + session;
    $('#time').html(`Current Time: ${time}`);

    setTimeout(getTime, 1000);
}

/**
 * Fetch API and loads weather
 */
function loadWeather() {
    let location;
    if (localStorage.getItem('location') != undefined) {
        location = localStorage.getItem('location');
        $('#location').html('Location:  ' + location);
        let temperature, prediction;
        fetch(
            `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=1e77fb69d26c242a76402146e8484da8`
        ).then((response) => {
            response.json().then((data) => {
                if (response.status != 404) {
                    localStorage.setItem('timezone', data.timezone);
                    temperature = data.main.temp;
                    prediction = data.weather[0].main;
                    $('#temperature').html(
                        'Temperature:  ' + Math.round(temperature - 273.15) + ' °C'
                    );
                    $('#prediction').html('Prediction:  ' + prediction);
                    switch (prediction) {
                        case 'Sunny':
                        case 'Clear':
                            if (getHour(data.timezone) <= '6' || getHour(data.timezone) >= '18') {
                                document.getElementById('weatherIcon').src =
                                    './assets/img/moon.gif';
                            } else {
                                document.getElementById('weatherIcon').src =
                                    './assets/img/sunny.png';
                            }
                            break;
                        case 'Thunderstorm':
                            document.getElementById('weatherIcon').src =
                                './assets/img/thunderstorm.png';
                            break;
                        case 'Clouds':
                            document.getElementById('weatherIcon').src = './assets/img/cloudy.png';
                            break;
                        case 'Rain':
                            document.getElementById('weatherIcon').src = './assets/img/raining.png';
                            break;
                        case 'Snow':
                            document.getElementById('weatherIcon').src = './assets/img/snowing.png';
                            break;
                        case 'Mist':
                            document.getElementById('weatherIcon').src = './assets/img/mist.png';
                            break;
                    }
                    $('.field').addClass('is-success');
                } else {
                    $('#weatherIcon').attr('src', './assets/img/error.png');
                    $('#temperature').innerHTML = 'Temperature:  N/A';
                    $('#prediction').innerHTML = 'Prediction:  N/A';
                    $('#location').html('Location:  ' + location);
                }
            });
        });
    }
}

/**
 * Set location in localStorage
 */
function setLocation(location) {
    localStorage.setItem('location', location);
}

/**
 * Set and save theme
 */
$('select').change(() => {
    setTheme($('select option:selected').text());
});

function setTheme(theme) {
    switch (theme) {
        case 'Dark':
            $('html').css('background', '#1b1b26');
            $('body').css('background', '#1b1b26');
            localStorage.setItem('theme', 'Dark');
            break;
        case 'Red':
            $('html').css(
                'background',
                'linear-gradient(#2d142c, #510a32, #801336, #c72c41, #ee4540) no-repeat'
            );
            $('body').css(
                'background',
                'linear-gradient(#2d142c, #510a32, #801336, #c72c41, #ee4540) no-repeat'
            );
            localStorage.setItem('theme', 'Red');
            break;
        case 'Blue':
            $('html').css('background', 'linear-gradient(#380036, #0cbaba) no-repeat');
            $('body').css('background', 'linear-gradient(#380036, #0cbaba) no-repeat');
            localStorage.setItem('theme', 'Blue');
            break;
        case 'Purple':
            $('html').css(
                'background',
                'linear-gradient(-225deg, #5271C4 0%, #B19FFF 48%, #ECA1FE 100%) no-repeat'
            );
            $('body').css(
                'background',
                'linear-gradient(-225deg, #5271C4 0%, #B19FFF 48%, #ECA1FE 100%) no-repeat'
            );
            localStorage.setItem('theme', 'Purple');
            break;
        case 'Pink':
            $('html').css(
                'background',
                'linear-gradient(to top, #df89b5 0%, #bfd9fe 100%) no-repeat'
            );
            $('body').css(
                'background',
                'linear-gradient(to top, #df89b5 0%, #bfd9fe 100%) no-repeat'
            );
            localStorage.setItem('theme', 'Pink');
            break;
        default:
            $('html').css('background', '#1b1b26');
            $('body').css('background', '#1b1b26');
            localStorage.setItem('theme', 'Dark');
            break;
    }
}

/**
 * Load theme
 */
function loadTheme() {
    if (localStorage.getItem('theme') != undefined) {
        setTheme(localStorage.getItem('theme'));
    } else {
        setTheme('Dark');
    }
}

loadTheme();

loadWeather();

setInterval(loadWeather, 600000);

setInterval(getTime, 1000);
