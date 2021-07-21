const { getConection } = require("../confing/dbConection");
const { sortCurrencies } = require("../utils/functions");

const pool = getConection();

const addCryptocurrencyToUser = async (req, res) => {
	try {
    
    const { cryptocurrency_id } = req.body;
		
    await pool.query('select negocio.addCryptoCurrenciesToUser($1, $2);', [req.user.username, cryptocurrency_id]);
		
		res.status(200).send({ success: true, 
                           res: { 
                             currency_id: req.cryptocurrency_id, 
                             user: req.user
                            },
                            message: 'Cryptocurrency added.'
                          });
	} catch (err) {
		res.status(400).send({ success: false, res: null, message: err.message });
	}
}

const getTopCryptocurrencies = async (req, res) => {
  try {
    const { order } = req.query;

    const data = await pool.query(`select co.id,
                                          co.symbol, 
                                          ct.currency, 
                                          cd.current_price, 
                                          co.name, 
                                          co.image, 
                                          cd.last_updated
                      from negocio.users u,
                            negocio.user_cryptocurrencies uc,
                            negocio.coins co,
                            negocio.coin_details cd,
                            negocio.currency_types ct
                      where u.id = uc.user_id
                      and uc.cryptocurrencies_id = cd.id
                      and co.id = cd.id
                      and ct.id = cd.currency_type_id
                      and u.username = $1
                      limit 25 * (select count(*) from negocio.currency_types);`, 
                      [req.user.username]);

    const { rows } = data;

    const currenciesArs = rows.filter(el => el.currency == "ARS")
    const currenciesUsd = rows.filter(el => el.currency == "USD")
    const currenciesEur = rows.filter(el => el.currency == "EUR")

    let currenciesData = [];

    for(let el of currenciesArs) {
      let { id,
        symbol,
        currency,
        current_price,
        name,
        image,
        last_updated } = el;

      console.log(id, symbol, currency)

      currenciesData.push({id, 
                          symbol,
                          current_price_ars: current_price,
                          current_price_eur: null,
                          current_price_usd: null,
                          name,
                          image,
                          last_updated});
    };

    currenciesData.forEach(el => {
      currenciesUsd.forEach(el2 => {
        if(el.id == el2.id)
          el.current_price_usd = el2.current_price;
      })
    })

    currenciesData.forEach(el => {
      currenciesEur.forEach(el2 => {
        if(el.id == el2.id)
          el.current_price_eur = el2.current_price;
      })
    })

    currenciesData = sortCurrencies(currenciesData, req.user.preference_currency_id, order);

    res.status(200).send(currenciesData);
  } catch (err) {
    res.status(500).send(err);
  }
}

module.exports = {
	addCryptocurrencyToUser,
  getTopCryptocurrencies
}