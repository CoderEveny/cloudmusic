import {request} from '../request'

// 获取热门歌单
export function getHotSonglist() {
  return request({
    url: '/top/playlist/highquality?limit=6'
  })
}

// 获取热门歌手
export function getHotSinger() {
  return request({
    url: '/top/artists?limit=6'
  })
}

// 获取热门歌曲
export function getHotSongs() {
  return request({
    url: '/personalized/newsong?limit=5'
  })
}