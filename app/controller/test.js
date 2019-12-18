'use strict';
let val = null;
module.exports = app => {
  class TestController extends app.Controller {
    async index() {
      const { ctx } = this;

      ctx.body = {
        val,
      };
    }
    async create() {
      const { ctx } = this;
      const data = ctx.request.body;
      val = data;
      console.log('@@@@@@', data);
      ctx.body = {
        val,
      };
    }
  }

  return TestController;
};

