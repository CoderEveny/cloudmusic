import { request } from "../request"

// 获取指定歌单里的歌曲
export function getHotSonglist(id) {
  return request({
    url: '/playlist/detail',
    params: {
      id
    }
  })
}

export class SongMessage {
  constructor(data) {
    this.name = data.name,
    this.coverImgUrl = data.coverImgUrl,
    this.author = data.creator.nickname,
    this.createTime = data.createTime,
    this.tracks = data.tracks.map(item => ({
      id: item.al.id,
      name: item.al.name,
      ar: item.ar.map(arItem => arItem.name).join('/'),
      al: {
        picUrl: item.al.picUrl
      }
    }))
  }
}