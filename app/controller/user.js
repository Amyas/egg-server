'use strict';

module.exports = app => {
  class UserController extends app.Controller {
    async create() {
      const { ctx } = this;
      const { User } = ctx.model;

      const data = ctx.request.body;
      const rule = {
        nickName: { type: 'string', required: true },
        username: { type: 'string', required: true },
        password: { type: 'string', required: true },
      };

      ctx.validate(rule, data);

      try {
        const user = await User.create(data);
        ctx.body = {
          user,
        };
      } catch (error) {
        if (error.code === 11000) {
          throw ctx.createHttpError('该用户已存在!');
        }
      }

    }
    async destroy() {
      const { ctx } = this;
      const { User } = ctx.model;

      const user = await User.findByIdAndDelete(ctx.params.id);
      if (!user) {
        throw ctx.createHttpError('该用户不存在!');
      }

      ctx.body = {
        user,
      };
    }
    async destroyBatch() {
      const { ctx } = this;
      const { User } = ctx.model;

      const data = ctx.request.body;

      console.log(data);

      const removeUsers = [];
      for (const item of data) {
        const user = await User.findByIdAndDelete(item._id);
        removeUsers.push(user);
      }

      ctx.body = {
        removeUsers,
      };
    }
    async update() {
      const { ctx } = this;
      const { User } = ctx.model;
      const { id } = ctx.params;
      const data = ctx.request.body;

      delete data.username;
      const user = await User.findByIdAndUpdate(id, { $set: data }, { new: true });
      if (!user) {
        throw ctx.createHttpError('该用户不存在!');
      }
      ctx.body = {
        user,
      };
    }
    async show() {
      const { ctx } = this;
      const { User } = ctx.model;

      const user = await User.findById(ctx.params.id);
      if (!user) {
        throw ctx.createHttpError('该用户不存在!');
      }

      ctx.body = {
        user,
      };
    }
    async index() {
      const { ctx } = this;
      const { User } = ctx.model;
      const query = ctx.request.query;

      const { pageNumber, pageSize, sortBy, orderBy, filter } = ctx.handleQuery(query);

      const [ users, total ] = await Promise.all([
        User.find(filter)
          .skip((pageNumber - 1) * pageSize)// 跳过文档个数，第一页 = (1-1) * 20 = 0，第二页 = (2-1) * 20 = 20 跳过前20条数据 以此类推
          .limit(pageSize)// 限制显示文档个数
          .sort({ [sortBy]: orderBy }), // sortBy=排序字段，orderBy= 1升序 -1降序
        User.count(filter),
      ]);

      ctx.body = {
        users,
        total,
      };
    }
    async login() {
      const { ctx } = this;
      const { User } = ctx.model;

      const data = ctx.request.body;

      const user = await User.findOne({
        username: data.username,
        password: data.password,
      });

      if (!user) {
        throw ctx.createHttpError('账号密码错误!');
      }

      const token = ctx.signTokenWidthJTW({ _id: user._id, password: data.password });

      ctx.body = {
        user,
        token,
      };
    }
  }

  return UserController;
};
