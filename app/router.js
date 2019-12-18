'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  // 测试
  router.resources('/test', controller.test);

  // 登录
  router.post('/api/login', 'user.login');

  // 用户增删改查
  router.resources('/user', '/api/user', controller.user);
  // 用户批量删除
  router.post('/api/user/destroyBatch', 'user.destroyBatch');

  // 文章增删改查
  router.resources('/article', '/api/article', controller.article);

  // 获取赛季列表
  router.get('/pubg/seasons', controller.pubg.seasons);
  // 获取玩家信息
  router.get('/pubg/player', controller.pubg.player);
  // 获取玩家赛季信息
  router.get('/pubg/getPlayerSeasonInfo', controller.pubg.getPlayerSeasonInfo);
  // 获取比赛信息
  router.get('/pubg/matches/:id', controller.pubg.matches);
};
