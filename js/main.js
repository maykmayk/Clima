const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');

const date = new Date();
const time = date.toLocaleTimeString('it-IT', { hour12: false }).slice(0, -3);
const day = date.toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: '2-digit' });
const formattedDateTime = `${time} - ${day.replace(/\//g, '/')}`;
const dayCont = document.querySelector('.day');
dayCont.innerHTML = `${formattedDateTime}`;


document.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        const APIKey = 'd2b3948becd14a23bc9172940231007';
        const city = document.querySelector('.searchBar').value;
      
      
        fetch(`https://api.weatherapi.com/v1/forecast.json?key=${APIKey}&q=${city}&aqi=no`)
            .then(response => response.json())
            .then(json => {
                const image = document.querySelector('.iconWeath');
                const temperature = document.querySelector('.grad');
                const city = document.querySelector('.city');
                const desc = document.querySelector('.location');

                const realfeel = document.querySelector(".realFeelTemp")
                const wind = document.querySelector(".wind")
                const hum = document.querySelector(".humidity")
                const uv = document.querySelector(".uvIndex")
                const sunset = document.querySelectorAll(".sunset")
                const sunrise = document.querySelectorAll(".sunrise")
                let todayIcon = "";
                // const description = document.querySelector('.weather-box .description');
                // const humidity = document.querySelector('.weather-details .humidity span');
      
                switch (json.current.condition.code) {
                    case 1000:
                        todayIcon = '/Clima/asset/images/clear.png';
                        break;
                    case 1003:
                        todayIcon = '/Clima/asset/images/cloud.png';
                        break;
                    case 1030:
                    case 1135:
                    case 1147:
                        todayIcon = '/Clima/asset/images/mist.png';
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
                        todayIcon = '/Clima/asset/images/rain.png';
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
                        todayIcon = '/Clima/asset/images/snow.png';
                        break;
                    case 2000:
                        todayIcon = '/Clima/asset/images/thunder.png';
                        break;
                    default:
                        todayIcon = '/Clima/asset/images/404.png';
                        break;
                }
      
                

                temperature.innerHTML = `${parseInt(json.current.temp_c)}°`;
                image.src = `${todayIcon}`;
                city.innerHTML = `${(json.location.name)}`;
                desc.innerHTML = `${(json.location.region)}, ${(json.location.country)}`;
                realfeel.innerHTML = `${(json.current.feelslike_c)}°`;
                wind.innerHTML = `${(json.current.wind_mph)}<span class="infoForecast"> km/h</span>`;
                hum.innerHTML = `${(json.current.humidity)}<span class="infoForecast"> %</span>`;
                uv.innerHTML = `${(json.current.uv)}`;
                for (let i = 0; i < 2; i++) {     
                    sunrise[i].innerHTML = `${(json.forecast.forecastday[0].astro.sunrise.slice(0,5))}<span class="infoForecast"> AM</span>`;
                    sunset[i].innerHTML = `${(json.forecast.forecastday[0].astro.sunset.slice(0,5))}<span class="infoForecast"> PM</span>`;
                }
                // description.innerHTML = `${json.current.condition.text}`;
                // humidity.innerHTML = `${json.current.humidity}%`;
                // wind.innerHTML = `${parseInt(json.current.wind_kph)}Km/h`;
        
            }).catch(err => {
                alert('Something was wrong :(', err);
                return;
            });

        for (let i = 1; i <= 6; i++) {
            fetch(`https://api.weatherapi.com/v1/forecast.json?key=${APIKey}&q=${city}&days=1&hour=${i*3+3}`)
            .then(response => response.json())
            // console.log(`https://api.weatherapi.com/v1/forecast.json?key=${APIKey}&q=${city}&days=1&hour=${i}`)
            .then(json => {
                console.log(json)
                const hourTime = `${i*3+3}`;
                // const hourIcon = json.forecast.forecastday[0].day.condition.code;
                let hourIcon = "";
                switch (json.current.condition.code) {
                    case 1000:
                        hourIcon = '/Clima/asset/images/clear.png';
                        break;
                    case 1003:
                        hourIcon = '/Clima/asset/images/cloud.png';
                        break;
                    case 1030:
                    case 1135:
                    case 1147:
                        hourIcon = '/Clima/asset/images/mist.png';
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
                        hourIcon = '/Clima/asset/images/rain.png';
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
                        hourIcon = '/Clima/asset/images/snow.png';
                        break;
                    case 2000:
                        hourIcon = '/Clima/asset/images/thunder.png';
                        break;
                    default:
                        hourIcon = '/Clima/asset/images/404.png';
                        break;
                }

                const iconHour = document.querySelector(`.iconTF${i}`);
                const hourTemp = document.querySelector(`.tempTF${i}`);
                const hourTimeDiv = document.querySelector(`.hourTF${i}`);
                // console.log(`https:${hourIcon}`, `${parseInt(hour.temp_c)}°`, `${hourTime}:00`)

                iconHour.src = `${hourIcon}`;
                hourTemp.innerHTML = `${parseInt(json.forecast.forecastday[0].hour[0].temp_c)}°`;
                hourTimeDiv.innerHTML = `${hourTime}:00`;
            });
        }
        
    }
});
