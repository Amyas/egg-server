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

      ctx.body = user;
    }
    async update() {
      const { ctx } = this;
      const { User } = ctx.model;
      const { id } = ctx.params;
      const data = ctx.request.body;

      delete data.username;
      const user = await User.findByIdAndUpdate(id, data, { new: true });
      if (!user) {
        throw ctx.createHttpError('您的账号不存在!');
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

      ctx.body = user;
    }
    async index() {
      const { ctx } = this;
      const { User } = ctx.model;

      const users = await User.find();

      ctx.body = {
        users,
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
        throw ctx.createHttpError('账号密码错误');
      }

      const token = ctx.signTokenWidthJTW({ _id: user._id, password: data.password });

      ctx.cookies.set('token', token);

      ctx.body = {
        user,
      };
    }
  }

  return UserController;
};
