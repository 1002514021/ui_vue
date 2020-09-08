<template>
    <div :class="prefixCls">
        <div :class="`${prefixCls}-logo`">
            <slot name='logo' />
        </div>
        <ul :class="`${prefixCls}-container`">
            <!-- <slot name='menu-items'></slot> -->
            <keep-alive>
                <Scroller ref="scroller"> 
                    <slot></slot>
                </Scroller>
            </keep-alive>
        </ul>
    </div>
</template>
<script>
const prefixCls = "huo-menu"
import {findComponentsDownward } from '../../utils/assist'
import Scroller from '../scroller/scroller'
export default {
    name:'HuoMenu',
    components:{
        Scroller
    },
    data(){
        return{
            prefixCls: prefixCls,
            currentActiveName:'',
            openedNames: [],
        }   
    },
    props:{
        activeName:{
            type:[Number,String]
        },
        accordion: { // 是否开启手风琴模式
            type: Boolean,
            default: false
        },
        openNames: { // 当前展开Submenu
            type: Array,
            default () {
                return []
            }
        },
    },
    watch:{
        openNames: {
            immediate: true,
            handler:  function (names) {
                this.openedNames = names
            }
        },
        activeName:{
            immediate:true,
            handler: function (name) {
                this.updateActiveName(name)
            }
        }
    },
    methods:{
        updateOpened() { // 更新当前打开submenu
            const items = findComponentsDownward(this, 'HuoSubmenu')
            if (items.length) {
                items.forEach(item => {
                    item.opened = !!(this.openedNames.indexOf(item.name) > -1)
                })
            }
        },
        updateActiveName(name){
            this.currentActiveName = name
        },
        handleSelect(name) { // 暴露点击事件
            this.updateActiveName(name)
            this.$emit('on-select', name)//向上触发父组件的自定义事件
        },
        handleOpenChange(name){
            this.$refs.scroller.updateScroll()
            const items = findComponentsDownward(this, 'HuoSubmenu')
            this.openedNames = items.filter(item => item.opened).map(item => item.name)
            this.$emit('on-open-change', this.openedNames)
        }
    },
    mounted(){
        this.updateOpened()
    }
}
</script>
<style lang="less" scoped>
    .huo-menu{
        height: 100%;
        overflow: hidden;
        &-logo {
            height: 95px;
        }
        &-container {
            height: calc(~'100vh - 95px');
            position: relative;
            overflow:scroll //待完善
        }
    }
</style>



