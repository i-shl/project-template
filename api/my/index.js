import {
	request
} from "../request.js"

export default {
	article_in(data) {
		return request({
			url: 'api/user/article_in',
			method: 'POST',
			data,
		})
	},
}