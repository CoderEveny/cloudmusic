<template>
  <div id="hot-container" :class="{hasPadding: showPlayer}">
    <!-- 热门歌单 -->
    <row-show :datalist="songlist" title="热门歌单" @iconClick="songlistClick"/>
    <!-- 热门歌手 -->
    <row-show :datalist="singerlist" title="热门歌手" @iconClick="singerClick"/>

    <div class="hot-song" v-if="hotsongs">
      <h3>热门歌曲</h3>
      <div class="hot-song-info" 
      v-for="(item,index) in hotsongs" 
      :key="item.id" 
      @click="hotSongClick(index)">
        <img :src="item.al.picUrl" alt="">
        <h4>{{index + 1}}</h4>
        <p>
          <span>{{item.al.name}}</span>
          <span>{{item.ar}}</span>
        </p>
        <i class="cloud cloud-bofang"></i>
      </div>
    </div>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar.vue'
  import RowShow from 'components/content/rowshow/RowShow.vue';
  import {getHotSonglist,getHotSinger,getHotSongs} from 'network/hot/hot'
  import {mapState} from 'vuex'

  export default {
    name: 'Hot',
    components: {
      NavBar,
      RowShow
    },
    data() {
      return {
        songlist: [],
        singerlist: [],
        hotsongs: []
      }
    },
    created() {
      this.getHotSonglist()
      this.getHotSinger()
      this.getHotSongs()
    },
    computed: {
      ...mapState({
        showPlayer: state => (state.player.currentIndex >= 0)
      })
    },
    methods: {
      async getHotSonglist() {
        const res = await getHotSonglist()
        this.songlist = res.data.playlists.map(item => ({
          urlcover: item.coverImgUrl,
          name: item.name,
          id: item.id,
          playCount: item.playCount
        }))
      },
      async getHotSinger() {
        const res = await getHotSinger()
        this.singerlist = res.data.artists.map(item => ({
           id: item.id,
           name: item.name,
           urlcover: item.img1v1Url
        }))
      },
      async getHotSongs() {
        const res = await getHotSongs()
        this.hotsongs = res.data.result.map(item => ({
          id: item.id,
          name: item.name,
          al: {
            name: item.name,
            picUrl: item.picUrl
          },
          ar: item.song.artists.map(arItem => arItem.name).join('/'), //对歌手进行字符串的拼接
        }))
      },
      hotSongClick(index) {
        this.$store.commit({
          type: 'player/seletSongByIndex', //commit的事件名称
          index: index, // 参数:点击的下标
          list: this.hotsongs //参数：整个歌单列表
        })
      },
      singerClick(id) {
        this.$router.push('/singerlists/' + id)
      },
      songlistClick(id) {
        this.$router.push('/songlists/' + id)
      }
    }
  }
</script>

<style lang="less">
  #hot-container {
    width: 100%;
    padding-top: 90px;
    box-sizing: border-box;
  }
  .hot-song {
    padding: 10px 30px;
    h3 {
      padding: 15px 0 0 -10px;
      margin-bottom: 20px;
      font-size: 36px;
      color: #A2A3A4;
    }
    .hot-song-info {
      display: flex;
      align-items: center;
      padding: 10px 10px;
      img {
        width: 120px;
        border-radius: 12px;
      }
      h4 {
        width: 100px;
        text-align: center;
      }
      p {
        flex: 1;
        display: flex;
        flex-direction: column;
        font-size: 32px;
        span:last-child {
          font-size: 28px;
        }
      }
    }
  }
  .hasPadding {
    padding-bottom: 120px;
  }
</style>