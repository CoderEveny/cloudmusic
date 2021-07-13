<template>
<!-- 播放器整体结构 -->
  <div id="play-wrap">
    <!-- 小播放器 -->
    <mini-player v-if="!fullScreen" :progress="progress"/>
    <!-- 全屏播放器 -->
    <normal-player v-else 
      :progress="progress" 
      @change="handleProgressChange"
      :currentTime="currentTime" 
      :duration="duration"
      @touchChange="handleTouchChangeAction"/>
    <audio ref="audio" 
    :src="`https://music.163.com/song/media/outer/url?id=${id}.mp3`"/>
  </div>
</template>

<script>
  import MiniPlayer from './MiniPlayer.vue'
  import NormalPlayer from './NormalPlayer.vue'

  // 拿仓库中的歌曲信息
  import {mapState} from 'vuex' //从vuex中获取辅助属性mapGetters

  export default {
    name: 'index',
    components: {
      MiniPlayer,
      NormalPlayer
    },
    data() {
      return {
        // audio当前时间
        currentTime: 0,
        // audio总时长
        duration: 0,
        isTouch: false 
      }
    },
    mounted() {
      // 组件挂载好了，dom首次渲染完毕，获得audio标签，设置在this上，方便之后访问
      this.audio = this.$refs.audio;

      this.audio.addEventListener('canplay', () => {
        // audio可以播放时，获得的时长
        this.duration = this.audio.duration;
      }),
      this.audio.addEventListener('timeupdate', () => {
        // audio播放过程中，时间的更新时间
        if(this.isTouch) {  
          return; //用户在拖拽进度条，进度条不要跟着音乐去更新
        }
        this.currentTime = this.audio.currentTime;
      })
      // 监听一首歌播放结束的事件
      this.audio.addEventListener('ended', () => {
        // 播放模式为顺序播放：播放下一首歌
        // 播放模式为随机播放：播放随机歌曲列表下一首歌
        // (由于播放列表已改变，所以直接播放下一首歌就行)
        if(this.mode === 0 || this.mode === 2) {
          this.$store.commit({
            type: 'player/nextAction'
          })
        } else if(this.mode === 1) {
          // 播放模式为单曲播放：重播这一首歌
          this.audio.play();
        }
      })
    },
    computed: {
      
      // 从仓库中获取仓库的状态state，转为组件的计算属性computed
      ...mapState({
        playing: state => state.player.playing,
        fullScreen: state => state.player.fullScreen,
        currentSong: state => state.player.currentSong,
        mode: state => state.player.mode
      }),
      // 计算歌曲id
      id() {
        return this.currentSong.id
      },
      // 计算进度百分比
      // 计算属性如果是如下写法，那么对于这个属性，只能使用不能修改
      // 如果需要修改属性：1.实现set函数 2.修改计算属性的依赖
      progress() {
        const res =  this.currentTime / this.duration
        // isNaN() 函数用于检查其参数是否是非数字值。
        return isNaN(res) ? 0 : res
      } 
    },
    watch: {
      // 监听播放状态，操作audio标签播放或暂停歌曲
      playing(newVal) {
        // 等待dom渲染好了之后再操作
        this.$nextTick(() => {
          if(newVal) {
            this.audio.play() //播放音乐
          } else {
            this.audio.pause() //暂停音乐
          }
        }) 
      },
      // 监听歌曲id，id变了要重新加载，重新播放歌曲
      id(newValue, oldValue) {
        if(!oldValue) {
          return;
        }
        // 有上一首个才重载歌曲
        this.$nextTick(() => {
          this.audio.load();
          this.audio.play();
        })
      }
    },
    methods: {
      /**
       * 根据handleProgressChange和handleTouchChangeAction实现的效果：
       * 用户在拖拽时只更新进度，停止拖拽后，更新播放的时间
       */
      // 处理内部组件进度的变换
      handleProgressChange(newVal) {
        // 1.修改进度不是真的要修改progress，而是应该修改currentTime属性
        this. currentTime = newVal * this.duration;        
      },
      // 全屏播放器的触摸拖拽状态的切换事件
      // 触摸开始 'start' , 触摸停止 'end'
      handleTouchChangeAction(flag) {
        if (flag === 'start') {
          this.isTouch = true;
        } else if(flag === 'end') {
          this.isTouch = false;
          // 2.音乐播放器：调整播放的时间
          this.audio.currentTime = this.currentTime
        }
      },
    }
  }
</script>  

<style>

</style>