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
            <input type="text" class="input" v-model="info.admin_name">
          </div>
          <div>
            <label class="form-label">密码:</label>
            <input type="text" class="input" v-model="info.company_name">
          </div>
          <div>
            <label class="form-label">重复密码:</label>
            <input type="text" class="input" v-model="info.address">
          </div>
          <hr>
          <h4>基本信息</h4>
          <div>
            <label class="form-label">姓名:</label>
            <input type="text" class="input" v-model="info.fullname">
          </div>
          <div>
            <label class="form-label">手机:</label>
            <input type="text" class="input" v-model="info.tel">
          </div>
          <div>
            <label class="form-label">E-:MAL</label>
            <input type="text" class="input" v-model="info.id_card">
          </div>
          <div class="pagination-container" style="text-align: right;">
            <el-button type="primary" size="large" @click="onSave()" :loading.sync="updateing">保存</el-button>
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
        shopper.adminedit({admin_id: this.$route.params.id}).then(function (res) {
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
        shopper.serviceUpdate(this.info).then(function (res) {
          self.$notify({
            title: '修改成功',
            message: res.tips,
            type: 'success'
          })
          self.$router.go({
            name: 'shopper-service-index'
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
