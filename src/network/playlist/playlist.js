import {request} from '../request'

// 获取精品歌单
export function getTopList(data) {
  return request({
    url: '/top/playlist/highquality',
    data: {
      limit: data //取出歌单数量，默认为 50
    }
  })
}