const { UserCryptocurrencyService } = require("../services");
const { UserCryptocurrencyRequest } = require("../requests")
const { isset } = require('../utils/functions')

const addCryptocurrencyToUser = async (req, res) => {
  try {
      const validateReq = UserCryptocurrencyRequest.validateReqAddUserCryptocurrency(req);
      if (isset(validateReq))
        return res.status(200).send({ susscess: false, res: validateReq })

      const data = await UserCryptocurrencyService.addCryptocurrencyToUser(req, res);

      res.status(201).send(data);
  } catch (err) {
      res.status(500).send(err);
  }
}

const getTopCryptocurrencies = async (req, res) => {
  try {
    const data = await UserCryptocurrencyService.getTopCryptocurrencies(req, res);
    
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err);
  }
}

module.exports = {
  addCryptocurrencyToUser,
  getTopCryptocurrencies
}