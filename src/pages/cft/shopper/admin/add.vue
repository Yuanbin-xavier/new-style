<style scoped>
.right .form-label {
  width: 100px;
  text-align: right;
  line-height: 50px;
}
.right textarea.input {
  display: inline-block;
  margin: 0 16px 0 0;
  width: 300px;
  height: 60px;
  line-height: 30px;
  font-size: 12px;
}
.right input.input {
  display: inline-block;
  margin: 0 16px 0 0;
  width: 300px;
  height: 30px;
  line-height: 30px;
  font-size: 12px;
}
.form-block{
  width: 90%;
  text-align: center;
}
</style>

<template>
  <div class="content">
    <m-breadcrumb :items="breadcrumbData"></m-breadcrumb>
    <div class="main-content">
      <div class="main-content-hd">
        <button class="btn btn-white btn-small pull-right" @click="onReturn()">返回</button>
        <h3>管理员添加</h3>
      </div>
      <div class="main-content-bd">
        <div class="main-content-bd-block right">
          <h4>注册信息</h4>
          <hr>
          <div>
            <label class="form-label">用户名:</label>
            <input type="text" class="input"  v-model="info.admin_name">
          </div>
          <div>
            <label class="form-label">密码:</label>
            <input type="text" class="input" v-model="info.password">
          </div>
          <div>
            <label class="form-label">重复密码:</label>
            <input type="text" class="input" v-model="info.re_password">
          </div>
          <div>
            <label class="form-label">姓名:</label>
            <input type="text" class="input" v-model="info.fullname">
          </div>
          <div>
            <label class="form-label">手机号:</label>
            <input type="text" class="input" v-model="info.mobile">
          </div>
          <div>
            <label class="form-label">邮箱:</label>
            <input type="text" class="input" v-model="info.email">
          </div>
          <div class="pagination-container" style="text-align: right;">
            <el-button type="primary" size="large" @click="onSave()" :loading.sync="updateing">添加</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { MBreadcrumb, MImageUploader } from '../../../../common/components/'
  import { shopper } from '../../../../api'
  export default {
    components: {
      MBreadcrumb,
      MImageUploader
    },
    data () {
      return {
        breadcrumbData: [
          { name: '用户管理' },
          { name: '管理用户' },
          { name: '管理员列表' },
          { name: '添加管理员' }
        ],
        info: {
        },
        updateing: false
      }
    },
    created () {
      const self = this
      shopper.serviceDropdownList({supperId: 0}).then(function (res) {
        self.serviceList = res.data
      })
    },
    methods: {
      onReturn: function () {
        this.$router.go({
          name: 'shopper-admin-index'
        })
      },
      onSave: function () {
        const self = this
        this.updateing = true
        shopper.adminadd(this.info).then(function (res) {
          self.$notify({
            title: '新增成功',
            message: res.tips,
            type: 'success'
          })
          window.history.go(-1)
        }, function (res) {
          self.updateing = false
          self.$notify({
            title: '新增失败',
            message: res.tips,
            type: 'warning'
          })
        })
      }
    }
  }
</script>
