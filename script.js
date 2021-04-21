"use strict";
const rate = document.querySelector(".rate");
const result = document.querySelector(".result");
const btn = document.querySelector(".btn");
const text = document.querySelector(".quote");
const nuts = document.querySelector(".imageW");
const nightModeSheet = document.getElementById("night-theme");
const lightModeSheet = document.getElementById("normal-theme");
const toggleNight = document.getElementById("toggle-button");
const toggleCur = document.getElementById("toggle-currency");

let newValue;
let usdPrice;
let eurPrice;
let curDate;

toggleNight.addEventListener("change", function (e) {
  if (toggleNight.checked) {
    document
      .getElementById("normal-theme")
      .setAttribute("href", "styles-night.css");
  } else {
    document.getElementById("normal-theme").setAttribute("href", "styles.css");
  }
});

const renewPage = function () {
  document.querySelector(".price").value = "";
};
renewPage();

// toggleCur.addEventListener("change");

const changeRate = function (str) {
  rate.textContent = str;
  rate.insertAdjacentText("beforeend", ` ${curDate}`);
};

toggleCur.addEventListener("change", function () {
  if (toggleCur.checked) {
    changeRate(eurPrice);
  } else {
    changeRate(usdPrice);
  }
});

const usdValue = async function () {
  const resp = await fetch("https://www.cbr-xml-daily.ru/daily_json.js");
  const data = await resp.json();

  usdPrice = data.Valute.USD.Value;
  eurPrice = data.Valute.EUR.Value;
  curDate = new Date(data.Date).toLocaleDateString("ru");
  
  toggleCur.checked ? changeRate(eurPrice) : changeRate(usdPrice);
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
  if (value.includes(",")) {
    newValue = value.replace(",", ".");
    if (!Number(newValue)) return renewPage();
    calcPaymentShow(newValue);
  }
  if (!Number(value)) return renewPage();
  calcPaymentShow(value);
  apiAdvice();
  renewPage();
  // console.log(toPay);
  // if (toPay > 100000) {
  //   nuts.style.display = "flex";
  //   setTimeout(() => (nuts.style.display = "none"), 50);
  // }
};

btn.addEventListener("click", calc);

//using enter
document.addEventListener("keydown", function (e) {
  // if (e.key === 'Escape'){
  //   console.log(val.value)
  //  }

  if (e.key === "Enter") {
    e.preventDefault();
    const value = document.querySelector(".price").value;
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

//toggling currency
