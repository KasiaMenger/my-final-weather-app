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

function currentLocation(position) {
  let units = "metric";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "749810e34b6703478a9c495fcd73dc8a";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
  axios.get(apiURL).then(cityDisplay);
}
navigator.geolocation.getCurrentPosition(currentLocation);

function tempDisplay(response) {
  let temperature = Math.round(response.data.main.temp);
  let convertH2 = document.querySelector(".convertToC");
  convertH2.innerHTML = `${temperature}`;
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

function convertCelsius(event) {
  event.preventDefault();
  let temperatureC = document.querySelector(".convertToC");
  temperatureC.innerHTML = "22";
}
function convertFahrenheit(event) {
  event.preventDefault();
  let temperatureF = document.querySelector(".convertToC");
  temperatureF.innerHTML = "71";
}

let celsiusButton = document.querySelector("#celcius");
celsiusButton.addEventListener("click", convertCelsius);

let fahrenheitButton = document.querySelector("#fahrenheit");
fahrenheitButton.addEventListener("click", convertFahrenheit);
