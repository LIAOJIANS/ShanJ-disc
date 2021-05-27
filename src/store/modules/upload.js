const state = {
  initFile: {
    progressBar: 0,
    sloaded: 0,
    dloadedremainingTime: null,
    uploadSpeed: null,
    fileName: '',
    fileSize: 0,
    fileType: ''
  },
  uploadList: []
}

const mutations = {
  ON_UPLOAD_PROGRESS: (state, options) => {
    state.uploadList.map((c, i) => {
      c.fileName === options.fileName ? (
        state.uploadList[i] = { ...c, ...options }
      ) : (
        state.uploadList = [
          ...state.uploadList,
          options
        ]
      )
    })
  },

  RESET_PROGRESS: (state) => {
    state.uploadList = []
  }
}

const actions = {
  onUploadProgress({ commit }, options) {
    commit('ON_UPLOAD_PROGRESS', options)
  },

  resetProgress({ commit }) {
    commit('RESET_PROGRESS')
  }
}

export default {
  state,
  mutations,
  actions
}
