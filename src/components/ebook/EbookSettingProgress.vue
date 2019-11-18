<template>
    <transition name="slide-up">
      <div class="setting-wrapper" v-show="menuVisible && settingVisible === 2" >
        <div class="setting-progress">
          <div class="read-time-wrapper">
            <span class="read-time-text">{{ getReadTimeText() }}</span>
            <span class="icon-forward"></span>
          </div>
          <div class="progress-wrapper">
            <div class="progress-icon-wrapper" @click="prevSection">
              <span class="icon-back" ></span>
            </div>
            <input type="range" class="progress"
                  max="100" min="0" step="1"
                  @change="onProgressChange($event.target.value)"
                  @input="onProgressInput($event.target.value)"
                  :value="progress"
                  :disabled="!bookAvailable"
                  ref="progress">
            <div class="progress-icon-wrapper" @click="nextSection">
              <span class="icon-forward" ></span>
            </div>
          </div>
          <div class="text-wrapper">
            <span class="progress-section-text">{{ getSectionName }}</span>
            <span>({{ bookAvailable ? progress+'%':'加载中...'}})</span>
          </div>
        </div>
      </div>
    </transition>
</template>

<script>
import { ebookMixin } from '../../utils/mixin'
import { saveLocation, getReadTime } from '../../utils/localStorage'

export default {
    mixins: [ ebookMixin ],
    computed:{
      getSectionName() {
        if(this.section) {
          const sectionInfo = this.currentBook.section(this.section)
          if(sectionInfo && sectionInfo.href && this.currentBook && this.currentBook.navigation) {
            return this.currentBook.navigation.get(sectionInfo.href).label
          }
        }
      }
    },
    methods: {
      // 拖动松手后执行
      onProgressChange(progress) {
        this.setProgress(progress).then(()=>{
          this.displayProgress()
          this.updateProgressBg()
        })
      },
      // 拖动过程中执行
      onProgressInput(progress) {
        this.setProgress(progress).then(()=>{
          this.updateProgressBg()
        })
      },
      displayProgress(){
        // 通过进度百分比获取cfi
        const cfi = this.currentBook.locations.cfiFromPercentage(this.progress / 100)
        this.display(cfi, ()=>{
          this.refreshLocation()
        })
      },
      updateProgressBg(){
        // 进度条右边的部分样式
        this.$refs.progress.style.cssText += `background-size: ${this.progress}% 100% !important;`
      },
      prevSection(){
        console.log(this.section)
        if(this.section > 0 && this.bookAvailable) {
          this.setSection(this.section -1 ).then(()=>{
            this.displaySection()
          })
        }
      },
      nextSection(){
        console.log(111)
        if(this.section < this.currentBook.spine.length - 1 && this.bookAvailable) {
          this.setSection(this.section + 1).then(()=>{
            this.displaySection()
          })
        }
      },
      displaySection() {
        const sectionInfo = this.currentBook.section(this.section)
        if(sectionInfo && sectionInfo.href) {
          this.display(sectionInfo.href, ()=>{
            this.refreshLocation()
          })
        }
      }

    },
    updated(){
      this.updateProgressBg()
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/global';
 .setting-wrapper {
    position: absolute;
    bottom:px2rem(48);
    left:0;
    width:100%;
    height:px2rem(90);
    background-color: white;
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, .15);
    z-index:102;

    .setting-progress {
      position: relative;
      width:100%;
      height:100%;
      .read-time-wrapper{
        position: absolute;
        left:0;
        top:0;
        width: 100%;
        height: px2rem(40);
        font-size: px2rem(12);
        @include center; 
      }
      .progress-wrapper {
        width:100%;
        height:100%;
        @include center;
        padding:0 px2rem(15);
        box-sizing: border-box;
        .progress-icon-wrapper{
          font-size: px2rem(20);
        }
        .progress {
          margin: 0 px2rem(10);
          width:100%;
          // 覆盖默认样式
          -webkit-appearance: none;
          height:px2rem(2);
          // // 设置两种背景
          // background: -webkit-linear-gradient(#999,#999) no-repeat,#ddd;
          // background-size: 0 100%!important;

          &:focus {
            outline: none;
          }
          // 进度条拖动的圆形手柄
          &::-webkit-slider-thumb {
             -webkit-appearance: none;
             height:px2rem(20);
             width:px2rem(20);
             border-radius:50%;
             background:white;
             box-shadow:0 px2rem(4) px2rem(4) pgba(0,0,0,.15);
             border:px2rem(1) solid #ccc;

          }
        }
      }

      .text-wrapper {
        position: absolute;
        left:0;
        bottom:px2rem(10);
        width:100%;
        color:#333;
        font-size: px2rem(12);
        // text-align: center;
        box-sizing: border-box;
        padding: 0 px2rem(20);
        @include center;
        .progress-section-text{
          @include ellipsis ;
        }
      }
    }
  }
</style>