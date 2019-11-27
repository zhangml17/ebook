<template>
    <div class="ebook-bookmark" ref="bookmark">
        <div class="ebook-bookmark-text-wrapper">
            <div class="ebook-bookmark-down-wrapper" ref="iconDown">
                <span class="icon-down"></span>
            </div>
            <div class="ebook-bookmark-text">{{ text }}</div>
        </div>
        <div class="ebook-bookmark-icon-wrapper">
            <bookmark :color="color" :width="15" :height="35"></bookmark>
        </div>
    </div>
</template>

<script>
import Bookmark from '../common/Bookmark'
import { realPx } from '../../utils/utils'
import { ebookMixin } from '../../utils/mixin'

const BLUE = '#346cbc'
const WHITE = '#fff'

export default {
    mixins: [ ebookMixin ],
    components: {
        Bookmark
    },
    computed: {
        // 书签高度
        height() {
            return realPx(35)
        },
        // 临界值
        threshold() {
            return realPx(55)
        }
    },
    watch: {
        offsetY(v) {
            if(v >= this.height && v <= this.threshold) {
                // 阶段2: 未到达临界高度
                this.$refs.bookmark.style.top = `${ -v }px`
                this.text = this.$t('book.pulldownAddMark')
                this.color = WHITE

                const iconDown = this.$refs.iconDown
                if(iconDown.style.transform === 'rotate(180deg)') {
                    iconDown.style.transform = 'rotate(0deg)'
                }
            }else if(v >= this.threshold) {
                // 阶段3: 超过临界高度
                this.$refs.bookmark.style.top = `${ -v }px`
                this.text = this.$t('book.releaseAddMark')
                this.color = BLUE

                const iconDown = this.$refs.iconDown
                if(iconDown.style.transform === '' || iconDown.style.transform === 'rotate(0deg)') {
                    iconDown.style.transform = 'rotate(180deg)'
                }
            }
        }
    },
    data() {
        return {
            text: '',
            color: WHITE
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/global';

.ebook-bookmark {
    position: absolute;
    top: px2rem(-35);
    left: 0;
    z-index: 200;
    width: 100%;
    height: px2rem(35);
    .ebook-bookmark-text-wrapper{
        position: absolute;
        right: px2rem(45);
        bottom: 0;
        display: flex;
        .ebook-bookmark-down-wrapper{
            font-size: px2rem(14);
            color: white;
            // 箭头旋转的过渡动画
            transition: all .2s linear;
            @include center;
        }
        .ebook-bookmark-text{
            font-size: px2rem(14);
            color: white; 
        }
    }
    .ebook-bookmark-icon-wrapper{
        position: absolute;
        right: 0;
        bottom: 0;
        margin-right: px2rem(15);

    }
}

</style>