<template>
  <div id="singer-category-container">
    <div class="initial-wrap">
      <ul>
        <li v-for="(item,index) in category.initial" 
        :class="{active: initialIndex === index}" 
        @click="initialClick(index,item)">{{item}}</li>
      </ul>
    </div>
    <div class="area-wrap">
      <ul>
        <li v-for="(item,index) in category.area" 
        :class="{active: areaIndex === index}" 
        @click="areaClick(index,item.index)">{{item.name}}</li>
      </ul>
    </div>
    <div class="type-wrap">
      <ul>
        <li v-for="(item,index) in category.type" 
        :class="{active: typeIndex === index}" 
        @click="typeClick(index,item.index)">{{item.name}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SingerCategory',
    props: {
      category: Object
    },
    data() {
      return {
        initialIndex: 0,
        typeIndex: 0,
        areaIndex: 0,
        currentIndex: {
          initial: null,
          type: -1,
          area: -1
        }
      }
    },
    methods: {
      initialClick(index,item) {
        this.initialIndex = index;
        if(index == 0) {
          this.currentIndex.initial = -1
        } else {
          this.currentIndex.initial = item
        }
        this.$emit("choose",this.currentIndex)
      },
      typeClick(index,item) {
        this.typeIndex = index;
        this.currentIndex.type = item
        this.$emit("choose",this.currentIndex)
      },
      areaClick(index,item) {
        this.areaIndex = index;
        this.currentIndex.area = item
        this.$emit("choose",this.currentIndex)
      }
    }
  }
</script>

<style lang="less">
  #singer-category-container {
    color: #A2A3A4;
    margin: 0 15px;
    margin-top: 10px;
    ul>li {
      display: inline-block;
      margin: 12px 15px;
      padding: 5px 13px;
      font-size: 32px;
    }
    .initial-wrap {
      width: 100%;
      overflow: hidden;
      white-space: normal;
      word-wrap: break-word;
      overflow-x: auto; //水平滚动条
    }
    .active {
      background-color: #f00;
      color: #fff;
      border-radius: 10px;
    }
  }
</style>