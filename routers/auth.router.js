const { login, activeAccount, register } = require("../controllers/auth.controller");
const express = require('express');
const asyncMiddleware = require("../middleware/async.middleware.js");
const authRouter = express.Router();

authRouter.post(
  '/login',
  (req, res, next) => {
    console.log('hello');

    next();
  },
  asyncMiddleware(login),
);
authRouter.post('/register',  (req, res, next) => {
  console.log('hello');

  next()}, asyncMiddleware(register));

authRouter.get('/activate/:token', asyncMiddleware(activeAccount));

module.exports = authRouter;