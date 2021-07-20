const { getConection } = require('./dbConection');

const { CoinGeckoService } = require('../services');

const updateCoinListDB = async () => {
  try {
    const Pool = getConection();
    let page = 1;

    do {

      let dataCoins = await CoinGeckoService.getCoins("usd", page);
      let coins = await dataCoins.json();

      if (coins == [])
        break;
    
      await Pool.query("select negocio.update_coins($1)", [JSON.stringify(coins)]);

      console.log('Carga coin details ....')
  
      await Pool.query("select negocio.update_coin_details($1, $2)", [JSON.stringify(coins), "USD"]);
  
      dataCoins = await CoinGeckoService.getCoins("eur");
      coins = await dataCoins.json();
      await Pool.query("select negocio.update_coin_details($1, $2)", [JSON.stringify(coins), "EUR"]);
  
      dataCoins = await CoinGeckoService.getCoins("ars");
      coins = await dataCoins.json();
      await Pool.query("select negocio.update_coin_details($1, $2)", [JSON.stringify(coins), "ARS"]);

      page++;
      
    } while (true);

    console.info('All coins was populated.');
  } catch (error) {
    console.error(error.message);
  }
}

module.exports = {
  updateCoinListDB
}