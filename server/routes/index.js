const express = require('express')
const boom = require('boom')
const userRouter = require('./users')
const uploadRouter = require('./upload')
const fileRouter = require('./file')

const { jwtAuth } = require('./jwt')
const Result = require('../model/Result')
const router = express.Router()
router.use(jwtAuth)

router.use('/user', userRouter)
router.use('/file', uploadRouter)
router.use('/folder', fileRouter)

router.use((req, res, next) => {
  next(boom.notFound('接口不存在'))
})

router.use((err, req, res, next) => {
  if (err.name && err.name === 'UnauthorizedError') { // 如果token验证失败
    const { status = 401, message } = err
    // 清楚用户cooick
    new Result(null, 'token验证失败', {
      error: status,
      errMsg: message
    }).tokenError(res.status(status))
  } else {
    const msg = (err && err.message) || '系统错误'
    const statusCode = (err.output && err.output.statusCode) || 500
    const errMsg = (err.output && err.output.playload && err.output.playload.error) || err.message
    new Result(null, msg, {
      error: statusCode,
      errMsg
    }).tokenError(res.status(statusCode))
  }
})
module.exports = router
