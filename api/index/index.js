import {
	request
} from "../request.js"

export default {
	index() {
		return request({
			url: '/index/index',
			method: 'GET',
		})
	},
	list(data) {
		return request({
			url: '/goods/list',
			method: 'GET',
			data,
		})
	},
	loginByWeb(data) {
		return request({
			url: '/auth/loginByWeb',
			method: 'POST',
			data,
		})
	},
}


/* 
this.$api.index().then(res => {
	console.log("index", res);
})

this.$api.list({
	username: "雨下林",
	pwd: "123456",
}).then(res => {
	console.log("list", res);
})

this.$api.loginByWeb({
	username: "雨下林",
	pwd: "123456",
}).then(res => {
	console.log("loginByWeb", res);
}) 
*/
