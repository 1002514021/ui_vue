<template>
    <a v-if='to'
        :href="to"
        :class="classes"
        :style="itemStyle"
        @click.ctrl="handleClickItem($event)"><slot></slot> </a>
    <li v-else
        :class="classes"
        :style="itemStyle"
        @click.stop="handleClickItem">
        <slot></slot>   
    </li>
</template>
<script>
const prefixCls = 'huo-menu'
import { findComponentUpward,findComponentsUpward} from '../../utils/assist'
export default {
    name:'HuoMenuItem',
    data(){
        return{
            prefixCls:prefixCls,
            menu: findComponentUpward(this, 'HuoMenu')
        }
    },
    props:{
        name: {
            type: [String, Number],
            required: true
        },
        to:{
            type:[String,Number] //?
        },
        disabled: {
            type:Boolean,
            default:false
        }
    },
    computed:{
        classes() {
            return [
                `${prefixCls}-item`,
                {[`${prefixCls}-item-active`]:this.menu.currentActiveName === this.name}
            ]
        },
        hasParentSubmenu () {
            return !!findComponentUpward(this, 'HuoSubmenu')
        },
        parentSubmenuNum () {
            return findComponentsUpward(this, 'HuoSubmenu').length
        },
        itemStyle(){
            return this.hasParentSubmenu?{
                paddingLeft: 40 + (this.parentSubmenuNum - 1) * 16 + 'px'
            } : {}
        },
    },
    methods:{
        handleClickItem (event,newWin=false) {
			// this.$router.push
            if(this.disabled) return
            this.menu.handleSelect(this.name)
            this.handleCheckClick(event, newWin)
        },
        handleCheckClick (event, newWin = false) {
            if(!this.to) return
            if(this.target === '_blank') return
            event.preventDefault()
            this.handleClick(newWin)
        },
        handleClick(){}
    },
}
</script>
<style lang="less" scoped>
    .huo-menu-item{
        display:block;
        list-style: none;
        text-decoration: none;
        font-size: 14px;
        padding: 10px;
        cursor: pointer;
        color:#333;//全局
        transition:1000ms background-color ease-in-out, 
            0.3s color ease-in-out;
    }
    .huo-menu-item-active{
        color:#f80404;
        background-color: #f3f0f185;
        border-left: 2px solid #f80404
    }
</style>


