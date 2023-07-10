const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {

    const APIKey = 'd2b3948becd14a23bc9172940231007';
    const city = document.querySelector('.search-box input').value;

    if (city === '')
        return;

    fetch(`https://api.weatherapi.com/v1/current.json?key=${APIKey}&q=${city}&aqi=no`)
        .then(response => response.json())
        .then(json => {

            if (json.error) {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            switch (json.current.condition.code) {
                case 1000:
                    image.src = 'images/clear.png';
                    break;
            
                case 1003:
                    image.src = 'images/cloud.png';
                    break;
            
                case 1030:
                case 1135:
                case 1147:
                    image.src = 'images/mist.png';
                    break;
            
                case 1063:
                case 1087:
                case 1150:
                case 1153:
                case 1180:
                case 1183:
                case 1186:
                case 1189:
                case 1192:
                case 1195:
                case 1198:
                case 1201:
                case 1240:
                case 1243:
                    image.src = 'images/rain.png';
                    break;
            
                case 1066:
                case 1114:
                case 1117:
                case 1210:
                case 1213:
                case 1216:
                case 1219:
                case 1222:
                case 1225:
                case 1237:
                    image.src = 'images/snow.png';
                    break;
            
                case 404:
                    image.src = 'images/404.png';
                    break;
            
            }

            temperature.innerHTML = `${parseInt(json.current.temp_c)}<span>°C</span>`;
            description.innerHTML = `${json.current.condition.text}`;
            humidity.innerHTML = `${json.current.humidity}%`;
            wind.innerHTML = `${parseInt(json.current.wind_kph)}Km/h`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';


        });


});