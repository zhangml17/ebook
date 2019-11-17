<template>
    <div class="ebook-reader">
        <div id="read"></div>
    </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import { getFontFamily, saveFontFamily, getFontSize, saveFontSize,
        getTheme, saveTheme, } from '../../utils/localStorage'
import { ebookMixin } from '../../utils/mixin'

import Epub from 'epubjs'
global.epub = Epub

export default {
  mixins: [ ebookMixin ],
  methods:{
    nextPage() {
        if(this.rendition) {
            this.rendition.next()
            this.hideTitleAndMenu()
        }
    },
    prevPage() {
        if(this.rendition) {
            this.rendition.prev()
            this.hideTitleAndMenu()
        }
    },
    toggleTitleAndMenu() {
        if(this.menuVisible) {
        this.setSettingVisible(-1)
            this.setFontFamilyVisible(false)
        }
        this.setMenuVisible(!this.menuVisible)
    },
    hideTitleAndMenu() {
    this.setMenuVisible(false)
    this.setSettingVisible(-1)
    this.setFontFamilyVisible(false)
    },
    initFontSize() {
        let fontSize = getFontSize(this.fileName)
        if(!fontSize) {
            saveFontSize(this.fileName, this.defaultFontSize)
        }else{
            this.rendition.themes.fontSize(fontSize)
            this.setDefaultFontSize(fontSize)
        }
    },
    initFontFamily() {
        let font = getFontFamily(this.fileName)
        if(!font) {
            // 如果从localStorage中未获取到字体，即未设置字体，则设置为默认字体
            saveFontFamily(this.fileName, this.defaultFontFamily)
        }else{
            // 如果已经设置了字体，则电子书设置为该字体
            this.rendition.themes.font(font)
            this.setDefaultFontFamily(font)
        }
    },
    initTheme() {
        // 将主题存入缓存
        let currentTheme = getTheme(this.fileName)
        if(!currentTheme) {
            currentTheme = this.themeList[0].name
            saveTheme(this.fileName, currentTheme)
        }
        // 注册主题
        this.themeList.forEach((theme)=>{
            this.rendition.themes.register(theme.name, theme.style)
        })
        this.setDefaultTheme(currentTheme)
        // 选择默认主题
        this.rendition.themes.select(currentTheme) 
    },
    initRedition() {
        this.rendition = this.book.renderTo('read', {
            width: innerWidth,
            height: innerHeight,
            // method: 'default'
        })
        this.rendition.display().then(()=>{
            this.initFontSize()
            this.initFontFamily()
            this.initTheme()
            this.initGlobalTheme()
        })
        this.rendition.hooks.content.register(contents=>{
            Promise.all([
                contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/cabin.css`),
                contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/daysOne.css`),
                contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/montserrat.css`),
                contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/tangerine.css`),
            ]).then(()=>{})
        })
    },
    initGesture(){
        // 绑定手势事件到iframe上
        this.rendition.on('touchstart', event => {
            // console.log(event)
            this.touchStartX = event.changedTouches[0].clientX
            this.touchStartTime = event.timeStamp
        })
        this.rendition.on('touchend', event => {
            this.offsetX = event.changedTouches[0].clientX - this.touchStartX
            const time = event.timeStamp - this.touchStartTime
            if(time < 500 && this.offsetX > 40) {
                this.prevPage()
            }else if(time < 500 && this.offsetX < -40) {
                this.nextPage()
            }else {
                this.toggleTitleAndMenu  ()
            }
            // event.preventDefault()
            event.stopPropagation()
        })
    },
    initEpub () {
        const url = `${process.env.VUE_APP_RES_URL}/epub/` + this.fileName + '.epub'
        this.book = new Epub(url)
        this.setCurrentBook(this.book)
        this.initRedition()
        this.initGesture()
        this.book.ready.then(()=>{
            // generate方法参数为每页上的文字数
            // 默认屏幕宽375 字体大小为16
            return this.book.locations.generate(750 * (window.innerWidth / 375) 
            * (getFontSize(this.fileName) / 16)).then((locations)=>{
                this.setBookAvailable(true)
            })
        })

    }
  },
  mounted () {
    const fileName = this.$route.params.fileName.split('|').join('/')
    this.setFileName(fileName).then(()=>{
        this.initEpub()
    })
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/global'
</style>
