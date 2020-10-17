var weatherHistory = getHistory();

$(document).ready(main);
function main() {
  if (weatherHistory.length) {
    displayHistory();
    getWeather(weatherHistory[0]);
  }
}

$(searchButton).click(function (e) {
  e.preventDefault();
  var city = $(cityInput).val();
  $(cityInput).val("");

  weatherHistory.unshift(city);
  setHistory();
  displayHistory();

  getAPI(city);
});

function getAPI(city) {
  getWeather(city);
  getForecast(city);
}

function getWeather(city) {
  var weatherurl =
    "https://api.openweathermap.org/data/2.5/weather?appid=989f4d7f348b1c989490caac837887a9&q=";

  $.get(weatherurl + city).then(function (weather) {
    console.log(weather);
    getUV(weather.coord);

    tempF.textContent = weather.main.temp;
    humidity.textContent = weather.main.humidity;
    wind.textContent = weather.wind.speed;
  });
}

function getForecast(city) {
  var forecasturl =
    "https://api.openweathermap.org/data/2.5/forecast?appid=989f4d7f348b1c989490caac837887a9&q=";

  $.get(forecasturl + city).then(function (forecast) {
    console.log(forecast);
  });
}

function getUV(coord) {
  var url =
    "http://api.openweathermap.org/data/2.5/uvi?lat=" +
    coord.lat +
    "&lon=" +
    coord.lon +
    "&appid=989f4d7f348b1c989490caac837887a9";
  $.get(url).then(function (uvi) {
    UVIndex.textContent = uvi.value;
  });
}

function displayHistory() {
  var historyEl = $(historyDiv);
  historyEl.empty();

  for (var i = 0; i < weatherHistory.length; i++) {
    var city = weatherHistory[i];

    var block = $("<div>").text(city);

    historyEl.append(block);
  }
}

function getHistory() {
  return getLocal("history") || [];
}
function setHistory() {
  setLocal("history", weatherHistory);
}

function getLocal(key) {
  return JSON.parse(localStorage.getItem(key));
}

function setLocal(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
