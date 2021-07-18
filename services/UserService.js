const { getConection } = require("../confing/dbConection");

const pool = getConection();

const createUser = async (req, res) => {
	try {
		const {
			name,
			surname,
			username,
			password,
			favorite_coin
		} = req.body;

		await pool.query('select negocio.create_user($1,$2,$3,$4,$5);', [name, surname, username, password, favorite_coin]);
		
		res.send({ success: true, message: 'User created.'});
	} catch (err) {
		res.status(400).send({ success: false, res: null, message: err.message });
	}
}

module.exports = {
	createUser
}