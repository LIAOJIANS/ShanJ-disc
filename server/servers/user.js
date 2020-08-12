const UserList = require('../db/user_list')
const { create, findOne } = require('./dbOperation')

function login(options, cb) {
  findOne(UserList, options, data => {
    cb && cb(data)
  })
}

function findUser(options, cb) {
  findOne(UserList, options, data => {
    cb && cb(data)
  })
}

function usernameIsRegister(options, cb) {
  findOne(UserList, options, data => {
    cb && cb(data)
  })
}


function register(body, YZM_CODE, cb) {
  const { username, email, code } = body
  if(YZM_CODE !== code) { return cb && cb(false) }
  findOne(UserList,{ u_email: email }, data => {
    if(data) { return cb && cb(false) }
    create(UserList,{
      u_name: username,
      u_email: email
    }, res => {
      cb && cb(res)
    })
  })
}

module.exports = {
  login,
  findUser,
  usernameIsRegister,
  register
}
