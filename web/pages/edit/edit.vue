<template>
	<view class="container">
		<view class="main">
			<view class="header">
					<xCaption 
						v-on:isReturn="clickReturn"
						:isReturn="true" 
						:isShare="false" 
						:title="title" 
						:isShowline="true"></xCaption>
					<input
						v-model="docTitle"
						@input="onTitleInput"
						placeholder="标题" 
						class="input-title" />
					<view class="line"></view>
			</view>

			<textarea
					class="textarea"
					placeholder="请输入内容"
					cursor-spacing="100px"
					v-model="docContent"
					>
					
			</textarea>
			
			<view class="option-button">
				<buttonOption 
					v-on:add="add"
					v-on:recycle="recycle"
					:isSpread="true">
				</buttonOption>
			</view>
		</view>
	</view>

</template>

<script>
	import xCaption from '@/components/x-caption.vue';
	import buttonOption from '@/components/x-buttonOption.vue';
	import {Http} from '@/utils/http.js'
	export default {
		data() {
			return {
				title:"添加日记",
				docTitle:"",
				docContent:"",
				currentIsUpdate:false,
				result:Object
			}
		},
		onLoad:async function(option){
			//打印出上个页面传递的参数
			 if(option.tag){
				 this.currentIsUpdate=true
				 //请求单个文档数据
				 var res=await Http.request(
				 	{url:"/doc/readsingle",data:{"tag":option.tag}}
				 )
				 //标题
				 this.docTitle=res.body[0].title
				 //内容
				 this.docContent=res.body[0].content
				 this.result=res.body[0]
			 }
		},
		methods: {
			onTitleInput:function(event){
				this.docTitle=event.target.value
				console.log(this.docTitle)
			},
			clickReturn(){
				console.log('点击返回')
				uni.showModal({
					content:'文档未保存，确定要返回吗',
					confirmText:'确定',
					cancelText:'取消',
					confirmColor:'#72A5E8',
					success:function(res){
						if(res.confirm){
							console.log('确定')
							uni.navigateTo({
								url:'../home/home'
							})
						}else{
							console.log('取消')
						}
					}
				})
			},
			add:async function(){
				console.log("add")
				console.log('文章内容:'+this.docContent)
				console.log('文章标题:'+this.docTitle)
				if(this.currentIsUpdate){
					//将数据添加到数据库中
					this.result.title=this.docTitle
					this.result.content=this.docContent
					var res=await Http.request(
						{url:"/doc/update",
						data:this.result}
					)
					if(res.status){
						uni.navigateTo({
							url:'../home/home'
						})
					}
					return
				}
				//将数据添加到数据库中
				var res=await Http.request(
					{url:"/doc/createdoc",
					data:{"title":this.docTitle,"content":this.docContent}}
				)
				if(res.status){
					uni.navigateTo({
						url:'../home/home'
					})
				}
			},
			recycle:async function(){
				//删除文章
				console.log("recycle")
				var res=await Http.request(
					{url:"/doc/delete",data:{"tag":this.result.tag}}
				)
					
				if(res.status){
					uni.navigateTo({
						url:'../home/home'
					})
				}
			}
		},
		components:{
			'xCaption':xCaption,
			'buttonOption':buttonOption
		}
	}
</script>

<style lang="scss" scoped>
	
	.container{
		width: 100%;
		height: 100%;
		background-color: #FFFFFF;
	}
	.main {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.header{
		width: 100%;
		display: flex;
		z-index: 1;
		flex-direction: column;
		margin-bottom: 8rpx;
		.input-title{
			font-size: 38rpx;
			color: #191919;
			margin-bottom: 17rpx;
			background-color: #FFFFFF;
			width: 675rpx;
			padding-left: 38rpx;
			padding-right: 38rpx;
			margin-top: 17rpx;
		}
		.line{
			margin: auto;
			background-color: #E9E9E9;
			height: 1rpx;
			width: 675rpx;
		}
	}




	// .edit{
	// 	width: 100%;
	// 	height: 100%;
	// 	overflow: scroll;
	// 	display: flex;
	// 	margin-top: 16rpx;
		
		.textarea{
			
			overflow:hidden;
			width: 100%;
			height: 100%;
			width:675rpx ;
			margin:0 auto;
			flex: 1;
		}
	
	// }
	
</style>
