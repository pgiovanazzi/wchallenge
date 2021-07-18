const jwt = require('jsonwebtoken');

const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.SECRET, { expiresIn: '3m' })
}

module.exports = {
  generateAccessToken
}