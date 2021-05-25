const jwt = require('express-jwt')
const { PRIVATE_KEY } = require('../tool/constant')

const jwtAuth = jwt({
  secret: PRIVATE_KEY,
  credentialRequired: true
}).unless({
  path: [
    '/',
    '/user/login',
    '/user/sendcode',
    '/user/register',
    '/user/user_check',
    '/file/dow_file'
  ]
})

module.exports = {
  jwtAuth
}
