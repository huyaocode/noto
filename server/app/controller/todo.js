'use strict';

const Controller = require('egg').Controller;

class TodoController extends Controller {
  async create() {
    this.ctx.body = await this.ctx.service.todo.create();
  }

  async destroy() {
    const {
      ctx,
    } = this;
    const id = +ctx.params.id;
    ctx.body = await ctx.service.todo.del({
      id
    });
  }

  async get() {
    const {
      ctx,
    } = this;
    ctx.body = await ctx.service.todo.get();
  }

  async update() {
    const {
      ctx,
    } = this;
    const id = +ctx.params.id;
    this.ctx.body = await this.ctx.service.todo.update({id});
  }
}

module.exports = TodoController;
