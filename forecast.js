
function formatDate(time) {
  let date = new Date(time);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat"];
  return days[day];
}
function displayForecast(response) {
  let forecast = response.data.daily;

    let forecastElement = document.querySelector("#forecast");
   
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML = forecastHTML + `
        <div class="col-2">
          <div class="dayStyle">${formatDay(forecastDay.time)}</div>  
            <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${forecastDay.condition.icon}.png" alt="" id="icon" class="icon">
           <div><span class="max">${Math.round(forecastDay.temperature.maximum)}°</span> | <span class="min">${Math.round(forecastDay.temperature.minimum)}°</div>
       </span> </div>
    `;
    }
    });
   
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
}
function getForecast(city) {
  let apiKey = "042af6049820oc19463a6eb33bta81ea";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`
  axios.get(apiUrl).then(displayForecast);
}
function showWeather(response) { 
    console.log(response);
    document.querySelector("#city").innerHTML = response.data.city;
    celciusTemp = response.data.temperature.current;
    document.querySelector("#temperature").innerHTML = Math.round(celciusTemp);
    document.querySelector("#description").innerHTML = response.data.condition.description;
    document.querySelector("#humidity").innerHTML = response.data.temperature.humidity;
    document.querySelector("#speed").innerHTML = Math.round(response.data.wind.speed);
    document.querySelector("#date").innerHTML = formatDate(response.data.time * 1000);
  document.querySelector("#emoji").setAttribute("src", `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`)
  getForecast(response.data.city);
}

function searchWeather(event) {
    event.preventDefault();
    let cityElement = document.querySelector("#cityInput");
    search(cityElement.value);
}

function search(city) {
    let apiKey = "042af6049820oc19463a6eb33bta81ea";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showWeather);
}
function showFarenheit(event) {
    event.preventDefault();
    let farenheitTemp = (celciusTemp * 9) / 5 + 32;
    document.querySelector("#temperature").innerHTML = Math.round(farenheitTemp);
}
function showCelcius(event) {
    event.preventDefault();
    document.querySelector("#temperature").innerHTML = Math.round(celciusTemp);
}

let celciusTemp = null;
document.querySelector("#searchForm").addEventListener("submit", searchWeather);
document.querySelector("#farenheit").addEventListener("click", showFarenheit);
document.querySelector("#celcius").addEventListener("click", showCelcius);
search("Seoul");
