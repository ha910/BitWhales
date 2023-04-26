import 'core-js/stable';
import 'regenerator-runtime/runtime';
import anime from 'animejs/lib/anime.es.js';

//market//////////////////////////////////////////////////
const input = document.querySelector('#crypto')
const form = document.querySelector('form');
const rendered = document.querySelector('.rendered-data')


const cryptoData = async function (id) {
    try{
     const res = await fetch(`https://api.coincap.io/v2/assets/${id}`)
    if(!res.ok) throw new Error('Something went wrong') 
    const {data} = await res.json()
    if(res.ok) (rendered.innerHTML = `${data.id.toUpperCase()} [${data.symbol}] render successfull 
    <br> <br> Current price is $${data.priceUsd.slice(0, 6)}`)
} catch (err) {
    rendered.innerHTML = (`${err.message}, Please try again`);
}}

if(!form) return //fixed `Cannot read property 'addEventListener' of null` error on index.html
form.addEventListener('submit', function (e) {
    e.preventDefault();
    const crypto = input.value;
    cryptoData(crypto);
    input.value = '';
  });
  
  
