<template>
    <div class="ebook-loading">
        <div class="ebook-loading-wrapper">
            <div class="ebook-loading-item" v-for="(item, index) in data" :key="index">
                <div class="ebooki-loading-line-wrapper" v-for="(subItem, subIndex) in item" 
                        :key="subIndex">
                    <div class="ebook-loading-line" ref="line"></div>
                    <div class="ebook-loading-mask" ref="mask"></div>
                </div>
            </div>
            <div class="ebook-loading-center"></div>
        </div>
    </div>
</template>

<script>
import { ebookMixin } from '../../utils/mixin'
import { px2rem } from '../../utils/utils'

export default {
    mixins: [ ebookMixin ],
    data() {
        return {
            data: [
                [{}, {}, {}],
                [{}, {}, {}]
            ],
            lineWidth: [
                { value: 16 },
                { value: 16 },
                { value: 16 },
                { value: 16 },
                { value: 16 },
                { value: 16 }
            ],
            maskWidth: [
                { value: 0 },
                { value: 0 },
                { value: 0 },
                { value: 0 },
                { value: 0 },
                { value: 0 }
            ],
            // mask添加与否
            add: true,
            // mask是否到结尾
            end: false
        }
    },
    mounted() {
        this.task = setInterval(()=>{
            this.$refs.mask.forEach((item, index)=>{
                const mask = this.$refs.mask[index]
                const line = this.$refs.line[index]
                const maskWidth = this.maskWidth[index]
                const lineWidth = this.lineWidth[index]

                if(index === 0) {
                    // mask增加(最大为16，到16就不执行+或-了，除非this.add改变)
                    if(this.add && maskWidth.value < 16) {
                        maskWidth.value ++
                        lineWidth.value --   
                    } 
                    // line增加
                    else if(!this.add && lineWidth.value < 16){
                        maskWidth.value --
                        lineWidth.value ++ 
                    }
                }
                // 非第一个线条
                else{
                    // console.log(index)
                    if(this.add && maskWidth.value < 16) {
                        // 其余mask根据第一条的mask开始增加
                        let preMaskWidth = this.maskWidth[index-1]
                        if(preMaskWidth.value >= 8) {
                            maskWidth.value ++
                            lineWidth.value -- 
                        }
                    }else if(!this.add && lineWidth.value < 16){
                        let preLineWidth = this.lineWidth[index-1]
                        if(preLineWidth.value >= 8) {
                            maskWidth.value --
                            lineWidth.value ++ 
                        }
                    }
                }



                mask.style.width = `${px2rem(maskWidth.value)}rem`
                // console.log(mask.style.width, index)
                mask.style.flex = `0 0 ${px2rem(maskWidth.value)}rem`
                line.style.width = `${px2rem(lineWidth.value)}rem`
                // console.log(line.style.width, index)
                line.style.flex = `0 0 ${px2rem(lineWidth.value)}rem`

                if(index === this.maskWidth.length-1){
                    if(this.add) {
                        // 当line最小时
                        if(maskWidth.value === 16) {
                            this.end = true
                        }
                    }else{
                        // 当line最大时
                        if(maskWidth.value === 0){
                            this.end = true
                        }
                    }
                }

                if(this.end) {
                    this.add = !this.add
                    this.end = false
                }
            })
        }, 500)
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/global';
.ebook-loading{
    position: relative;
    background: transparent;
    width: px2rem(63);
    height: px2rem(40);
    border: px2rem(1.5) solid #d7d7d7;
    border-radius: px2rem(3);
    .ebook-loading-wrapper{
        display: flex;
        width: 100%;
        height: 100%;
        .ebook-loading-item{
            display: flex;
            flex-direction: column;
            flex: 1;
            padding: px2rem(7) 0;
            box-sizing: border-box;
            .ebooki-loading-line-wrapper{
                flex: 1; 
                padding: 0 px2rem(7);
                box-sizing: border-box;
                @include left;
                .ebook-loading-line{
                    flex: 0 0 px2rem(16);
                    width: px2rem(16);
                    height: px2rem(2);
                    background: #d7d7d7;
                }
                .ebook-loading-mask{
                    flex: 0 0 0;
                    width: 0;
                    height: px2rem(2)
                }
            }
        }
        // 书中间的竖线
        .ebook-loading-center{
            position: absolute;
            top: 0;
            left: 50%;
            width: px2rem(1.5);
            height: 100%;
            background: #d7d7d7;
        }
    }
}
</style>