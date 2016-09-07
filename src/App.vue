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
    line-height: 70px;
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
    <div id="main">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
  export default {
    ready () {
      document.getElementById('loading').style.display = 'none'
    }
  }
</script>


