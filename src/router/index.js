import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 解决导致的编程式导航跳转问题,往同一地址跳转时会报错的情况
// 解决报错
const originalPush = VueRouter.prototype.push
const originalReplace = VueRouter.prototype.replace
// push
VueRouter.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
// replace
VueRouter.prototype.replace = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject)
  return originalReplace.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('views/login/Login.vue'),
    meta: {
      navBarShow: true,
    }
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('views/home/Home.vue'),
    meta: {
      navBarShow: true,
    }
  },
  {
    path: '/singerlists',
    name: 'singerlists',
    component: () => import('views/singerlists/SingerLists.vue'),
    meta: {
      navBarShow: true,
    }
  },
  {
    path: '/hot',
    name: 'hot',
    component: () => import('views/hot/Hot.vue'),
    meta: {
      navBarShow: true,
    }
  },
  {
    path: '/video',
    name: 'video',
    component: () => import('views/video/Video.vue'),
    meta: {
      navBarShow: true,
    }
  },
  {
    path: '/songrcmd',
    component: () => import('views/commend/SongCmd.vue'),
    navBarShow: false,
  },
  {
    path: '/playlistCollection',
    component: () => import('views/playlist/PlayListCollection.vue'),
    navBarShow: false,
  },
  {
    path: '/singerlists/:id',
    component: () => import('views/singerSong/SingerSongPage.vue'),
    meta: {
      navBarShow: false,
    }
  },
  {
    path: '/songlists/:id',
    component: () => import('views/songlists/SongListPage.vue'),
    meta: {
      navBarShow: false,
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
