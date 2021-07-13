<template>
  <div id="playlists-container">
    <div class="playlists-cover" v-for="item in data">
      <div class="playlists-img">
        <img :src="item.coverImgUrl" alt="">
      </div>
      <div class="playlists-info">
        <h3>{{item.name}}</h3>
        <p>{{item.copywriter}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'PlayLists',
    props: {
      data: Array
    }
  }
</script>

<style lang="less">
  #playlists-container {
    box-sizing: border-box;
    color: #A2A3A4;
    div {
      display: flex;
    }
    .playlists-cover {
      margin: 10px 0;
      .playlists-img {
        padding: 10px 20px;
        img {
          width: 150px;
          height: 150px;
        }
      }
      .playlists-info {
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