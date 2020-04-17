'use strict';

const Controller = require('egg').Controller;

class CommentController extends Controller {
  async create() {
    const {
      ctx,
    } = this;
    const {
      diary_id,
      user_id,
      content,
    } = ctx.request.body;
    ctx.body = await ctx.service.comment.create({
      diary_id,
      user_id,
      content,
    });
  }

  async destroy() {
    const {
      ctx,
    } = this;
    const id = +ctx.params.id;
    const user_id = +ctx.params.user_id;
    ctx.body = await ctx.service.comment.del({
      id,
      user_id,
    });
  }

  async get() {
    const {
      ctx,
    } = this;
    const diary_id = +ctx.params.diary_id;
    ctx.body = await ctx.service.comment.get({
      diary_id,
    });
  }
}

module.exports = CommentController;
