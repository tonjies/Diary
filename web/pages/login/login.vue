<template>
	<view class="container">
		<view class="main">
			<xCaption :title="title" :isReturn="isReturn" :isShare="isShare"></xCaption>
			<view class="title-hint">账号密码登录</view>
			<view class="edit">
					<view class="tv-user">输入账户</view>
				<input 
					placeholder="请输入账号" 
					class="user" 
					@input="onUserKeyInput" />
				<view class="line"></view>
					<view class="tv-user">输入密码</view>
				<input placeholder="请输入密码" class="user"  @input="onPassKeyInput"/>
						<view class="line"></view>
			</view>
			<view class="affirm">
				<view class="title">没有注册过的账户登录将一键注册登录</view>
				<button 
					  :class="buttonIsDark?'button dark':'button'"
					 @tap="click">登录</button>
			</view>
		</view>
	</view>
</template>

<script>
	import xCaption from '@/components/x-caption.vue';
	import store from '@/store/index.js'   
	export default {
		 data(){
			 return{
				 title:"",
				 isReturn:false,
				 isShare:false,
				 username:"",
				 password:"",
				 buttonIsDark:false
			 }
		 },
		 components:{xCaption },
		 methods:{
			 //监听用户名输入框
			 onUserKeyInput:function(event){
				 this.username = event.target.value
			 },
			 //监听密码输入框
			 onPassKeyInput:function(event){
				this.password = event.target.value
				if(this.username!=""&&this.password!=""){
					console.log("按钮变色")
					this.buttonIsDark=true
				}else{
					this.buttonIsDark=false
				}
			 },
			 //登录
			 click:function(event){
				 if(this.username!=""&&this.password!=""){
				 	console.log("按钮变色")
					//请求登录接口
					uni.request({
						url:'http://127.0.0.1:7001/user/login',
						method:'POST',
						data:{
							'username':this.username,
							'password':this.password
						},
						success:(res)=>{
							console.log(res)
							if(res.data.status){
								//存储token到本地指定的key中，跳转到主界面
								// store.commit('savetoken',res.data.body.token)
								uni.setStorage({
									key:'token',
									data:res.data.body.token,
									success: function () {
									     console.log('保存token成功');
									}
								})
								uni.navigateTo({
									url:'../home/home'
								})
							}else{
								//弹出错误提示
								uni.showToast({
								    title: res.data.msg,
								    duration: 2000
								});
							}
						}
					})
				 }
			 }
		 }
	}
</script>

<style lang="scss" scoped>
	.main{
		display: flex;
		flex-direction: column;
	
		.title-hint{
			margin-top: 31rpx;
			margin-left: 63rpx;
			color: #191919;
			font-size: 40rpx;
			font-weight: bold;
			margin-bottom: 104rpx;
		}
	
		.edit{
			margin-left: 63rpx;
				font-size: 32rpx;
			.tv-user{
				color: #191919;
			
				font-weight: bold;
			}
			
			.line{
				margin-top: 5rpx;
				height: 1rpx;
				width: 613rpx;
				background-color: #E2E3E4;
				margin-bottom: 21rpx;
			}
			
			.user{
				height: 70rpx;
			}
		}
	
		.affirm{
			height: 63rpx;
			display: flex;
			justify-content:space-between;
			margin-right: 73rpx;
			align-items:center;
			margin-top: 43rpx;
			.title{
				margin-left: 63rpx;
				color: #45494D;
				font-size: 25rpx;
				font-weight: bold;
			
			}
			.button{
				display: flex;
				justify-content:center;
				align-items:center;
				width: 165rpx;
				height: 63rpx;
				background-color: #F7F7F7;
				font-size: 29rpx;
				color: #D6D6D7;
			}
			.dark{
				background-color: #282C35;
			}
		}
	}
</style>
