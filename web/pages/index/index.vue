<!-- 页面路径：pages/index/index.vue -->
<template>
    <view>    
        <view>数量:{{count}}</view>
		<button @click="addCount">增加</button>
    </view>
</template>
<script>
    import store from '@/store/index.js'//需要引入store
    export default {
        computed: {
            count() {
                return this.$store.state.count
            }
        },
		onLoad(){
			this.addCount()
		},
		methods:{
			addCount(){
				 // store.commit('savetoken',"token")
			
				 console.log('1')
				  console.log('2')
				  this.a()
				   console.log('3')
				
				    console.log('4')
					 console.log('5')
					 
			},
			a(){
				console.log("6")
			}
		}
    }
</script>