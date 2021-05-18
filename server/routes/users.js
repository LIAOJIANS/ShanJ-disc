const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const jwt = require('jsonwebtoken')
const sendYzm = require('../tool/send')
const { errorChecking } = require('../tool/public')
const Result = require('../model/Result')
const { login, usernameIsRegister, register, findUser } = require('../servers/user')
const { md5, decoded } = require('../tool/index')
const { PWD_SALT, JWT_EXPIRED, PRIVATE_KEY } = require('../tool/constant')
const { mkdirFloader } = require('../tool/file')

let YZM_CODE = ''

router.get('/getUserInfo', (req, res) => {
  const decode = decoded(req)
  if(decode && decode.username) {
    findUser({ u_name: decode.username }, user => {
      if(!user) return new Result('查询失败').fail(res)
      new Result(user,'用户信息查询成功').success(res)
    })
  }
})

router.post('/login',[
  body('password').isLength({ min: 5 }).withMessage('密码长度太低'),
  body('username').isLength({ min: 4 }).withMessage('用户名长度太低')
], (req, res, next) => {
  errorChecking(next, req, () => {
    let { username, password } = req.body
    password = password == '123456' ? password : md5(`${password}${PWD_SALT}`)
    login({ u_name: username, u_password: password }, user => {
      if(!user || user.length === 0) { return  new Result('登录失败').fail(res) }
        const token = jwt.sign(
          { username },
          PRIVATE_KEY,
          { expiresIn: JWT_EXPIRED }
        )
        new Result({ token },'登录成功').success(res)
    })
  })
})

router.post('/sendcode',[
  body('email').isEmail().withMessage('请输入正确邮箱'),
], (req, res, next) => {
  errorChecking(next, req,() => {
    YZM_CODE = ''
    let { email } = req.body
    for (let i = 0; i < 4; i++) {
      YZM_CODE += Math.floor(Math.random() * 10)
    }
    sendYzm.send(email, YZM_CODE)
    new Result('验证码已发您邮件，请注意查收').success(res)
  })
})

router.post('/register', [
  body('username').isLength({ min: 6 }).withMessage('用户名长度太低'),
  body('email').isEmail().withMessage('邮箱不正确'),
  body('code').isLength({ min: 4, max: 4 }).withMessage('验证码不正确')
], (req, res, next) => {
  errorChecking(next, req,() => {
    register(req.body, YZM_CODE,data => {
      if(!data || !mkdirFloader(req.body.username)) { return new Result('验证码不正确或邮箱已注册').fail(res) }
      new Result(data, '申请账号成功，24小时会有管理员回复，请注意邮箱提示').success(res)
    })
  })
})

router.post('/user_check', [
  body('username').isLength({ min: 6 }).withMessage('不能为空')
], (req, res, next) => {
  errorChecking(next, req, () => {
    const { username } = req.body
    usernameIsRegister({ u_name: username }, data => {
      data ? new Result('用户已被注册').success(res) : new Result('').success(res)
    })
  })

})

module.exports = router
