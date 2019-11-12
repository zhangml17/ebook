<template>
    <div class="ebook-reader">
        <div id="read"></div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Epub from 'epubjs'
global.epub = Epub
export default {
  computed: {
    ...mapGetters(['fileName'])
  },
  methods:{
      nextPage() {
          if(this.rendition) {
              this.rendition.next()
          }
      },
      prevPage() {
          if(this.rendition) {
              this.rendition.prev()
          }
      },
      toggleTitleAndMenu() {

      },
    initEpub () {
        // const url = 'http://localhost:8081/' + this.fileName + '.txt'
        const url = '2018_Book_AgileProcessesInSoftwareEngine.epub'
        // console.log(url)
        this.book = new Epub(url)
        console.log(this.book )
        this.rendition = this.book.renderTo('read', {
            width: innerWidth,
            height: innerHeight,
            // method: 'default'
        })
        this.rendition.display()
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
            event.preventDefault()
            event.stopPropagation()
        })
    }
  },
  mounted () {
    const fileName = this.$route.params.fileName.split('|').join('/')
    this.$store.dispatch('setFileName', fileName).then(()=>{
        this.initEpub()
    })
  }
}
</script>

<style lang="scss" scoped>
</style>
