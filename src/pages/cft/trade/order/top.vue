<style scoped>
  .traceList table {
    line-height: 30px;
    font-size: 13px;
    text-align: center;
  }
  .span {
    text-align: center;
  }
  .table td, .table th {
    text-align: center;
  }
 .right {
  text-align: right;
 }
</style>

<template>
  <div class="content">
    <m-breadcrumb :items="breadcrumbData"></m-breadcrumb>
    <div class="main-content">
      <div class="main-content-hd">
        <h3>销售排行</h3>
        <form>
          <div class="right">
             <select style="width: 100px; font-size: 18px; margin-left: 20px;" v-model="shop_id">
            <option value="0">不限店铺</option>
            <option value="volvo" v-for="option in supplierList" v-bind:value="option.shop_id">{{option.shop_name}}</option>
          </select>
          <select style="width: 100px; font-size: 18px; margin-left: 20px;" v-model="shopper_id">
            <option value="0">不限员工</option>
            <option value="volvo">业务员</option>
            <option value="volvo">施工人员</option>
          </select>
         <label class="form-label" style="margin-left: 20px;">付款时间:</label>
           <el-date-picker
              type="daterange"
              placeholder="选择日期范围"
              style="width: 240px; text-align: left;"
              :value.sync="pickedDate">
          </el-date-picker>
            </span>
            <button class="btn btn-small" type="button" style="margin-left: 20px;" @click="onPagePull"><i class="icon icon-search" ></i> </button>
          </div>
        </form>
      </div>
      <div class="main-content-bd">
        <div class="main-content-bd-block detail">
          <div class="traceList">
            <table class="table">
            <thead>
              <tr>
                <th>店铺</th>
                <th>员工</th>
                <th>订单</th>
              </tr>
            </thead>
          <tbody>
            <tr v-for="item in rankingList">
              <td>{{item.shop_id}}</td>
              <td>{{item.saler_shopper_id}}</td>
              <td>{{item.order_qty}}</td>
            </tr>
          </tbody>
        </table>
          <div class="pagination-container" style="padding-bottom: 30px;">
          <el-pagination
                  layout="prev, pager, next, jumper, slot, ->, total"
                  :total="pagination.total" :current-page.sync="pagination.index" :page-size="pagination.size" @current-change="onPagePull" @size-change="onPagePull">
          </el-pagination>
          </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { MBreadcrumb } from '../../../../common/components/'
  import { shopper } from '../../../../api'
  import moment from 'moment'
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
        rankingList: [],
        supplierList: [],
        employeeslist: [],
        shop_id: 0,
        shopper_id: 0,
        begin_datetime: '',
        end_datetime: '',
        pickedDate: [],
        keyword: '',
        pagination: {
          total: 1,
          size: 10,
          index: 1
        }
      }
    },
    created () {
      this.onPagePull()
      const self = this
      shopper.deviceshoplist({keyword: this.keyword, shopper_id: this.shopper_id, page_index: this.pagination.index, page_size: this.pagination.size}).then(function (res) {
        self.supplierList = res.data
        self.pagination.total = res.data_count
      })
    },
    methods: {
      onPagePull: function () {
        if (this.pickedDate.length > 0) {
          this.begin_datetime = moment(this.pickedDate[0]).format('YYYY-MM-DD 00:00:00')
          this.end_datetime = moment(this.pickedDate[1]).format('YYYY-MM-DD 23:59:59')
          console.log(this.pickedDate)
        } else {
          this.begin_datetime = this.end_datetime = ''
        }
        console.log('...........change..........', this.$route.params.id)
        const self = this
        shopper.ordersales({page_index: this.pagination.index, page_size: this.pagination.size, begin_datetime: this.begin_datetime, end_datetime: this.end_datetime, shop_id: this.shop_id, shopper_id: this.shopper_id}).then(function (res) {
          self.rankingList = res.data
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
