'use strict';

const Service = require('egg').Service;
const { ERROR, SUCCESS } = require('../util/util');
const getUIdFromCookie = require('../util/getUIdFromCookie');

class DiaryService extends Service {
  async create(diary) {
    const { ctx } = this;
    const user_id = getUIdFromCookie(ctx.request.header.cookie);
    if(!user_id) {
      ctx.status = 403;
      return Object.assign(ERROR, {
        msg: 'please login',
      });
    }
    try {
      diary.user_id = user_id;
      diary.created_at = Date.now();
      await this.ctx.model.Diary.create(diary);
      return Object.assign(SUCCESS);
    } catch (error) {
      ctx.status = 500;
      throw error;
    }
  }

  async index({
    offset = 0,
    limit = 10,
    order_by = 'created_at',
    order = 'DESC',
  }) {
    const options = {
      offset: parseInt(offset),
      limit: parseInt(limit),
      order: [[order_by, order.toUpperCase()]],
      where: {
        privated: false,
      },
    };

    const res = await this.ctx.model.Diary.findAndCountAll(
      Object.assign(options, {
        include: [
          {
            model: this.ctx.model.User,
            as: 'user',
            attributes: ['id', 'nickname', 'avatar'],
          },
        ],
      })
    );
    return Object.assign(SUCCESS, {
      data: res,
    });
  }

  async del({ id }) {
    const { ctx } = this;
    const user_id = getUIdFromCookie(ctx.request.header.cookie);
    const diary = await ctx.model.Diary.findByPk(id);
    if (!diary) {
      ctx.status = 400;
      return Object.assign(
        {
          error_msg: 'diary not found',
        },
        ERROR
      );
    } else if (diary.user_id != user_id) {
      ctx.status = 403;
      return Object.assign(ERROR, {
        msg: 'not allowed to delete others diary',
      });
    }
    await diary.destroy();
    return SUCCESS;
  }

  async update({ id, updates }) {
    const { ctx } = this;
    const user_id = getUIdFromCookie(ctx.request.header.cookie);
    try {
      const diaryDB = await this.ctx.model.Diary.findById(id);
      if (!diaryDB) {
        this.ctx.status = 400;
        return Object.assign(ERROR, {
          msg: 'diary not found',
        });
      } else if (diaryDB.user_id != user_id) {
        this.ctx.status = 403;
        return Object.assign(ERROR, {
          msg: 'not allowed to modify others diary',
        });
      }
      const { privated } = updates;
      console.log('私有嘛？？？？？？？？？？', privated)
      const diary = {
        ...diaryDB.dataValues,
        privated,
      };
      console.log(diary)
      await diaryDB.update(diary);
      return SUCCESS;
    } catch (error) {
      ctx.status = 500;
      return ERROR;
    }
  }

  async findByUserId(user_id, isPrivate = false) {
    const options = {
      order: [['created_at', 'DESC']],
      where: {
        user_id,
        privated: isPrivate,
      },
    };

    if (isPrivate) {
      const curUserId = getUIdFromCookie(this.ctx.request.header.cookie);
      if (user_id !== curUserId) {
        return ERROR;
      }
    }

    const res = await this.ctx.model.Diary.findAndCountAll(options);

    return Object.assign(SUCCESS, {
      data: res,
    });
  }
}

module.exports = DiaryService;
