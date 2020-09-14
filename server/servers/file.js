const FileList = require('../db/fileList')

const UserList = require('../db/user_list')
const { findOne, create, findAll, update } = require('./dbOperation')

async function uploadFile(options, cb) {
  const { file, username, fileDow, groupingName } = options
  let u_id = null
  if(!file || file.length === 0) { return cb && cb(false) }
  await findOne(UserList, { u_name: username }, data => {
    u_id = data.dataValues.u_id
    const createObj = {
      f_name: file.originalname,
      f_size: file.size,
      f_dow_url: fileDow,
      f_grouping: groupingName || username,
      f_type: file.mimetype,
      u_id,
      u_name: username
    }
    create(FileList, createObj, data => {
      cb && cb(data)
    })
  })
}

function uploadList(uId, groupingName, cb) {
  if(groupingName.split('/').length === 0) {
    findAll(FileList, { where: { u_id: uId, f_history_state: 0 } }, data => {
      cb && cb(data)
    })
  } else {
    findAll(FileList, { where: { u_id: uId, f_history_state: 0, f_grouping: groupingName } }, data => {
      cb && cb(data)
    })
  }
}

function historyFile(options, cb) {
  const { f_id } = options
  const option = [
    { f_history_state: 1 },
    { where: { f_id } }
  ]
  update(FileList, option, data => {
    cb && cb(data)
  })
}

function historyList(options, cb) {
  findAll(FileList, { where: { ...options, f_history_state: 1 } }, data => {
    cb && cb(data)
  })
}


module.exports = {
  uploadFile,
  uploadList,
  historyFile,
  historyList
}
