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

let h2 = document.querySelector("#h2");
h2.innerHTML = `${day} ${hours}:${minutes}`;

function search(location) {
  let apiKey = "5c947bc6651bd71d8bfa87bd7568e05f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);}

  function handleSubmit(event){
    event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  search(searchInput.value);}

  search("edinburgh");


  function showTemperature(Response) {
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
    let icon = Response.data.weather[0].icon;
    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute("src",`images/${icon}.svg`);
    celsiusTemperature = Response.data.main.temp;
    let description = document.querySelector("#description");
    description.innerHTML = `${Response.data.weather[0].description}`;
    getForecast(Response.data.coord);
  }

function getForecast(coordinates){
  let apiKey = "5c947bc6651bd71d8bfa87bd7568e05f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(Response){
  console.log(Response.data.daily);
let forecastElement = document.querySelector("#forecast");
let forecastHTML = `<div class = "row">`;
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
days.forEach(function(day){
forecastHTML = forecastHTML + `<div class="col-2"> 
<div class="card h-100">
<img src="images/01d.svg" class="card-img-top" alt="sunny">
<div class="card-body">
<p class="card-text"> <strong>${day} </strong><br/> 8°C  </p>
</div>
</div>
</div>`
;});
forecastHTML = forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML;
}

let searchForm = document.querySelector("#searchForm");
searchForm.addEventListener("submit", handleSubmit);

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
    let icon = Response.data.weather[0].icon;
    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute("src",`images/${icon}.svg`);
    celsiusTemperature = Response.data.main.temp;
    let description = document.querySelector("#description");
    description.innerHTML = `${Response.data.weather[0].description}`;
    
}

function clickButton(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
let currentButton = document.querySelector("#currentButton");
currentButton.addEventListener("click", clickButton);


function showFahrenheitTemperature(event){
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}
let fahrenheitLink = document.querySelector("#fahren-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celsiusTemperature = null;

function showCelsiusTemperature(event){
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature); 