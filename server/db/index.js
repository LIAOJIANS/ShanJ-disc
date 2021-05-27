const Sequelize = require('sequelize')

const sqlConfig = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'network_disk'
}

console.log('init sequelize...')

const sequelize = new Sequelize(sqlConfig.database, sqlConfig.user, sqlConfig.password, {
  host: sqlConfig.host,
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 0,
    idle: 10000
  },
  timezone: '+08:00'
})

exports.sequelize = sequelize

exports.defineModel = (name, attributes) => {
  const attrs = {}
  for (const key in attributes) {
    const val = attributes[key]
    if (typeof val === 'object' && val['type']) {
      val.allowNull = val.allowNull || true
      attrs[key] = val
    } else {
      attrs[key] = {
        type: val
      }
    }
  }
  attrs.version = {
    type: Sequelize.BIGINT
  }

  // attrs.createUser  = {
  //   type: Sequelize.STRING,
  //   defaultValue: 'Shan',
  //   allowNull: false
  // }
  //
  // attrs.updateUser = {
  //   type: Sequelize.STRING,
  //   defaultValue: 'Shan',
  //   allowNull: false
  // }

  return sequelize.define(name, attrs, {
    tableName: name,
    timestamps: true,
    paranoid: true,
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    hooks: {
      beforeBulkCreate: (obj) => {
        obj.version = 0
      },
      beforeValidate: (obj) => {
        obj.isNewRecord ? obj.version = 0 : obj.version = obj.version + 1
      }
    }
  })
}
