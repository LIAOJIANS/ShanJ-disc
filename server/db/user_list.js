const Sequelize = require('sequelize')
const db = require('./index')

module.exports = db.defineModel('user_list', {
  u_id: { type: Sequelize.INTEGER, allowNull: false, primaryKey: true, unique: true, autoIncrement: true },
  u_name: { type: Sequelize.STRING },
  u_email: { type: Sequelize.STRING },
  u_capacity: { type: Sequelize.INTEGER(), defaultValue: 10 }, // 容量
  u_password: { type: Sequelize.STRING, defaultValue: 123456 },
  u_pic: { type: Sequelize.STRING(), defaultValue: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png' } // 用户头像
})
