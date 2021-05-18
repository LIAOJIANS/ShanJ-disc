const state = {
  initFile: {
    uploadSpeed: null,
    remainingTime: null,
    fileSize: 0,
    fileName: '',
    fileType: '',
    progressBar: 0,
    sloaded: 0,
    fileState: ''
  },
  uploadList: [
    {
      uploadSpeed: null,
      remainingTime: null,
      fileSize: 0,
      fileName: '',
      fileType: '',
      progressBar: 0,
      sloaded: 0
    }
  ],

  dowList: []
}

const mutations = {
  ON_UPLOAD_PROGRESS: (state, options) => {
    if (state.uploadList.length > 1) {
      state.uploadList.forEach((item, index) => {
        item.fileName === options.fileName
          ? state.uploadList[index] = { ...state.uploadList[index], ...options }
          : state.uploadList = [...state.uploadList, options]
      })
    } else {
      state.uploadList = [options]
    }
  },

  RESET_PROGRESS: (state) => {
    state.uploadList = [
      state.initFile
    ]
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
