const { UserService } = require("../services");
const { isset } = require("../utils/functions");

const createUser = async (req, res) => {
        try {
            const {nombre, apellido, username, password, favorite_coin} = req.body;
            if (!(isset(nombre) 
                 && isset(apellido) 
                 && isset(username) 
                 && isset(password) 
                 && (favorite_coin == 'USD' || favorite_coin == 'ARS' || favorite_coin == 'EUR'))) {
                
                return res.status(200).send({success: false, message: 'Some field is empty.'})
            }

            const data = await UserService.createUser(req, res);

            res.status(201).send(data);
        } catch (err) {
            res.status(500).send(err);
        }
    }

module.exports = {
    createUser
}