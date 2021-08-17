import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);//vue的插件机制

//Vuex.Store 构造器选项
const store = new Vuex.Store({
    state:{
		token:"token的值"
    },
	mutations:{
		savetoken(state,token){
			//变更状态
			state.token=token
		}
	}
})
export default store