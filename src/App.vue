<style>
  html, body {
    font: 100% 'Microsoft-Yahei', Helvetica, sans-serif;
    height: 100%;
    background-color: #e1e8ef !important;
    min-width: 1160px;
  }

  a[href] {
    text-decoration: none;
    color: #4993e5;
  }

  .container {
    display: flex;
    padding-top: 65px;
    height: 100%;
    box-sizing: border-box;
  }

  .header {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    min-width: 1160px;
    background-color: #4993e5;
    z-index: 10;
  }

  .header h1 {
    float: left;
    margin: 0 30px 0 26px;
    line-height: 65px;
    font-size: 18px;
    color: #fff;
  }


  .header .m-icon-user_icon {
    position: relative;
    top: 2px;
    left: 10px;
    line-height: 16px;
    font-size: 16px;
  }

  .header .main-title {
    margin-left: 5px;
    padding-left: 10px;
    font-size: 36px;
    padding-left: 50px
  }

  .main-nav {
    font-size: 0;
  }

  .main-nav li {
    display: inline-block;
  }

  .main-nav a {
    display: block;
    padding: 0 36px;
    color: #fff;
    line-height: 65px;
    text-decoration: none;
    font-size: 14px;
  }

  .main-nav .active, .main-nav a:hover {
    background-color: rgba(0, 0, 0, .1);
  }

  .main-account {
    float: right;
    margin-right: 20px;
    color: #fff;
    font-size: 14px;
    line-height: 65px;
  }

  .main-account span {
    margin-right: 10px;
  }

  .main-account .username {
    padding-right: 10px;
    border-right: 1px solid #d8d8d8;
  }

  .main-account a {
    position: relative;
    text-decoration: none;
    color: #fff;
  }

  #main {
    display: flex;
    width: 100%;
    height: 100%;
  }

  #main .content {
    position: relative;
    flex: 1;
    box-sizing: border-box;
    overflow: auto;
  }
</style>

<template>
  <div class="container">
    <div class="header" v-if="!isLoginPage">
      <h1>
        <span class="main-title">车凡提</span>
      </h1>
      <p class="main-account">
        <span class="m-icon-user_icon"></span>
        <span class="username">DK </span><a href="JavaScript:" @click="signout()">登出</a>
      </p>
      <ul class="main-nav">
        <li>
          <a href="JavaScript:" v-link="{ name: 'home' }">我的首页</a>
        </li>
        <li>
          <a href="JavaScript:" v-link="{ name: 'shopper' }">用户管理</a>
        </li>
        <li>
          <a href="JavaScript:" v-link="{ name: 'trade' }">订单管理</a>
        </li>
        <li>
          <a href="JavaScript:" v-link="{ name: 'coupon' }">抵用券管理</a>
        </li>
        <li>
          <a href="JavaScript:" v-link="{ name: 'config' }">配置</a>
        </li>
      </ul>
    </div>
    <div id="main">

      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import { user } from './api'
  export default {
    methods: {
      signout () {
        user.logout()
        this.$notify({
          title: '成功',
          message: '注销成功',
          type: 'success'
        })
        this.isLoginPage = 1
        this.$router.go('/login')
      }
    },
    data () {
      console.log(this.$route.name === 'login')
      return {
        isLoginPage: this.$route.name === 'login' ? 1 : 0
      }
    },
    event: {
      'signin': function () {
        this.$router.go('/login')
      },
      'notwork': function () {
        this.hideLoading()
        this.showNotWork = true
      },
      'timeouting': function () {
        this.showTimeout = true
        setTimeout(function () {
          window.location.reload()
        }, 3000)
      }
    }
  }
</script>
