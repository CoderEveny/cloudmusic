<template>
  <div id="app">
    <nav-bar v-show="$route.meta.navBarShow"/>
    <keep-alive exclude="SingerSongPage,SongListPage">
      <router-view/>
    </keep-alive>
    <player v-if="showPlayer"/>
  </div>
</template>

<script>
  // 公共组件相关
  import Player from 'components/content/player/index'
  import NavBar from 'components/common/navbar/NavBar.vue'
  import {mapState} from 'vuex'

  export default {
    name: 'App',
    components: {
      Player,
      NavBar,
    },
    computed: {
      ...mapState({
        showPlayer: state => (state.player.currentIndex >= 0)
      })
    },
  }
</script>

<style lang="less">
  @import url('assets/style/index.less');
   // 动画效果: rotate是旋转函数
  @keyframes rotate {
    0% {
      transform: rotate(0) 
    }
    100% {
      transform: rotate(360deg)
    }
  }
</style>
