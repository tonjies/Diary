<template>
	<view class="container">
		<view 
			 v-if="isOpen"
			 :class="inAnimation?'AnimOut2 circle green':'AnimEnter2 circle green'"
			 v-on:click="add()"	
			 >
			<image src="../static/add.png" class="logo"></image>
		</view>
		<view	
			v-if="isOpen" 
			:class="inAnimation?'AnimOut1 circle red':'AnimEnter1 circle red'" 
			v-on:click="recycle()"	
			>
			<image src="../static/delete.png" class="logo"></image>
		</view>
		<view  class="circle blue bigCircle"  v-on:click="click()" >
			<image src="../static/open.png" class="logo"></image>
		</view>
	</view>
</template>

<script>
	export default {
		props:['isSpread'],
		data() {
			return {
				inAnimation:false,
				isOpen:false,
				CurrentIsAnim:false,
				myIsSpread:this.isSpread
			}
		},
		methods: {
			add(){
				 this.$emit('add')
			},
			recycle(){
				 this.$emit('recycle')
			},
			click(){
				//如果为true，说明是按钮此时在编辑页面
				if(this.myIsSpread){
					console.log(this.CurrentIsAnim)
					if(!this.inAnimation&&!this.CurrentIsAnim){
						this.CurrentIsAnim=true
						this.isOpen=true;
						this.inAnimation=true;
						setTimeout(()=>this.CurrentIsAnim=false,750); 
					}else{
						if(!this.CurrentIsAnim){
							this.CurrentIsAnim=true
							this.inAnimation=false;
							setTimeout(()=>this.isOpen=false,750); 
							setTimeout(()=>this.CurrentIsAnim=false,750); 
						}
					
					}
					return
				}
				console.log("添加日记")
				this.$emit('add')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.circle{
		bottom: 77rpx;
		right: 52rpx;
		display: flex;
		width: 88rpx;
		height: 88rpx;
		border-radius: 600rpx;	
		position: fixed;
	}
	.bigCircle{
		width: 89rpx;
		height: 89rpx;
	}
	.logo{
		margin: auto;
		width: 33rpx;
		height: 33rpx;
	}

	.red{
		background-color: #E91E63;
	}
	
	.blue{
		background-color: #72A5E8;
	}
	
	.green{
		background-color: #AED581;
	}
	
	.AnimOut1{
		animation: arrayOut1 0.75s forwards;
		-webkit-animation:arrayOut1 0.75s forwards;
	}
	
	.AnimOut2{
		animation: arrayOut2 0.75s forwards;
		-webkit-animation:arrayOut2 0.75s forwards;
	}
	.AnimEnter1{
		animation: arrayEnter1 0.75s forwards;
		-webkit-animation:arrayEnter1 0.75s forwards;
	}	
	.AnimEnter2{
		animation: arrayEnter2 0.75s forwards;
		-webkit-animation:arrayEnter2 0.75s forwards;
	}
	
	@keyframes arrayOut1
	{
	  from {transform: translate(0rpx,0rpx);}
	  to {transform: translate(0rpx,-118rpx);}
	}
	
	@keyframes arrayOut2
	{
	  from {transform: translate(0rpx,0rpx);}
	  to {transform: translate(0rpx,-236rpx);}
	}
	
	@keyframes arrayEnter1{
	
		  from {transform: translate(0rpx,-118rpx);}
		  to {transform: translate(0rpx,0rpx);}
	
	}
	@keyframes arrayEnter2{
		
		  from {transform: translate(0rpx,-236rpx);}
		  to {transform: translate(0rpx,0rpx);}
		
	}
</style>
