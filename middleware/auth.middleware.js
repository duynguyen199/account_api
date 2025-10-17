
const { SECRET_KEY } = require('../configs/configuration');
const ErrorResponse = require('../helpers/ErrorResponse');
const accountModel = require('../model/account.model');
const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new ErrorResponse(401, 'Unauthorized');
  }

  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    throw new ErrorResponse(401, 'Unauthorized');
  }

  const payload = jwt.verify(token, SECRET_KEY);

  if (!payload) {
    throw new ErrorResponse(403, 'Forbidden');
  }

  //check database
  const account = await accountModel.findById(payload._id);

  if (!account) {
    throw new ErrorResponse(404, 'Not Found');
  }

  req.account = account;
  next();
};