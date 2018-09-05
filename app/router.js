'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  router.resources('/user', '/api/user', controller.user);
  router.post('/api/login', 'user.login');
  router.post('/api/user/destroyBatch', 'user.destroyBatch');


  router.resources('/article', '/api/article', controller.article);
};
