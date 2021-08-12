
import store from '../store/index.js'
import {config} from "./config.js";
class Http{
	
	static async request({
		url,
		data
	}){
		console.log('发起网络请求')
	
		const value = uni.getStorageSync('token');
		console.log("同步获取到的token:"+value)
		//请求列表数据
		var [error, res] = await uni.request({
			url:`${config.apiBaseUrl}${url}`,
			data,
			method:'POST',
			header:{
				'token':value
			}
		})
		if(res.data.status){
			return res.data
		}else{
			if(res.data.code==401){
				console.log('token失效')
				uni.navigateTo({
					url:'../login/login'
				})
				return
			}
			uni.showToast({
				title: '请求失败',
				msg:res.data.msg
			});
			return
		}
		return res.data
	}
}
export {Http}