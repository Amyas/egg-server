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
  handleQuery(query) {
    return {
      pageNumber: Number(query.pageNumber) || 1, // 页数
      pageSize: Number(query.pageSize) || 20, // 每页个数
      sortBy: query.sortBy || 'createTime', // 排序字段
      orderBy: Number(query.orderBy) || -1, // 1=升序，-1=降序
    };
  },
};
