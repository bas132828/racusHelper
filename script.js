'use strict'
const rate = document.querySelector('.rate');

const result = document.querySelector('.result');
const btn = document.querySelector('.btn');
let val = document.querySelector('.price') ;
let usdPrice;


const renewPage = function() {
    document.querySelector('.price').value = 0;
}


renewPage();

const usdValue = async function () {
    const resp = await fetch("https://www.cbr-xml-daily.ru/daily_json.js");
    const data = await resp.json();
    // console.log(data)
    console.log(data.Valute.USD.Value);
    usdPrice = data.Valute.USD.Value;
    rate.textContent = usdPrice;
    };

usdValue();


const calc = function(e) {
 e.preventDefault;
 const value =document.querySelector('.price').value;
 const toPay = Number(usdPrice)*Number(value)
 result.textContent = `${toPay.toFixed(0)} руб. ${toPay.toFixed(2).slice(-2)} коп.`

}

btn.addEventListener('click', calc)

var copyTextareaBtn = document.querySelector('.js-textareacopybtn');

copyTextareaBtn.addEventListener('click', function(event) {
  var copyTextarea = document.querySelector('.js-copytextarea');
  copyTextarea.focus();
  copyTextarea.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Copying text command was ' + msg);
  } catch (err) {
    console.log('Oops, unable to copy');
  }
});