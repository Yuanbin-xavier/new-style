<style scoped>
  .main-content-bd td button {
    padding: 5px;
    height: 40px;
  }
  .main-content-hd input {
    width: 150px;
  }
  .table{ 
    font-size: 14px;
    line-height: 16px;  
   }
   .btn-red{
    background: #50a2ff;
    border-color: #50a2ff;
   }
   .btn-red:hover{
    background: #ccc;
    border-color: #ccc;
   }
</style>

<template>
  <div class="content">
    <m-breadcrumb :items="breadcrumbData"></m-breadcrumb>
    <div class="main-content">
      <div class="main-content-hd">
        <h3>订单列表</h3>
        <form>
          <label class="form-label">下单时间：</label>
          <select style="width: 100px; font-size: 18px; margin-left: 10px;">
            <option value="volvo">请选择状态</option>
            <option value="volvo">未付款</option>
            <option value="volvo">已付款</option>
          </select>
          <select style="width: 100px; font-size: 18px; margin-left: 10px;" v-model="shopper_id">
            <option value="0">请选择店铺</option>
            <option value="volvo" v-for="option in supplierList" v-bind:value="option.shopper_id">{{option.fullname}}</option>
            <option value="volvo">店铺2</option>
          </select>
          <input type="text" class="input" style="margin-left: 10px;">
          <button class="btn btn-white btn-small" >搜索</button>
        </form>
      </div>
        <div class="main-content-bd detail">
          <table class="table">
            <thead>
              <tr>
                <th width="30">#</th>
                <th width="200">订单编号</th>
                <th>状态</th>
                <th>下单/付款时间</th>
                <th>定金</th>
                <th>店铺</th>
                <th>用户账号</th>
                <th>类型</th>
                <th>接待人员</th>
                <th>施工人员</th>
                <th>操作</th>
              </tr>
            </thead>
          <tbody>
            <tr v-for="item in traceList">
              <td width="30">{{item.trade_id}}</td>
              <td>{{item.trade_no}}</td>
              <td>{{item.pay_datetime}}</td>
              <td>{{item.created}}</td>
              <td>{{item.subtotal}}</td>
              <td>{{item.customer_name}}</td>
              <td>{{item.customer_mobile}}</td>
              <td>{{item.pay_datetime}}</td>
              <td>{{item.comment_tag}}</td>
              <td>{{item.comment_desc}}</td>
             <!--  <td width="30">1</td>
              <td>123123123123</td>
              <td>未付款</td>
              <td>01-17  14:29:12</td>
              <td>27:30</td>
              <td>xxxxx</td>
              <td>12312312312</td>
              <td>自动接单</td>
              <td>小张</td>
              <td>小关</td> -->
              <td>
                <div class="check-buttons">
                  <button type="button" class="btn btn-red btn-small" @click="onView(item.trade_id)">查看</button>
                </div>
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
      onBack: function () {
        this.$router.go({
          name: 'order-orderdetails'
        })
      },
      onView: function (id) {
        this.$router.go({
          name: 'order-orderdetails',
          params: {id: id}
        })
      },
      onPageChange: function () {
        console.log('...........change..........', this.$route.params.id)
        const self = this

        shopper.orderlist({keyword: this.keyword, page_index: this.pagination.index, page_size: this.pagination.size, begin_date: this.begin_date, end_date: this.end_date, status_id: this.status_id, shop_id: this.shop_id}).then(function (res) {
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
index.vue
