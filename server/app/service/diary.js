'use strict';

const Service = require('egg').Service;
const {
  ERROR,
  SUCCESS,
  unique,
} = require('../util/util');
class DiaryService extends Service {
  async create(diary) {
    const {
      ctx,
    } = this;
    try {
      diary.created_at = Date.now();
      diary.private = false;
      const res = await this.ctx.model.Diary.create(diary);
      return Object.assign({
        data: res,
      }, SUCCESS);
    } catch (error) {
      ctx.status = 500;
      throw (error);
    }
  }

  async index({
    offset = 0,
    limit = 5,
    order_by = 'created_at',
    order = 'DESC',
    // tags = '',
  }) {
    const {
      Op,
    } = this.app.Sequelize;
    const options = {
      offset: parseInt(offset),
      limit: parseInt(limit),
      order: [
        [ order_by, order.toUpperCase() ],
      ],
    };
    // if (tags) {
    //   options.where = {
    //     tags: {
    //       [Op.like]: `%${tags}%`,
    //     },
    //   };
    // }
    const res = await this.ctx.model.Diary.findAndCountAll(Object.assign(options, {
      include: [{
        model: this.ctx.model.User,
        as: 'user',
        attributes: [ 'id', 'username' ],
        
      }],
    }));
    return Object.assign(SUCCESS, {
      data: res,
    });
  }

  async del({
    id,
    user_id,
  }) {
    const diary = await this.ctx.model.Diary.findById(id);
    if (!diary) {
      return Object.assign({
        error_msg: 'diary not found',
      }, ERROR);
    } else if (diary.user_id !== user_id) {
      return Object.assign(ERROR, {
        msg: 'not allowed to delete others diary',
      });
    }
    diary.destroy();
    return SUCCESS;

  }

  async update({
    id,
    user_id,
    updates,
  }) {
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

  async find(id) {
    const diary = await this.ctx.model.Diary.findById(id, {
      include: [{
        model: this.ctx.model.User,
        as: 'user',
        attributes: [ 'id', 'username' ],
        include: [{
          model: this.ctx.model.Authority,
          attributes: [ 'id', 'name' ],
        }],
      }, {
        model: this.ctx.model.Comment,
        as: 'comment',
        attributes: [ 'id', 'content', 'created_at' ],
        include: [{
          model: this.ctx.model.User,
          attributes: [ 'username' ],
        }],
      }, {
        model: this.ctx.model.Catalog,
        as: 'catalog',
        attributes: [ 'id', 'name', 'created_at' ],
        include: [{
          model: this.ctx.model.User,
          attributes: [ 'username' ],
        }],
      }],
    });
    diary.set('readSize', diary.get('readSize') + 1);
    diary.increment('readSize').then().catch(err => {
      console.log(err);
    });
    if (!diary) {
      return Object.assign(ERROR, {
        msg: 'diary not found',
      });
    }
    return Object.assign(SUCCESS, {
      data: diary,
    });

  }

  async edit(id) {
    const diary = await this.ctx.model.Diary.findById(id, {
      include: [{
        model: this.ctx.model.User,
        as: 'user',
        attributes: [ 'id', 'username' ],
        include: [{
          model: this.ctx.model.Authority,
          attributes: [ 'id', 'name' ],
        }],
      }, {
        model: this.ctx.model.Catalog,
        as: 'catalog',
      }],
    });
    if (!diary) {
      return Object.assign(ERROR, {
        msg: 'diary not found',
      });
    }
    return Object.assign(SUCCESS, {
      data: diary,
    });

  }

  async archive(year) {
    const {
      ctx,
    } = this;
    const {
      Op,
    } = this.app.Sequelize;
    try {
      if (!year) {
        return Object.assign(ERROR, {
          msg: 'expected an param with year, password but got null',
        });
      }
      const diarys = await ctx.model.Diary.findAndCountAll({
        where: {
          created_at: {
            [Op.between]: [ new Date(`${year}-1-1`), new Date(`${year}-12-31 23:59`) ],
          },
        },
      });
      return Object.assign(SUCCESS, {
        data: diarys,
        year,
      });

    } catch (error) {
      ctx.status = 500;
      throw (error);
    }
  }
}

module.exports = DiaryService;
