

export default {
  token: state => state.user.token,
  historyList: state => state.history.historyList,
  cachedViews: state => state.history.cachedViews
}
