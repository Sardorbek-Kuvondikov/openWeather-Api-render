const elForm = document.querySelector(".js-form"),
  elInput = elForm.querySelector(".js-input");
const elTextRender = document.querySelector(".js-text");
const elTemplate = document.querySelector(".js-template").content;
const elCountry = document.querySelector(".js-country");

let API_KEY = "81c904a97b99e7c036feca52c0e42e93";
let WEATHER_URL = `https://api.openweathermap.org/data/2.5/forecast?&q=Samarkand&appid=${API_KEY}`;

elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const inputVal = elInput.value.trim();
  const valToUper = inputVal[0].toUpperCase() + inputVal.slice(1);
  elCountry.textContent = valToUper;
  if (inputVal) {
    let WEATHER_URL = `https://api.openweathermap.org/data/2.5/forecast?&q=${inputVal}&appid=${API_KEY}`;
    getData(WEATHER_URL);
  }
  elInput.value = "";
});

async function getData(url) {
  let res = await fetch(url);
  if (res.ok) {
    let data = await res.json();
    renderList(data, elTextRender);
  }
}

function renderList(data, node) {
  node.innerHTML = "";
  const docFrg = document.createDocumentFragment();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  data.list.forEach((item) => {
    const itemDate = new Date(item.dt_txt);
    itemDate.setHours(0, 0, 0, 0);
    const dayDifference = (itemDate - today) / (1000 * 60 * 60 * 24);

    let dateLabel;
    if (dayDifference === 0) {
      dateLabel = "Today";
    } else if (dayDifference === 1) {
      dateLabel = "Tomorrow";
    } else if (dayDifference === 2) {
      dateLabel = "3-day";
    } else if (dayDifference === 3) {
      dateLabel = "4-day";
    } else {
      dateLabel = "5-day";
    }
    const cloneTemplate = elTemplate.cloneNode(true);
    cloneTemplate.querySelector(".js-date").textContent = dateLabel;
    cloneTemplate.querySelector(".js-time").textContent = item.dt_txt;
    cloneTemplate.querySelector(".js-degree").textContent = `${Math.round(
      item.main.temp - 273.15
    )} °C`;
    cloneTemplate.querySelector(
      ".js-win-speed"
    ).textContent = `${item.wind.speed} m/s`;
    cloneTemplate.querySelector(
      ".js-humidity"
    ).textContent = `${item.main.humidity}%`;
    item.weather.forEach((element) => {
      cloneTemplate.querySelector(".js-sky").textContent = element.description;
      const icons = cloneTemplate.querySelector(".js-weather-icons");
      if (element.main.toLowerCase() === "clear")
        icons.innerHTML = `<i class="fa-solid fa-sun text-4xl text-yellow-400"></i>`;
      if (element.main.toLowerCase() === "clouds")
        icons.innerHTML = `<i class="fa-solid fa-cloud text-4xl "></i>`;
      if (element.main.toLowerCase() === "rain")
        icons.innerHTML = `<i class="fa-solid fa-cloud-showers-heavy text-4xl  text-zinc-300"></i>`;
    });
    docFrg.appendChild(cloneTemplate);
  });

  node.appendChild(docFrg);
}

getData(WEATHER_URL);
