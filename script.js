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
const today = new Date();
const calendar = document.querySelector(".calendar");

//pictures

const moon = document.querySelector(".pictureMoon");
const sun = document.querySelector(".pictureSun");
const halfMoon = document.querySelector(".pictureHalfMoon");
const racoon = document.querySelector(".pictureRacoon");
const adviceHook = document.querySelector(".adviceHook");
const bublespeech = document.querySelector(".bubble-speech");
const closeBubble = document.querySelector(".close");

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
let realDay = today.getDate();
let dateForCalender;

let currentTheme = localStorage.getItem("theme");

const dayPics = function () {
  racoon.classList.add("hiddenR");
  sun.style.display = "none";
  moon.style.display = "block";
  halfMoon.style.display = "block";
  document.body.style.background = "#5841d7";
  adviceHook.classList.remove("adviceDay");
  adviceHook.classList.add("advice");
};

const nightPics = function () {
  racoon.classList.remove("hiddenR");
  sun.style.display = "block";
  moon.style.display = "none";
  halfMoon.style.display = "none";
  document.body.style.background = "#b3a7ee";
  adviceHook.classList.remove("advice");
  adviceHook.classList.add("adviceDay");
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

const inputFieldFn = function () {
  inputField.placeholder = "Type the debt in EUR...";
  infoText.textContent = "EUR rate:";
};

toggleCur.addEventListener("change", function () {
  if (toggleCur.checked) {
    changeRate(eurPrice);
    inputFieldFn();
  } else {
    changeRate(usdPrice);
    inputFieldFn();
  }
});
localStorage.setItem("today", `${realDay}`);

const dataFn = function (_data) {
  usdPrice = _data.Valute.USD.Value;
  eurPrice = _data.Valute.EUR.Value;
  //DATES
  console.log("dataFn fired");

  dayOfWeek = days[new Date(_data.Date).getDay()];
  curMonth = months[new Date(_data.Date).getMonth()];
  curDay = new Date(_data.Date).getDate();
  date.textContent = `${dayOfWeek} ${curDay}, ${curMonth}`;

  dateForCalender = _data.Date.substr(0, 10);
  calendar.value = dateForCalender;

  localStorage.setItem("objDate", `${curDay}`);
  localStorage.setItem("USD", `${_data.Valute.USD.Value}`);
  localStorage.setItem("EUR", `${_data.Valute.EUR.Value}`);
  localStorage.setItem("dayOfWeek", `${days[new Date(_data.Date).getDay()]}`);
  localStorage.setItem(
    "curMonth",
    `${months[new Date(_data.Date).getMonth()]}`
  );
  localStorage.setItem("fullDate", `${dateForCalender}`);

  if (toggleCur.checked) {
    changeRate(eurPrice);
    infoText.textContent = "EURO rate:";
  } else {
    changeRate(usdPrice);
    infoText.textContent = "USD rate:";
  }
};

if (realDay + "" === localStorage.getItem("objDate")) {
  console.log("local storage fired");
  usdPrice = localStorage.getItem("USD");
  eurPrice = localStorage.getItem("EUR");
  dayOfWeek = localStorage.getItem("dayOfWeek");
  curMonth = localStorage.getItem("curMonth");
  curDay = localStorage.getItem("objDate");
  date.textContent = `${dayOfWeek} ${curDay}, ${curMonth}`;
  calendar.value = localStorage.getItem("fullDate");
  if (toggleCur.checked) {
    changeRate(eurPrice);
    infoText.textContent = "EURO rate:";
  } else {
    changeRate(usdPrice);
    infoText.textContent = "USD rate:";
  }
} else {
  const usdValue = async function () {
    try {
      const resp = await fetch("https://www.cbr-xml-daily.ru/daily_json.js");
      const data = await resp.json();
      curDay = new Date(data.Date).getDate();
      if (curDay !== realDay) {
        const resp2 = await fetch(
          `https://www.cbr-xml-daily.ru//archive//${today.getFullYear()}//${
            today.getMonth() + 1 >= 10
              ? today.getMonth() + 1
              : "0" + (today.getMonth() + 1)
          }//${
            today.getDate() >= 10 ? today.getDate() : "0" + today.getDate()
          }//daily_json.js`
        );
        const data = await resp2.json();
        console.log("2st part fired");
        dataFn(data);
      } else {
        console.log("1st part fired");
        dataFn(data);
      }
    } catch (e) {
      const resp = await fetch("https://www.cbr-xml-daily.ru/daily_json.js");
      const data = await resp.json();
      const today = new Date();
      curDay = new Date(data.Date).getDate();
      console.log("3rd part fired");
      dataFn(data);
    }
  };

  usdValue();
}
//calendar thing

calendar.addEventListener("change", function (e) {
  const calYear = calendar.value.split("-")[0];
  const calMonth = calendar.value.split("-")[1];
  const calDay = calendar.value.split("-")[2];

  fetch(
    `https://www.cbr-xml-daily.ru//archive//${calYear}//${calMonth}//${calDay}//daily_json.js`
  )
    .then((resp) => resp.json())
    .then((data) => {
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
    })
    .catch(() => {
      date.textContent = `try previous date`;
      changeRate(`ಠ_ಠ no rate`);
    });
});

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
const btnSticker = document.querySelector(".btn__sticker");
const contWrapper = document.querySelector(".container-wrapper");
const mainContainer = document.querySelector(".main-container");
const stickers = [];
/*
const addSticker = (e) => {
  e.preventDefault();
  stickers.push({
    id: stickers.length,
    top: "100px",
    left: "100px",
  });
  renderSticker(stickers[stickers.length - 1]);
};

btnSticker.addEventListener("click", addSticker);

const renderSticker = (el) => {
  const html = `
  <div class="sticker" data-id=${el.id} >
    <textarea class="sticker__text" maxlength="38"></textarea>
  </div>
  `;
  contWrapper.insertAdjacentHTML("afterBegin", html);

  const stickers = document.querySelectorAll(".sticker");

  stickers.forEach((sticker) => {
    sticker.onmousedown = function (event) {
      let shiftX = event.clientX - sticker.getBoundingClientRect().left;
      let shiftY = event.clientY - sticker.getBoundingClientRect().top;

      // sticker.style.position = "absolute";
      // sticker.style.zIndex = "1000";
      document.body.append(sticker);
      moveAt(event.pageX, event.pageY);

      function moveAt(pageX, pageY) {
        sticker.style.left = pageX - shiftX + "px";
        sticker.style.top = pageY - shiftY + "px";
      }

      function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
      }

      document.addEventListener("mousemove", onMouseMove);

      sticker.onmouseup = function () {
        document.removeEventListener("mousemove", onMouseMove);
        sticker.onmouseup = null;
      };
    };

    sticker.ondragstart = function () {
      return false;
    };
  });
};
*/
// window.addEventListener("click", (e) => {
//   e.preventDefault();
//   console.log(e.target);
//   console.log(e.target.classList.contains("btn-close"));
// if (e.target.classList.contains("btn-close")) e.target.parentElement.remove();
// });
