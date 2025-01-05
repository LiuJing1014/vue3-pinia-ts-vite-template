import request from '@/utils/request'

export const getTest = (params: { userId: string }) => {
  return request({
    method: 'get',
    url: '/test',
    params,
  })
}
