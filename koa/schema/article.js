var sequelize = require('../config/db.js')
var Sequelize = require('sequelize')
const UserModel = require("./user");

var todolist = sequelize.define(
  'article',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: true,
      autoIncrement: true
    },
    // 文章标题
    title: {
      type: Sequelize.TEXT,
      allowNull: false,
      field: 'title'
    },
    // 内容
    content: {
      type: Sequelize.TEXT,
      allowNull: false,
      field: 'content'
    },
    // 内容
    weixin: {
      type: Sequelize.STRING,
      allowNull: false,
      field: 'weixin'
    },
    // 内容
    category: {
      type: Sequelize.STRING,
      allowNull: false,
      field: 'category'
    },
    // 作者
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      field: 'userId'
    },
    bannerUrl: {
      type: Sequelize.STRING,
      allowNull: false,
      field: 'bannerUrl'
    },
    picUrl: {
      type: Sequelize.STRING,
      allowNull: true,
      field: 'picUrl'
    },
    isVip: {
      type: Sequelize.INTEGER,
      allowNull: false,
      field: 'isVip',
      defaultValue: 0
    },
    // 创建时间
    createTime: {
      type: Sequelize.DATE,
      allowNull: false
    }
  },
  {
    /**
     * 如果为true，则表示名称和model相同，即user
     * 如果为fasle，mysql创建的表名称会是复数，即users
     * 如果指定的表名称本身就是复数，则形式不变
     */
    freezeTableName: true
  }
)
todolist.belongsTo(UserModel, { as: 'ar', foreignKey: 'userId', targetKey: 'id' })
module.exports = todolist
