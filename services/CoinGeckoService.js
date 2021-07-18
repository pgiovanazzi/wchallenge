const fetch = require('node-fetch');
const apiCoinList = "https://api.coingecko.com/api/v3/coins/list";
const apiCoinPrice = "https://api.coingecko.com/api/v3/simple/price";


const getHeader = {
    Accept: "application/json",
    "Content-Type": "application/json; charset=utf-8",
    "cache-control": "max-age=30, public, must-revalidate, s-maxage=60"
  }

const options = {
    method: 'GET',
    headers: getHeader
}

const getCoinList = () => {
  return fetch(apiCoinList, options);
}

const getCoinPrice= (id, money) => {
  return fetch(apiCoinPrice + `?ids=${id}&vs_currencies=${money}&include_market_cap=usd&include_last_updated_at=true`, options);
}


module.exports = {
  getCoinList,
  getCoinPrice
}