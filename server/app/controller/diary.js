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
    const id = ctx.params.id;
    const user_id = +ctx.params.user_id;
    const res = await ctx.service.diary.del({
      id,
      user_id,
    });
    ctx.status = 200;
    ctx.body = res;
  }

  async update() {
    const {
      ctx,
    } = this;
    const id = ctx.params.id;
    const user_id = +ctx.params.user_id;
    const body = ctx.request.body;
    ctx.body = await ctx.service.diary.update({
      id,
      user_id,
      updates: body,
    });
  }

  async find() {
    const {
      ctx,
    } = this;
    const id = ctx.params.id;
    ctx.body = await ctx.service.diary.find(id);
  }

  async edit() {
    const {
      ctx,
    } = this;
    const id = ctx.params.id;
    ctx.body = await ctx.service.diary.edit(id);
  }

  async tags() {
    const {
      ctx,
    } = this;
    ctx.body = await ctx.service.diary.getTags();
  }

  async archive() {
    const {
      ctx,
    } = this;
    const year = ctx.query.year;
    ctx.body = await ctx.service.diary.archive(year);
  }
}

module.exports = DiaryController;
