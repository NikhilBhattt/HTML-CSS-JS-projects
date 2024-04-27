const BASE_URL = 'https://latest.currency-api.pages.dev/v1/currencies/';
const EXTEND_URL = '.json'
const dropdown = document.querySelectorAll(".dropdown select");
const msg = document.querySelector('.msg');
let amount = document.querySelector('input');
let btn = document.querySelector("form button");

window.addEventListener('load', () => {
  updateMsg();
});

for (let drop of dropdown){
  for (let countrycurr in countryList){
    let newOption = document.createElement('option');
    newOption.innerText = countrycurr;
    newOption.value = countrycurr;
    if (drop.name === 'from' && countrycurr==='USD'){
      newOption.selected = 'selected';
    }
    else if (drop.name === 'to' && countrycurr==='INR'){
      newOption.selected = 'selected';
    }
    drop.append(newOption);
  }
  drop.addEventListener('click', (evt) => {
    updateFlag(evt.target);
  });
}

const updateFlag = (node) => {
  let currCode = countryList[node.value];
  let img = document.querySelector(`.${node.getAttribute('name')}-img`);
  img.src =  `https://flagsapi.com/${currCode}/flat/64.png`;
}

btn.addEventListener('click', (evt) => {
  evt.preventDefault();
  updateMsg();
})

const updateMsg = async () => {
  let fromCountry = dropdown[0].value.toLowerCase();
  let toCountry = dropdown[1].value.toLowerCase();
  let URL = BASE_URL+fromCountry+EXTEND_URL;
  let jsonData = await fetch(URL);
  let freshData = await jsonData.json();
  let exchangeRate = freshData[fromCountry][toCountry];
  let get_amount = amount.value;
  let total = (+get_amount*exchangeRate).toFixed(2);
  msg.innerText = `${get_amount} ${fromCountry.toUpperCase()} = ${total}${toCountry.toUpperCase()}`;
}
