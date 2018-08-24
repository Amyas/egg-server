'use strict';

module.exports = () => {
  return async function(ctx, next) {
    try {
      await next();
    } catch (err) {
      ctx.app.emit('error', err, ctx);

      ctx.status = err.statusCode || 500;

      ctx.body = {
        errMsg: err.message,
      };
    }
  };
};

