const orderAscArs = (a, b) => (a.current_price_ars - b.current_price_ars);
const orderDesArs = (a, b) => (b.current_price_ars - a.current_price_ars);

const orderAscEur = (a, b) => (a.current_price_eur - b.current_price_eur);
const orderDesEur = (a, b) => (b.current_price_ars - a.current_price_ars);

const orderAscUsd = (a, b) => (a.current_price_usd - b.current_price_usd);
const orderDesUsd = (a, b) => (b.current_price_ars - a.current_price_ars);


const orderByCurrency = [[orderDesArs,orderAscArs], [orderDesEur, orderAscEur], [orderDesUsd,orderAscUsd]];

const sortCurrencies = (arr, preferenceCurrency, order = 'des') => {

  if (order != 'asc')
    return arr.sort(orderByCurrency[preferenceCurrency - 1][0]);
  return arr.sort(orderByCurrency[preferenceCurrency - 1][1]);
}

const isEmpty = (obj) => {
  for(var key in obj) {
      if(obj.hasOwnProperty(key))
          return false;
  }
  return true;
}

const isset = (nameIn) => {
  return !(isEmpty(nameIn) || typeof nameIn == undefined || nameIn == null || nameIn.length == 0);
}

module.exports = {
  isset,
  sortCurrencies
}