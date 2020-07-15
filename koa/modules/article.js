const Article = require("../schema/article");
const UserModel = require("../schema/user");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// 引入数据表模型
Article.sync({ force: false }); //自动创建表

class ArticleModel {
  static async create(data) {
    return await Article.create({
      title: data.title, //标题
      userId: data.userId, //作者
      content: data.content, //文章内容
      weixin: data.weixin,
      category: data.category,
      bannerUrl: data.bannerUrl,
      picUrl: data.picUrl,
      isVip: data.isVip,
      createTime: new Date().getTime()
    });
  }

  /**
   * 查询文章的详情
   * @param id 文章ID
   * @returns {Promise<Model>}
   */
  static async getArticleDetail(id) {
    return await Article.findOne({
      where: {
        id,
      },
      include: [{ // include关键字表示关联查询
        model: UserModel, // 指定关联的model
        as: 'user', // 由于前面建立映射关系时为class表起了别名，那么这里也要与前面保持一致，否则会报错
        attributes: ['userName'], // 这里的attributes属性表示查询class表的name和rank字段，其中对name字段起了别名className
      }],
    });
  }
  static async delArticle(id) {
    return await Article.destroy({
      where: {
        id,
      }
    });
  }

  static async getArticleList(params) {
    let start = (params.pageNo - 1) * 10;
    let obj = {}
    if (params.category) {
      obj.category = params.category
    }
    if (params.query) {
      obj.title = {
        [Op.like]: '%' + params.query + '%'
      }
    }
    return await Article.findAndCountAll({
      where: obj,
      order: [["id", "DESC"]],
      offset: start,
      limit: Number(params.pageSize),
      include: [{ // include关键字表示关联查询
        model: UserModel, // 指定关联的model
        as: 'user', // 由于前面建立映射关系时为class表起了别名，那么这里也要与前面保持一致，否则会报错
        attributes: ['userName'], // 这里的attributes属性表示查询class表的name和rank字段，其中对name字段起了别名className
      }],
    });
  }
  static async getVipList(params) {
    return await Article.findAndCountAll({
      where: {
        isVip: 1
      },
      offset: 0,
      limit: 18,
      order: [["id", "DESC"]],
    });
  }
  static async delArticle(id) {
    return await Article.destroy({
      where: {
        id,
      },
    });
  }
}

module.exports = ArticleModel;
