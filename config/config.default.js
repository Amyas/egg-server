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

  // axios
  // config.http = {
  //   headers: {
  //     Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIyYzBmMDM3MC01ZmZkLTAxMzYtMDhhZi0wYTk3YTY1ODViMzkiLCJpc3MiOiJnYW1lbG9ja2VyIiwiaWF0IjoxNTMwNTE4OTcxLCJwdWIiOiJibHVlaG9sZSIsInRpdGxlIjoicHViZyIsImFwcCI6IjcwNzgwNDA1Mi1xcS1jb20tcy1hcHAifQ.xkMJJ66SXMXUt4E9VD9_LMoby79LcGa1SVZ3YLcvRLw',
  //     accept: 'application/vnd.api+json',
  //     common: {
  //       'Content-Type': 'application/json; charset=UTF-8',
  //     },
  //   },
  //   timeout: 10000,
  // };

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
