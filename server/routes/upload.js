const express = require('express')
const router = express.Router()
const Result = require('../model/Result')
const multer = require('multer')
const { UPLOAD_PATH } = require('../tool/constant')
const File = require('../model/file')

router.post('/upload',
  multer({ dest: `${ UPLOAD_PATH }/users` }).single('file'), (req, res) => {
    if(!req.file || req.file.length === 0) {
      new Result('上传电子书失败').fail(res)
    } else {
      const file = new File(req.file)
      console.log(file)
      new Result('上传电子书成功').success(res)
    }
  })

router.get('/ceshi', (req, res) => {
  res.send({ code: 0, msg: '成功' })
})

module.exports = router
