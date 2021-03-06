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

// 缓存进度
export function getLocation(fileName) {
    return getBookObject(fileName, 'location')
}
export function saveLocation(fileName, location) {
    setBookObject(fileName, 'location', location)
}

// 缓存总阅读时间
export function getReadTime(fileName) {
    return getBookObject(fileName, 'readTime')
}
export function saveReadTime(fileName, readTime) {
    setBookObject(fileName, 'readTime', readTime)
}

// 缓存书签
export function getBookmark(fileName) {
    return getBookObject(fileName, 'bookmark')
}
export function saveBookmark(fileName, bookmark) {
    setBookObject(fileName, 'bookmark', bookmark)
}