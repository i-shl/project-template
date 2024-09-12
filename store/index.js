import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		isLogin: false
	},
	getters: {},
	mutations: {
		login(state) {
			if (uni.getStorageSync('api_token') !== '') {
				state.isLogin = true
			}else{
				state.isLogin = false
			}
		},
		logout(state) {
			uni.clearStorageSync();
			state.isLogin = false
		}
	},
	actions: {},
});

export default store
