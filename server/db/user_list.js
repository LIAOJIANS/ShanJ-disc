const Sequelize = require('sequelize');
const db = require('./index')

module.exports = db.define('user_list', {
  u_id: { type: Sequelize.INTEGER, allowNull: false, primaryKey: true, unique: true, autoIncrement: true },
  u_name: { type: Sequelize.STRING },
  u_capacity: { type: Sequelize.INTEGER() }, // 容量
  u_pic: { type: Sequelize.STRING() },
})
