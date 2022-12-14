function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours().toString().padStart(2, "0");
  let minutes = date.getMinutes().toString().padStart(2, "0");
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function changeSeasons() {
  let date = new Date();
  let month = date.getMonth();
  console.log(month);
  let seasonsImage = document.querySelector("#season");
  if ((month = 11 || 0 || 1)) {
    seasonsImage.setAttribute("src", "images/undraw_snowman_re_guxt.svg");
  } else if ((month = 2 || 3 || 4)) {
    seasonsImage.setAttribute("src", "images/undraw_blooming_re_2kc4.svg");
  } else if ((month = 5 || 6 || 7)) {
    seasonsImage.setAttribute("src", "images/undraw_sunlight_re_0usx.svg");
  } else if ((month = 8 || 9 || 10)) {
    seasonsImage.setAttribute("src", "images/undraw_windy_day_x-63-l(1).svg");
  }
}

changeSeasons();

function formatDays(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  console.log(response);
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row justify-content-center">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
  <div class="col-sm"> 
          <div class="card" id="forecast">          
            <div class="card-body">
              <h5 class="card-title" id="weather-forecast-day">${formatDays(
                forecast[index].time
              )}</h5>
              <p class="card-text">
  <img alt="icon" id="forecast-icon" src= "http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
    forecast[index].condition.icon
  }.png" />
                <br>
                <span id="weather-forecast-temp"> ${Math.round(
                  forecast[index].temperature.minimum
                )}&#176 | ${Math.round(
          forecast[index].temperature.maximum
        )}&#176</span>
              </p>
            </div>
          </div>
        </div>
        `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = `baaf4089fe1f47ota3453bb84221f74b`;
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let iconElement = document.querySelector("#icon");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let humidityElement = document.querySelector("#humidity");

  celsiusTemperature = response.data.temperature.current;

  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  humidityElement.innerHTML = response.data.temperature.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.time * 1000);

  getForecast(response.data.coordinates);
}

function search(city) {
  let apiKey = "baaf4089fe1f47ota3453bb84221f74b";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();

  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");

  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("New York");
