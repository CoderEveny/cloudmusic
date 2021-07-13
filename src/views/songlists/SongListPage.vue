<template>
  <div id="song-list-page-container">
    <msg-page :datalist="datalist.tracks" @songClick="songClick">
      <template v-slot:msgBackground>
        <div class="song-list-background" :style="{background: 'url('+ datalist.coverImgUrl +')', backgroundSize: 'cover'}" />
      </template>
      <template v-slot:msgTop>
        <!-- 头部信息栏 -->
        <div class="song-list-top">
          <div class="song-list-img">
            <img :src="datalist.coverImgUrl" alt="">
          </div>
          <div class="song-list-info">
            <h3>{{datalist.name}}</h3>
            <p>作者：{{datalist.author}}</p>
            <p>发行时间：{{datalist.createTime | filterDate }}</p>
          </div>
        </div>
      </template>
    </msg-page>
  </div>
</template>

<script>
  import MsgPage from 'components/content/msgpage/MsgPage.vue'
  import { getHotSonglist,SongMessage } from 'network/songlists/songlists'
  import { fmtDate } from 'utils/date.js'

  export default {
    name: 'SongListPage',
    components: {
      MsgPage
    },
    data() {
      return {
        datalist: []
      }
    },
    created() {
      this.getHotSonglist()
    },
    filters: {
      filterDate: function(date) {
        let temp = new Date(date);
        return fmtDate(temp, 'yyyy-MM-dd')
      }
    },
    methods: {
      async getHotSonglist() {
        const res = await getHotSonglist(this.$route.params.id) 
        this.datalist = new SongMessage(res.data.playlist)
      },
      songClick(index) {
        // 将用户点击的歌曲列表下标和当前的歌曲列表传递给store
        this.$store.commit({
          type: 'player/seletSongByIndex', //commit的事件名称
          index: index, // 参数:点击的下标
          list: this.datalist.tracks //参数：整个歌单列表
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  #song-list-page-container {
    width: 100%;
    height: 100vh;
    box-sizing: border-box;
    overflow: auto;
  }
  .song-list-background {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 680px;
    z-index: -10;
    overflow: hidden;
    opacity: 0.6;
    filter: blur(20px);  //模糊效果
  }
  .song-list-nav {
    position: fixed;
    top: 0;
    margin: 20px 0;
    width: 100%;
    height: 72px;
    z-index: 100;
    i {
      font-size: 62px;
      padding: 0 30px;
      color: #ccc;
    }
  }
  .song-list-top {
    position: fixed;
    display: flex;
    width: 100%;
    height: 680px;   
    align-items: center;
    top: 0;
    z-index: -1;
    .song-list-img {
      margin: 0 40px;
      img {
        width: 260px;
        height: 260px;
        border-radius: 15px;
      }
    }  
    .song-list-info {
      margin: 0 20px;
      h3 {
        font-size: 40px;
      }
      p {
        font-size: 32px;
        color: #ccc;
      }
      p:last-child {
        margin-top: 50px;
        font-size: 26px;
      }
    }
  }
</style>