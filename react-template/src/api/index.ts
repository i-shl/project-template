import request from './request'

// 示例
export const test = (data: unknown) => {
  return request({
    url: '/v1/breeds',
    method: 'GET',
    data
  })
}
