const FileList = require('../db/fileList')

const UserList = require('../db/user_list')
const { findOne, create, findAll } = require('./dbOperation')


async function uploadFile(options, cb) {
  const { file, username } = options
  let u_id = null
  if(!file || file.length === 0) { return cb && cb(false) }

  await findOne(UserList, { u_name: username }, data => {
    u_id = data.dataValues.u_id
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
  })
}

function uploadList(uId, cb) {
  findAll(FileList, { where: { u_id: uId } }, data => {
    cb && cb(data)
  })
}


module.exports = {
  uploadFile,
  uploadList
}
