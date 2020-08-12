const {} = require('../tool/constant')

class File {

  constructor(file, userId) {
    this.fileProcessing(file, userId)
  }


  fileProcessing(file ,) {
    console.log(file)

    let fileObj = {
      f_name: file.originalname,
      f_size: file.size,
      f_path: file.path,
      f_type: file.mimetype
    }

  }
}

module.exports = File
