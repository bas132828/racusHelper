"use strict";
const rate = document.querySelector(".rate");
const result = document.querySelector(".result");
const btn = document.querySelector(".btn");
let val = document.querySelector(".price");
const text = document.querySelector(".quote");
const nuts = document.querySelector(".imageW");

let usdPrice;

const renewPage = function () {
  document.querySelector(".price").value = "";
};

renewPage();
const usdValue = async function () {
  const resp = await fetch("https://www.cbr-xml-daily.ru/daily_json.js");
  const data = await resp.json();
  // console.log(data)
  // console.log(data.Valute.USD.Value);
  usdPrice = data.Valute.USD.Value;
  rate.textContent = usdPrice;
};

usdValue();

const render = function (str) {
  text.textContent = str;
};

//advice
async function apiAdvice() {
  const resp = await fetch("https://api.adviceslip.com/advice");

  const data = await resp.json();

  console.log(data.slip.advice);
  render(`${data.slip.advice}`);
}
apiAdvice();

const calc = function (e) {
  e.preventDefault;
  const value = document.querySelector(".price").value;

  if (!Number(val.value)) return renewPage();

  const toPay = Number(usdPrice) * Number(value);
  result.textContent = `${Math.trunc(toPay)} руб. ${
    Math.trunc(toPay * 100) % 100
  } коп.`;
  apiAdvice();

  // console.log(toPay);
  // if (toPay > 100000) {
  //   nuts.style.display = "flex";
  //   setTimeout(() => (nuts.style.display = "none"), 50);
  // }
};

btn.addEventListener("click", calc);

//copy to clipboard feature

const copyTextareaBtn = document.querySelector(".js-textareacopybtn");

copyTextareaBtn.addEventListener("click", function (event) {
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

  //clears value in USD after using clipboard
  val.value = "";
});

//circle animation()

const cirlce1 = document.querySelector(".circle1");
const cirlce2 = document.querySelector(".circle2");
const cirlce3 = document.querySelector(".circle3");
const cirlce4 = document.querySelector(".circle4");
const cirlce5 = document.querySelector(".circle5");

console.log(cirlce1);
