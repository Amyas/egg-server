'use strict';

module.exports = appInfo => {
  const config = exports = {};

  config.keys = appInfo.name + '_1534500367073_3865';

  config.middleware = [ 'errorHandle', 'auth' ];

  config.security = {
    csrf: {
      enable: false,
    },
  };

  // config.cors = {
  //   origin: 'http://127.0.0.1:8080',
  //   allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  // };

  config.auth = {
    secrets: 'amyas',
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
