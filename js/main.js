const elRenderLists = document.querySelectorAll(".js-render");
const elTemplate = document.querySelector(".js-template").content;
const elHeaderWeatherIcon = document.getElementById("header-weather-icon");
const elTodayAllWeather = document.querySelector(".js-weather-description");
const elWeatherTemplate = document.querySelector(
  ".js-weather-template"
).content;

const API_KEY = "81c904a97b99e7c036feca52c0e42e93";
const CITIES = [
  {
    country: "UZB",
    url: `https://api.openweathermap.org/data/2.5/weather?units=metric&q=Samarkand&appid=${API_KEY}`,
    icon: "./images/icon-uzb.png",
  },
  {
    country: "GB",
    url: `https://api.openweathermap.org/data/2.5/weather?units=metric&q=London&appid=${API_KEY}`,
    icon: "./images/ison-london.png",
  },
  {
    country: "US",
    url: `https://api.openweathermap.org/data/2.5/weather?units=metric&q=Brazil&appid=${API_KEY}`,
    icon: "./images/icon-brazil.png",
  },
  {
    country: "KZ",
    url: `https://api.openweathermap.org/data/2.5/weather?units=metric&q=Astana&appid=${API_KEY}`,
    icon: "./images/icon-kazakistzn.png",
  },
];

CITIES.forEach((city, index) => {
  getData(city, index === 0);
});

async function getData(city, isFirst) {
  let res = await fetch(city.url);
  if (res.ok) {
    let data = await res.json();
    renderList(data, city);
    if (isFirst) {
      setHeaderIcon(data.weather[0].main);
    }
  }
}

function renderList(data, city) {
  const node = document.querySelector(`[data-country="${city.country}"]`);
  node.innerHTML = "";

  let docFrm = document.createDocumentFragment();
  let copyClone = elTemplate.cloneNode(true);

  copyClone.querySelector(".js-country").textContent = data.sys.country;
  copyClone.querySelector(".js-name").textContent = data.name;
  copyClone.querySelector(".js-temp").textContent = `${Math.floor(
    data.main.temp
  )}℃`;
  copyClone.querySelector(".js-icon").src = city.icon;

  data.weather.forEach((element) => {
    copyClone.querySelector(".js-weather").textContent = element.main;
  });

  const weatherIconContainer = copyClone.querySelector(
    ".js-weather-icon-container"
  );
  setWeatherIcon(data.weather[0].main, weatherIconContainer);

  docFrm.appendChild(copyClone);
  node.appendChild(docFrm);
}

function setWeatherIcon(weather, container) {
  if (weather.toLowerCase().includes("cloud")) {
    container.innerHTML = '<i class="fa-solid fa-cloud text-4xl js-cloud"></i>';
  } else if (
    weather.toLowerCase().includes("sun") ||
    weather.toLowerCase().includes("clear")
  ) {
    container.innerHTML =
      '<i class="fa-solid fa-sun text-4xl text-yellow-400 js-sun"></i>';
  } else if (weather.toLowerCase().includes("rain")) {
    container.innerHTML =
      '<i class="fa-solid fa-cloud-showers-heavy text-4xl  text-zinc-300"></i>';
  } else {
    container.innerHTML = '<i class="fa-solid fa-cloud text-4xl js-cloud"></i>';
  }
}

function setHeaderIcon(weather) {
  if (weather.toLowerCase().includes("cloud")) {
    elHeaderWeatherIcon.className = "fa-solid fa-cloud text-4xl js-cloud";
  } else if (
    weather.toLowerCase().includes("sun") ||
    weather.toLowerCase().includes("clear")
  ) {
    elHeaderWeatherIcon.className =
      "fa-solid fa-sun text-4xl text-yellow-400 js-sun";
  } else if (weather.toLowerCase().includes("rain")) {
    elHeaderWeatherIcon.className =
      "fa-solid fa-cloud-showers-heavy text-4xl  text-zinc-300";
  } else {
    elHeaderWeatherIcon.className = "fa-solid fa-cloud text-4xl js-cloud";
  }
}
let WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=Samarqand&appid=${API_KEY}`;

const elGb = document.querySelector(".js-gb");
const elUzb = document.querySelector(".js-uzb");
const elUs = document.querySelector(".js-us");
const elKz = document.querySelector(".js-kz");
function countryesClickFn() {
  elGb.addEventListener("click", (evt) => {
    evt.preventDefault();
    if (evt.target.innerText === "More info") {
      let WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=London&appid=${API_KEY}`;
      weatherData(WEATHER_URL);
    }
  });
  elUzb.addEventListener("click", (evt) => {
    evt.preventDefault();
    if (evt.target.innerText === "More info") {
      let WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=Samarkand&appid=${API_KEY}`;
      weatherData(WEATHER_URL);
    }
  });
  elUs.addEventListener("click", (evt) => {
    evt.preventDefault();
    if (evt.target.innerText === "More info") {
      let WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=Brazil&appid=${API_KEY}`;
      weatherData(WEATHER_URL);
    }
  });
  elKz.addEventListener("click", (evt) => {
    evt.preventDefault();
    if (evt.target.innerText === "More info") {
      let WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=Nur-Sultan&appid=${API_KEY}`;
      weatherData(WEATHER_URL);
    }
  });
}
countryesClickFn();
const elFrom = document.querySelector(".js-form"),
  elInput = elFrom.querySelector(".js-input");

elFrom.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const inputVal = elInput.value.trim();

  if (inputVal) {
    let WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${inputVal}&appid=${API_KEY}`;
    weatherData(WEATHER_URL);
  } else {
    weatherData(WEATHER_URL);
  }
});

async function weatherData(url) {
  let res = await fetch(url);
  let data = await res.json();
  weatherDataRenderList(data, elTodayAllWeather);
}
weatherData(WEATHER_URL);

function weatherDataRenderList(data, node) {
  node.innerHTML = "";

  const currentTime = new Date();
  let hours =
    currentTime.getHours() < 10
      ? "0" + currentTime.getHours()
      : currentTime.getHours();
  let minuts =
    currentTime.getMinutes() < 10
      ? "0" + currentTime.getMinutes()
      : currentTime.getMinutes();
  let seconds =
    currentTime.getSeconds() < 10
      ? "0" + currentTime.getSeconds()
      : currentTime.getSeconds();
  let day = currentTime.getDay();
  let dayArr = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let today = currentTime.getDate();
  let month = currentTime.getMonth();
  let monthArr = [
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

  let weather = data.weather;

  const docFrgmnt = document.createDocumentFragment();
  const cloneTemplate = elWeatherTemplate.cloneNode(true);

  cloneTemplate.querySelector(".js-country-name").textContent = data.name;
  cloneTemplate.querySelector(".js-time").textContent = `${hours}:${minuts}`;
  cloneTemplate.querySelector(
    ".js-all-time"
  ).textContent = `${dayArr[day]} ${today} ${monthArr[month]}`;
  cloneTemplate.querySelector(".js-temp").textContent = `${Math.floor(
    data.main.temp
  )} ℃`;
  weather.forEach((item) => {
    cloneTemplate.querySelector(".js-clear").textContent = item.description;
    const weatherIcon = cloneTemplate.querySelector(".js-weather-icon");
    if (item.main.toLowerCase() === "clear")
      weatherIcon.innerHTML = `<i class="fa-solid fa-sun text-4xl text-yellow-400 js-sun"></i>`;
    if (item.main.toLowerCase() === "clouds")
      weatherIcon.innerHTML = `<i class="fa-solid fa-cloud text-4xl js-cloud"></i>`;
    if (item.main.toLowerCase() === "rain")
      weatherIcon.innerHTML = `<i class="fa-solid fa-cloud-showers-heavy text-4xl  text-zinc-300"></i>`;
  });
  cloneTemplate.querySelector(
    ".js-country-title"
  ).textContent = `${data.name}  ${data.sys.country}`;
  cloneTemplate.querySelector(".js-ms").textContent = `${data.wind.speed}m/s`;
  cloneTemplate.querySelector(
    ".js-humidity"
  ).textContent = `${data.main.humidity}%`;
  cloneTemplate.querySelector(
    ".js-pressure"
  ).textContent = `${data.main.pressure}mm`;

  docFrgmnt.appendChild(cloneTemplate);

  node.appendChild(docFrgmnt);
}
