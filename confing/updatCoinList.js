const { getConection } = require('./dbConection');

const { CoinGeckoService } = require('../services');

const updateCoinListDB = async () => {
  try {
    const Pool = getConection();

    const dataCoins = await CoinGeckoService.getCoins();
    const coins = await dataCoins.json();
  
    await Pool.query("select negocio.update_coins($1)", [JSON.stringify(coins)]);

    await Pool.query("select negocio.update_coin_details($1, $2)", [JSON.stringify(coins), "USD"]);
    await Pool.query("select negocio.update_coin_details($1, $2)", [JSON.stringify(coins), "EUR"]);
    await Pool.query("select negocio.update_coin_details($1, $2)", [JSON.stringify(coins), "ARS"]);

    /*
    for(const idx  in coinList) {
      console.log(field)
      const dataCoin = await CoinGeckoService.getCoin(field.id);
      const coin = await dataCoin.json();
  
      //const { ars, usd, eur } = coin.market_data.current_price;

      console.log(coin);
  
      //await Pool.query("select negocio.update_coin_detail($1,$2,$3,$4,$5)", [coin.id, ars, usd, eur, coin.last_updated])
    }*/

    console.info('All coins was populated.');
  } catch (error) {
    console.error(error.message);
  }
}

module.exports = {
  updateCoinListDB
}