<template>
  <div id="login-container">
    <div class="login-logo">
      <img src="~assets/img/logo.svg" alt="">
    </div>
    <div class="login-btn">
      <div class="phone-btn">手机注册登录</div>
      <div class="email-btn">邮箱注册登录</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Login'
  }
</script>

<style lang="less">
  #login-container {
    width: 100%;
    height: 100vh;
    background-color: #991E16;
    .login-logo {
      display: flex;
      height: 60%;
      justify-content: center;
      align-items: center;
      img {
        width: 250px;
        height: 250px;
      }
    }
    .login-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      div {
        width: 400px;
        border-radius: 50px;
        margin: 10px 0; 
        font-weight: 600;
      }
      .phone-btn {
        justify-content: center;
        background-color: #B2B2B2;
        color: #991E16;
        padding: 25px 50px;
      }
      .email-btn {
        border: 1px solid #B2B2B2;
        color: #B2B2B2;
        padding: 20px 50px;
      }
    }
  }
</style>