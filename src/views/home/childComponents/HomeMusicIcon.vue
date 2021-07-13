<template>
  <div id="my-music-container">
    <h3 class="my-music-title">我的音乐</h3>
    <div class="my-music-wrap">
      <div class="my-music-item" v-for="(item,index) in musicIcon" @click="iconClick(index)">
        <img :src="item.iconUrl" alt="">
        <p>{{item.name}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'HomeMusicIcon',
    props: {
      musicIcon: Array
    },
    methods: {
      iconClick(index) {
        this.$emit('iconClick',index)
      }
    }
  }
</script>

<style lang="less">
  #my-music-container {
    padding-top: 90px;
    div {
      display: inline-block;
    }
    .my-music-title {
      padding: 15px 0 10px 25px;
      font-size: 36px;
      color: #A2A3A4;
    }
    .my-music-wrap {
      width: 100%;
      overflow: hidden;
      white-space: nowrap; //超出不换行
      overflow-x: auto; //水平滚动条
      .my-music-item {
        background-color: #28292B;
        margin: 10px 10px;
        padding-top: 30px;
        width: 220px;
        height: 270px;
        border-radius: 20px;
        text-align: center;
        img {
          width: 120px;
          height: 120px;
        }
        p {
          color: #fff;
          font-size: 34px;
        }
      }
    }
    .my-music-item:first-child {
      margin-left: 20px;
    }
    .my-music-wrap::-webkit-scrollbar { //隐藏滚动条
      display: none;
    }
  }
 
</style>