const { getConection } = require("../confing/dbConection");

const pool = getConection();

const getCryptoCurrencies = async (req, res) => {
	try {

		const data = await pool.query('select negocio.getCryptoCurrencies($1);', [req.user.username]);

		const { getcryptocurrencies } = data.rows[0];
		
		res.status(200).send({ success: true, currencies: getcryptocurrencies, user: req.user, message: 'Currencies listed.'});
	} catch (err) {
		res.status(400).send({ success: false, res: null, message: err.message });
	}
}

module.exports = {
	getCryptoCurrencies
}