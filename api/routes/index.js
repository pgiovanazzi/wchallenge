"use strict"

var express = require('express');
var wChallengeRouter = express.Router();

const { 
  UserController, 
  LoginController, 
  CryptoCurrencyController,
  UserCryptocurrencyController
} = require("../controller");

const { Auth } = require('../middleware');

/* GET home page. */
wChallengeRouter.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

wChallengeRouter.post('/user', UserController.createUser);

wChallengeRouter.post('/login', LoginController.auth);

wChallengeRouter.get('/crypto-currencies', Auth.validateToken, CryptoCurrencyController.getCryptoCurrencies);

wChallengeRouter.post('/user-cryptocurrency', Auth.validateToken, UserCryptocurrencyController.addCryptocurrencyToUser);

wChallengeRouter.get('/user-cryptocurrencies', Auth.validateToken, UserCryptocurrencyController.getTopCryptocurrencies);

module.exports = wChallengeRouter;
