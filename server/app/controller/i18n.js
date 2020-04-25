'use strict';

const Controller = require('egg').Controller;

class I18nController extends Controller {
  async create() {
    this.ctx.body = await this.ctx.service.i18n.create();
  }

  async destroy() {
    const {
      ctx,
    } = this;
    const id = ctx.params.id;
    ctx.body = await ctx.service.i18n.del({
      id
    });
  }

  async get() {
    const {
      ctx,
    } = this;

    ctx.body = await ctx.service.i18n.get();
  }

  async update() {
    const {
      ctx,
    } = this;
    const id = ctx.params.id;
    this.ctx.body = await this.ctx.service.i18n.update({id});
  }
}

module.exports = I18nController;
