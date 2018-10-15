'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  // 登录
  router.post('/api/login', 'user.login');

  // 用户增删改查
  router.resources('/user', '/api/user', controller.user);
  // 用户批量删除
  router.post('/api/user/destroyBatch', 'user.destroyBatch');

  // 文章增删改查
  router.resources('/article', '/api/article', controller.article);
};
