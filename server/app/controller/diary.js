'use strict';

const Controller = require('egg').Controller;
class DiaryController extends Controller {
  async create() {
    const {
      ctx,
    } = this;
    const created = await ctx.service.diary.create(ctx.request.body);
    ctx.status = 201;
    ctx.body = created;
  }

  async index() {
    const {
      ctx,
    } = this;
    const res = await ctx.service.diary.index(ctx.query);
    ctx.body = res;
  }

  async destroy() {
    const {
      ctx,
    } = this;
    const id = +ctx.params.id;
    const res = await ctx.service.diary.del({
      id,
    });
    ctx.status = 200;
    ctx.body = res;
  }

  async update() {
    const {
      ctx,
    } = this;
    const id = +ctx.params.id;
    const body = ctx.request.body;
    ctx.body = await ctx.service.diary.update({
      id,
      updates: body,
    });
  }

  async find() {
    const {
      ctx,
    } = this;
    const user_id = ctx.params.user_id;
    ctx.body = await ctx.service.diary.findByUserId(user_id, ctx.querystring === 'private');
  }
}

module.exports = DiaryController;
