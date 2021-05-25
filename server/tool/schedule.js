const schedule = require('node-schedule')
const {
  TOURIST_PATH
} = require('./constant')

const fs = require('fs')

function scheduleCronstyle() {
  schedule.scheduleJob('1 1 0 * * *', () => { // 每天的凌晨0点第一分钟的第一秒清空测试账号的数据 1 1 0 * * *
    delAllFile()
  })
}

function delAllFile(url = `${TOURIST_PATH}`) {
  const touristFileList = fs.readdirSync(url)
  touristFileList.forEach(c => {
    const path = `${url}/${c}`
    const start = fs.statSync(path)
    if (start.isDirectory()) {
      delAllFile(path)
    } else {
      fs.unlinkSync(path)
    }
  })
  url !== `${TOURIST_PATH}` && fs.rmdirSync(url)
}

module.exports = {
  scheduleCronstyle
}
