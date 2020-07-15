const UserModel = require("../modules/user");

class UserController {
  /**
   * 创建文章
   * @param ctx
   * @returns {Promise.<void>}
   */
  static async create(ctx) {
    let req = ctx.request.body;
    try {
      const ifExist = await UserModel.ifExistUser(req)
      if (!ifExist) {
        await UserModel.create(req)
        ctx.body = {
          code: 0,
          msg: "注册成功",
        }
      } else {
        ctx.body = {
          code: -1,
          msg: '用户已存在'
        }
      }
    } catch (err) {
      ctx.body = {
        code: -1,
        msg: "注册失败",
        data: err,
      };
    }
  }

  static async login(ctx) {
    let req = ctx.request.body;
    try {
      const data = await UserModel.ifLogin(req);
      if (data) {
        ctx.body = {
          code: 0,
          msg: "登录成功",
          data: {
            userName: data.userName,
            id: data.id,
            jifen: data.jifen
          },
        };
      } else {
        ctx.body = {
          code: -1,
          msg: "用户名或密码错误",
        };
      }
    } catch (err) {
      console.log(err)
      ctx.body = {
        code: -1,
        msg: "登录失败",
        data: err,
      };
    }
  }

  static async updateJifen(ctx) {
    let req = ctx.request.body;
    try {
      const data = await UserModel.updateJifen(req);
      ctx.body = {
        code: 0,
        // msg: "修改成功",
        data,
      };
    } catch (err) {
      console.log(err)
      ctx.body = {
        code: -1,
        msg: "修改失败",
        data: err,
      };
    }
  }
  static async getUserList(ctx) {
    let req = ctx.query;
    try {
      const data = await UserModel.getUserList(req);
      if (data) {
        ctx.body = {
          code: 0,
          // msg: "查询成功",
          data: {
            total: data.count,
            list: data.rows,
          },
        };
      }
    } catch (err) {
      console.log(err)
      ctx.body = {
        code: -1,
        msg: "查询失败",
        data: err,
      };
    }
  }
}

module.exports = UserController;
