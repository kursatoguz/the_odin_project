const apikey="";
const url = (city) =>
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

const input = document.getElementById("search-input");
const temp = document.getElementById("current-temp");
const image = document.getElementById("weather-image");
const moreInfos = document.getElementById("more-infos");
const celcius = document.getElementById("celcius");
const fahren = document.getElementById("fahrenheit");
const errorMessage = document.getElementById("error-message");
//DEFAULT
getWeatherByLocation("Istanbul");
//
celcius.addEventListener("click", (e) => {
  e.preventDefault();
  let temperature = temp.innerHTML;
  if (temp.className == "fahrenheit") {
    temp.innerHTML = fahrenheitToCelcius(temperature);
    toggleCelc();
    temp.className = "celcius";
  }
});
fahren.addEventListener("click", (e) => {
  e.preventDefault();
  let temperature = temp.innerHTML;
  if (temp.className == "celcius") {
    temp.innerHTML = celciusToFahrenheit(temperature);
    toggleFahr();
    temp.className = "fahrenheit";
  }
});
input.addEventListener("keyup", (e) => {
  if (e.keyCode == 13) {
    e.preventDefault();
    getWeatherByLocation(input.value);
    input.value = "";
  }
});

async function getWeatherByLocation(city) {
  try {
    const resp = await fetch(url(city), { origin: "cors" });
    if (!resp.ok) {
      throw new Error("Invalid city name");
    }
    const respData = await resp.json();
    //functions
    showTemp(respData);
    showImgandCity(respData, city);
    showInfos(respData);
  } catch (error) {
    showError(error.message);
  }
}
function showTemp(data) {
  temp.className = "celcius";
  toggleCelc();
  temp.innerHTML = kelvinToCelcius(data.main.temp);
}
function showImgandCity(data, inp) {
  console.log(data.weather);
  image.innerHTML = `<div id="city-name">${inp.toUpperCase()}, ${
    data.sys.country
  }</div> <img src="./icons/${
    data.weather[0].icon
  }.png" alt="weather-image" />`;
}
function showInfos(data) {
  moreInfos.innerHTML = `<div class="description">${data.weather[0].description.toUpperCase()}</div><div>Humidity: ${
    data.main.humidity
  } %</div><div>Wind Speed: ${data.wind.speed} m/s</div>`;
}
function toggleCelc() {
  celcius.style.color = "black";
  celcius.style.fontSize = "30px";
  fahren.style.color = "white";
  fahren.style.fontSize = "25px";
}
function toggleFahr() {
  celcius.style.color = "white";
  celcius.style.fontSize = "25px";
  fahren.style.color = "black";
  fahren.style.fontSize = "30px";
}
function showError(message) {
  errorMessage.innerHTML = message;
  errorMessage.style.display = "block";
  setTimeout(hideError, 2500);
}
function hideError() {
  errorMessage.style.display = "none";
}
function kelvinToCelcius(temp) {
  return (temp - 273.15).toFixed(2);
}
function celciusToFahrenheit(temp) {
  return (temp * 1.8 + 32).toFixed(2);
}
function fahrenheitToCelcius(temp) {
  return ((temp - 32) * (5 / 9)).toFixed(2);
}
