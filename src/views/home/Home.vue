<template>
  <div id="home-container">
    <div class="home-swipe">
     
    </div>
    <home-music-icon :musicIcon="musicIcon" @iconClick="iconClick"/>
  </div>
</template>

<script>
  // 公共组件相关
  import NavBar from 'components/common/navbar/NavBar.vue'
  // 子组件相关
  import HomeMusicIcon from './childComponents/HomeMusicIcon.vue'
  // 接口数据相关
  import { getIcon, getBanner } from 'network/home/home.js'

  export default {
    name: 'Home',
    components: {
      NavBar,
      HomeMusicIcon
    },
    data() {
      return {
        musicIcon: [],
        images: [],
      }
    },
    created() {
      this.getIcon(),
      this.getBanner()
    },
    methods: {
      // 获取接口数据
      async getIcon() {   //获取图标
        const res = await getIcon()
        this.musicIcon = res.data.data.map(item => ({
          iconUrl: item.iconUrl,
          name: item.name,
          url: item.url
        }))
      },
      async getBanner() {   //获取轮播图
        const res = await getBanner();
        this.images = res.data.banners.map(item => ({
          pic: item.pic,
          typeTitle: item.typeTitle,
          bannerId: item.bannerId
        }))
      },
      // 点击事件处理
      iconClick(index) {
        let url = this.musicIcon[index].url.split('//')[1]
        this.$router.push('/' + url)
      }
    }
  }
</script>

<style lang="less">
 
  
</style>