"use strict"

var express = require('express');
var router = express.Router();

const { 
  UserController, 
  LoginController, 
  CryptoCurrencyController 
} = require("../controller");

const { Auth } = require('../middleware');
const { route } = require('./users');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/user', UserController.createUser);

router.post('/login', LoginController.auth);

router.get('/crypto-currencies', Auth.validateToken, CryptoCurrencyController.getCryptoCurrencies);

module.exports = router;
