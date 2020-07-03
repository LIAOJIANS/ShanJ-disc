const mysql = require('mysql')

const config = require('./index')

const {debug} = require('../tool/constant')

function connect() {
  return mysql.createConnection({
    ...config,
    multipleStatements: true
  })
}

function querySql(sql) {
  const conn = connect()
  debug && console.log(sql)
  return new Promise((resolve, reject) => {
    try {
      conn.query(sql, (err, reuslt) => {
        if (err) {
          debug && console.log('查询失败' + JSON.stringify(err))
        } else {
          debug && console.log('查询成功' + JSON.stringify(reuslt))
          resolve(reuslt)
        }
      })
    } catch (err) {

      reject(err)
    } finally {
      conn.end()
    }
  })
}

function queryOne(sql) {
  return new Promise((resolve, reject) => {
    querySql(sql).then(result => {
      if (result && result.length > 0) {
        resolve(result[0])
      } else {
        resolve(null)
      }
    }).catch(err => {
      reject(err)
    })
  })
}

module.exports = {
  querySql,
  queryOne
}
