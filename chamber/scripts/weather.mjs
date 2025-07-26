const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const description = document.querySelector("#description");
const high = document.querySelector("#high");
const low = document.querySelector("#low");
const humidity = document.querySelector("#humidity");
const sunrise = document.querySelector("#sunrise");
const sunset = document.querySelector("#sunset");


const url = 'https://api.openweathermap.org/data/2.5/weather?lat=-41.31&lon=-72.97&units=imperial&appid=8fa59ff5cda4f0f4b5a7e43a8b39fdb4'
const forecastURL = 'https://api.openweathermap.org/data/2.5/forecast?lat=-41.31&lon=-72.97&units=imperial&appid=8fa59ff5cda4f0f4b5a7e43a8b39fdb4';
export async function fetchWeather() {
    try {
        const response = await fetch(url);
        if (response.ok){;
            const data = await response.json();
            console.log(data);
            displayResult(data);
        }
        else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.error('there was a problem:', error);
    }
}

function displayResult(data) {
    currentTemp.innerHTML = `${Math.round(data.main.temp)} °F`;
    description.innerHTML = data.weather[0].description;
    high.innerHTML = `High: ${Math.round(data.main.temp_max)}  °F`;
    low.innerHTML = `Low: ${Math.round(data.main.temp_max)} °F`;
    humidity.innerHTML = `Humidity: ${data.main.humidity}%`;
    sunrise.innerHTML = `Sunrise: ${data.sys.sunrise}`;
    sunset.innerHTML = `Sunset: ${data.sys.sunset}`;
    
    const sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' });
    const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' });

    sunrise.innerHTML = sunriseTime;
    sunset.innerHTML = sunsetTime;

    const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;

    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', data.weather[0].description);
}

const forecastContainer = document.querySelector("#forecast-container");

export async function fetchForecast() {
    try {
        const response = await fetch(forecastURL);
        if (response.ok) {
            const data = await response.json();
            displayForecast(data);
        }   
        else {
            throw Error(await response.text());
        }
    }   
    catch (error) {
        console.error("Error fetching forecast:", error);
    }
}

function displayForecast(data) {
    forecastContainer.innerHTML = "";

    const filteredForecast = data.list.filter(item => item.dt_txt.includes("12:00:00"));

    filteredForecast.forEach(forecast => {
        const date = new Date(forecast.dt * 1000);
        const dayName = date.toLocaleDateString("es-CL", { weekday: "short" });
        const temp = Math.round(forecast.main.temp);
        const icon = forecast.weather[0].icon;
        const desc = forecast.weather[0].description;

        const card = document.createElement("div");
        card.classList.add("forecast-day");

        card.innerHTML = `
            <h1>${dayName}</h1>
            <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${desc}">
            <p>${temp} °F</p>
            <p>${desc.charAt(0).toUpperCase() + desc.slice(1)}</p>
        `;

        forecastContainer.appendChild(card);
    });
}

fetchWeather();
fetchForecast();
