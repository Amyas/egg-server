'use strict';

const jwt = require('jsonwebtoken');

module.exports = {
  createHttpError(msg, statusCode = 400) {
    const error = new Error(msg);
    error.statusCode = statusCode;
    return error;
  },
  signTokenWidthJTW(params, time = '30d') {
    const secrets = this.app.config.auth.secrets;
    return jwt.sign(params, secrets, { expiresIn: time });
  },
};
