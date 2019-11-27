<template>
    <div class="ebook-reader">
        <div id="read"></div>
        <div class="ebook-reader-mask" 
            @click="onMaskClick"
            @touchmove="move" 
            @touchend="moveEnd"></div>
    </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import { getFontFamily, saveFontFamily, getFontSize, saveFontSize,
        getTheme, saveTheme, getLocation } from '../../utils/localStorage'
import { ebookMixin } from '../../utils/mixin'
import { flatten } from '../../utils/book'

import Epub from 'epubjs'
global.epub = Epub

export default {
  mixins: [ ebookMixin ],
  methods:{
    move(e) {
        let offsetY = 0
        if(this.firstOffsetY) {
            offsetY = e.changedTouches[0].clientY - this.firstOffsetY
            this.setOffsetY(offsetY)
        }else {
            this.firstOffsetY = e.changedTouches[0].clientY
        }
        e.preventDefault()
        e.stopPropagation()
    },
    moveEnd(e) {
        this.setOffsetY(0)
        this.firstOffsetY = null
    },
    onMaskClick(e) {
        const offsetX = e.offsetX
        const width = window.innerWidth
        if(offsetX > 0 && offsetX < width * 0.3) {
            this.prevPage()
        }else if(offsetX > 0 && offsetX > width * 0.7){
            this.nextPage()
        }else {
            this.toggleTitleAndMenu()
        }
    },
    nextPage() {
        if(this.rendition) {
            this.rendition.next().then(()=>{
                this.refreshLocation()
            })
            this.hideTitleAndMenu()
        }
    },
    prevPage() {
        if(this.rendition) {
            this.rendition.prev().then(()=>{
                this.refreshLocation()
            })
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
    parseBook() {
        // 获取封面图片链接
        this.book.loaded.cover.then(cover=>{
            this.book.archive.createUrl(cover).then(url=>{
                this.setCover(url)
            })
        })
        // 获取作者和书名的元信息
        this.book.loaded.metadata.then(metadata=>{
            this.setMetadata(metadata)
        })
        // 获取目录信息
        this.book.loaded.navigation.then(nav=>{
            const navItem = flatten(nav.toc)
            function find(item, level=0) {
                return !item.parent ? level : find(navItem.filter(parentItem=>parentItem.id===item.parent)[0], ++level)
            }
            navItem.forEach(item=>{
                item.level = find(item)
            })
            this.setNavigation(navItem) 
        })
    },
    initRedition() {
        this.rendition = this.book.renderTo('read', {
            width: innerWidth,
            height: innerHeight,
            // method: 'default'
        })
        const location = getLocation(this.fileName) 
        this.display(location, ()=>{
            this.initFontSize()
            this.initFontFamily()
            this.initTheme()
            this.initGlobalTheme()
            this.refreshLocation()
            this.parseBook()
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
        // this.initGesture()
        this.book.ready.then(()=>{
            // generate方法参数为每页上的文字数
            // 默认屏幕宽375 字体大小为16
            return this.book.locations.generate(750 * (window.innerWidth / 375) 
            * (getFontSize(this.fileName) / 16)).then((locations)=>{
                this.setBookAvailable(true) 
                this.refreshLocation() 
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
@import '../../assets/styles/global';

.ebook-reader{
    width: 100%;
    height:100%;
    overflow: hidden;
    .ebook-reader-mask {
        position: absolute;
        top:0;
        left:0;
        z-index: 150;
        background: transparent;
        width: 100%;
        height:100%;
    }
}
</style>
