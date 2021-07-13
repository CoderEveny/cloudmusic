<template>
  <div id="singer-song-page" v-if="singerInfo"> 
    <msg-page :datalist="dataSource" @songClick="songClick">
      <template v-slot:msgBackground>
        <div class="singer-list-background" :style="{background: 'url('+ singerInfo.coverUrl +')', backgroundSize: 'cover'}" />
      </template>
      <template v-slot:msgTop>
        <!-- 歌手信息 -->
        <div class="singer-info">
          <h3>{{singerInfo.name}}</h3>
          <p>
            <span v-if="singerInfo.identifyTag">{{singerInfo.identifyTag[0]}}</span>
            <span v-if="singerInfo.identities" :class="{hasContent: singerInfo.identities == null}">{{singerInfo.identities[0]}}</span>
          </p>
          <div class="singer-desc">
            <div>
              <p>基本信息：</p>
              <a @click="show">详情</a>
            </div>
            <div :class="{active: isClick}" class="element">
              <p :class="{active: isClick}">{{singerInfo.desc}}</p>
            </div>
          </div>
        </div>
      </template>
    </msg-page>
  </div>
</template>

<script>
  import MsgPage from 'components/content/msgpage/MsgPage.vue'
  // 网络请求相关
  import {getSingerSong,getSingerDetail,SingerDetail} from 'network/singerlists/singerlists'

  export default {
    name: 'SingerSongPage',
    components: {
      MsgPage
    },
    data() {
      return {
        dataSource: [],
        singerInfo: null,
        isClick: false,
      }
    },
    created() {
      this.getSingerSong()
      this.getSingerDetail()
    },
    methods: {
       // 获取指定歌手热门50首歌
      async getSingerSong() {
        const res = await getSingerSong(this.$route.params.id)
        // 遍历数组并过滤数据
        this.dataSource = res.data.songs.map(item => ({
          id: item.id,
          name: item.name,
          ar: item.ar.map(arItem => arItem.name).join('/'), //对歌手进行字符串的拼接
          al: {   //专辑信息
            // id: item.al.id,
            name: item.al.name,
            picUrl: item.al.picUrl
          }
        }))
      },
      // 获取指定歌手的详情
      async getSingerDetail() {
        const res = await getSingerDetail(this.$route.params.id)
        // 调用封装好的类筛选歌手信息
        this.singerInfo = new SingerDetail(res.data.data)
      },
      show() {
        this.isClick = !this.isClick;
      },
      songClick(index) {
        // 将用户点击的歌曲列表下标和当前的歌曲列表传递给store
        this.$store.commit({
          type: 'player/seletSongByIndex', //commit的事件名称
          index: index, // 参数:点击的下标
          list: this.dataSource //参数：整个歌单列表
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  #singer-song-page {
    width: 100%;
    height: 100vh;
  }
  .singer-list-background {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 680px;
    z-index: -10;
    overflow: hidden;
    opacity: 0.6;
  }
  .top-nav-cover {
    position: fixed;
    height: 90px;
    width: 100%;
    top: 50px;
    z-index: 100;
    .top-nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      i {
        font-size: 56px;
        color: #A2A3A4;
      }
      i:first-child {
        padding-left: 20px;
      }
      .right {
        i {
          padding: 0 10px;
        }
      }
    }
  }
  .singer-info {
    position: fixed;
    width: 100%;
    height: 680px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;    
    color: #ccc;
    h3 {
      font-size: 40px;
      padding: 10px 40px;
    }
    p {
      padding-left: 40px;
      span {
        font-size: 28px;
        padding-right: 15px;
      }
      .hasContent {
        font-size: 20px;
        padding: 3px;
        border: 1px solid #A2A3A4;
        border-radius: 10px;
      }
    }
    .singer-desc {
      margin-bottom: 30px;
      div {
        display: flex;
        justify-content: space-between;
      }
      p {
        font-size: 28px;
        padding: 0 40px;
      }
      a {
        font-size: 26px;
        padding-right: 40px;
        color: #00a1d6;
      }
      .element {
        display: none;
        height: 110px;
        overflow: hidden;
        overflow-x: hidden;
        overflow-y: scroll;
      }
      .active {
        display: block;
      }
    }
  }  
</style>