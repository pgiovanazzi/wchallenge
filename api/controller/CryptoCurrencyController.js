const { CryptoCurrencyService } = require("../services");

const getCryptoCurrencies = async (req, res) => {
        try {
            const data = await CryptoCurrencyService.getCryptoCurrencies(req, res);

            res.status(200).send(data);
        } catch (err) {
            res.status(500).send(err);
        }
    }

module.exports = {
  getCryptoCurrencies
}