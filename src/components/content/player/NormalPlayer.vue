<template>
  <div id="normal-player-container">
    <!-- 背景 -->
    <div class="normal-player-background">
      <img :src="currentSong.al.picUrl" width="100%" height="100%" alt="">
    </div>
    <!-- 蒙层 -->
    <div class="normal-player-background layer" />
    <!-- 头部 -->
    <div class="normal-top">
      <div class="normal-back" @click="leaveFullScreen">
        <i class="cloud cloud-left"></i>
      </div>
      <h3 class="normal-title">{{currentSong.name}}</h3>
      <p class="normal-subtitle">{{currentSong.ar}}</p>
    </div>
    <!-- 中间唱片 -->
    <div class="normal-middle">
      <div class="CD-wrap">
        <img class="CD" :class="{pause: !playing}" :src="currentSong.al.picUrl" alt="">
      </div>
    </div>
    <!-- 底部操作按键 -->
    <div class="normal-bottom">
      <!-- 收藏评论操作键 -->
      <div class="normal-operators top">
        <div class="cloud c-left">
          <i class="cloud cloud-aixin"></i>
        </div>
        <div class="cloud c-left">
          <i class="cloud cloud-xiazai"></i>
        </div>
        <div class="cloud c-center" @click="">
          <i class="cloud cloud-maikefeng"></i>
        </div>
        <div class="cloud c-right">
          <van-icon name="chat-o" />
        </div>
        <div class="cloud c-right">
          <i class="cloud cloud-more"></i>
        </div>
      </div>
      <!-- 进度条 -->
      <bar-prog 
        :value="progress" 
        @input="changeProgress" 
        :currentTime="currentTime" 
        :duration="duration"
        @touchStart="handleTouchAction('start')"
        @touchEnd="handleTouchAction('end')"
      />
      <!-- 播放器操作键 -->
      <div class="normal-operators">
        <div class="cloud c-left" @click="changePlayMode">
          <i class="cloud" :class="playModeIcon" />
        </div>
        <div class="cloud c-left" @click="prevAction">
          <i class="cloud cloud-shangyishou"></i>
        </div>
        <div class="cloud c-center" @click="changePlayingAction">
          <i class="cloud" :class="{'cloud-bofang': !playing, 'cloud-zanting': playing}"></i>
        </div>
        <div class="cloud c-right" @click="nextAction">
          <i class="cloud cloud-xiayishou"></i>
        </div>
        <div class="cloud c-right">
          <i class="cloud cloud-gengduo"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BarProg from './childComponents/BarProg.vue'
  import {mapState} from 'vuex'

  export default {
    name: 'NormalPlayer',
    components: {
      BarProg
    },
    props: {
      progress: Number,
      duration: Number,
      currentTime: Number
    },
    computed: {
      ...mapState({
        playing: state => state.player.playing,
        mode: state => state.player.mode,
        currentSong: state => state.player.currentSong
      }),
      // ...mapGetters({
      //   currentSong: 'player/currentSong'
      // }),
      // 当前播放模式的图标
      playModeIcon() {
        switch(this.mode) {
          case 0 : return 'cloud-xunhuan';  //顺序播放
          case 1 : return 'cloud-danquxunhuan'; //单曲循环
          case 2 : return 'cloud-suijixunhuan'; //随机循环
        }
      }
    },
    watch: {
      // mode(newVal) {
      //   // 判断播放模式如果是随机，那么我们还需要找到当前歌曲所在歌单的下标
      //   if(newVal === 2) {
      //     // 根据当前歌曲的id，找到下标
      //   }
      // }
    },
    methods: {
      // 退出全屏播放
      leaveFullScreen() {
        this.$store.commit({
          type: 'player/setFullScreen',
          value: false
        })
      },
      // 操作播放暂停
      changePlayingAction() {
        this.$store.commit({
          type: 'player/setPlaying',
          value: !this.playing
        })
      },
      // 进度条组件，修改进度条
      // 接收进度条组件传来的数据
      changeProgress(newVal) {
        // 将进度传值给父组件
        this.$emit('change', newVal)
      },
      // 将进度条的触摸拖拽状态传递给外部
      handleTouchAction(flag) {
        this.$emit('touchChange', flag)
      },
      // 切换播放模式的事件
      changePlayMode() {
        // 修改播放模式
        this.$store.commit({
          type: 'player/changePlayMode'
        });
      },
      // 上一曲点击事件
      prevAction() {
        // 播放模式为顺序播放：播放顺序列表上一首歌
        // 播放模式为单曲播放：播放顺序列表上一首歌
        // 播放模式为随机播放：播放随机歌曲列表上一首歌
        this.$store.commit({
          type: 'player/prevAction'
        })        
      },
      // 下一曲点击事件
      nextAction() {
        // 播放模式为顺序播放：播放顺序列表下一首歌
        // 播放模式为单曲播放：播放顺序列表下一首歌
        // 播放模式为随机播放：播放随机歌曲列表下一首歌
        // (但其实都一样，因为playList的值已经在切换播放模式时改变)
        this.$store.commit({
          type: 'player/nextAction'
        })   
      }
    }
  }
</script>

<style lang="less" scoped>
  #normal-player-container {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 1000;
    background: #17181A;
  }
  .normal-player-background {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    opacity: 0.6;
    filter: blur(20px);  //模糊效果
    &.layer {
      background: #aaa;
      opacity: 0.3;
      filter: none;
    }
  }
  .normal-top {
    position: relative;
    margin-bottom: 30px;
    .normal-back {
      position: absolute;
      top: 0;
      left: 10px;
      .cloud{
        display: block;
        color: #ccc;
        padding: 20px;
        font-size: 70px;
      }
    }
    .normal-title {
      width: 70%;
      margin: 0 auto;
      line-height: 40px;
      text-align: center;
      padding: 30px 0;
      font-size: 38px;
      color: #ccc;
    }
    .normal-subtitle {
      line-height: 20px;
      text-align: center;
      font-size: 22px;
      color: #ccc;
    }
  }
  .normal-middle {
    position: absolute;
    margin: auto;
    top: 15%;
    left: 0;
    right: 0;
    width: 80%;
    height: 80vw;
    box-sizing: border-box; //盒模型
    .CD-wrap {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      .CD {
        position: absolute;
        top: 65px;
        left: 65px;
        width: 80%;
        height: 80%;
        box-sizing: border-box;
        border-radius: 50%;
        border: 90px solid #000;
        animation: rotate 20s linear infinite;
        &.pause {
          animation-play-state: paused;
        }
      }
    }
  }
  .normal-bottom {
    position: absolute;
    bottom: 140px;
    left: 0;
    width: 100%;
    .normal-operators {
      display: flex;
      align-items: center;
      text-align: center;
      .cloud { 
        flex: 1;
        color: #ccc;
        i {
          font-size: 50px;
        }
      }
      &.top {
        width: 80%;
        margin: auto;
        margin-bottom: 50px;
      }
    }
  }
</style>