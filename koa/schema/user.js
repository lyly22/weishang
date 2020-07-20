var sequelize = require('../config/db.js')
var Sequelize = require('sequelize')
var userList = sequelize.define(
  'user',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: true,
      autoIncrement: true
    },
    // 文章标题
    userName: {
      type: Sequelize.STRING,
      allowNull: false,
      field: 'userName'
    },
    // 内容
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      field: 'password'
    },
    // 内容
    jifen: {
      type: Sequelize.INTEGER,
      field: 'jifen',
      defaultValue: '3',
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
module.exports = userList
