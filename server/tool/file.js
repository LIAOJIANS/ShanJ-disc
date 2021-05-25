const { UPLOAD_PATH } = require('./constant')
const fs = require('fs')

function mkdirFloader(folderName, currentPath = UPLOAD_PATH) {
  const floaderList = fs.readdirSync(`${currentPath}`)
  if (floaderList.includes(folderName)) { return false }
  fs.mkdirSync(`${currentPath}/${folderName}`)
  return true
}

// function fileList(username) {
//   const floaderList = fs.readdirSync(`${UPLOAD_PATH} / ${username}`)
// }

function getGroupingList(path, cb) {
  let result = []
  list(path, data => {
    cb && cb(data)
  })
  function list(path, callBack) {
    const floaderList = fs.readdirSync(`${path}`)
    floaderList.forEach(file => {
      if (file.split('.').length === 1) {
        result = [...result, file]
        // list(`${path}/${file}`)
      }
    })
    callBack && callBack(result)
  }
}

function delServerFile(url, cb) {
  const path = `./${UPLOAD_PATH}/${url}`
  const flag = fs.unlinkSync(path)
  cb && cb(flag)
}

module.exports = {
  mkdirFloader,
  // fileList,
  getGroupingList,
  delServerFile
}
