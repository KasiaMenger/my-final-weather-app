let now = new Date();

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let today = weekDays[now.getDay()];

let currently = now.getDate();

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let month = months[now.getMonth()];
let year = now.getFullYear();

let timeNow = document.querySelector("#currentTime");

let dateNow = document.querySelector("#currentDate");

timeNow.innerHTML = `${hours}:${minutes}`;
dateNow.innerHTML = `${today}, ${currently} ${month} ${year}`;

function cityDisplay(response) {
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${response.data.name}`;
}

function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let city = document.querySelector("h1");
  city.innerHTML = cityInput.value;
  let apiKey = "749810e34b6703478a9c495fcd73dc8a";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=metric&appid=${apiKey}`;
  axios.get(apiURL).then(tempDisplay);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecast = null;
  forecastElement.innerHTML = "";
  for (let index = 0; index < 5; index++) {
    let forecast = response.data.list[index];
    forecastElement.innerHTML += `<div class="card">
 <img src="${getImagePath(
   forecast.weather[0].main
 )}" class="card-img-top" alt="weather-type-image" />
          <h5 class="card-title">${forecast.dt * 1000}</h5>
          <p class="card-text">
            <strong>${Math.round(forecast.main.temp)}°</strong>
            <br />
            <strong>${forecast.weather[0].description}</strong>
          </p>
        </div>
      </div>`;
  }
}

function currentLocation(position) {
  let units = "metric";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "749810e34b6703478a9c495fcd73dc8a";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
  axios.get(apiURL).then(cityDisplay);

  apiURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
  axios.get(apiURL).then(displayForecast);
}

navigator.geolocation.getCurrentPosition(currentLocation);

function tempDisplay(response) {
  let temperature = Math.round(response.data.main.temp);
  let convertH2 = document.querySelector(".convertToC");
  convertH2.innerHTML = temperature;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  celciusTemperature = response.data.main.temp;
  let img = document.querySelector("#currentWeatherImage");
  img.setAttribute("src", getImagePath(response.data.weather[0].main));
}

function getImagePath(description) {
  if (description === "Clear") {
    return "pictures/Sunny.png";
  } else if (description === "Drizzle" || description === "Rain") {
    return "pictures/Rain.png";
  } else if (description === "Clouds") {
    return "pictures/Cloudy.png";
  } else if (description === "Thunderstorm") {
    return "pictures/Storm.png";
  } else if (description === "Snow") {
    return "pictures/Snow.png";
  } else if (
    description === "Mist" ||
    description === "Smoke" ||
    description === "Haze" ||
    description === "Fog" ||
    description === "Dust"
  ) {
    return "pictures/Fogg.png";
  }
}

function currentTemp(position) {
  let units = "metric";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "749810e34b6703478a9c495fcd73dc8a";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
  axios.get(apiURL).then(tempDisplay);
}
navigator.geolocation.getCurrentPosition(currentTemp);

function convertFahrenheit(event) {
  event.preventDefault();
  fahrenheitButton.classList.add("active");
  celciusButton.classList.remove("active");
  let fahrenheitTemp = (celciusTemperature * 9) / 5 + 32;
  let tempElement = document.querySelector(".convertToC");
  tempElement.innerHTML = Math.round(fahrenheitTemp);
}

let fahrenheitButton = document.querySelector("#fahrenheit");
fahrenheitButton.addEventListener("click", convertFahrenheit);

function convertCelcius(event) {
  event.preventDefault();
  celciusButton.classList.add("active");
  fahrenheitButton.classList.remove("active");
  let tempElement = document.querySelector(".convertToC");
  tempElement.innerHTML = Math.round(celciusTemperature);
}

let celciusButton = document.querySelector("#celcius");
celciusButton.addEventListener("click", convertCelcius);
