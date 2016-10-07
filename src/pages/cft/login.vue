<template>
  <div class="login">
    <div class="border">
      <h1>车凡提后台管理系统</h1>
      <div class="row">
        <div class="col-12">
          <label class="form-label">用户名</label>
          <input type="text" class="input" v-model="username" required="true">
        </div>
        <div class="col-12">
          <label class="form-label">密码</label>
          <input type="password" @keyup.enter="onLogin" v-model="password" class="input" required="true">
        </div>
      </div>
      <br/>
      <div class="row">
        <div class="col-12 ">
          <button id="#mouse" class="btn btn-primary btn-block" type="button" @click="onLogin()">登录</button>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
  .login{
    margin: 0px auto;
    width: 400px;
    overflow: hidden;
    text-align: center;
  }
  .border {
    position: absolute;
    width: 400px;
    height: 400px;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    background-color: white;
    resize: both;
    overflow: auto;
    padding: 40px;
  }
  .border input {
    height: 40px;
  }
  .col-12 {
    line-height: 40px;
    text-align: left;
    padding-top: 20px;
  }
  .col-12 button {
    margin-top: 50px;
    height: 40px;
    font-size: 20px;
  }
</style>

<script>
  import { user } from '../../api'
  export default {
    methods: {
      onLogin () {
        const self = this
        user.login({
          admin_name: self.username,
          password: self.password
        }).then(res => {
          self.$router.go('/')
          self.$notify({
            title: '成功',
            message: res.tips,
            type: 'success'
          })
        }, res => {
          self.$alert(res.tips, '登录失败', {
            type: 'warning'
          })
        })
      }
    },
    data () {
      return {
        username: '',
        password: '',
        fullscreenLoading: false,
        loginBool: false
      }
    }
  }
</script>
