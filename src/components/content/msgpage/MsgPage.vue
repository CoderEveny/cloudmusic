<template>
  <div id="msg-page-container" v-if="datalist">
    <!-- 背景 -->
    <slot name="msgBackground"></slot>
    <!-- 顶部导航栏 -->
    <div class="msg-nav">
      <div>
        <i class="cloud cloud-left" @click="$router.back()"></i>
      </div>
      <div>
        <i class="cloud cloud-correct"></i>
        <i class="cloud cloud-more"></i>
      </div>
    </div>
    <!-- 头部信息栏 -->
    <slot name="msgTop" />
    <!-- 歌曲信息 -->
    <div class="msg-cover" :class="{hasPadding: showPlayer}">
      <!-- 播放所有歌曲 -->
      <div class="play-all-btn" ref="playAllBtn">
        <i class="cloud cloud-yinleguan"></i>
        <h3>播放所有歌曲</h3>
      </div>
      <ul>
        <li v-for="(item,index) in datalist" :key="index" @click="songClick(index)">
          <div class="msg-info-cover">
            <h4>{{index + 1}}</h4>
            <div class="song-info">
              <h3>{{item.name}}</h3>
              <p>{{item.ar}}</p>
            </div>
          </div>
          <div class="msg-icon">
            <i class="cloud cloud-bofang" />
            <i class="cloud cloud-more" />
          </div>
        </li>
      </ul>
    </div> 
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: 'SongListPage',
    props: {
      datalist: Array
    },
    computed: {
      ...mapState({
        showPlayer: state => (state.player.currentIndex >= 0)
      })
    },
    methods: {
      songClick(index) {
        this.$emit("songClick", index)
      },
    }
  }
</script>

<style lang="less" scoped>
  #msg-page-container {
    width: 100%;
    height: 100vh;
  }
  .msg-background {
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
  .msg-nav {
    position: fixed;
    top: 0;
    margin: 40px 0;
    width: 100%;
    height: 72px;
    z-index: 999;
    display: flex;
    justify-content: space-between;
    align-items: center;
    i {
      font-size: 52px;
      padding: 0 30px;
      color: #ccc;
    }
  }
  .msg-top {
    position: fixed;
    display: flex;
    width: 100%;
    height: 680px;   
    align-items: center;
    top: 0;
    z-index: -1;
    .msg-img {
      margin: 0 40px;
      img {
        width: 260px;
        height: 260px;
        border-radius: 15px;
      }
    }  
    .msg-info {
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
  .play-all-btn {
      width: 100%;
      height: 90px;
      border-radius: 40px 40px 0 0;
      background-color: #17181A;
      color:#77787A;
      display: flex;
      align-items: center;
      i {
        font-size: 46px;
        padding-left: 40px;
      }
      h3 {
        font-size: 34px;
        padding: 0 20px;
      }
    }
  .msg-cover {
    background-color: #111214;
    position: absolute;
    width: 100%;
    top: 680px;
    overflow: hidden;
    z-index: 200;
    border-radius: 40px 40px 0 0;
    box-sizing: border-box;
    overflow: auto;
    ul>li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 0;
      .msg-info-cover {
        display: flex;
        align-items: center;
        h4 {
          color: #343537;
          text-align: center;
          width: 150px;
        }
        .song-info {
          flex: 1;
          h3 {
            color: #77787A;
            font-size: 32px;
          }
          p {
            color: #343537;
            font-size: 28px;
          }
        } 
      }
      .msg-icon {
        i {
          font-size: 40px;
          color: #343537;
          padding: 0 10px;
        }
      }
    }
  }
  .hasPadding {
    padding-bottom: 120px;
  }
</style>