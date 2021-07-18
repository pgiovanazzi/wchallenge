const { getConection } = require("../confing/dbConection");
const { Auth } = require('../utils');

const pool = getConection();

const auth = async (req, res) => {
	try {
		const {
			username,
			password,
		} = req.body;

		const { id, person_id, preference_currency_id } = (await pool.query('select negocio.auth($1, $2);', [ username, password ])).rows[0].auth;
    
    const accessToken = Auth.generateAccessToken({ id, username, person_id, preference_currency_id });

    res.header('authorization', accessToken).json({ 
      success: true, 
      user: { id, username, person_id, preference_currency_id },
      token: accessToken,
      message: 'User authenticated'});
	} catch (err) {
		res.status(400).send({ success: false, res: null, message: err.message });
	}
}

module.exports = {
	auth
}