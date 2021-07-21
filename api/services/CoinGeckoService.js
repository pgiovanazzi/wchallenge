const fetch = require('node-fetch');
const apiCoins = "https://api.coingecko.com/api/v3/coins/markets";

const getHeader = {
    Accept: "application/json",
    "Content-Type": "application/json; charset=utf-8"
  }

const options = {
    method: 'GET',
    headers: getHeader
}

const getCoins = (currency, page) => {
  return fetch(`${apiCoins}?vs_currency=${currency}&order=market_cap_desc&per_page=250&page=${page}&sparkline=false`, options);
}

module.exports = {
  getCoins
}