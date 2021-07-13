// 仓库的音乐播放器相关的状态
/**
 * 在store中包含组件的共享状态state和改变状态的方法（暂且称作方法）mutations。
 * 注意state相当于对外的只读状态，不能通过store.state.loginInfo来更改，
 * 使用store.commit方法通过触发mutations改变state
 */
let mode = 0;
const playMode = {
  sequence: 0, //顺序播放
  loop: 1,  //单曲循环
  random: 2 //随机播放
}

const getPlayList = function(mode, sequencePlayList) {
  if(mode === playMode.sequence) {
    // 如果是顺序播放：就是原始歌曲列表
    return [...sequencePlayList];
  } else if(mode === playMode.loop) {
    // 如果是单曲播放：就是原始歌曲列表
    return [...sequencePlayList];
  } else if(mode === playMode.random) {
    // 如果是随机播放：就是原始歌曲列表打乱后的列表
    const newArr = [...sequencePlayList];
    for(let i = 0; i < newArr.length; i++) {
      const item = newArr[i];
      const randomIndex = Math.floor(Math.random() * (i + 1));
      newArr[i] = newArr[randomIndex];
      newArr[randomIndex] = item;
    }
    // 设置的播放歌曲列表
    return newArr;
  }
}

export default {
  namespaced: true,  //命名空间，不跟其他模块的事件冲突
  // state：放共享的的数据
  state: {
    // 是否要全屏播放
    fullScreen: false,
    // 当前音乐是否在播放
    playing: false,
    // 播放列表
    playList: [],
    // 顺序歌曲列表，即原始歌单列表
    sequencePlayList: [],
    // 播放模式
    mode: playMode.sequence,
    // 当前播放歌曲在歌曲列表中的下标
    currentIndex: -1,
    // 当前歌曲信息
    currentSong: {}
  },
  getters: {  //相当于computed计算方法吧
    // 当前歌曲信息
    // currentSong(state, getters) {
    //   if(state.currentIndex >= 0 && state.currentIndex < getters.playList.length) {
    //     // 选中了歌曲
    //     return getters.playList[state.currentIndex];
    //   } else {
    //     // 没有选中歌曲
    //     return {}
    //   }
    // },

  },
  // 用来改变state中的数据
  mutations: {
    // 歌单中点击歌曲后的处理事件
    seletSongByIndex(state,payload) { //第一个参数是state里设定好的参数；第二个参数是我们传进来的参数
      // 设置歌曲原始下标
      state.currentIndex = payload.index;
      // 歌单列表的原始数据需要一直保留，不能被其他事件影响到歌单顺序
      state.sequencePlayList = [...payload.list]; //扩展运算符(…)用于取出参数对象中的所有可遍历属性，拷贝到当前对象之中
      // 设置当前歌曲信息
      state.currentSong = state.sequencePlayList[state.currentIndex];
      // 重新计算播放列表
      state.playList = getPlayList(state.mode, state.sequencePlayList);
      // 找到在playList的下标
      state.currentIndex = state.playList.findIndex(item => {
        return item.id === state.currentSong.id
      })
      // 播放音乐
      state.playing = true;
    },
    // 修改播放状态
    setPlaying(state,payload) {
      state.playing = payload.value
    },
    // 修改全屏播放状态
    setFullScreen(state, payload) {
      state.fullScreen = payload.value;
    },
    // 切换播放模式
    changePlayMode(state) {
      // 1.修改播放模式
      mode += 1;
      state.mode = mode % 3;
      
      // 2.修改播放类别，修改播放列表的歌曲列表
      state.playList = getPlayList(state.mode, state.sequencePlayList)

      // 修改index
      state.currentIndex = state.playList.findIndex(item => {
        return item.id === state.currentSong.id
      })

      // 修改当前的歌曲信息
      state.currentSong = state.playList[state.currentIndex]
    },
    // 切换成上一首歌
    prevAction(state) {
      if(state.currentIndex != 0) {
        state.currentIndex -= 1;
        state.currentSong = state.playList[state.currentIndex]  
      } else {
        state.currentIndex = state.playList.length - 1;
        state.currentSong = state.playList[state.currentIndex]
      }
    },
    // 切换成下一首歌
    nextAction(state) {
      if(state.currentIndex < state.playList.length - 1) {
        state.currentIndex += 1;
        state.currentSong = state.playList[state.currentIndex]  
      } else {
        state.currentIndex = 0;
        state.currentSong = state.playList[state.currentIndex]
      }
    }
  },
  actions: {

  }
}