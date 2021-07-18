const { LoginService } = require("../services");

const auth = async (req, res) => {
        try {
            const data = await LoginService.auth(req, res);

            res.status(200).send(data);
        } catch (err) {
            res.status(500).send(err);
        }
    }

module.exports = {
  auth
}