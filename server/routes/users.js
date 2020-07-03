const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator')
const boom = require('boom')
const jwt = require('jsonwebtoken')

const Result = require('../model/Result')
const { login, findUser } = require('../servers/user')
const { md5, decoded } = require('../tool/index')
const { PWD_SALT, JWT_EXPIRED, PRIVATE_KEY } = require('../tool/constant')

router.get('/info', (req, res) => {
  const decode = decoded(req)
  if(decode && decode.username) {
    findUser(decode.username).then(user => {
      if(!user) return new Result('查询失败').fail(res)
      user.roles = [user.role]
      new Result(user,'用户信息查询成功').success(res)
    }).catch(err => {
      new Result('查询失败').fail(res)
    })
  }
})

router.post('/login',[
  body('password').isLength({ min: 5 }).withMessage('密码长度太低'),
  body('username').isLength({ min: 4 }).withMessage('用户名长度太低')
], (req, res, next) => {
  const err = validationResult(req)
  if(!err.isEmpty()) {
    const [{ msg }] = err.errors
    next(boom.badRequest(msg))
  } else {
    let { username, password } = req.body
    password = md5(`${password}${PWD_SALT}`)
    login(username, password).then(user => {
      if(!user || user.length === 0) {
        new Result('登录失败').fail(res)
      } else {
        const token = jwt.sign(
          { username },
          PRIVATE_KEY,
          { expiresIn: JWT_EXPIRED }
        )
        new Result({ token },'登录成功').success(res)
      }
    })
  }
})

module.exports = router
