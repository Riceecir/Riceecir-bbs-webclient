export default {
  namespaced: true,
  state: {
    // 本地uuid
    sid: '',
    // 顶部进度条
    topLineear: false
  },

  mutations: {
    setSid (state, val) {
      state.sid = val
    },
    setTopLineear (state, val) {
      state.topLineear = val
    }
  },

  getters: {
    sid: state => state.sid,
    topLineear: state => state.topLineear
  }
}
