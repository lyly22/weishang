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
      state.userId = v.userId
      state.userName = v.userName
      state.jifen = v.jifen
      state.vipCount = v.vipCount
    },
    vipCount(state, v) {
      state.vipCount = v.vipCount
    }
  }
})
