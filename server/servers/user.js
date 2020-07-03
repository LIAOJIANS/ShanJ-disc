const { querySql, queryOne } = require('../db/config')

function login(username, password) {
    return querySql(`select * from admin_user where username='${ username }' and password='${ password }'`)
}

function findUser(username) {
  return queryOne(`select * from admin_user where username='${ username }'`)
}

module.exports = {
  login,
  findUser
}
