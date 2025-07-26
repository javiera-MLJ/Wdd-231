const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

const url = 'https://api.openweathermap.org/data/2.5/weather?lat=49.75&lon=6.64&units=metric&appid=8fa59ff5cda4f0f4b5a7e43a8b39fdb4'
async function apiFetch() {
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
    currentTemp.innerHTML = `${data.main.temp} °c`;

    const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    const desc = data.weather[0].description;

    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
    captionDesc.textContent = desc;
}

apiFetch();