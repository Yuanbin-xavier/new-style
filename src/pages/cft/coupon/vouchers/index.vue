 <style soped>
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
</style>
<template>
  <div class="content">
    <m-breadcrumb :items="breadcrumbData"></m-breadcrumb>
    <div class="main-content">
      <div class="main-content-hd ">
        <h3>管理抵用券</h3>
        <form>
          <label class="form-label"> 报错时间：</label>
            <span class="align-left">
              <el-date-picker
                  type="daterange"
                  placeholder="选择日期范围"
                  style="width: 240px;"
                  :value.sync="pickedDate">
              </el-date-picker>
            </span>
          <select style="width: 100px; font-size: 18px; margin-left: 20px;" v-model="shopper_id">
            <option value="0">店铺</option>
            <option value="volvo" v-for="option in supplierList" v-bind:value="option.shopper_id">{{option.fullname}}</option>
            <option value="volvo">店铺二</option>
          </select>
          <select style="width: 100px; font-size: 18px; margin-left: 20px;">
            <option value="volvo">状态</option>
            <option value="volvo">已审核</option>
            <option value="volvo">未审核</option>
            <option value="volvo">拒绝</option>
          </select>
          <div style="float: right">
            <button class="btn btn-white btn-small" >搜索</button>
          </div>
        </form>
      </div>
      <div class="main-content-bd">
        <table class="table">
          <thead>
            <tr>
              <th width="30">ID</th>
              <th>店铺</th>
              <th>审核状态</th>
              <th>类型</th>
              <th>类型值</th>
              <th>最低消费</th>
              <th>失效时间</th>
              <th>使用/生成数量</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in traceList">
              <td>{{item.coupon_rule_id}}</td>
              <td>{{item.company_name}}</td>
              <th>{{item.status_id}}</th>
              <td>{{item.coupon_name}}</td>
              <td>{{item.coupon_value}}</td>
              <td>{{item.min_payment}}</td>
              <td>{{item.expire_datetime}}</td>
              <td>{{item.qty}} </td>
              <td>
                <div class="check-buttons">
                  <button class="btn btn-green btn-small" @click="">审核</button>
                  <button class="btn btn-red btn-small" @click="onView(item.coupon_rule_id)">查看</button>
              </div>
              </td>
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
        shop_id: 0,
        status_id: 0,
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

        shopper.couponlist({page_index: this.pagination.index, page_size: this.pagination.size, shop_id: this.shop_id, status_id: this.status_id}).then(function (res) {
          self.traceList = res.data
          self.pagination.total = res.data_count
        }, function (res) {
          self.$notify({
            title: '拉取失败',
            message: res.tips,
            type: 'warning'
          })
        })
      },
      onView: function (id) {
        this.$router.go({
          name: 'vouchers-vouchers',
          params: {id: id}
        })
      }
    }
}
</script>
