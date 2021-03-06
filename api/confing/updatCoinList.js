const { getConection } = require('./dbConection');

const { CoinGeckoService } = require('../services');

const updateCoinListDB = async () => {
  try {
    const Pool = getConection();
    let page = 1;

    let msgLoading = 'Populate coin details ...';
    
    do {
      
      console.log(msgLoading);

      let dataCoins = await CoinGeckoService.getCoins("usd", page);
      let coins = await dataCoins.json();

      if (coins == [])
        break;
    
      await Pool.query("select negocio.update_coins($1)", [JSON.stringify(coins)]);
  
      await Pool.query("select negocio.update_coin_details($1, $2)", [JSON.stringify(coins), "USD"]);
  
      dataCoins = await CoinGeckoService.getCoins("eur");
      coins = await dataCoins.json();
      await Pool.query("select negocio.update_coin_details($1, $2)", [JSON.stringify(coins), "EUR"]);
  
      dataCoins = await CoinGeckoService.getCoins("ars");
      coins = await dataCoins.json();
      await Pool.query("select negocio.update_coin_details($1, $2)", [JSON.stringify(coins), "ARS"]);

      page++;
      msgLoading += '.';
    } while (true);

    console.info('All coins was populated.');
  } catch (error) {
    console.error(error.message);
  }
}

module.exports = {
  updateCoinListDB
}
