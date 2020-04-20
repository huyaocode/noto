'use strict';

const Service = require('egg').Service;
const { ERROR, SUCCESS } = require('../util/util');
const getUIdFromCookie = require('../util/getUIdFromCookie');

class DiaryService extends Service {
  async create(diary) {
    const { ctx } = this;
    try {
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
        private: false,
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

  async del({ id, user_id }) {
    const diary = await this.ctx.model.Diary.findById(id);
    if (!diary) {
      return Object.assign(
        {
          error_msg: 'diary not found',
        },
        ERROR
      );
    } else if (diary.user_id !== user_id) {
      return Object.assign(ERROR, {
        msg: 'not allowed to delete others diary',
      });
    }
    diary.destroy();
    return SUCCESS;
  }

  async update({ id, user_id, updates }) {
    const diary = await this.ctx.model.Diary.findById(id);
    if (!diary) {
      return Object.assign(ERROR, {
        msg: 'diary not found',
      });
    } else if (diary.user_id !== user_id) {
      return Object.assign(ERROR, {
        msg: 'not allowed to modify others diary',
      });
    }
    diary.update(updates);
    return SUCCESS;
  }

  async findByUserId(user_id, isPrivate = false) {
    const options = {
      order: [['created_at', 'DESC']],
      where: {
        user_id,
        private: isPrivate
      },
    };

    if(isPrivate) {
      const curUserId = getUIdFromCookie(this.ctx.request.header.cookie)
      if(user_id !== curUserId) {
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
