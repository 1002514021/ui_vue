<template>
    <div ref="scroller" class="scroll-content-horizonal">
        <slot></slot>
    </div>
</template>
<script>
import PerfectScrollbar from 'perfect-scrollbar'
// import "perfect-scrollbar/css/perfect-scrollbar.css"
export default {
    name:"HuoScroller",
    data(){
        return{
            scroll:null,
            container:null,
            scrollTop:0,
            scrollLeft:0
        }
    },
    methods:{
        initScroll(element){
            this.container = element || this.$refs.scroller
            this.scroll = new PerfectScrollbar(this.container, {
                wheelSpeed: 0.5,
                wheelPropagation: false,
                useBothWheelAxes: true,
                minScrollbarLength: 60,
                maxScrollbarLength: 300
            })
            this.container.addEventListener('ps-scroll-y', (e) => {
                this.scrollTop = e && e.target && e.target.scrollTop
                this.$emit('on-scroll-y', this.scrollTop) // 暴露Y轴滚动接口
            })
            this.container.addEventListener('ps-scroll-x', (e) => {
                this.scrollLeft = e && e.target && e.target.scrollLeft
                this.$emit('on-scroll-x', this.scrollLeft) // 暴露X轴滚动接口
            })
        },
        scrollTo(top, left) { // 滚动到对应位置
            this.container.scrollTop = top
            this.scroll.update()
        },
        
        updateScroll() {  // 更新滚动条
            this.scroll.update()
        },
        destroyScroll() {
            this.container = null
            this.scrollTop = 0
            this.scrollLeft = 0
            this.scroll = null
        },
    },
    activated(){
        this.container && this.scrollTo(this.scrollTop,this.scrollLeft)
    },
    mounted(){
        this.initScroll()
    },
    destroyed(){
        this.destroyScroll()
    }
}
</script>
