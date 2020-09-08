<template>
    <li :class="classes">
        <div :class="`${prefixCls}-submenu-title`" :style="titleStyle"  @click.stop="handleClick">
            <span :class="`${prefixCls}-submenu-title-content`">
                <slot name="title"></slot>
            </span>
            <span v-if="opened">开</span>
            <span v-else>关</span>
        </div>
        <CollapseTransition>
            <ul :class="`${prefixCls}-container`" :style="styleObj"  v-if="opened">
                <slot></slot>
            </ul>
        </CollapseTransition>
    </li>
</template>
<script>
const prefixCls = 'huo-menu'
import { findComponentUpward,findComponentsUpward} from '../../utils/assist'
import CollapseTransition from '../common/collapse-transition.js'
export default {
    name:"HuoSubmenu",
    components:{
        CollapseTransition
    },
    data () {
        return {
            prefixCls:prefixCls,
            opened:false,
            menu:findComponentUpward(this, 'HuoMenu'),
            styleObj:{
                height:0
            }
            
        }
    },
    props:{
        name: {
            type: [String, Number],
            required: true
        },
    },  
    computed:{
        classes(){
            return[
                `${prefixCls}-submenu`,
                {
                    [`${prefixCls}-submenu-active`]: this.menu.currentActiveName == this.name
                }
            ]
        },
        hasParentSubmenu () {
            return !!findComponentUpward(this, 'HuoSubmenu')
        },
        parentSubmenuNum () {
            return findComponentsUpward(this, 'HuoSubmenu').length
        },
        titleStyle(){
            return this.hasParentSubmenu ? {
                paddingLeft: 40 + (this.parentSubmenuNum - 1) * 16 + 'px'
            } : {}
        },
    },
    methods:{
        handleClick(){
            const opened = !this.opened
            if(this.menu.accordion) {
                this.$parent.$children.forEach(item => {
                    if (item.$options.name === 'HuoSubmenu') item.opened = false
                })
            }
            this.opened = opened
            this.menu.handleOpenChange(this.name)
        }
    }
}
</script>
<style lang="less" scoped>
.huo-menu-container{
    overflow: hidden;
    flex: 1;
    transition:0.3s height ease-in-out;
}
.huo-menu-submenu{
    &-title{
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        padding: 10px;
    }
    &-active{
        color: red;
    }
}
</style>

