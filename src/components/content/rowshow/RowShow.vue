<template>
   <div id="row-show-container">
    <h3 class="row-show-title">{{title}}</h3>
    <div class="row-show-wrap">
      <div class="row-show-item" v-for="(item,index) in datalist" :key="item.id" @click="iconClick(item.id)">
        <img :src="item.urlcover" alt="">
        <p style="white-space:pre-wrap;overflow-wrap:break-word;-webkit-line-clamp:2">{{item.name}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RowShow",
  props: {
    title: String,
    datalist: Array
  },
  methods: {
    iconClick(id) {
      this.$emit('iconClick',id)
    }
  }
}
</script>

<style lang="less">
   #row-show-container {
     margin-bottom: 20px;
    div {
      display: inline-block;
    }
    .row-show-title {
      padding: 15px 0 10px 25px;
      font-size: 36px;
      color: #A2A3A4;
    }
    .row-show-wrap {
      width: 100%;
      overflow: hidden;
      white-space: nowrap; //超出不换行
      overflow-x: auto; //水平滚动条
      .row-show-item {
        margin: 0 10px;
        padding-top: 20px;
        width: 220px;
        border-radius: 20px;
        text-align: center;
        img {
          width: 100%;
          border-radius: 12px;
        }
        p {
          color: #fff;
          font-size: 12px;
          display: -webkit-box;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;  
        }
      }
    }
    .row-show-item:first-child {
      margin-left: 20px;
    }
    .row-show-wrap::-webkit-scrollbar { //隐藏滚动条
      display: none;
    }
  }
</style>