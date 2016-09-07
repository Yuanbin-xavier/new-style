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
            <input type="text" readonly="readonly" disabled="disabled" class="input" v-model="info.admin_name">
          </div>
          <div>
            <label class="form-label">密码:</label>
            <input type="password" class="input" v-model="info.password">
          </div>
          <div>
            <label class="form-label">重复密码:</label>
            <input type="password" class="input" v-model="info.re_password">
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
  import { shopper } from '../../../../api'
  export default {
    components: {
      MBreadcrumb
    },
    created () {
      this.onPageChange()
    },
    methods: {
      onSave: function () {
        const self = this
        this.updateing = true
        shopper.adminpassword(this.info).then(function (res) {
          self.$notify({
            title: '修改成功',
            message: res.tips,
            type: 'success'
          })
          self.$router.go({
            name: 'shopper-admin-index'
          })
        }, function (res) {
          self.updateing = false
          self.$notify({
            title: '修改失败',
            message: res.tips,
            type: 'warning'
          })
        })
      },
      onPageChange: function () {
        console.log('...........change..........', this.$route.params.id)
        const self = this
        shopper.admininfo({admin_id: this.$route.params.id}).then(function (res) {
          self.info = res.data
          self.pagination.total = res.data_count
        }, function (res) {
          self.$notify({
            title: '拉取失败',
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
        info: {
          admin_name: '',
          admin_id: '',
          password: '',
          re_password: ''
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