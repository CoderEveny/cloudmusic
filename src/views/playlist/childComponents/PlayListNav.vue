<template>
  <div id="playlist-nav-container">
    <div class="left">
      <i class="cloud cloud-left" @click="$router.back()"/>
      <p>歌单</p>
    </div>
    <div class="right">
      <i class="cloud cloud-sousuo"></i>
      <i class="cloud cloud-more"></i>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'PlayListNav',

  }
</script>

<style lang="less">
  #playlist-nav-container {
    position: sticky;
    top: 0;
    left: 0;
    height: 90px;
    background-color: #17181A;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #A2A3A4;
    .left {
      display: flex;
      .cloud {
        padding: 0 20px;
        font-size: 46px;
      }
      p {
        padding: 0 5px 5px 0;
      }
    }
    .right {
      i {
        font-size: 46px;
        padding-right: 20px;
      }
    }
  }
</style>