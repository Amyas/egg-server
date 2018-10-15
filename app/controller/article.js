'use strict';

module.exports = app => {
  class ArticleController extends app.Controller {
    async index() {
      const { ctx } = this;
      const { Article } = ctx.model;
      const query = ctx.request.query;

      const { pageNumber, pageSize, sortBy, orderBy, filter } = ctx.handleQuery(query);

      const [ items, total ] = await Promise.all([
        Article.find(filter)
          .skip((pageNumber - 1) * pageSize)
          .limit(pageSize)
          .sort({ [sortBy]: orderBy }),
        Article.count(filter),
      ]);

      ctx.body = {
        items,
        total,
      };
    }
    async create() {
      const { ctx } = this;
      const { Article } = ctx.model;
      const data = ctx.request.body;

      const rule = {
        title: { type: 'string', required: true },
        intro: { type: 'string', required: true },
        content: { type: 'string', required: true },
      };

      ctx.validate(rule, data);

      const article = await Article.create(data);
      ctx.body = {
        article,
      };
    }
    async destroy() {
      const { ctx } = this;
      const { Article } = ctx.model;

      const article = await Article.findByIdAndDelete(ctx.params.id);
      if (!article) {
        throw ctx.createHttpError('该文章不存在!');
      }

      ctx.body = {
        article,
      };
    }
    async update() {
      const { ctx } = this;
      const { Article } = ctx.model;
      const { id } = ctx.params;
      const data = ctx.request.body;

      const article = await Article.findByIdAndUpdate(id, { $set: data }, { new: true });
      if (!article) {
        throw ctx.createHttpError('该文章不存在!');
      }
      ctx.body = {
        article,
      };
    }
    async show() {
      const { ctx } = this;
      const { Article } = ctx.model;

      const item = await Article.findById(ctx.params.id);
      if (!item) {
        throw ctx.createHttpError('该文章不勋在!');
      }

      ctx.body = {
        item,
      };
    }
  }

  return ArticleController;
};

