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
    const newQuery = Object.assign({}, query);
    const result = {
      pageNumber: Number(newQuery.pageNumber) || 1, // 页数
      pageSize: Number(newQuery.pageSize) || 20, // 每页个数
      sortBy: newQuery.sortBy || 'createTime', // 排序字段
      orderBy: Number(newQuery.orderBy) || -1, // 1=升序，-1=降序
    };

    delete newQuery.pageNumber;
    delete newQuery.pageSize;
    delete newQuery.sortBy;
    delete newQuery.orderBy;

    result.filter = newQuery;

    return result;
  },
};
