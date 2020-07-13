const User = require("../schema/user");

// 引入数据表模型
User.sync({ force: false }); // 自动创建表

class UserModel {
  static async create(data) {
    return await User.create({
      userName: data.userName, 
      password: data.password,
      jifen: 0,
    });
  }

  static async ifExistUser(data) {
    return await User.findOne({
      where: {
        userName:data.userName
      },
    });
  }

  static async ifLogin(data) {
    return await User.findOne({
      where: {
        userName:data.userName,
        password:data.password
      },
    });
  }

  /**
   * 查询文章列表
   * @param id 文章ID
   * @returns {Promise<Model>}
   */
  static async getUserDetail(data) {
    return await User.findOne({
      where: {
        id:data.id
      }
    });
  }
}

module.exports = UserModel;
