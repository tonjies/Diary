<template>
	<view class="container">
		<view @click="getData">
			Hello
		</view>
		<text>用户名：{{username}}</text>
		<view @click="getData">
			Hello
		</view>
	</view>
</template>

<script>
	import store from '@/store/index.js';//需要引入store
	import {Http} from '@/utils/http.js'
	export default {
		data() {
			return {
				value:"Hi"
			}
		},
		methods:{
			getData:async function(){
				var res=await Http.request(
					{	
						url:"/user/login",
						data:{'username':this.username,'password':this.password}}
				)
			}
		},
        computed: {
            username() {
                return store.state.token 
            }
        }
	}
</script>

<style lang="scss" scoped>

		
</style>

