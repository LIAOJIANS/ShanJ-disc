
const state = {
  navType: null
}


const actions = {
  switchMode({ commit }, type) {
    commit('SWITCH_MODE', type)
  }
}

const mutations = {
  SWITCH_MODE: (state, type) => {
    state.navType = type
  }
}


export default {
  state,
  actions,
  mutations
}
