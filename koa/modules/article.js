const Article = require("../schema/article");

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
      isTop: 0,
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
    });
  }

  /**
   * 查询文章列表
   * @param id 文章ID
   * @returns {Promise<Model>}
   */
  static async getArticleList(params) {
    let start = (params.pageNo - 1) * 10;
    return await Article.findAll({
      order: [["id", "DESC"]],
      offset: start,
      limit: 10,
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
