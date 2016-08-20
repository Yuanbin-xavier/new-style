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
            <input type="text" readonly="readonly" class="input">
          </div>
          <div>
            <label class="form-label">密码:</label>
            <input type="password" class="input" >
          </div>
          <div>
            <label class="form-label">重复密码:</label>
            <input type="password" class="input" >
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
  export default {
    components: {
      MBreadcrumb
    },
    methods: {
      onSave () {
        const self = this
        self.changePassword({
          admin_name: self.username,
          password: self.password
        }).then(res => {
          self.logout()
          self.$notify({
            title: '成功',
            message: '修改成功请重新登录',
            type: 'success'
          })
          this.$router.go('/login')
        }, res => {
          self.$notify({
            title: '登录失败',
            message: self.resp.tips,
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
          { name: '首页' }
        ],
        fullscreenLoading: false
      }
    }
  }
</script>
