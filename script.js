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

 if(!Number(val.value)) return alert ('ему точно буквы в рубли считать?')
 
 const toPay = Number(usdPrice)*Number(value)
 result.textContent = `${Math.trunc(toPay)} руб. ${Math.trunc(toPay*100)%100} коп.`
}

btn.addEventListener('click', calc)


//copy to clipboard feature

const copyTextareaBtn = document.querySelector('.js-textareacopybtn');

copyTextareaBtn.addEventListener('click', function(event) {
  const copyTextarea = document.querySelector('.js-copytextarea');
  copyTextarea.focus();
  copyTextarea.select();

  try {
    const successful = document.execCommand('copy');
    const msg = successful ? 'successful' : 'unsuccessful';
    console.log('Copying text command was ' + msg);
  } catch (err) {
    console.log('Oops, unable to copy');
  }
});