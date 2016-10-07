<style scoped>
  .right {
    text-align: right;
  }
  .traceList table {
    line-height: 30px;
    font-size: 13px;
    text-align: center;
  }
  .btn-red{
    background: #2bb56f;
    border-color: #2bb56f;
  }
  .btn-red:hover {
    background: #0f7e46;
    border-color: #2bb56f;
  }
  .span {
    text-align: center;
  }
  .table td, .table th {
    text-align:
  }
  .table td, .table th {
    text-align: center;
  }
</style>

<template>
  <div class="content">
    <m-breadcrumb :items="breadcrumbData"></m-breadcrumb>
    <div class="main-content">
      <div class="main-content-hd">
        <h3>管理抵用券</h3>
        <form>
          <div class="right">
          <select style="width: 100px; font-size: 18px; margin-left: 20px;" v-model="shop_id">
            <option value="0">店铺</option>
            <option v-for="option in orderles" v-bind:value="option.shop_id">{{option.shop_name}}</option>
          </select>
          <select style="width: 100px; font-size: 18px; margin-left: 20px;" v-model="status_id">
            <option value="0">状态</option>
            <option value="3">审核通过</option>
            <option value="1">审核拒绝</option>
            <option value="2">待审核</option>
          </select>
             <label class="form-label" style="margin-left: 20px;"> 失效时间：</label>
            <span class="align-left">
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
              <th width="4%">ID</th>
              <th width="15%">店铺</th>
              <th>审核状态</th>
              <th>类型</th>
              <th>类型值</th>
              <th>最低消费</th>
              <th width="18%">失效时间</th>
              <th width="5%">数量</th>
              <th width="13%">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in couponList">
              <td>{{item.coupon_rule_id}}</td>
              <td>{{item.shop_id}}</td>
              <td>{{item.status_id}}</td>
              <td>{{item.coupon_type_id}}</td>
              <td>{{item.coupon_value}}</td>
              <td>{{item.min_payment}}</td>
              <td>{{item.expire_datetime}}</td>
              <td>{{item.qty}} </td>
              <td>
                <div class="check-buttons">
                  <button v-if="item.status_id != '审核通过' && item.status_id != '审核拒绝'"  class="btn btn-gray btn-small" @click="onVerify(item.coupon_rule_id)">审核</button>
                  <button v-if="item.status_id != '审核通过' && item.status_id != '审核拒绝'"  class="btn btn-gray btn-small" @click="showDialog(item.coupon_rule_id)">拒绝</button>
                  <button class="btn btn-green btn-small" @click="onView(item.coupon_rule_id)">查看</button>
              </div>
              </td>
            </tr>
          </tbody>
          </table>
          <div class="pagination-container" style="padding-bottom: 30px;">
             <el-pagination
                    layout="prev, pager, next, jumper, slot, ->, total"
                    :total="pagination.total" :current-page.sync="pagination.index" :page-size="pagination.size" @current-change="onPagePull" @size-change="onPagePull" >
             </el-pagination>
            </div>
          </div>
        </div>
      </div>
      <el-dialog title="拒绝审核" :visible.sync="dialogVisible">
          <el-input placeholder="拒绝内容" :value.sync="refused_desc" name="desc" type="textarea">

          </el-input>
            <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="onRefuse(currentId), dialogVisible=false">确 定</el-button>
            </span>
      </el-dialog>
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
          { name: '抵用卷管理' },
          { name: '抵用卷管理' },
          { name: '管理抵用券' }
        ],
        couponList: [],
        orderles: [],
        pickedDate: [],
        shop_id: 0,
        status_id: 0,
        coupon_rule_id: 0,
        coupon_type_id: 0,
        shopper_id: 0,
        keyword: '',
        end_datetime: '',
        begin_datetime: '',
        pagination: {
          total: 1,
          size: 10,
          index: 1
        },
        info: {

        },
        dialogVisible: false,
        currentUser: {}
      }
    },
    created () {
      this.onPagePull()
      const self = this
      shopper.deviceshoplist({page_index: this.pagination.index, page_size: this.pagination.size}).then(function (res) {
        self.orderles = res.data
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
        shopper.couponlist({page_index: this.pagination.index, page_size: this.pagination.size, begin_datetime: this.begin_datetime, end_datetime: this.end_datetime, shop_id: this.shop_id, status_id: this.status_id}).then(function (res) {
          self.couponList = res.data
          self.pagination.total = res.data_count
        }, function (res) {
          self.$notify({
            title: '拉取失败',
            message: res.tips,
            type: 'warning'
          })
        })
      },
      onVerify (id) {
        const self = this
        this.$confirm('审核之后不可恢复，确定要审核吗?', '提示', {
          type: 'warning'
        }).then(() => {
          shopper.couponsetpass({coupon_rule_id: id}).then(function (res) {
            self.$notify({
              title: '审核成功',
              message: res.tips,
              type: 'success'
            })
            self.pagination.index = 1
            self.onPagePull()
          }, function (res) {
            self.$notify({
              title: '审核失败',
              message: res.tips,
              type: 'warning'
            })
          })
        })
      },
      showDialog (id) {
        console.log(id)
        this.currentId = id
        this.dialogVisible = true
      },
      onRefuse (currentId) {
        const self = this
        shopper.couponsetnotpass({coupon_rule_id: this.currentId, refused_desc: this.refused_desc}).then(function (res) {
          self.$notify({
            title: '拒绝成功',
            message: res.tips,
            type: 'success'
          })
          self.pagination.index = 1
          self.onPagePull()
        }, function (res) {
          self.$notify({
            title: '取消拒绝',
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
