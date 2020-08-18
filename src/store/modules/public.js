export default {
  namespaced: true,
  state: {
    // 本地uuid
    sid: ''
  },

  mutations: {
    setSid (state, val) {
      state.sid = val
    }
  },

  getters: {
    sid: state => state.sid
  }
}
