<template>
  <div id="nav-bar-container">
    <div class="nav-bar">
      <!-- 侧边滑出栏按钮 -->
      <div class="nav-btn">
        <i class="cloud cloud-gengduo" @click="showPopup"></i>
        <van-popup v-model="show" position="left" round>内容</van-popup>
      </div>
      <!-- 中间切换栏 -->
      <div class="tab-control">
        <span v-for="(item,index) in titles" 
        @click="spanClick(index)">
          <a :class="{active: getCurrentIndex === index}">{{item}}</a>
        </span>
      </div>
      <!-- 搜索按钮 -->
      <div class="nav-search">
        <i class="cloud cloud-sousuo"></i>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'NavBar',
    data() {
      return {
        currentIndex: 0,
        show: false,
        titles: ['我的', '歌手', '热门', '视频'],
        path: ['/home', '/singerlists', '/hot', '/video']
      };
    },
    computed: {
      getCurrentIndex: {
        get() {
          return this.path.findIndex(item => {
            return item == this.$route.path;
          })
        }, 
        set() {}
      },
    },
    methods: {
      showPopup() {
        this.show = true;
      },
      spanClick(index) {
        this.currentIndex = index;
        this.$router.replace(this.path[index]).catch(err => err)
      },
    }
  }
</script>

<style lang="less">
  #nav-bar-container {
    position: fixed;
    width: 100%;
    height: 90px;
    background-color: #17181A;
    div {
      display: flex;
    }
    i{
      color: #A2A3A4;
      font-size: 46px;
    }
    .nav-bar {
      padding: 16px 20px;
      .van-popup {
        height: 100vh;
        width: 82%;
        background-color: #111214;
        color: #A2A3A4;
      }
      .tab-control {
        padding: 0 120px;
        flex: 1;
        display: flex;
        span {
          flex: 1;
          text-align: center;
          a {
            color: #5C5D5F;
          }
        }
      }
    }
    .active{
      border-bottom: 4px solid #A2A3A4;
      font-size: 40px;
      color: #A2A3A4 !important;
    }
  }
  
</style>