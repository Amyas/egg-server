'use strict';

module.exports = app => {
  class UserController extends app.Controller {
    async create() {
      const { ctx } = this;
      const { User } = ctx.model;

      const { body } = ctx.request;
      const rule = {
        username: { type: 'string', required: true },
        password: { type: 'string', required: true },
        checkPassword: { type: 'string', required: true },
      };

      ctx.validate(rule, body);

      const user = await User.findOne({ username: body.username });

      if (user) {
        throw new Error('已经存在相同用户名！');
      }

      const item = await User.create(body);

      ctx.body = {
        item,
      };
    }
    async destroy() {
      const { ctx } = this;
      const { User } = ctx.model;

      const user = await User.findByIdAndDelete(ctx.params.id);

      if (!user) {
        throw new Error('该用户不存在！');
      }

      ctx.body = user;
    }
    async update() {
      const { ctx } = this;
      const { User } = ctx.model;
      const { body } = ctx.request;

      const user = await User.findByIdAndUpdate(ctx.params.id, { password: body.password }, { new: true });
      if (!user) {
        throw new Error('该用户不存在！');
      }

      ctx.body = user;
    }
    async show() {
      const { ctx } = this;
      const { User } = ctx.model;

      const user = await User.findById(ctx.params.id);
      if (!user) {
        throw new Error('该用户不存在！');
      }

      ctx.body = user;
    }
    async index() {
      const { ctx } = this;
      const { User } = ctx.model;

      const users = await User.find();

      ctx.body = users;
    }
  }

  return UserController;
};
