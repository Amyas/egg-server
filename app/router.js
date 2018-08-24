'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  router.post('/api/login', controller.user.login);
  router.post('/api/user/destroyBatch', 'user.destroyBatch');
  router.resources('/user', '/api/user', controller.user);
};
