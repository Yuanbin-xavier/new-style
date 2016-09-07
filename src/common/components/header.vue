<template>
  <div>
      <div class="header" >
      <h1>
        <span>车凡提</span>
      </h1>
      <p class="main-account">
        <span class="iconfont">&#xe609;</span>
        <span class="username">{{username}} </span><a href="JavaScript:" @click="signout()">登出</a>
      </p>
      <ul class="main-nav">
        <li>
          <a href="JavaScript:" v-link="{ name: 'home-index'}">我的首页</a>
        </li>
        <li>
          <a href="JavaScript:" v-link="{ name: 'shopper-supplier-index' }">用户管理</a>
        </li>
        <li>
          <a href="JavaScript:" v-link="{ name: 'trade-order-index' }">订单管理</a>
        </li>
        <li>
          <a href="JavaScript:" v-link="{ name: 'vouchers-index' }">抵用券管理</a>
        </li>
        <li>
          <a href="JavaScript:" v-link="{ name: 'device-list' }">配置</a>
        </li>
      </ul>
    </div>
  </div>
</template>
  <style lang="less" scoped>

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
    line-height: 55px;
    font-size: 35px;
    color: #fff;
    text-indent: 33px;
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
  .iconfont{ 
    font-size: 20px;
  }
  @font-face {
  font-family: 'iconfont';
  src: url('//at.alicdn.com/t/font_1473044592_5658207.eot'); /* IE9*/
  src: url('//at.alicdn.com/t/font_1473044592_5658207.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('//at.alicdn.com/t/font_1473044592_5658207.woff') format('woff'), /* chrome、firefox */
  url('//at.alicdn.com/t/font_1473044592_5658207.ttf') format('truetype'), /* chrome、firefox、opera、Safari, Android, iOS 4.2+*/
  url('//at.alicdn.com/t/font_1473044592_5658207.svg#iconfont') format('svg'); /* iOS 4.1- */
}
                    
</style>

<script>
  import { user } from '../../api'
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
      return {
        username: '',
        isLoginPage: this.$route.name === 'login' ? 1 : 0
      }
    },
    created () {
      const self = this
      user.loginProfile().then(function (res) {
        self.username = res.username
      })
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
