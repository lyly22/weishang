const ArticleModel = require("../modules/article");
const UserModel = require("../modules/user");

class articleController {
  /**
   * 创建文章
   * @param ctx
   * @returns {Promise.<void>}
   */
  static async create(ctx) {
    //接收客服端
    let req = ctx.request.body;
    if (req.title && req.userId && req.content && req.category && req.weixin) {
      try {
        //创建文章模型
        const ret = await ArticleModel.create(req);
        if (req.isVip) {
          // 获取原积分
          const user = await UserModel.getUserDetail(req.userId)
          // 修改积分
          const userInfo = await UserModel.updateJifen({
            jifen: user.jifen - 300,
            userId: user.id
          })
          ctx.body = {
            code: 0,
            msg: "创建成功",
            data: ret,
            jifen: user.jifen - 300
          };
        } else {
          ctx.body = {
            code: 0,
            msg: "创建成功",
            data: ret,
          };
        }
      } catch (err) {
        ctx.body = {
          code: -1,
          msg: "创建失败",
          data: err,
        };
      }
    } else {
      ctx.body = {
        code: -1,
        msg: "参数不齐全",
      };
    }
  }

  static async delete(ctx) {
    let id = ctx.query.id;
    if (id) {
      try {
        // 查询文章详情模型
        let data = await ArticleModel.delArticle(id);
        ctx.body = {
          code: 0,
          msg: "删除成功",
          data,
        };
      } catch (err) {
        ctx.body = {
          code: -1,
          msg: "删除失败",
          data,
        };
      }
    } else {
      ctx.body = {
        code: -1,
        msg: "ID必传",
      };
    }
  }
  /**
   * 获取文章详情
   * @param ctx
   * @returns {Promise.<void>}
   */
  static async detail(ctx) {
    let id = ctx.query.id;
    if (id) {
      try {
        // 查询文章详情模型
        let data = await ArticleModel.getArticleDetail(id);
        ctx.body = {
          code: 0,
          // msg: "查询成功",
          data
        };
      } catch (err) {
        ctx.body = {
          code: -1,
          msg: "查询失败",
          data,
        };
      }
    } else {
      ctx.body = {
        code: -1,
        msg: "文章ID必须传",
      };
    }
  }
  /**
   * 获取文章列表
   * @param ctx
   * @returns {Promise.<void>}
   */
  static async list(ctx) {
    try {
      // 查询文章列表模型
      let data = await ArticleModel.getArticleList(ctx.query);
      ctx.body = {
        code: 0,
        // msg: "查询成功",
        data: {
          total: data.count,
          list: data.rows,
        },
      };
    } catch (err) {
      console.log(err)
      ctx.body = {
        code: -1,
        msg: "查询失败",
        data: err,
      };
    }
  }
  static async indexList(ctx) {
    let query = ctx.query;
    query.category = query.category.split(',')
    try {
      // 查询文章列表模型
      let a = await ArticleModel.getArticleList({ pageNo: query.pageNo, pageSize: query.pageSize, category: query.category[0] });
      let b = await ArticleModel.getArticleList({ pageNo: query.pageNo, pageSize: query.pageSize, category: query.category[1] });
      let c = await ArticleModel.getArticleList({ pageNo: query.pageNo, pageSize: query.pageSize, category: query.category[2] });
      let d = await ArticleModel.getArticleList({ pageNo: query.pageNo, pageSize: query.pageSize, category: query.category[3] });
      let e = await ArticleModel.getArticleList({ pageNo: query.pageNo, pageSize: query.pageSize, category: query.category[4] });
      ctx.body = {
        code: 0,
        // msg: "查询成功",
        data: {
          a: a.rows,
          b: b.rows,
          c: c.rows,
          d: d.rows,
          e: e.rows,
        },
      };
    } catch (err) {
      ctx.body = {
        code: -1,
        msg: "查询失败",
        data: err,
      };
    }
  }
  static async vipList(ctx) {
    try {
      // 查询文章列表模型
      let data = await ArticleModel.getVipList(ctx.query);
      ctx.body = {
        code: 0,
        data: {
          total: data.count,
          list: data.rows,
        },
      };
    } catch (err) {
      ctx.body = {
        code: -1,
        msg: "查询失败",
        data: err,
      };
    }
  }
}

module.exports = articleController;
