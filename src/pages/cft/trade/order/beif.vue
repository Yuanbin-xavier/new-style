<style scoped>
 .alert-message {
    margin: 30px 0;
    text-align: center;
  }
  .alert-buttons {
    margin: 30px 0;
    text-align: center;
  }
  .alert-buttons button {
    display: inline-block;
  }
  .freezing-log {
    margin-bottom: 24px;
  }
  .main-content-hd a {
    font-size: 8px;
    float: right;
  }
  .main-input {
    padding-left: 15px;
    padding-top: 15px;
  }
  .main-frame {
    margin-bottom: 18px;
    padding: 14px 0;
    justify-content: center;
    align-items: center;
    background-color: rgba(223, 226, 231, 0.20);
    font-size: 0;
  }
  .main-content-hd button {
    float: right;
  }
  .filter button {
    margin: 20px 0 20px 100px;
  }
  .el-date-editor__editor {
    height: 30px;
  }

</style>

<template>
  <div class="content">
    <m-breadcrumb :items="breadcrumbData"></m-breadcrumb>
    <div class="main-content">
      <div class="main-content-hd">
        <button class="btn btn-white btn-small" @click="save()">返回</button>
        <h3>销售排名</h3>
        <form>
          <label class="form-label">成交时间：</label>
          <el-date-picker
              type="daterange"
              placeholder="选择日期范围"
              style="width: 240px;"
              :value.sync="pickedDate">
          </el-date-picker>
          <select style="width: 100px; font-size: 18px; margin-left: 20px;" v-model="shop_id">
            <option value="0">不限店铺</option>
            <option value="volvo" v-for="option in supplierList" v-bind:value="option.shop_id">{{option.shop_name}}</option>
          </select>
          <select style="width: 100px; font-size: 18px; margin-left: 20px;">
            <option value="volvo">不限员工</option>
            <option value="volvo">业余员</option>
            <option value="volvo">施工人员</option>
          </select>
        </form>
        <div class="main-content-bd detail">
          <table class="table">
            <thead>
              <tr>
                <th width="30">#</th>
                <th>店铺</th>
                <th>员工</th>
                <th>订单</th>
              </tr>
            </thead>
          <tbody>
            <tr v-for="item in traceList">
              <td>1</td>
              <td>{{item.shop_id}}</td>
              <td>{{item.saler_shopper_id}}</td>
              <td>{{item.order_qty}}</td>
            </tr>
          </tbody>
        </table>
      <div class="pagination-container" style="padding-bottom: 30px;">
       <el-pagination
                  layout="prev, pager, next, jumper, slot, ->, total"
                  :total="pagination.total" :current-page.sync="pagination.index" :page-size="pagination.size" @current-change="onPageChange" @size-change="onPageChange">
          </el-pagination>
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
          { name: '订单管理' },
          { name: '订单管理' },
          { name: '销售排名' }
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
      shopper.deviceshoplist({keyword: this.keyword, shopper_id: this.shopper_id, page_index: this.pagination.index, page_size: this.pagination.size}).then(function (res) {
        self.supplierList = res.data
        self.pagination.total = res.data_count
      })
    },
    methods: {
      onPageChange: function () {
        console.log('...........change..........', this.$route.params.id)
        const self = this
        shopper.ordersales().then(function (res) {
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
