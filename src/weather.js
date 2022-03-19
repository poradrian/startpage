const apiKEY = import.meta.env.VITE_API_KEY;

const weatherButton = document.querySelector('.btn-search-city');
const weatherSearchInput = document.querySelector('#search-city-input');
const cityName = document.querySelector('.city');
const temperature = document.querySelector('.temp');
const descr = document.querySelector('.description');
const hum = document.querySelector('.humidity');
const windSpeed = document.querySelector('.wind-speed');


function fetchWeather(city = 'bucharest') {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKEY}`)
    .then(res => res.json()
      .then(data => displayWeather(data))
      .catch(() => {
        cityName.textContent = 'invalid entry';
        temperature.textContent = '';
        descr.textContent = '';
        hum.textContent = '';
        windSpeed.textContent = '';
      }));
}

function displayWeather(data) {
  const { name } = data;
  const { description } = data.weather[0];
  const { temp, humidity } = data.main;
  const { speed } = data.wind;

  cityName.textContent = name.toLowerCase();
  temperature.textContent = `${Math.round(temp)}°C`;
  descr.textContent = description;
  hum.textContent = `humidity: ${humidity}%`;
  windSpeed.textContent = `wind speed: ${Math.round(speed)} km/h`;
}

function submitOnSearchClick() {
  fetchWeather(weatherSearchInput.value);
  weatherSearchInput.value = '';
}

function submitOnEnter(e) {
  if (e.keyCode === 13) {
    weatherButton.click();
    weatherSearchInput.value = '';
  }
}


weatherButton.addEventListener('click', submitOnSearchClick);
weatherSearchInput.addEventListener('keyup', submitOnEnter);

export default fetchWeather;