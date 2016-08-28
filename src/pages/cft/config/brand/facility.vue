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
            <select style="width: 100px; font-size: 18px; margin-left: 20px;" v-model="shopper_id">
            <option value="0">不限店铺</option>
            <option value="volvo" v-for="option in supplierList" v-bind:value="option.shopper_id">{{option.fullname}}</option>
          </select>
          </form>
          <form>
            <label class="form-label">设备秘钥：</label>
            <input type="text" class="input" v-bind:placeholder="accountType === '商户ID' ? '仅支持输入数字' : ' '" v-model="merchantId">
          </form>
          <form>
            <label class="form-label">设备用户名：</label>
            <input type="text" class="input" v-bind:placeholder="accountType === '商户ID' ? '仅支持输入数字' : ' '" v-model="merchantId">
          </form>
          <form>
            <label class="form-label">设备序列号：</label>
            <input type="text" class="input" v-bind:placeholder="accountType === '商户ID' ? '仅支持输入数字' : ' '" v-model="merchantId">
          </form>
        <div class="main-content-bd-block detail">
          <div class="filter">
            <button class="btn btn-primary btn-small" @click="save()">发放</button>
          </div>
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
          { name: '用户管理' },
          { name: '管理用户' },
          { name: '加盟商列表' }
        ],
        traceList: [],
        supplierList: [],
        employeeslist: [],
        shop_id: 0,
        shopper_id: 0,
        keyword: '',
        pagination: {
          total: 1,
          size: 10,
          index: 1
        }
      }
    },
    created () {
      this.onPageChange(1, 1)
      const self = this
      shopper.shopinferior({keyword: this.keyword, shopper_id: this.shopper_id, page_index: this.pagination.index, page_size: this.pagination.size}).then(function (res) {
        self.supplierList = res.data
        self.pagination.total = res.data_count
      })
    },
    methods: {
      onPageChange: function () {
        console.log('...........change..........', this.$route.params.id)
        const self = this
        shopper.oalesrank().then(function (res) {
          self.traceList = res.data
          self.pagination.total = res.data_count
        }, function (res) {
          self.$notify({
            title: '拉取失败',
            message: res.tips,
            type: 'warning'
          })
        })
      }
    }
  }
</script>
