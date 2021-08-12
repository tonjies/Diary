<template>
	<view class="container">
		<view class="main">
			<view class="header">
				<xCaption 
					 :title="title"
					 :isShowLogo="true"
					 v-on:showlogo="showDrawer"
					 >
				 
				 </xCaption>
			</view>
			<view v-if="isHasData" class="list">
				<view 
					@longtap="longItem(index,item)"
					v-for="(item,index) in list"
					:key="index" class="doc-list"
					v-on:click="clickItem(index,item)" >
						<view class="hint-line">
							<view class="hint-logo">
								<image src="../../static/icon_logo.png" class="logo-size"></image>
								<view class="center-line"></view>
							</view>
						</view>
						<view class="content">
							<view v-if="mCurrentSelectIndex==index">
								<image 
										v-on:click="update(index,item)"	
										src="../../static/update_icon.png" class="editSmellLogo">
								</image>
							</view>
							<view class="item-date">{{item.addtime}}</view>
							<view class="item-title">{{item.title}}</view>
							<view class="item-content">{{item.content}}</view>
						</view>
				</view>
			</view>
			
			<view v-else>
				<view class="data-empty">
					<image src="../../static/bulb.png" class="logo"></image>
					<view class="describe">当前还没有文档被创建~</view>
				</view>
				
			</view>
			<uni-drawer ref="showRight" mode="left" :maskClick="true">
				<view class="draw-view">
					<view class="draw-header">
						<image src="../../static/logo.png" class="draw-logo"></image>
						<view class="user">tonjies</view>
					</view>
					<view class="draw-line"></view>
					<view class="draw-option" v-on:click="logOut()">
						<image src="../../static/logout.png" class="logo-logout"></image>
						<view class="text-logout">退出登录</view>
					</view>
				</view>
			</uni-drawer>
			
			<view class="option-button">
				<buttonOption
					v-on:add="add"
					>
					
				</buttonOption>
			</view>
			
		</view>
	</view>
</template>

<script>
	/**
	 * 侧滑抽屉
	 * https://ext.dcloud.net.cn/plugin?id=26
	 */
	// 
	import {Http} from '@/utils/http.js'
	import data from '@/api/data'
	import xCaption from '@/components/x-caption.vue';
	import buttonOption from '@/components/x-buttonOption.vue';
	import minModal from '@/components/min-modal/min-modal'
	import { mapState } from 'vuex'//引入mapState
	import store from '@/store/index.js'//需要引入store
	export default {
		data() {
			return {
				title:'文档列表',
				list:[] ,//文档列表,
				mCurrentSelectIndex:0,
				isShowEdit:false,
				isHasData:true,
			}
		},
		//使用对象展开运算符将此对象混入到外部对象中
		computed:{
			 token(){
				  return this.$store.state.token
			 }
		},
		onLoad:async function(option){
			//请求列表数据
			var res= await Http.request({url:"/doc/getAll"})
			this.list=res.body
			console.log(this.list)
			if(this.list.length==0){
				console.log('文档列表为0')
				this.isHasData=false
			}
		},
		methods: {
			showDrawer() {
				this.$refs.showRight.open();
			},
			closeDrawer() {
				this.$refs.showRight.close();
			},
			clickItem(index,item){
				this.mCurrentSelectIndex=index
			},
			//注销
			logOut(){
				//清除token
				//存储token，跳转到主界面
				store.commit('savetoken',"")
				uni.navigateTo({
					url:'../login/login'
				})
			},
			longItem(index,item){
			  uni.showModal({
			      content: '确定要删除该文档吗?',
				  cancelText:'取消',
				  confirmText:'确定',
				  confirmColor:'#72A5E8',
			      success: function (res) {
			          if (res.confirm) {
			              console.log('用户点击确定');
			          } else if (res.cancel) {
			              console.log('用户点击取消');
			          }
			      }
			  });
			},
			add(){
				console.log("添加文章")
				uni.navigateTo({
					url:'../edit/edit'
				})
			},
			update(index,item){
				console.log("更新文章")
				uni.navigateTo({
					url:'../edit/edit?tag='+item.tag
				});
				console.log(index)
				console.log(item)
			}
		},
		components:{
			'xCaption':xCaption,
			'buttonOption':buttonOption
		},
		
		
	}
</script>

<style lang="scss" scoped>
	.main {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	.header{
		width: 100%;
		background-color: #FFFFFF;
	}
	.data-empty{
		display: flex;
		flex-direction: column;
		align-items: center;
		.logo{
			margin-top: 223rpx;
			width: 121rpx;
			height: 121rpx;
		}
		.describe{
			margin-top: 71rpx;
			color: #707070;
			font-size: 33rpx;
		}
	}
	.list{
		width: 100%;
		overflow: scroll;
		.doc-list{
			position: relative;
			margin-top: 17rpx;
			margin-left: 8rpx;
			margin-right: 19rpx;
			display: flex;
			flex-direction: row;
			
		
			.hint-line{
				display: flex;
				flex-direction: column;
				width: 93rpx;
				height: 229rpx;
				.hint-logo{
					width: 93rpx;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					.logo-size{
						width: 29rpx;
						height: 29rpx;
					}
					.center-line{
						width: 1px;
						height: 183rpx;
						background-color: #707070;
						margin-top: 15rpx;
					}
				}
			}
				
			.content{
				display: flex;
				flex-direction: column;
			
				.item-title{
					margin-top: 33rpx;
					font-size: 27rpx;
				}
				
				.item-content{
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
					font-size: 27rpx;
					margin-top: 38rpx;
				}
				.item-date{
					color: #707070;
					margin-top: -8rpx;
				}
				.editSmellLogo{
					width: 40rpx;
					height: 40rpx;
					right: 0;
					top: -6rpx;
					z-index: 10;
					position: absolute;
				}			
				.hidden{
					visibility:hidden
				}
			}
		}
	}
	
	
	.draw-view{
		width: 583rpx;
		height: 100%;
		background-color: #FFFFFF;
		.draw-header{
			height: 350rpx;
			display: flex;
			.draw-logo{
				width: 121rpx;
				height: 121rpx;
				border-radius: 400rpx;
				margin-top: 65rpx;
				margin-left: 33rpx;
			}
			.user{
				margin-top: 108rpx;
				margin-left: 29rpx;
				font-weight: bold;
			}
			
			
		}
		.draw-line{
			height: 2rpx;
			width: 583rpx;
			background-color:#C2C2C2 ;
			margin-top: 350prpx;
		}

		.draw-option{
			width: 585rpx;
			height: 98rpx;
			display: flex;
			align-items: center;
			.logo-logout{
				width: 50rpx;
				height: 50rpx;
				margin-left: 31rpx;
			}
			.text-logout{
				color: #707070;
				font-size: 29rpx;
				margin-left: 25rpx;
			}
		}
		
		
	}

	.option-button{
		position: absolute;
	}

	

	
</style>
