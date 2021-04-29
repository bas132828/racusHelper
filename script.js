"use strict";
const date = document.querySelector(".info--date");
const rate = document.querySelector(".info--rate");
const infoText = document.querySelector(".info--text");
const result = document.querySelector(".result");
const btn = document.querySelector(".btn");
const text = document.querySelector(".quote");
// const nightModeSheet = document.getElementById("night-theme");
// const lightModeSheet = document.getElementById("normal-theme");
const toggleNight = document.getElementById("toggle-button-mode");
const toggleCur = document.getElementById("toggle-button-currency");
const inputField = document.querySelector(".price");
// imgs for toggles
const moonPic = document.querySelector(".night");
const sunPic = document.querySelector(".day");
const usdPic = document.querySelector(".usd");
const euroPic = document.querySelector(".euro");

//pictures

const moon = document.querySelector(".pictureMoon");
const sun = document.querySelector(".pictureSun");
const halfMoon = document.querySelector(".pictureHalfMoon");
const racoon = document.querySelector(".pictureRacoon");
const adviceHook = document.querySelector(".adviceHook");

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
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

let newValue;
let usdPrice;
let eurPrice;
let dayOfWeek;
let curMonth;
let curDay;

let currentTheme = localStorage.getItem("theme");

const nightPics = function () {
  racoon.style.display = "block";
  sun.style.display = "block";
  moon.style.display = "none";
  halfMoon.style.display = "none";
  document.body.style.background = "#b3a7ee";
  adviceHook.classList.remove("advice");
  adviceHook.classList.add("adviceDay");
};

const dayPics = function () {
  racoon.style.display = "none";
  sun.style.display = "none";
  moon.style.display = "block";
  halfMoon.style.display = "block";
  document.body.style.background = "#5841d7";
  adviceHook.classList.remove("adviceDay");
  adviceHook.classList.add("advice");
};

const initialTheme = function () {
  if (currentTheme === "light") {
    nightPics();
    toggleNight.checked = true;
  }
  if (currentTheme === "dark") {
    dayPics();
  }
};

initialTheme();

toggleNight.addEventListener("change", function (e) {
  if (toggleNight.checked) {
    nightPics();

    localStorage.setItem("theme", "light");
  } else {
    dayPics();
    localStorage.setItem("theme", "dark");
  }
});

const renewPage = function () {
  document.querySelector(".price").value = "";
};
renewPage();

// toggleCur.addEventListener("change");

const changeRate = function (str) {
  rate.textContent = str;
};

toggleCur.addEventListener("change", function () {
  if (toggleCur.checked) {
    changeRate(eurPrice);
    inputField.placeholder = "Type the debt in EUR...";

    infoText.textContent = "EUR rate:";
  } else {
    changeRate(usdPrice);
    inputField.placeholder = "Type the debt in USD...";
    infoText.textContent = "USD rate:";
  }
});

const usdValue = async function () {
  const resp = await fetch("https://www.cbr-xml-daily.ru/daily_json.js");
  const data = await resp.json();
  const today = new Date();
  curDay = new Date(data.Date).getDate();
  const realDay = today.getDate();

  if (curDay !== realDay) {
    const resp2 = await fetch(
      `https://www.cbr-xml-daily.ru//archive//${today.getFullYear()}//0${
        today.getMonth() + 1
      }//${today.getDate()}//daily_json.js`
    );
    const data = await resp2.json();
    console.log(data);
    usdPrice = data.Valute.USD.Value;
    eurPrice = data.Valute.EUR.Value;
    //DATES
    dayOfWeek = days[new Date(data.Date).getDay()];
    curMonth = months[new Date(data.Date).getMonth()];
    curDay = new Date(data.Date).getDate();
    date.textContent = `${dayOfWeek} ${curDay}, ${curMonth}`;

    if (toggleCur.checked) {
      changeRate(eurPrice);
      infoText.textContent = "EURO rate:";
    } else {
      changeRate(usdPrice);
      infoText.textContent = "USD rate:";
    }
  } else {
    usdPrice = data.Valute.USD.Value;
    eurPrice = data.Valute.EUR.Value;
    //DATES
    dayOfWeek = days[new Date(data.Date).getDay()];
    curMonth = months[new Date(data.Date).getMonth()];
    date.textContent = `${dayOfWeek} ${curDay}, ${curMonth}`;

    if (toggleCur.checked) {
      changeRate(eurPrice);
      infoText.textContent = "EURO rate:";
    } else {
      changeRate(usdPrice);
      infoText.textContent = "USD rate:";
    }
  }
};

usdValue();

const render = function (str) {
  text.textContent = str;
};

//advice
async function apiAdvice() {
  const resp = await fetch("https://api.adviceslip.com/advice");

  const data = await resp.json();

  render(`${data.slip.advice}`);
}
apiAdvice();

const calcPaymentShow = function (value) {
  if (toggleCur.checked) {
    const toPay = Number(eurPrice) * Number(value);
    result.textContent = `${Math.trunc(toPay)} руб. ${
      Math.trunc(toPay * 100) % 100
    } коп.`;
    alert("You are using euro rate");
  } else {
    const toPay = Number(usdPrice) * Number(value);
    result.textContent = `${Math.trunc(toPay)} руб. ${
      Math.trunc(toPay * 100) % 100
    } коп.`;
  }
};

const calc = function (event) {
  event.preventDefault();
  const value = document.querySelector(".price").value;

  if (value.includes(",") && value.includes(".")) {
    newValue = value.replace(",", "");
    if (!Number(newValue)) return renewPage();
    calcPaymentShow(newValue);
    autoClipboard();
  }

  if (value.includes(",")) {
    newValue = value.replace(",", ".");
    if (!Number(newValue)) return renewPage();
    calcPaymentShow(newValue);
    autoClipboard();
  }
  if (value.includes("?")) {
    newValue = value.replace("?", ".");
    if (!Number(newValue)) return renewPage();
    calcPaymentShow(newValue);
    autoClipboard();
  }

  if (value.includes("/")) {
    newValue = value.replace("/", ".");
    if (!Number(newValue)) return renewPage();
    calcPaymentShow(newValue);
    autoClipboard();
  }

  if (!Number(value)) return renewPage();

  calcPaymentShow(value);
  apiAdvice();
  renewPage();
  autoClipboard();
};

btn.addEventListener("click", calc);

//using enter

document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    const value = document.querySelector(".price").value;

    if (value.includes(",") && value.includes(".")) {
      newValue = value.replace(",", "");
      if (!Number(newValue)) return renewPage();
      calcPaymentShow(newValue);
      autoClipboard();
    }

    if (value.includes(",")) {
      newValue = value.replace(",", ".");
      if (!Number(newValue)) return renewPage();
      calcPaymentShow(newValue);
      autoClipboard();
    }
    if (value.includes("?")) {
      newValue = value.replace("?", ".");
      if (!Number(newValue)) return renewPage();
      calcPaymentShow(newValue);
      autoClipboard();
    }

    if (value.includes("/")) {
      newValue = value.replace("/", ".");
      if (!Number(newValue)) return renewPage();
      calcPaymentShow(newValue);
      autoClipboard();
    }

    if (!Number(value)) return renewPage();

    calcPaymentShow(value);
    apiAdvice();
    renewPage();
    autoClipboard();
  }

  if (e.key === "Escape") {
    e.preventDefault();
    renewPage();
    result.textContent = "";
  }
});
//copy to clipboard feature

const copyTextareaBtn = document.querySelector(".js-textareacopybtn");

const autoClipboard = function (event) {
  const copyTextarea = document.querySelector(".js-copytextarea");
  copyTextarea.focus();
  copyTextarea.select();
  window.navigator.clipboard.writeText(copyTextarea.value);
};

copyTextareaBtn.addEventListener("click", autoClipboard);

//experimenting here
