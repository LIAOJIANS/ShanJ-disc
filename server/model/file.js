const {} = require('../tool/constant')

class File {

  constructor(file, data) {
    if(data) {
      this.dataProcessing(data)
    } else {
      this.fileProcessing(file)
    }
  }

  dataProcessing(data) {

  }

  fileProcessing(file) {
    console.log(file)
  }

}

module.exports = File
