const User = require("../schema/user");

// 引入数据表模型
User.sync({ force: false }); // 自动创建表

class UserModel {
  static async create(data) {
    return await User.create({
      userName: data.userName,
      password: data.password,
      jifen: 3,
    });
  }
  static async updateJifen(data) {
    return await User.update({
      jifen: data.jifen,
    }, {
      where: {
        id: data.userId
      }
    });
  }

  static async ifExistUser(data) {
    return await User.findOne({
      where: {
        userName: data.userName
      },
    });
  }

  static async ifLogin(data) {
    return await User.findOne({
      where: {
        userName: data.userName,
        password: data.password
      },
    });
  }

  static async getUserList(params) {
    let start = (params.pageNo - 1) * 10;
    return await User.findAndCountAll({
      order: [["id", "DESC"]],
      offset: start,
      limit: Number(params.pageSize),
    });
  }

  static async getUserDetail(id) {
    return await User.findOne({
      where: {
        id
      }
    });
  }
  // static async getUserDetail(id) {
  //   return await User.findById(id);
  // }
}

module.exports = UserModel;
