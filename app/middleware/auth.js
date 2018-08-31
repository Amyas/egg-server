'use strict';

const jwt = require('jsonwebtoken');

module.exports = option => {
  return async function(ctx, next) {
    const { User } = ctx.model;
    const { headers, url } = ctx.request;
    const secrets = option.secrets;
    const token = headers.authorization;

    // 调试
    await next();
    return;

    if (url === '/api/login') {
      await next();
      return;
    }

    if (!token) {
      throw ctx.createHttpError('token不存在!');
    }

    let decoded;
    try {
      decoded = jwt.verify(token, secrets);
    } catch (error) {
      throw ctx.createHttpError(`token验证错误:${error}`);
    }

    if (!decoded.password) {
      throw ctx.createHttpError('无效的token!');
    }

    const user = await User.findOne({
      _id: decoded._id,
    });

    if (!user) {
      throw ctx.createHttpError('找不到该用户或已被禁用!');
    }

    if (user.password !== decoded.password) {
      throw ctx.createHttpError('密码已被修改!');
    }

    await next();
  };
};

