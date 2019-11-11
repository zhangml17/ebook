<template>
  <div class="home">
    <span class="icon-bookmark"></span>
    <span class="text">SJHBKJNL</span>
    <div id="read"></div>
  </div>
</template>

<script>
// import Epub from 'epubjs'
// global.epub = Epub
import { mapGetters } from 'vuex'
export default {
  name: 'home',
  computed: {
    ...mapGetters(['test'])
  },
  mounted () {
    this.$store.dispatch('setTest', 19990).then(() => {
      console.log(this.test)
    })
  }
}
</script>

<style lang="scss" scoped>
@import "./src/assets/styles/global";

.icon-bookmark {
  font-size: px2rem(20);
  color: red;
}
.text {
  font-family: 'Days One';
  font-size: px2rem(20);
  color: aqua;
}
</style>
