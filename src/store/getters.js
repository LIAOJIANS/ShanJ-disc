

export default {
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
  historyList: state => state.history.historyList,
  cachedViews: state => state.history.cachedViews,
  uploadInfo: state => state.upload.uploadList
}
