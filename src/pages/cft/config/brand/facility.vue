<style scoped>
  .main-content-bd td button {
    padding: 5px;
    height: 40px;
  }
  .main-content-bd button {
    background: #fff;
    color: black;
  }
  .form-label {
    width: 100px;
    text-align: right;
    line-height: 50px;
  }
  .main-content-bd input.input {
    display: inline-block;
    margin: 0 16px 0 0;
    width: 300px;
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    background: #fff;
  }
</style>

<template>
  <div class="content">
    <m-breadcrumb :items="breadcrumbData"></m-breadcrumb>
    <div class="main-content">
      <div class="main-content-hd">
        <h3>设备发放</h3>
        <div class="main-content-bd">
          <form>
            <label class="form-label">选择店铺：</label>
            <select style="width: 100px; font-size: 18px;" v-model="info.shop_id">
            <option value="0">不限店铺</option>
            <option value="volvo" v-for="option in orderles" v-bind:value="option.shop_id">{{option.shop_name}}</option>
          </select>
          </form>
          <form>
            <label class="form-label">设备秘钥：</label>
            <input type="text" class="input" v-model='info.code'>
          </form>
          <form>
            <label class="form-label">设备用户名：</label>
            <input type="text" class="input" v-model='info.account'>
          </form>
          <form>
            <label class="form-label">设备序列号：</label>
            <input type="text" class="input" v-model='info.sn'>
          </form>
          <div class="main-content-bd-block detail">
          <div class="filter">
            <el-button style="background:#20a0ff; color:#fff; width:80px; font-size:12px;" type="primary" @click="onSave()" :loading.sync="updateing">保存</el-button>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { MBreadcrumb } from '../../../../common/components/'
  import { shopper } from '../../../../api'
  export default {
    components: {
      MBreadcrumb
    },
    data () {
      return {
        breadcrumbData: [
          { name: '配置' },
          { name: '设备管理' },
          { name: '设备发放' }
        ],
        orderles: [],
        shopper_id: 0,
        shop_id: 0,
        sn: '',
        pagination: {
          total: 1,
          size: 10,
          index: 1
        },
        info: {
          shop_id: 0,
          sn: '',
          account: '',
          code: ''
        },
        updateing: false
      }
    },
    created () {
      this.DeviceGrant(1, 1)
    },
    methods: {
      DeviceGrant: function () {
        console.log('...........change..........', this.$route.params.id)
        const self = this
        shopper.deviceshoplist({page_index: this.pagination.index, page_size: this.pagination.size}).then(function (res) {
          self.orderles = res.data
          self.pagination.total = res.data_count
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
        shopper.devicegrant(this.info).then(function (res) {
          self.$notify({
            title: '发放成功',
            message: res.tips,
            type: 'success'
          })
          self.$router.go({
            name: 'device-list'
          })
        }, function (res) {
          self.updateing = false
          self.$notify({
            title: '发放失败',
            message: res.tips,
            type: 'warning'
          })
        })
      }
    }
  }
</script>
