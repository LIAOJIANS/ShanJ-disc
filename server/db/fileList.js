const Sequelize = require('sequelize');
const db = require('./index')

module.exports = db.defineModel('file_list', {
  f_id: { type: Sequelize.INTEGER, allowNull: false, primaryKey: true, unique: true, autoIncrement: true },
  f_name: { type: Sequelize.STRING() },
  f_size: { type: Sequelize.STRING() },
  f_dow_url: { type: Sequelize.STRING() },
  f_type: { type: Sequelize.STRING() },
  f_grouping: { type: Sequelize.STRING() },
  f_transfer_state: { type: Sequelize.INTEGER, defaultValue: 0 }, // 0 未下载， 1 已下载
  f_history_state: { type: Sequelize.INTEGER, defaultValue: 0 }, // 0 未删除， 1 已删除
  u_id: { type: Sequelize.INTEGER },
  u_name: { type: Sequelize.STRING }
})
