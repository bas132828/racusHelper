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
 result.textContent = toPay.toFixed(2)

}

btn.addEventListener('click', calc)