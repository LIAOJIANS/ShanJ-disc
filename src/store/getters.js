export default {
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
  historyList: state => state.history.historyList,
  cachedViews: state => state.history.cachedViews,
  uploadInfo: state => state.upload.uploadList,
  fileList: state => state.file.fileList,
  fileCurrentPath: state => state.file.fileCurrentPath
}
