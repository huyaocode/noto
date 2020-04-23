'use strict';

const Service = require('egg').Service;
const _ = require('lodash');

const md5 = require('js-md5');
const { ERROR, SUCCESS } = require('../util/util');
class UserService extends Service {
  async create(user) {
    const { ctx } = this;
    try {
      if (!user.username || !user.password) {
        ctx.status = 400;
        return Object.assign(ERROR, {
          msg: `expected an object with username, password but got: ${JSON.stringify(
            user
          )}`,
        });
      }
      const md5Passwd = md5(user.password);
      user = Object.assign(user, {
        password: md5Passwd,
        created_at: Date.now(),
      });
      const userDB = await ctx.model.User.findOne({
        where: {
          username: user.username,
        },
      });
      if (!userDB) {
        let res = await this.ctx.model.User.create(user);
        ctx.status = 201;
        return Object.assign(SUCCESS, {
          data: {
            id: res.id,
          },
        });
      }
      ctx.status = 200;
      return Object.assign(ERROR, {
        msg: 'username already exists',
      });
    } catch (error) {
      ctx.status = 500;
      throw error;
    }
  }

  async del(id) {
    const { ctx } = this;
    try {
      const user = await ctx.model.User.findById(id);
      if (!user) {
        ctx.status = 400;
        return Object.assign(ERROR, {
          msg: 'user not found',
        });
      }
      user.destroy();
      ctx.status = 200;
      return Object.assign(SUCCESS, {
        data: user,
      });
    } catch (error) {
      ctx.throw(500);
    }
  }

  async update({ id, user }) {
    const { ctx } = this;
    try {
      const userDB = await ctx.model.User.findById(id);
      if (!userDB) {
        ctx.status = 400;
        return Object.assign(ERROR, {
          msg: 'user not found',
        });
      }
      user = {
        id: userDB.id,
        username: userDB.username,
        password: userDB.password,
        created_at: userDB.created_at,
        authority: userDB.authority,
        
        nickname: user.nickname,
        avatar: user.avatar,
        profile:user.profile
      }
      const res = await userDB.update(user);
      res.password = ''
      ctx.status = 200;
      return Object.assign(SUCCESS, {
        data: res,
      });
    } catch (error) {
      ctx.throw(500);
    }
  }

  async login({ username, password }) {
    const { ctx } = this;
    try {
      const user = await ctx.model.User.findOne({
        where: {
          username: username.toString(),
        },
      });
      if (!user) {
        return Object.assign(ERROR, {
          msg: 'username is error',
        });
      }
      if (md5(password) === user.password) {
        ctx.status = 200;
        const hash = md5.hex(password);
        ctx.cookies.set('token', hash, {
          httpOnly: false,
          signed: false,
          maxAge: 3600 * 1000,
          path: '/',
        });
        ctx.cookies.set('user_id', user.id, {
          httpOnly: false,
          signed: false,
          maxAge: 3600 * 1000,
          path: '/',
        });
        return Object.assign(SUCCESS, {
          data: Object.assign(user, {
            password: null,
          }),
        });
      }
      return Object.assign(ERROR, {
        msg: 'password is error',
      });
    } catch (error) {
      ctx.status = 500;
      throw error;
    }
  }

  async find(id) {
    const { ctx } = this;
    try {
      const user = await ctx.model.User.findById(id);
      if (!user) {
        ctx.status = 401;
        return Object.assign(ERROR, {
          msg: 'user not found',
        });
      }
      ctx.status = 200;
      return Object.assign(SUCCESS, {
        data: user,
      });
    } catch (error) {
      throw 500;
    }
  }
}

module.exports = UserService;
