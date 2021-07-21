const jwt = require('jsonwebtoken');

const validateToken = (req, res, next) => {
  const accessToken = req.headers['authorization'];
  if (!accessToken) res.sendStatus(403).json({ message: 'Access denied.' });
  
  jwt.verify(accessToken, process.env.SECRET, (err, user) => {
    if (err) {
      res.status(403).json({ message: 'Access denied, token expired or incorrect.' })
    } else {
      req.user = user;
      next();
    }
  })
}

module.exports = {
  validateToken
}