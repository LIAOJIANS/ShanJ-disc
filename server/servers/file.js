const FileList = require('../db/fileList')
const { findOne, create } = require('./dbOperation')

async function uploadFile(options, cb) {
  const { file, username } = options
  let u_id = null
  if(!file || file.length === 0) { return cb && cb(false) }
  await findOne(FileList, { u_name: username }, data => {
    u_id = data.dataValues.u_id
  })
  const createObj = {
    f_name: file.originalname,
    f_size: file.size,
    f_dow_url: file.path,
    f_type: file.mimetype,
    u_id,
    u_name: username
  }
  create(FileList, createObj, data => {
    cb && cb(data)
  })
}


module.exports = {
  uploadFile
}
