const jwt = require('jsonwebtoken');

const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.SECRET, { expiresIn: '5m' })
}

module.exports = {
  generateAccessToken
}