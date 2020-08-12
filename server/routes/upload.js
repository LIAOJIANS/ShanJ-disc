const express = require('express')
const router = express.Router()
const Result = require('../model/Result')
const multer = require('multer')
const { UPLOAD_PATH } = require('../tool/constant')
const fs = require('fs')
const { uploadFile } = require('../servers/file')

router.post('/upload',
  multer({ dest: `${ UPLOAD_PATH }/users` }).single('file'), (req, res) => {
    const decode = decoded(req)
    if(decode && decode.username) {
      const obj = {
        file: req.file,
        username: decode.username
      }
      uploadFile(obj, data => {
        if(!data) return new Result('上传失败').fail(res)
        new Result('上传成功').success(res)
      })
    }
})



router.post('/dow', (req, res) => {
  const realPath = './public/images/新建文本文档.txt'
  res.writeHead(200, {
    'Content-Type': 'application/octet-stream',
    'Content-Disposition': 'attachment; filename=' + encodeURI('text.txt'),
  });//设置响应头
  var readStream = fs.createReadStream(realPath);//得到文件输入流
  readStream.on('data', (chunk) => {
    res.write(chunk, 'binary');//文档内容以二进制的格式写到response的输出流
  });
  readStream.on('end', () => {
    res.end();
  })
})

module.exports = router
