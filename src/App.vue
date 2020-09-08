<template>
	<div id="app">
		<div class="huo-sidebar">
			<HuoMenu
				:accordion="accordion"
				@on-open-change="handleOpen"
				@on-select="goToLink"
				:activeName="activeName">
				<div slot="logo" class="logo-box">
					<span class="logo"></span>
					<span>Huo</span>
				</div>
				<div v-for ="menu in menus" :key= menu.title>
					<HuoSubmenu v-if ="menu.children" :name='menu.title'>
						<span slot="title">
							<i class="item-icon">@</i>
							{{menu.title}}
						</span>
						<HuoMenuItem 
							v-for="(v, k) in menu.children" 
							:key="k" :name="v.path">
							{{v.title}}
						</HuoMenuItem>
					</HuoSubmenu>
					<HuoMenuItem v-else :name="menu.path" :to="menu.to">
						<i class="item-icon">@</i>
						{{menu.title}}</HuoMenuItem>
				</div>
			</HuoMenu>
		</div>
		<div class="huo-container">
			<span @click="fadeItem">收放</span>
			<transition name ='ff'>
				<ul v-if='fade' ref='box'>
					<li>sjflsd</li>
					<li>sjflsd</li>
					<li>sjflsd</li>
					<li>sjflsd</li>
					<li>sjflsd</li>
					<li>sjflsd</li>
					<li>sjflsd</li>
					<li>sjflsd</li>
					<li>sjflsd</li>
				</ul>
			</transition>
			<!-- <keep-alive> -->
				<router-view />
			<!-- </keep-alive> -->
		</div>
	</div>
</template>

<script>
import HuoMenu from './components/menu/menu.vue'
import HuoMenuItem from './components/menu/menu-item.vue'
import HuoSubmenu from './components/menu/submenu.vue'
export default {
	name: 'App',
		components:{
			HuoMenu,
			HuoMenuItem,
			HuoSubmenu
		},
	data(){
		return {
			fade:false,
			accordion:true,
			activeName:'path1',
			menus:[
				{
					title:"dvff附件老顾客",
					path:"path1"	
				},
				{
					title:"下拉菜单",
					children:[
						{
							title:"子菜单元素",
							path:"path22"
						},
						{
							title:"子菜单元素",
							path:"path23"
						},
						{
							title:"子菜单元素",
							path:"path43"
						},
						{
							title:"单元发广告素",
							path:"54"
						},
						{
							title:"水电费元素",
							path:"6"
						},
						{
							title:"子菜单元素",
							path:"7"
						},
						{
							title:"让他几个",
							path:"8"
						},
						{
							title:"开发加工费",
							path:"9"
						},
						{
							title:"子菜单元素",
							path:"12"
						},
						{
							title:"让他几个",
							path:"66"
						},
						{
							title:"开发加工费",
							path:"96"
						},
					]	
				},
				{	
					path:"path3",
					title:"回家"
				},
				{
					path:"path4",
					title:"家乐福家"
				},
				{
					path:"path5",
					title:"覆餗费就"
				},
				{	
					path:"path0",
					title:"经典款浪费就"
				},
				{
					path:"path78",
					title:"记录"
				},
				{
					path:"path88",
					title:"东方闪电"
				},
				{
					path:"path99",
					title:"有道",
					to:'http://fanyi.youdao.com/'
				}
			]
		}
	},
	methods:{
		fadeItem(){
			this.fade=!this.fade
		},
		goToLink(){
			// this.$router.push
		},
		handleOpen(){}
	},

	created(){
		// this.menus = menus.filter(item => {
		// 	if(!item.show) returnn item
		// 	if(item.show) {
		// 		let show = false
		// 		item.show.forEach(key => {
		// 			if(this.$store.state.user.userInfo[key]) {
		// 				show = true
		// 			}
		// 		})
		// 		if(show) return item
		// 	}
		// })
	}
}
</script>

<style lang="less" scoped>
.ff-enter-active, .ff-leave-active {
  transition: opacity .5s
}
.ff-enter, .ff-leave-active {
  opacity: 0
}
	#app{
		.huo-sidebar{
			box-shadow:1px 0px 4px #c9c8c8;
			width: 12%;
			min-width: 140px;
			.logo-box{
				display: flex;
				align-items: center;
				justify-content: space-around;
				padding: 20px;
				color:#f80404;
				text-align: center;
				.logo{
					display: inline-block;
					width: 55px;
					height: 55px;
					border-radius: 50%;
					background-size: 24px;
					vertical-align: middle;
					background-image: url('../static/images/logo.png');
					background-repeat: no-repeat;
					background-position: center;
					background-color: #F5F5F5;
				}
			}
			
		}
	}
</style>

