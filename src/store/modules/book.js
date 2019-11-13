const book = {
  state: {
    fileName: '',
    menuVisible: false,
    settingVisible: -1,  // -1 不显示 0 显示字体 1 主题 2 进度 3 目录
    defaultFontSize: 16,
    currentBook: null
  },
  mutations: {
    'SET_FILENAME': (state, fileName) => {
      state.fileName = fileName
    },
    'SET_MENUVISIBLE': (state, menuVisible) => {
      state.menuVisible = menuVisible
    },
    'SET_SETTINGVISIBLE': (state, settingVisible) => {
      state.settingVisible = settingVisible
    },
    'SET_DEFAULTFONTSIZE': (state, defaultFontSize) => {
      state.defaultFontSize = defaultFontSize
    },
    'SET_CURRENTBOOK': (state, currentBook) => {
      state.currentBook = currentBook
    }
  }
}

export default book
