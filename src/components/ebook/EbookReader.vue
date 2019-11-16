<template>
    <div class="ebook-reader">
        <div id="read"></div>
    </div>
</template>

<script>
// import { mapGetters } from 'vuex'
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

    initEpub () {
        const url = 'http://localhost:8081/epub/' + this.fileName + '.epub'
        // const url = '2018_Book_AgileProcessesInSoftwareEngine.epub'
        this.book = new Epub(url)
        this.setCurrentBook(this.book)
        
        this.rendition = this.book.renderTo('read', {
            width: innerWidth,
            height: innerHeight,
            // method: 'default'
        })
        this.rendition.display()
        // 绑定事件到iframe上
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
        this.rendition.hooks.content.register(contents=>{
            Promise.all([
                contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/cabin.css`),
                contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/daysOne.css`),
                contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/montserrat.css`),
                contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/tangerine.css`),
            ]).then(()=>{})
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
