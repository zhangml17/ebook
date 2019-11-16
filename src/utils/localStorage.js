import Storage from 'web-storage-cache'

const localStorage = new Storage()

export function getLocalStorage(key) {
    return localStorage.get(key)
}

export function setLocalStorage(key, value) {
    localStorage.set(key, value)
}

export function removeLocalStorage(key) {
    localStorage.delete(key)
}

export function clearLocalStorage(){
    localStorage.clear()
}

export function setBookObject(fileName, key, value) {
    let book = getLocalStorage(`${fileName}-info`)
    if(!book) {
        book = {}
    }
    book[key] = value
    setLocalStorage(`${fileName}-info`, book)
}

export function getBookObject(fileName, key) {
    let book = getLocalStorage(`${fileName}-info`)
    if(book) {
        return book[key]
    }else {
        return null
    }
}

// 缓存字体
export function getFontFamily(fileName) {
     return getBookObject(fileName, 'fontFamily')
}

export function saveFontFamily(fileName, font) {
    setBookObject(fileName, 'fontFamily', font)
}

// 缓存字号
export function getFontSize(fileName) {
    return getBookObject(fileName, 'fontSize')
}
export function saveFontSize(fileName, size) {
    setBookObject(fileName, 'fontSize', size)
}

// 缓存国际化语言(全局配置 ))
export function getLocale() {
    return getLocalStorage('locale')
}
export function saveLocale(locale) {
    setLocalStorage('locale', locale)
}

// 缓存主题
export function getTheme(fileName) {
    return getBookObject(fileName, 'theme')
}
export function saveTheme(fileName, theme) {
    setBookObject(fileName, 'theme', theme)
}