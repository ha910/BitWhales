import "core-js/stable";
import "regenerator-runtime/runtime";
import anime from "animejs/lib/anime.es.js";

if (module.hot) {
  module.hot.accept();
}

//market//////////////////////////////////////////////////
const input = document.querySelector("#crypto");
const form = document.querySelector("form");
const rendered = document.querySelector(".rendered-data");
const loader = document.querySelector(".loader");

const cryptoData = async function (id) {
  try {
    loader.style.display = "block"; // show the loader
    rendered.style.display = "none"; // hide the rendered data
    setTimeout(() => {
      loader.style.display = "none"; // hide the loader after 4 seconds
      rendered.style.display = "block"; // show the rendered data
    }, 4000);
    const res = await fetch(`https://api.coincap.io/v2/assets/${id}`);
    if (!res.ok) throw new Error(`${data.message} (${get.status})`);
    const { data } = await res.json();
    console.log(data);
    if (res.ok)
      rendered.innerHTML = `${data.id.toUpperCase()} [${
        data.symbol
      }] render successfull 
    <br> <br> Current price is $${data.priceUsd.slice(0, 6)}
    <br> <br> Current rank by MC is #${data.rank}
    <br> <br> MC (MarketCap) is $${Number(data.marketCapUsd).toLocaleString()}`;
  } catch (err) {
    rendered.innerHTML = `Please, try again. Invalid data.`;
  }
};

if (!form) return; //fixed `Cannot read property 'addEventListener' of null` error on index.html
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const crypto = input.value;
  cryptoData(crypto);
  input.value = "";
});
