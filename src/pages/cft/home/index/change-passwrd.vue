<style scoped>
.right .form-label {
  width: 100px;
  text-align: right;
  line-height: 50px;
}
.right input.input {
  display: inline-block;
  margin: 0 16px 0 0;
  width: 300px;
  height: 30px;
  line-height: 30px;
  font-size: 12px;
}
</style>

<template>
  <div class="content">
    <m-breadcrumb :items="breadcrumbData"></m-breadcrumb>
    <div class="main-content">
      <div class="main-content-hd">
        <h3>修改密码</h3>
      </div>
      <div class="main-content-bd">
        <div class="main-content-bd-block right">
          <h4>登录信息</h4>
          <hr>
          <div>
            <label class="form-label">用户名:</label>
            <input type="text" readonly="readonly" disabled="disabled" class="input" v-model="username">
          </div>
          <div>
            <label class="form-label">原密码:</label>
            <input type="password" class="input" v-model="info.old_password">
          </div>
          <div>
            <label class="form-label">密码:</label>
            <input type="password" class="input" v-model="info.new_password">
          </div>
          <div>
            <label class="form-label">重复密码:</label>
            <input type="password" class="input" v-model="info.rep_password">
          </div>
          <div class="pagination-container" style="text-align: right;">
            <button class="btn btn-primary btn-small"  @click="onSave()">保存</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import MBreadcrumb from '../../../../common/components/breadcrumb.vue'
  import { shopper, user } from '../../../../api'
  export default {
    components: {
      MBreadcrumb
    },
    created () {
      const self = this
      user.loginProfile().then(function (res) {
        self.username = res.username
      })
    },
    methods: {
      onSave: function () {
        const self = this
        this.updateing = true
        shopper.admineditpassword(this.info).then(function (res) {
          self.$notify({
            title: '修改成功',
            message: res.tips,
            type: 'success'
          })
          self.$router.go({
            name: 'login'
          })
        }, function (res) {
          self.updateing = false
          self.$notify({
            title: '修改失败',
            message: res.tips,
            type: 'warning'
          })
        })
      }
    },
    data () {
      return {
        breadcrumbData: [
          { name: '我的首页' },
          { name: '首页' },
          { name: '修改密码' }
        ],
        adminpassword: [],
        username: '',
        info: {
          old_password: '',
          new_password: '',
          rep_password: ''
        },
        pagination: {
          total: 1,
          size: 10,
          index: 1
        },
        updateing: false
      }
    }
  }
</script>
