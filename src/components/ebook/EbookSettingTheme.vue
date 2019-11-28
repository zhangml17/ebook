<template>
    <transition name="slide-up">
      <div class="setting-wrapper" v-show="menuVisible && settingVisible === 1" >
        <div class="setting-theme" >
          <div class="setting-theme-item" v-for="(item,index) in themeList" :key="index"
            @click="setTheme(index)">
            <div class="preview" :class="{'selected':item.name === defaultTheme}" 
                :style="{'background':item.style.body.background}"></div>
            <div class="text" :class="{'selected':item.name === defaultTheme}">{{ item.name }}</div>
          </div>
        </div>
      </div>
    </transition>
</template>

<script>
import { ebookMixin } from '../../utils/mixin'
import { saveTheme } from '../../utils/localStorage'

export default {
    mixins: [ ebookMixin ],
    methods:{
        setTheme(index) {
             const theme = this.themeList[index]
             this.setDefaultTheme(theme.name).then(()=>{
                 this.currentBook.rendition.themes.select(this.defaultTheme)
                 this.initGlobalTheme()
             })
            saveTheme(this.fileName, theme.name)
        }
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
    z-index:300;

    .setting-theme {
      display: flex;
      height:100%;

      .setting-theme-item {
        flex:1;
        display: flex;
        // 列方向布局
        flex-direction: column;
        padding:px2rem(8);
        box-sizing: border-box;

        .preview {
          flex:1;
          border: px2rem(1) solid #ccc;
          box-sizing: border-box;
          &.selected{
              box-shadow: 0 px2rem(4) px2rem(6) 0 rgba(0, 0 , 0, 0.1);
          }
        }

        .text {
          flex: 0 0 px2rem(20);
          padding-top: px2rem(5);
          font-size: px2rem(14);
          color:#ccc;
          @include center;

          &.selected {
            color:#333;
          }
        }
      }
    }
  }
</style>