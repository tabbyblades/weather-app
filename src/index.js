let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let h2 = document.querySelector("h2");
h2.innerHTML = `${day} ${hours}:${minutes}`;

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");

  let location = searchInput.value;

  let apiKey = "5c947bc6651bd71d8bfa87bd7568e05f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

  function showTemperature(Response) {
    console.log(Response.data);
    let temperature = Math.round(Response.data.main.temp);
    let temperatureElement = document.querySelector("#temp");
    temperatureElement.innerHTML = `${temperature}`;
    let wind = Math.round(Response.data.wind.speed);
    let windElement = document.querySelector("#wind");
    windElement.innerHTML = `${wind} m/s`;
    let humidity = Math.round(Response.data.main.humidity);
    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = `${humidity}%`;
    let h1 = document.querySelector("h1");
    h1.innerHTML = `${Response.data.name}`;
  }
  axios.get(apiUrl).then(showTemperature);
}

let searchForm = document.querySelector("#searchForm");
searchForm.addEventListener("submit", search);

function showPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;

  let apiKey = "5c947bc6651bd71d8bfa87bd7568e05f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(getCurrent);
}

function getCurrent(Response) {
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${Response.data.name}`;
  let temperature = Math.round(Response.data.main.temp);
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = `${temperature}`;
  let wind = Math.round(Response.data.wind.speed);
    let windElement = document.querySelector("#wind");
    windElement.innerHTML = `${wind} m/s`;
    let humidity = Math.round(Response.data.main.humidity);
    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = `${humidity}%`;
}

function clickButton(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
let currentButton = document.querySelector("#currentButton");
currentButton.addEventListener("click", clickButton);