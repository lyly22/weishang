var sequelize = require('../config/db.js')
var Sequelize = require('sequelize')

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
      type: Sequelize.STRING,
      allowNull: false,
      field: 'title'
    },
    // 内容
    content: {
      type: Sequelize.STRING,
      allowNull: false,
      field: 'content'
    },
    // 内容
    weixin: {
      type: Sequelize.STRING,
      allowNull: false,
      field: 'weixin'
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
      field: 'fileUrl'
    },
    picUrl: {
      type: Sequelize.STRING,
      allowNull: false,
      field: 'fileUrl'
    },
    isTop: {
      type: Sequelize.STRING,
      allowNull: false,
      field: 'isTop',
      default: '0'
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
module.exports = todolist
