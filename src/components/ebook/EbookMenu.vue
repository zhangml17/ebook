<template>
  <div>
    <transition name="slide-up">
      <div class="menu-wrapper"
        :class="{'hide-box-shadow': !menuVisible || settingVisible >=0 }"
        v-show="menuVisible">
        <div class="icon-wrapper">
          <span class="icon-menu" @click="showSettings(3)"></span>
        </div>

        <div class="icon-wrapper">
          <span class="icon-progress" @click="showSettings(2)"></span>
        </div>

        <div class="icon-wrapper">
          <span class="icon-bright" @click="showSettings(1)"></span>
        </div>

        <div class="icon-wrapper">
          <span class="icon-A" @click="showSettings(0)"></span>
        </div>
      </div>
    </transition>
    <ebook-setting-font></ebook-setting-font>
    <ebook-setting-font-popup></ebook-setting-font-popup>
    <ebook-setting-theme></ebook-setting-theme>
    <ebook-setting-progress></ebook-setting-progress>
    <ebook-slide></ebook-slide>
  </div>
</template>
<script>
// import { mapGetters } from 'vuex'
import { ebookMixin } from '../../utils/mixin'
import EbookSettingFont from './EbookSettingFont'
import EbookSettingFontPopup from './EbookSettingFontPopup'
import EbookSettingTheme from './EbookSettingTheme'
import EbookSettingProgress from './EbookSettingProgress'
import EbookSlide from './EbookSlide'

export default {
  mixins: [ ebookMixin ],
  components: {
    EbookSettingFont,
    EbookSettingFontPopup,
    EbookSettingTheme,
    EbookSettingProgress,
    EbookSlide
  },

  methods: {
      showSettings(key) {
        this.setSettingVisible(key)
      }
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/styles/global';

  .menu-wrapper{
    position: absolute;
    display:flex;
    left:0;
    bottom:0;
    width:100%;
    height:px2rem(48);
    background-color: white;
    font-size: px2rem(20);

    // box-shadow: 水平方向 垂直方向  ...  阴影程度15%
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, .15);
    z-index:101;
    .icon-wrapper{
      flex:1;
      @include center;
    }

    &.hide-box-shadow{
       box-shadow: none;
    }
  }
</style>