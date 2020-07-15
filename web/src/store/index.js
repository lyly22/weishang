import Vue from 'vue'

import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userId: null,
    userName: null,
    jifen: 0,
    vipCount: 0
  },
  mutations: {
    baseInfo(state, v) {
      state.userId = v.id
      state.userName = v.userName
      state.jifen = v.jifen
    },
    updateJifen(state, v) {
      state.jifen = v
    },
    vipCount(state, v) {
      state.vipCount = v.vipCount
    }
  }
})
