import {request} from '../request'

// 获取歌手列表
export function getSingerList(offset,limit,data) {
  return request({
    url: '/artist/list',
    params: {
      limit: limit,
      offset: offset,
      type: data.type,
      area: data.area,
      initial: data.initial
    }
  })
}

// 获取指定歌手的热门50首歌
export function getSingerSong(id) {
  return request({
    url: '/artist/top/song',
    params: {
      id: id
    }
  })
}
 
// 获取指定歌手描述 
// export function getSingerDesc(id) {
//   return request({
//     url: '/artist/desc',
//     params: {
//       id: id
//     }
//   })
// }

// 获取指定歌手详情
export function getSingerDetail(id) {
  return request({
    url: '/artist/detail',
    params: {
      id: id
    }
  })
}

// 对指定歌手的详情数据进行筛选
export class SingerDetail {
  constructor(data) {
    this.name = data.artist.name,
    this.desc = data.artist.briefDesc,
    this.coverUrl = data.artist.cover,
    this.identifyTag = data.artist.identifyTag,
    this.identities = data.artist.identities
  }
}
