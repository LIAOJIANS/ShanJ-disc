import { uploadList, groupingList, getHistory } from '@/api/file'
const state = {
  fileList: [],
  fileHistory: [],
  fileCurrentPath: ''
}


const actions = {
  getFileList({ commit, state }, u_id) {
    return new Promise(resolve => {
      uploadList(u_id, state.fileCurrentPath).then(res => {
        commit('GET_FILE_LIST', res.data)
        resolve(res.data)
      }).catch(() => {
        commit('GET_FILE_LIST', [])
      })
    })
  },

  getHistory({ commit }) {
    return new Promise(resolve => {
      getHistory().then(res => {
        commit('GET_HISTORY', res.data)
        resolve(res.data)
      })
    })
  },

  setCurrentPath({ commit, dispatch }, options) {
    const { path, u_id } = options
    commit('SET_CURRENT_PATH', path)
    dispatch('getFileList', u_id)
    // dispatch('setBackPath', options)
  },

  setBackPath({ commit, dispatch }, options) {
    return new Promise(resolve => {
      const { path, u_id } = options
      commit('SET_BACK_PATH', path)
      dispatch('getGroupList').then(list => {
        resolve(list)
      })
      dispatch('getFileList', u_id)
    })
  },

  getGroupList({ state }) {
    return new Promise(resolve => {
      groupingList(state.fileCurrentPath).then(res => {
        resolve(res.data)
      })
    })
  },

  filterFile({ commit }, list) {
    commit('FILTER_FILE_LIST', list)
  }
}

const mutations = {
  GET_FILE_LIST: (state, list) => {
    state.fileList = list
  },

  GET_HISTORY: (state, list) => {
    state.fileHistory = list
  },

  SET_BACK_PATH: (state, path) => {
    state.fileCurrentPath = path
  },

  FILTER_FILE_LIST: (state, list) => {
    state.fileList = list
  },

  SET_CURRENT_PATH: (state, path) => {
    state.fileCurrentPath = !state.fileCurrentPath ? path : `${ state.fileCurrentPath }/${ path }`
  }
}

export default {
  state,
  actions,
  mutations
}
