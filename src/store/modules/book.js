const book = {
  state: {
    test: 1
  },
  mutations: {
    'SET_TEST': (state, newTest) => {
      state.test = newTest
    }
  },
  actions: {
    setTest: ({ commit, state }, newTest) => {
      // console.log(state.test, newTest)
      // 返回的是一个promise对象
      return commit('SET_TEST', newTest)
    }
  }
}

export default book
