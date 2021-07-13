<template>
  <div id="singerlists-container">
    <!-- 分类栏组件 -->
    <singer-category :category="singerCategory" @choose="choose"/>  
      <!-- 展示歌手信息 -->
    <div class="singer-list-wrap" v-if="singerInfo">
      <van-list v-model="loading" :finished="finished"
        finished-text="没有更多了" @load="onLoad" 
        :immediate-check="false" offset="20">
        <div class="singer-cover" v-for="item in singerInfo" @click="toSingerSong(item.id)">
          <div class="singer-img">
            <img :src="item.img1v1Url" alt="">
          </div>
          <div class="singer-info">
            <h3>{{item.name}}</h3>     
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar.vue'
  import SingerCategory from './childComponents/SingerCategory.vue'
  import {getSingerList} from 'network/singerlists/singerlists'

  export default {
    name: 'SingerLists',
    components: {
      NavBar,
      SingerCategory
    },
    data() {
      return {
        singerCategory: {
          initial: ['全部', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
          type: [{name: '全部', index: -1}, {name: '男', index: 1}, {name: '女', index: 2}, {name: '乐队', index: 3}],
          area: [{name: '全部', index: -1}, {name: '华语', index: 7}, {name: '欧美', index: 96}, {name: '日本', index: 8}, {name: '韩国', index: 16}, {name: '其他', index: 0}]
        },
        chooseData: {},  //选择分类后的参数集合
        singerInfo: [],
        page: 1,  //分页页数
        limit: 8,  //一次请求的数据量
        loading: false, //触发load事件
        finished: false 
      }
    },
    created() {
      this.getSingers(this.page, this.limit)
    },
    watch: {
      'chooseData': {
        // immediate: true, //此时watch对value的默认值也进行了监听
	      deep: true, //深度监听，可监听到对象里面的变化
        handler() {
          this.singerInfo = []
          this.chooseChange(this.page, this.limit)
        }
      }
    },
    methods: {
      // 网络请求相关
      async getSingers(page, limit) {  //获取全部歌手列表
        const res = await getSingerList((page - 1) * limit, limit, {type: -1, area: -1})
        this.dataFilter(res.data)
      },
      async chooseChange(page, limit) {  //选择分类后，重新获取歌手列表
        const res = await getSingerList((page - 1) * limit, limit, this.chooseData)
        this.dataFilter(res.data)
      },
      // 数据过滤
      dataFilter(data) {
        const info = data.artists.map(item => ({
          img1v1Url: item.img1v1Url,
          name: item.name,
          id: item.id
        }))
        this.singerInfo.push(...info)
      },
      // 触发上拉加载更多事件
      onLoad() {
        this.page += 1
        if(this.chooseData == null) {
          setTimeout(() => {
            this.getSingers(this.page, this.limit)
            this.loading = false     
          },1000)    
        } else {
          setTimeout(() => {
            this.chooseChange(this.page, this.limit)
            this.loading = false
          },1000)          
        }
        console.log("onload")
      },
      // 子组件交互
      choose(data) {
        this.chooseData = data
      },
      // 网络跳转
      toSingerSong(id) {
        this.$router.push('/singerlists/' + id)
      }
    }
  }
</script>

<style lang="less">
   #singerlists-container {
    position: fixed;
    width: 100%;
    margin-top: 90px;
    color: #A2A3A4;
    .singer-list-wrap {
      height: calc(100vh - 460px);
      width: 100%;
      overflow: hidden;
      overflow-y: scroll;      
    }
    .singer-cover {
      margin: 15px 15px;
      display: flex;
      .singer-img {
        padding: 10px 20px;
        img {
          width: 150px;
          height: 150px;
          border-radius: 50%;
        }
      }
      .singer-info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        h3 {
          font-size: 34px;
        }
        p {
          font-size: 30px;
          padding-right: 50px;
        }
      }
    }
  }
</style>