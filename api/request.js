import {
	baseUrl
} from '@/config/index.js'

function request(data) {
	// if(data.data){
	// 	data.data.api_token = uni.getStorageSync('token')
	// }

	uni.showLoading({
		title: "加载中",
		mask: true
	});

	return new Promise((resolve, reject) => {
		uni.request({
			url: baseUrl + data.url,
			method: data.method,
			data: data.data || '',
			header: {
				'Content-Type': 'application/json',
				'Authorization': uni.getStorageSync('tokenType') + ' ' + uni.getStorageSync('token')
			},
			success: res => {
				// console.log(uni.getStorageSync('token'))
				if (res.statusCode == 200) {
					resolve(res.data)
				} else if (res.statusCode == 401) {
					uni.removeStorageSync('token')
					// 跳转登录逻辑
				} else {
					resolve(res)
				}
			},
			fail(err) {
				reject(err)
			},
			complete(com) {
				uni.hideLoading();
			}
		})
	})
}

export {
	request
}
