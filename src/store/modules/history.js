
const state = {
  historyList: [],
  cachedViews: []
}

const actions = {
  addRouter({ dispatch }, router) {
    dispatch('setHistory', router)
    dispatch('addCachedView', router)
  },

  delRouter({ dispatch, state }, router) {
    return new Promise((resolve) => {
      dispatch('delCachedView', router)
      dispatch('delHistory', router)
      resolve({
        historyList: [...state.historyList],
        cachedViews: [...state.cachedViews]
      })
    })
  },

  setHistory({ commit }, router) {
    commit('SET_HISTORY', router)
  },

  addCachedView({ commit }, router) {
    commit('ADD_CACHED_VIEW', router)
  },

  delCachedView({ commit, state }, router) {
    return new Promise((resolve) => {
      commit('DEL_CACHED_VIEW', router)
      resolve([...state.cachedViews])
    })
  },

  delHistory({ commit, state }, router) {
    return new Promise((resolve) => {
      commit('DEL_HISTORY', router)
      resolve([...state.historyList])
    })
  },

  delOtherHistory({ dispatch }, router) {
    dispatch('delOtherHistoryList', router)
    dispatch('delOtherCachedViews', router)
  },

  delOtherHistoryList({ commit }, router) {
    commit('DEL_OTHER_HISTORY_LIST', router)
  },

  delOtherCachedViews({ commit }, router) {
    commit('DEL_OTHER_CACHED_VIEW', router)
  },

  delAllHistory({ commit, state }) {
    return new Promise(resolve => {
      commit('DEL_ALL_HISTORY')
      resolve({
        historyList: [...state.historyList]
      })
    })
  }

}

const mutations = {
  SET_HISTORY: (state, router) => {
    !state.historyList.some(r => r.path === router.path) && (state.historyList = [...state.historyList, router])
  },

  DEL_HISTORY: (state, router) => {
    state.historyList.forEach((v, i) => {
      console.log(1)
      if (v.path === router.path) {
        return state.historyList.splice(i, 1)
      }
    })
  },

  ADD_CACHED_VIEW: (state, router) => {
    !state.cachedViews.includes(router.name) && (state.cachedViews = [...state.cachedViews, router.name])
  },

  DEL_CACHED_VIEW: (state, router) => {
    const index = state.cachedViews.indexOf(router.name)
    index > -1 && state.cachedViews.splice(index, 1)
  },

  DEL_OTHER_HISTORY_LIST: (state, router) => {
    state.historyList = state.historyList.filter(r => (r.path === router.path))
  },

  DEL_OTHER_CACHED_VIEW: (state, router) => {
    const index = state.cachedViews.indexOf(router.name)
    state.cachedViews = index > -1 ? state.cachedViews.slice(index, index + 1) : []
  },

  DEL_ALL_HISTORY: state => {
    state.cachedViews = []
    state.historyList = []
  }

}

export default {
  state,
  actions,
  mutations
}
