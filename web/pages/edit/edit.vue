<template>
	<view class="container">
		<view class="main">
			<view class="header">
					<!-- <xCaption 
						v-on:isReturn="clickReturn"
						:isReturn="true" 
						:isShare="false" 
						:title="title" 
						:isShowline="true"></xCaption> -->
					<input
						v-model="docTitle"
						@input="onTitleInput"
						placeholder="标题" 
						class="input-title" />
					<view class="line"></view>
			</view>

			 <textarea
					class="textarea"
					:show-confirm-bar="false"
					placeholder="请输入内容"
					maxlength="1000000"
					v-model="docContent"
					>
					
			</textarea>
			
			<!--  #ifdef  %MP-WEIXIN% -->
			<cover-image
				@click="addOrUpdate()"
				class="optionLogo"
				src="../../static/addlogo.png"
				>
				
			</cover-image>
			<!--  #endif -->
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
	import xCaption from '@/components/caption.vue';
	import buttonOption from '@/components/buttonOption.vue';
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
			addOrUpdate(){
				var that=this
				uni.showModal({
					content:'确定保存文档？',
					confirmText:'确定',
					cancelText:'取消',
					confirmColor:'#72A5E8',
					success:function(res){
						if(res.confirm){
							that.updateContent()
						}else{
							console.log('取消')
						}
					}
				})
			
			},
			onTitleInput:function(event){
				this.docTitle=event.target.value
				
			},
			onDocInput:function(event){
				console.log(event.target.value)
				// this.docContent=event.target.value
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
			updateContent:async function(){
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
			add:async function(){
				console.log("add")
				console.log('文章内容:'+this.docContent)
				console.log('文章标题:'+this.docTitle)
				this.updateContent()
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
		height: 100rpx;
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

		.option-button{
			z-index: 10;
		}
		
		.textarea{
			overflow: hidden;
			width: 100%;
			height: 100%;
			width:675rpx ;
			margin:0 auto;
			flex: 1;
		}
	.optionLogo{
		border-radius: 600rpx;	
		width: 88rpx;
		height: 88rpx;
		position: absolute;
		bottom: 77rpx;
		right: 52rpx;
	}
	
</style>
