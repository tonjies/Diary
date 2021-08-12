<template>
	<view class="container">
	
		<view class="main">
			<text class="title">
				标题
			</text>
			<!-- <view class="context">
				Hello
			</view> -->
			<textarea class="context">
				
			</textarea>
		</view>
	
	</view>
</template>

<script>
	export default {
		data() {
			return {
			
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		width: 100%;
		height: 100%;
		background-color: #4CD964;
	}

	.main{
		width: 100%;
		height: 100%;
		display: flex;
		background-color: #aaaaff;
		flex-direction: column;
		.title{
			width: 100%;
			height: 200rpx;
			z-index: 1;
			background-color: #3F536E;
		}
		.context{
			width: 100%;
			height: 100%;
			background-color: #55aa7f;
			flex: 1;
		}
		
	}
		
</style>

