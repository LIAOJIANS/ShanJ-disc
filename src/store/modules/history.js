
const state = {
  historyList: [],
  cachedViews: []
}

const actions = {
  addRouter({dispatch}, router) {
    dispatch('setHistory', router)
    dispatch('addCachedView', router)
  },

  delRouter({ dispatch, state }, router) {
    return new Promise(((resolve) => {
      dispatch('delCachedView', router)
      dispatch('delHistory', router)
      console.log([...state.historyList])
      resolve({
        historyList: [...state.historyList],
        cachedViews: [...state.cachedViews]
      })
    }))
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
  }
}

const mutations = {
  SET_HISTORY: (state, router) => {
    console.log(state.historyList.some(r => r.path === router.path))
    !state.historyList.some(r => r.path === router.path) && (state.historyList = [ ...state.historyList, router ])
  },

  DEL_HISTORY: (state, router) => {

    state.historyList.forEach((v, i) => {
      console.log(1)
      if(v.path === router.path) {
        return state.historyList.splice(i, 1)
      }
    })

    // for (const [i, v] of state.historyList.entries()) {
    //   if (v.path === router.path) {
    //     return state.historyList.splice(i, 1)
    //   }
    // }
  },

  ADD_CACHED_VIEW: (state, router) => {
    !state.cachedViews.includes(router.name) && (state.cachedViews = [ ...state.cachedViews, router.name ])
  },

  DEL_CACHED_VIEW: (state, router) => {
    const index = state.cachedViews.indexOf(router.name)
    index > -1 && state.cachedViews.splice(index, 1)
  }

}


export default {
  state,
  actions,
  mutations
}
