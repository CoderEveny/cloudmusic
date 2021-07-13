import {request} from '../request'

// 获取图标
export function getIcon() {
  return request({
    url: '/homepage/dragon/ball'
  })
}

// 获取轮播图
export function getBanner() {
  return request({
    url: '/banner?type=2'
  })
}