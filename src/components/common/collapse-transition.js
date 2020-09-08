import { addClass, removeClass } from '../../utils/assist'
const Transition ={
    beforeEnter(el){
        addClass(el, 'collapse-transition')
        if(!el.dateset) el.dateset={}
        let styles = window.getComputedStyle(el)
        // 记录展开前的属性值
        el.dataset.oldOverflow = styles.getPropertyValue('overflow')
        el.dataset.oldPaddingTop = styles.getPropertyValue('padding-top')
        el.dataset.oldPaddingBottom = styles.getPropertyValue('padding-bottom')
        el.style.height = 0
        el.style.paddingTop = 0
        el.style.paddingBottom = 0
        el.style.overflow = "hidden"
    },
    enter(el) {
        // if (el.scrollHeight !== 0) {
        //     el.style.height = el.scrollHeight + 'px'
        // } else {
        //     el.style.height = ''
        // }
        if(el.scrollHeight !== 0) {
            // 动画过程中，逐渐增大到展开前应占的高度值
            el.style.height = el.scrollHeight + 'px';
            el.style.paddingTop = el.dataset.oldPaddingTop;
            el.style.paddingBottom = el.dataset.oldPaddingBottom;
        }
    },
    afterEnter(el) {
        el.classList.remove('collapse-transition');
        el.style.height = '';
        el.style.overflow = el.dataset.oldOverflow;
    },

    beforeLeave(el) {
        if (!el.dataset) el.dataset = {}
        el.style.height = el.scrollHeight + 'px'
    },

    leave(el) {
        if (el.scrollHeight !== 0) {
            addClass(el, 'collapse-transition')
            el.style.height = 0
            el.style.paddingTop = 0
            el.style.paddingBottom = 0
        }
    },

    afterLeave(el) {
        removeClass(el, 'collapse-transition')
        el.style.height = ''
    }
}
export default {
    name: 'CollapseTransition',
    functional: true,
    render(h, {
        children
    }) {
        const data = {
            on: Transition
        }

        return h('transition', data, children)
    }
}