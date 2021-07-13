<template>
  <div id="mini-player-container" @click="enterFullScreen">
    <div class="mini-player">
      <!-- 歌曲封面 -->
      <div class="music-cover">
        <img :src="currentSong.al.picUrl" :class="{pause: !playing}" alt="">
      </div>
      <!-- 歌名与歌手名 -->
      <div class="music-name">
        <h3>{{currentSong.name}}</h3>
        <p>{{currentSong.ar}}</p>
      </div>
      <!-- 播放按钮与菜单 -->
      <div class="music-btn">
        <!-- <van-cell is-link @click="showPopup">展示弹出层</van-cell> -->
        <div class="control" @click.stop="">
          <!-- 如果v-model绑定的是仓库中的状态，那么不能再使用v-model了，如果
          使用了的话，意味着组件要修改状态 -->
          <!-- 需要把v-model拆开：绑定value，实现input事件 -->
          <circle-prog :value="playing" @input="changePlaying" :progress="progress"/>
        </div>
        <div class="control">
          <i class="cloud cloud-gengduo" @click="showPopup" @click.stop=""></i>
        </div>
        <van-popup v-model="show" position="bottom" round>内容</van-popup>
      </div>
    </div>
  </div>
</template>

<script>
  import CircleProg from './childComponents/CircleProg.vue'
  import {mapState} from 'vuex'

  export default {
    name: 'MiniPlayer',
    components: {
      CircleProg
    },
    data() {
      return {
        show: false,
      };
    },
    props: {
      progress: Number,
    },
    computed: {
      //把仓库的state转为计算属性
      ...mapState({
        playing: state => state.player.playing,
        currentSong: state => state.player.currentSong
      }),
      // 把仓库的getters转为计算属性
      // ...mapGetters({
      //   currentSong: 'player/currentSong'
      // })
    },
    methods: {
      showPopup() {
        this.show = true;
      },
      changePlaying(value) {
        // 让仓库修改playing的值
        this.$store.commit({
          type: 'player/setPlaying',
          value
        })
      },
      // 进入全屏播放的点击事件
      enterFullScreen() {
        this.$store.commit({
          type: 'player/setFullScreen',
          value: true
        })
      }
    }
  }
</script>

<style lang="less" scoped>
 
  #mini-player-container {
    width: 100%;
    background-color: #17181A;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 1000; 
    .mini-player {
      display: flex;
      align-items: center;
      .music-cover {
        padding: 8px 10px 0 30px;
        img {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          // animation:将动画与 div 元素绑定
          // 播放时 animation: name duration timing-function delay iteration-count direction;
          // name: 规定需要绑定到选择器的 keyframe 名称
          // duration: 规定完成动画所花费的时间，以秒或毫秒计
          // timing-function: 规定动画的速度曲线。
          // iteration-count: 规定动画应该播放的次数。
          // animation: rotate 10s linear infinite; //linear:匀速;infinite:无限 
          animation: rotate 10s linear infinite;
          // &符号有2中用法，其一：父选择符；其二：且的意思
          &.pause { // 暂停时
            animation-play-state: paused; //播放状态：暂停
          }
        }
      }
      .music-name {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 8px 0 0 20px;
        h3 {
          color: #A2A3A4;
          font-size: 32px;
        };
        p {
          font-size: 8px;
          color: #5C5D5F;
        }
      }
      .music-btn {
        display: flex;
        align-items: center;
        color: #A2A3A4;
        .cloud.cloud-bofang {
          font-size: 26px;
          padding: 0 30px;
        }
        .cloud.cloud-zanting {
          font-size: 26px;
          padding: 0 30px;
        }
        .cloud.cloud-gengduo {
          font-size: 46px;
          padding: 0 35px;
        }
        .van-popup {
          height: 60%;
          background-color: #111214;
          color: #A2A3A4;
        }
      }
    }
    
  }
</style>