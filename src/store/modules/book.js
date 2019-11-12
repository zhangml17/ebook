const book = {
  state: {
    fileName: ''
  },
  mutations: {
    'SET_FILENAME': (state, fileName) => {
      state.fileName = fileName
    }
  },
  actions: {
    setFileName: ({ commit, state }, fileName) => {
      // console.log(state.test, newTest)
      // 返回的是一个promise对象
      return commit('SET_FILENAME', fileName)
    }
  }
}

export default book
