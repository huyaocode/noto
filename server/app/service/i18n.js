'use strict';

const Service = require('egg').Service;
const { ERROR, SUCCESS } = require('../util/util');

const getUIdFromCookie = require('../util/getUIdFromCookie');

const checkUserAuth = async (ctx) => {
  const user_id = getUIdFromCookie(ctx.request.header.cookie);
  const user = await ctx.model.User.findById(user_id);
  return user.authority === 1;
};

class I18nService extends Service {
  async create() {
    const { ctx } = this;

    if (!checkUserAuth(ctx)) {
      ctx.status = 403;
      return Object.assign(ERROR);
    }

    const { id, zh, en } = ctx.request.body;

    try {
      if (!id) {
        ctx.status = 400;
        return Object.assign(ERROR);
      }
      const haskey = await ctx.model.I18n.findById(id);
      if (haskey) {
        ctx.status = 400;
        return Object.assign(ERROR, {
          msg: 'key already exists',
        });
      }

      await ctx.model.I18n.create({
        id,
        zh,
        en,
      });

      ctx.status = 201;
      return Object.assign(SUCCESS);
    } catch (error) {
      ctx.status = 500;
      throw error;
    }
  }

  async del({ id }) {
    const { ctx } = this;

    if (!checkUserAuth(ctx)) {
      ctx.status = 403;
      return Object.assign(ERROR);
    }
    if (!id) {
      ctx.status = 400;
      return Object.assign(ERROR, {
        msg: 'id must be',
      });
    }

    try {
      const i18n = await ctx.model.I18n.findById(id);
      await i18n.destroy();
      ctx.status = 200;
      return Object.assign(SUCCESS);
    } catch (error) {
      ctx.status = 500;
      throw error;
    }
  }

  async get() {
    const { ctx } = this;
    try {
      const res = await this.ctx.model.I18n.findAndCountAll();
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

    if (!checkUserAuth(ctx)) {
      ctx.status = 403;
      return Object.assign(ERROR);
    }

    if (!id) {
      ctx.status = 400;
      return Object.assign(ERROR);
    }

    try {
      const i18nDB = await ctx.model.I18n.findById(id);
      if (!i18nDB) {
        ctx.status = 404;
        return Object.assign(ERROR, {
          msg: 'todo not found',
        });
      }

      const { zh, en } = ctx.request.body;

      const i18n = {
        id: i18nDB.id,
        zh: zh || i18nDB.zh,
        en: en || i18nDB.en,
      };

      await i18nDB.update(i18n);

      return Object.assign(SUCCESS);
    } catch (error) {
      ctx.status = 500;
      return Object.assign(ERROR);
    }
  }
}

module.exports = I18nService;
