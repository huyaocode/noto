'use strict';

const Service = require('egg').Service;
const { ERROR, SUCCESS } = require('../util/util');

const getUIdFromCookie = require('../util/getUIdFromCookie');

class TodoService extends Service {
  async create() {
    const { ctx } = this;
    const user_id = getUIdFromCookie(ctx.request.header.cookie);

    const { content, start_at, type = 1 } = ctx.request.body;

    try {
      if (!content || !user_id) {
        ctx.status = 400;
        return Object.assign(ERROR);
      }

      const res = await ctx.model.Todo.create({
        user_id,
        content,
        start_at,
        type,
      });

      ctx.status = 201;
      return Object.assign(SUCCESS, {
        id: res.id,
      });
    } catch (error) {
      ctx.status = 500;
      throw error;
    }
  }

  async del({ id }) {
    const { ctx } = this;
    try {
      const user_id = getUIdFromCookie(ctx.request.header.cookie);
      const todo = await ctx.model.Todo.findById(id);
      if (!todo || !user_id) {
        ctx.status = 400;
        return Object.assign(ERROR);
      }
      const res = await todo.destroy();
      ctx.status = 200;
      return Object.assign(SUCCESS);
    } catch (error) {
      ctx.status = 500;
      throw error;
    }
  }

  async get({type}) {
    const { ctx } = this;
    try {
      
      const user_id = getUIdFromCookie(ctx.request.header.cookie);
      if (!user_id) {
        ctx.status = 403;
        return Object.assign(ERROR, {
          msg: 'need login',
        });
      }
      const options = {
        where: {
          user_id,
          type,
        },
      };
      const res = await this.ctx.model.Todo.findAndCountAll(options);
      return Object.assign(SUCCESS, {
        data: res,
      });
    } catch (error) {
      ctx.status = 500;
      return Object.assign(SUCCESS, {
        data: res,
      });
    }
  }

  async update({ id }) {
    const { ctx } = this;
    const user_id = getUIdFromCookie(ctx.request.header.cookie);

    try {
      if (!user_id || !id) {
        ctx.status = 400;
        return Object.assign(ERROR);
      }
      const todoDB = await ctx.model.Todo.findById(id);
      if (!todoDB) {
        ctx.status = 404;
        return Object.assign(ERROR, {
          msg: 'todo not found',
        });
      }

      const { type, content } = ctx.request.body;

      const todo = {
        id: todoDB.id,
        start_at: todoDB.start_at,
        content: content || todoDB.content,
        type: type !== undefined ? type : todoDB.type,
      };

      await todoDB.update(todo);

      return Object.assign(SUCCESS);
    } catch (error) {
      ctx.status = 500;
      return Object.assign(ERROR);
    }
  }
}

module.exports = TodoService;
