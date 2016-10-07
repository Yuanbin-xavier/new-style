<style scoped>
.right .form-label {
  width: 100px;
  text-align: right;
  line-height: 50px;
}
</style>

<template>
  <div class="content">
    <m-breadcrumb :items="breadcrumbData"></m-breadcrumb>
    <div class="main-content">
      <div class="main-content-hd">
        <button class="btn btn-white btn-small pull-right" type="button" @click="onBack()">返回</button>
        <h3>管理员编辑</h3>
      </div>
      <div class="main-content-bd">
        <div class="main-content-bd-block right">
          <h4>登录信息</h4>
          <hr>
          <div>
            <label class="form-label">用户名:</label>
            <input type="text" class="input" disabled="disabled" v-model="info.admin_name">
          </div>
          <hr>
          <h4>基本信息</h4>
          <div>
            <label class="form-label">姓名:</label>
            <input type="text" class="input" v-model="info.fullname">
          </div>
          <div>
            <label class="form-label">手机:</label>
            <input type="text" class="input" v-model="info.mobile">
          </div>
          <div>
            <label class="form-label">E-:MAL</label>
            <input type="text" class="input" v-model="info.email">
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
  import { MImageUploader } from '../../../../common/components/'
  import { shopper } from '../../../../api'
  export default {
    components: {
      MImageUploader
    },
    data () {
      return {
        breadcrumbData: [
          { name: '我的NLE' },
          { name: '管理用户' },
          { name: '管理员编辑' }
        ],
        admin_id: '',
        info: {
          email: '',
          mobile: '',
          admin_name: '',
          fullname: ''
        },
        updateing: false
      }
    },
    created () {
      this.loadInfo()
    },
    methods: {
      onBack: function () {
        this.$router.go({
          name: 'shopper-service-index'
        })
      },
      loadInfo: function () {
        const self = this
        shopper.admininfo({admin_id: this.$route.params.id}).then(function (res) {
          self.info = res.data
        }, function (res) {
          self.$notify({
            title: '拉取失败',
            message: res.tips,
            type: 'warning'
          })
        })
      },
      onSave: function () {
        const self = this
        this.updateing = true
        shopper.adminedit(this.info).then(function (res) {
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
      }
    }
  }
</script>
