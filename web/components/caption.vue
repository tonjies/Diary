<template>
	<view class="cap-container">
		<view class="main">
			<view  class="title" >{{myTitle}}</view>
			<image v-if="isShowLogo" src="../static/logo.png" class="logo" v-on:click="showlogo" ></image>
			<image v-if="isReturn" src="../static/return.png" class="left" v-on:click="returnLogo"></image>
			<view  v-if="myIsShowline" class="line"></view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"x-caption",
		props:['title','isReturn','isShare','isShowLogo','isShowline'],
		data() {
			return {
				  myTitle:this.title,
				  myReturn:this.isReturn,
				  myShare:this.isShare,
				  myIsShowLogo:this.isShowLogo,
				  myIsShowline:this.isShowline
			};
		},
		methods:{
			showlogo(){
				  this.$emit('showlogo')
			},
			returnLogo(){
				  this.$emit('isReturn')
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	.line{
		background-color: #E9E9E9;
		height: 1rpx;
	}
	

	.cap-container{
		width: 100%;
		height: 94rpx;
		background-color: #FFFFFF;
	}
	


	.main{
		height: 94rpx;
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		
		.logo{
			width: 60rpx;
			height: 60rpx;
			border-radius: 100rpx;
			margin-left: 23rpx;
			position: absolute;
			
		}
		
		.left{
			margin-left: 24rpx;
			width: 46rpx;
			height: 46rpx;
			position: absolute;
		}
		
		.title{
			color: #191919;
			font-size: 38rpx;
			margin: auto;
		}
	}
</style>
