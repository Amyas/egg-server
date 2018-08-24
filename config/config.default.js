'use strict';

module.exports = appInfo => {
  const config = exports = {};

  config.keys = appInfo.name + '_1534500367073_3865';

  config.middleware = [ 'errorHandle' ];

  config.security = {
    csrf: false,
  };

  const db = {
    host: '127.0.0.1',
    port: '27017',
    name: 'blog',
  };

  config.mongoose = {
    url: `mongodb://${db.host}:${db.port}/${db.name}`,
  };

  return config;
};