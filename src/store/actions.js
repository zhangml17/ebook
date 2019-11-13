const actions = {
    setFileName: ({ commit, state }, fileName) => {
        // console.log(state.test, newTest)
        // 返回的是一个promise对象
        return commit('SET_FILENAME', fileName)
    },
    setMenuVisible: ({ commit, state }, menuVisible) => {
        return commit('SET_MENUVISIBLE', menuVisible)
    },
    setSettingVisible: ({commit, state}, settingVisible) => {
        return commit('SET_SETTINGVISIBLE', settingVisible)
    },
    setDefaultFontSize: ({commit, state}, defaultFontSize) => {
        return commit('SET_DEFAULTFONTSIZE', defaultFontSize)
    },
    setCurrentBook: ({ commit, state }, currentBook) => {
        return commit('SET_CURRENTBOOK', currentBook)
    }
}

export default actions