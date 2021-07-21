const { isset } = require('../utils/functions');

const validateReqAddUserCryptocurrency = (req) => {
    let msjError = null;
    const { cryptocurrency_id } = req.body;

		!isset(cryptocurrency_id)
    ? msjError = 'The field cryptocurrency_id is requiered.'
    : null;

    return msjError;
}


module.exports = {
  validateReqAddUserCryptocurrency
}