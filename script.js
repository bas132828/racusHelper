"use strict";
const rate = document.querySelector(".rate");
const result = document.querySelector(".result");
const btn = document.querySelector(".btn");
const text = document.querySelector(".quote");
const nuts = document.querySelector(".imageW");
let newValue;
let usdPrice;

const renewPage = function () {
  document.querySelector(".price").value = "";
};

renewPage();
const usdValue = async function () {
  const resp = await fetch("https://www.cbr-xml-daily.ru/daily_json.js");
  const data = await resp.json();

  usdPrice = data.Valute.USD.Value;
  rate.textContent = usdPrice;
  console.log(data);
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
    }
    if (value.includes("?")) {
      newValue = value.replace("?", ".");
      if (!Number(newValue)) return renewPage();
      calcPaymentShow(usdPrice, newValue);
    }

    if (value.includes("/")) {
      newValue = value.replace("/", ".");
      if (!Number(newValue)) return renewPage();
      calcPaymentShow(usdPrice, newValue);
    }
    if (!Number(value)) return renewPage();
    calcPaymentShow(usdPrice, value);
    apiAdvice();

    if (!Number(value)) return renewPage();

    calcPaymentShow(usdPrice, value);
    apiAdvice();
    renewPage();
    copyBarra();
  }

  if (e.key === "Escape") {
    e.preventDefault();
    renewPage();
    result.textContent = "";
  }
});
//copy to clipboard feature

const copyTextareaBtn = document.querySelector(".js-textareacopybtn");

const copyBarra = function (event) {
  const copyTextarea = document.querySelector(".js-copytextarea");
  copyTextarea.focus();
  copyTextarea.select();
  try {
    const successful = document.execCommand("copy");
    const msg = successful ? "successful" : "unsuccessful";
    console.log("Copying text command was " + msg);
  } catch (err) {
    console.log("Oops, unable to copy");
  }
};

copyTextareaBtn.addEventListener("click", copyBarra);

//circle animation()

const cirlce1 = document.querySelector(".circle1");
const cirlce2 = document.querySelector(".circle2");
const cirlce3 = document.querySelector(".circle3");
const cirlce4 = document.querySelector(".circle4");
const cirlce5 = document.querySelector(".circle5");

console.dir(result);
console.log(result.value);
