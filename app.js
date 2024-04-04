// Selecting elements from the DOM
const CONTAINER = document.querySelector(".container");
const SEARCH = document.querySelector(".search_box button");
const WEATHER_BOX = document.querySelector(".weather_box");
const WEATHER_DETAILS = document.querySelector(".weather_details");
const TIME_AND_DATE = document.querySelector(".time_and_date");

const ERROR404 = document.querySelector(".not_found");

const CITY_HIDE = document.querySelector(".city_hide");

// Adding event listener to the search button
SEARCH.addEventListener("click", () => {
  // API key for OpenWeatherMap API
  const APIKey = "3c9118a61359634a197c3d37357dadc6";
  // Getting the city input value
  const city = document.querySelector(".search_box input").value;

  // Check if the city input is empty
  if (city == "") return;

  // Fetching weather data from OpenWeatherMap API
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  )
    .then((response) => response.json())
    .then((json) => {
      const currentDate = new Date().toDateString();
      const currentTime = new Date().toLocaleTimeString();
      TIME_AND_DATE.innerHTML = `${currentTime} ${currentDate} `;

      // Handling 404 error if city is not found
      if (json.cod == "404") {
        CITY_HIDE.textContent = city;

        CONTAINER.style.height = "400px";
        WEATHER_BOX.classList.remove("active");
        WEATHER_DETAILS.classList.remove("active");
        ERROR404.classList.add("active");
        return;
      }

      // Selecting elements to display weather information
      const image = document.querySelector(".weather_box img");

      const temperature = document.querySelector(".weather_box .temperature");

      const description = document.querySelector(".weather_box .description");

      const humidity = document.querySelector(
        ".weather_details .humidity span"
      );

      const wind = document.querySelector(".weather_details .wind span");

      // Checking if the city has changed
      if (CITY_HIDE.textContent == city) {
      } else {
        // Updating city name and showing weather details
        CITY_HIDE.textContent = city;

        CONTAINER.style.height = "555px";
        CONTAINER.classList.add("active");
        WEATHER_BOX.classList.add("active");
        WEATHER_DETAILS.classList.add("active");
        ERROR404.classList.remove("active");

        // Setting a timeout to remove the 'active' class after 2.5 seconds
        setTimeout(() => {
          CONTAINER.classList.remove("active");
        }, 2500);

        // Setting weather icon based on weather condition
        switch (json.weather[0].main) {
          case "Clear":
            image.src = "images/clear.png";
            break;

          case "Rain":
            image.src = "images/rain.png";
            break;

          case "Snow":
            image.src = "images/snow.png";
            break;

          case "Clouds":
            image.src = "images/cloud.png";
            break;

          case "Mist":
            image.src = "images/mist.png";
            break;

          case "Haze":
            image.src = "images/mist.png";
            break;

          default:
            image.src = "images/cloud.png";
        }

        // Displaying weather information
        temperature.innerHTML = `${parseInt(json.main.temp)} <span>°C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

        // Cloning and displaying weather details
        const INFO_WEATHER = document.querySelector(".info_weather");
        const INFO_HUMIDITY = document.querySelector(".info_humidity");
        const INFO_WIND = document.querySelector(".info_wind");

        const ELCLONEINFO_WEATHER = INFO_WEATHER.cloneNode(true);

        const ELCLONEINFO_HUMIDITY = INFO_HUMIDITY.cloneNode(true);

        const ELCLONEINFO_WIND = INFO_WIND.cloneNode(true);

        ELCLONEINFO_WEATHER.id = "clone_info_weather";
        ELCLONEINFO_WEATHER.classList.add("active_clone");

        ELCLONEINFO_HUMIDITY.id = "clone_info_humidity";
        ELCLONEINFO_HUMIDITY.classList.add("active_clone");

        ELCLONEINFO_WIND.id = "clone_info_wind";
        ELCLONEINFO_WIND.classList.add("active_clone");

        setTimeout(() => {
          INFO_WEATHER.insertAdjacentElement("afterend", ELCLONEINFO_WEATHER);

          INFO_HUMIDITY.insertAdjacentElement("afterend", ELCLONEINFO_HUMIDITY);

          INFO_WIND.insertAdjacentElement("afterend", ELCLONEINFO_WIND);
        }, 2200);

        // Removing cloned weather details after animation
        const CLONE_INFO_WEATHER = document.querySelectorAll(
          ".info_weather.active_clone"
        );

        const TOATAL_CLONE_INFO_WEATHER = CLONE_INFO_WEATHER.length;

        const CLONE_INFO_WEATHER_FIRST = CLONE_INFO_WEATHER[0];

        const CLONE_INFO_HUMIDITY = document.querySelectorAll(
          ".info_humidity.active_clone"
        );

        const CLONE_INFO_HUMIDITY_FIRST = CLONE_INFO_HUMIDITY[0];

        const CLONE_INFO_WIND = document.querySelectorAll(
          ".info_wind.active_clone"
        );

        const CLONE_INFO_WIND_FIRST = CLONE_INFO_WIND[0];

        if (TOATAL_CLONE_INFO_WEATHER > 0) {
          CLONE_INFO_WEATHER_FIRST.classList.remove("active_clone");
          CLONE_INFO_HUMIDITY_FIRST.classList.remove("active_clone");
          CLONE_INFO_WIND_FIRST.classList.remove("active_clone");

          setTimeout(() => {
            CLONE_INFO_WEATHER_FIRST.remove();
            CLONE_INFO_HUMIDITY_FIRST.remove();
            CLONE_INFO_WIND_FIRST.remove();
          }, 2200);
        }
      }
    });
});
