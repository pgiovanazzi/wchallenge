const jwt = require('jsonwebtoken');

const validateToken = (req, res, next) => {
  const accessToken = req.headers['authorization'];
  if (!accessToken) res.json({ message: 'Access denied.' });
  
  jwt.verify(accessToken, process.env.SECRET, (err, user) => {
    if (err) {
      res.json({ message: 'Access denied, token expired or incorrect.' })
    } else {
      next();
    }
  })
}

module.exports = {
  validateToken
}