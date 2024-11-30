import request from '@/utils/request'

export const getScoreDetail = (params: { userId: string }) => {
  return request({
    method: 'get',
    url: '/teach/hk/Amanuensis/getTalentScore',
    params,
  })
}
