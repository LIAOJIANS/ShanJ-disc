const boom = require('boom')
const { validationResult } = require('express-validator')

function errorChecking(next, req, cb) {
  const err = validationResult(req)
  if (!err.isEmpty()) {
    const [{ msg }] = err.errors
    next(boom.badRequest(msg))
  } else {
    cb && cb()
  }
}

module.exports = {
  errorChecking
}
