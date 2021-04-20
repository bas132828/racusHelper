"use strict";
const rate = document.querySelector(".rate");
const result = document.querySelector(".result");
const btn = document.querySelector(".btn");
const text = document.querySelector(".quote");
const nuts = document.querySelector(".imageW");
const nightModeSheet = document.getElementById("night-theme");
const lightModeSheet = document.getElementById("normal-theme");
const toggle = document.getElementById("toggle-button");
let newValue;
let usdPrice;

toggle.addEventListener("change", function (e) {
  if (toggle.checked) {
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
const usdValue = async function () {
  const resp = await fetch("https://www.cbr-xml-daily.ru/daily_json.js");
  const data = await resp.json();

  usdPrice = data.Valute.USD.Value;
  rate.textContent = usdPrice;
  rate.insertAdjacentText("beforeend", ` ${  new Date(data.Date).toLocaleDateString('ru')}`)
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

const calcPaymentShow = function (usdPrice, value) {
  const toPay = Number(usdPrice) * Number(value);
  result.textContent = `${Math.trunc(toPay)} руб. ${
    Math.trunc(toPay * 100) % 100
  } коп.`;
};

const calc = function (event) {
  event.preventDefault();
  const value = document.querySelector(".price").value;
  if (value.includes(",")) {
    newValue = value.replace(",", ".");
    if (!Number(newValue)) return renewPage();
    calcPaymentShow(usdPrice, newValue);
  }
  if (!Number(value)) return renewPage();
  calcPaymentShow(usdPrice, value);
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
      calcPaymentShow(usdPrice, newValue);
      autoClipboard();
    }
    if (value.includes("?")) {
      newValue = value.replace("?", ".");
      if (!Number(newValue)) return renewPage();
      calcPaymentShow(usdPrice, newValue);
      autoClipboard();
    }

    if (value.includes("/")) {
      newValue = value.replace("/", ".");
      if (!Number(newValue)) return renewPage();
      calcPaymentShow(usdPrice, newValue);
      autoClipboard();
    }
    if (!Number(value)) return renewPage();
    calcPaymentShow(usdPrice, value);
    apiAdvice();

    if (!Number(value)) return renewPage();

    calcPaymentShow(usdPrice, value);
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
  window.navigator.clipboard.writeText(copyTextarea.value)
};

copyTextareaBtn.addEventListener("click",  autoClipboard);


// copyButton.addEventListener('click', () => {
//   window.navigator.clipboard.writeText(input.value)
// })


//circle animation()

// const cirlce1 = document.querySelector(".circle1");
// const cirlce2 = document.querySelector(".circle2");
// const cirlce3 = document.querySelector(".circle3");
// const cirlce4 = document.querySelector(".circle4");
// const cirlce5 = document.querySelector(".circle5");

