const { UserService } = require("../services");

const createUser = async (req, res) => {
        try {
            const data = await UserService.createUser(req, res);

            res.status(200).send(data);
        } catch (err) {
            res.status(500).send(err);
        }
    }

module.exports = {
    createUser
}