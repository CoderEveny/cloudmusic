<template>
  <div id="playlist-collection-container" :class="{hasPadding: showPlayer}">
    <play-list-nav />
    <play-lists :data="playListData"/>
  </div>
</template>

<script> 
  // 子组件相关
  import PlayListNav from './childComponents/PlayListNav.vue'
  import PlayLists from './childComponents/PlayLists.vue'
  // 网络请求相关
  import {getTopList} from 'network/playlist/playlist'
  import {mapState} from 'vuex'

  export default {
    name: 'PlayListCollection',
    components: {
      PlayListNav,
      PlayLists
    },
    data() {
      return {
        playListData: []
      }
    },
    created() {
      this.getTopList()
    },
    computed: {
      ...mapState({
        showPlayer: state => (state.player.currentIndex >= 0)
      })
    },
    methods: {
      async getTopList() {
        const res = await getTopList()
        this.playListData = res.data.playlists.map(item => ({
          coverImgUrl: item.coverImgUrl,
          name: item.name,
          copywriter: item.copywriter
        }))
        console.log(this.playListData)
      }
    }
  }
</script>

<style lang="less">
  .hasPadding {
    padding-bottom: 120px;
  }
</style>