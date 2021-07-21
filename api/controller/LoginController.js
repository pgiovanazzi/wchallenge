const { LoginService } = require("../services");
const { isset } = require('../utils/functions');

const auth = async (req, res) => {
        try {

            const { username, password } = req.body;

            if (!isset(username) || !isset(password))
                return res.status(200).send({ success: false, message: 'Some field is empty.' });

            const data = await LoginService.auth(req, res);

            res.status(200).send(data);
        } catch (err) {
            res.status(500).send(err);
        }
    }

module.exports = {
  auth
}