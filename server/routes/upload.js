const express = require('express')
const router = express.Router()
const Result = require('../model/Result')
const multer = require('multer')
const { UPLOAD_PATH } = require('../tool/constant')
const fs = require('fs')
const { uploadFile, uploadList, historyFile, historyList, handDelFile } = require('../servers/file')
const { decoded } = require('../tool')
const { body } = require('express-validator')
const { errorChecking } = require('../tool/public')

router.post('/upload',
  multer({ dest: `${UPLOAD_PATH}` }).single('file'), (req, res) => {
    const decode = decoded(req)
    if (decode && decode.username) {
      const { groupingName } = req.body
      const path = `${UPLOAD_PATH}/${groupingName}/${req.file.originalname}`
      const obj = {
        file: req.file,
        username: decode.username,
        fileDow: path,
        groupingName
      }
      fs.rename(`${req.file.path}`, path, function(err) { // 剪切刚刚上传的文件至分组
        console.log(err)
      })
      uploadFile(obj, data => {
        if (!data) return new Result('上传失败').fail(res)
        new Result('上传成功').success(res)
      })
    }
  })

router.post('/upload-list',
  [
    body('uId').isLength({ min: 0 }).withMessage('用户ID不能为空')
  ], (req, res, next) => {
    errorChecking(next, req, () => {
      const { uId, groupingName } = req.body
      uploadList(uId, groupingName, data => {
        data.length > 0 ? new Result(data, '获取成功').success(res) : new Result([], '暂无数据').success(res)
      })
    })
  })

router.post('/del-history', [
  body('file-id').isLength({ min: 0 }).withMessage('文件id不能为空')
], (req, res, next) => {
  errorChecking(next, req, () => {
    const { f_id } = req.body
    historyFile({ f_id }, data => {
      data.length > 0 ? new Result(data, '删除成功').success(res) : new Result('删除失败').fail(res)
    })
  })
})

router.post('/dow_file', [
  body('file_obj').isLength({ min: 0 }).withMessage('文件路径不能为空')
], (req, res, next) => {
  errorChecking(next, req, () => {
    try {
      handDelFile(req.body.file_obj.f_id, data => new Result(data, '下载成功！').success(res))
    } catch (e) {
      console.log(e)
    }
    // const realPath = `./${req.body.dow_url}`
    // res.writeHead(200, {
    //   'Content-Type': 'application/octet-stream',
    //   'Content-Disposition': 'attachment; filename=' + encodeURI(`${realPath.split('/')[realPath.split('/').length - 1]}`)
    // })
    // const readStream = fs.createReadStream(realPath)
    // readStream.on('data', (chunk) => {
    //   res.write(chunk, 'binary')
    // })
    // readStream.on('end', () => {
    //   res.end()
    // })
  })
})

router.get('/history', (req, res) => {
  const decode = decoded(req)
  historyList({ u_name: decode.username }, data => {
    data.length > 0 ? new Result(data, '获取成功').success(res) : new Result([], '暂无数据').success(res)
  })
})

module.exports = router
