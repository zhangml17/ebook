<template>
     <transition name="slide-down">
      <div class="title-wrapper" v-show="menuVisible" >
        <div class="left">
          <div class="icon-back" @click="back"></div>
        </div>
        <div class="right">
          <div class="icon-wrapper">
            <span class="icon-shelf"></span>
          </div>

          <div class="icon-wrapper">
            <span class="icon-cart "></span>
          </div>

          <div class="icon-wrapper">
            <span class="icon-more"></span>
          </div>
        </div>
      </div>
    </transition>
</template>
<script>
import { ebookMixin } from '../../utils/mixin'

export default {
    mixins: [ ebookMixin ],
    methods: {
        back() {
            console.log('back...')
        }
    }
}
</script>
<style lang="scss" scoped>
@import '../../assets/styles/global';

  .title-wrapper{
    position: absolute;
    left:0;
    top:0;
    width:100%;
    height:px2rem(48);
    display:flex;
    z-index: 101;
    box-shadow: 0 px2rem(8) px2rem(8) rgba(0, 0, 0, .15);
    background-color: white;
    font-size: px2rem(20);

    .left{
      flex:0 0 px2rem(60);
      @include  center;
    }

    .right{
      flex:1;
      display:flex;
      justify-content: flex-end;

      .icon-wrapper{
        flex:0 0 px2rem(40);
        @include  center;
      }
    }
  }
</style>