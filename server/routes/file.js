const express = require('express')
const router = express.Router()
const {body} = require('express-validator')
const jwt = require('jsonwebtoken')
const {errorChecking} = require('../tool/public')
const Result = require('../model/Result')
const { md5, decoded } = require('../tool/index')
const { fs } = require('fs')
const { mkdirFloader, getGroupingList } = require('../tool/file')
const { UPLOAD_PATH } = require('../tool/constant')

router.post('/create_folder',
  [
    body('currentPath').isLength({min: 0}).withMessage('当前路径不能为空'),
    body('folderName').isLength({min: 0}).withMessage('新增文件名不能为空'),
  ], (req, res, next) => {
    errorChecking(next, req, () => {
      const {currentPath, folderName} = req.body
      const path = `${UPLOAD_PATH}/${currentPath}`
      mkdirFloader(folderName, path, flag => {
        if (!flag) { return new Result('创建失败').fail(res) }
        new Result('创建成功').success(res)
      })
    })
  })

router.post('/grouping-list',
  [
    body('groupName').isLength({ min: 0 }).withMessage('当前路径不能为空')
  ], (req, res) => {
  getGroupingList(`${ UPLOAD_PATH }/${ req.body.groupName }`, list => {
    new Result(list, '获取成功').success(res)
  })
})

module.exports = router
