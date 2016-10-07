  <style scoped>
    .right {
     text-align: right;
    }
    .table td, .table th {
      text-align: center;
    }
    .el-date-editor__editor {
      width: 260px;
    }
    .el-date-editor__clear, .el-date-editor__trigger {
      text-align: left;
    }
  </style>

  <template>
    <div class="content">
      <m-breadcrumb :items="breadcrumbData"></m-breadcrumb>
      <div class="main-content">
        <div class="main-content-hd">
          <h3>订单管理</h3>
          <form>
            <div class="right">
            <select style="width: 100px; font-size: 18px; margin-left: 10px;" v-model="shop_id">
              <option value="0">请选择店铺</option>
              <option value="volvo" v-for="option in orderles" v-bind:value="option.shop_id">{{option.shop_name}}</option>
            </select>
            <select style="width: 100px; font-size: 18px; margin-left: 20px;" v-model='status_id'>
              <option value="" selected="selected">支付状态</option>
              <option value="0">代下单</option>
              <option value="1">待支付</option>
              <option value="2">已支付</option>
              <option value="3">验车完成</option>
              <option value="4">制定方案并清洗完成</option>
              <option value="8">订单服务完成</option>
              <option value="9">订单已评价</option>
              <option value="10">确认结清尾款</option>
            </select>
           <label class="form-label" style="margin-left: 20px;">下单时间:</label>
              <span class="align-left">
                <el-date-picker
                    type="daterange"
                    placeholder="选择日期范围"
                    style="width: 240px; text-align: left;"
                    :value.sync="pickedDate"
                    >
                </el-date-picker>
              <input type="text" class="input" placeholder="请输入关键词" style="margin-left:20px;" v-model="keyword">
              <button class="btn btn-small" style="" type="button" @click="onPagePull"><i class="icon icon-search" ></i> </button>
            </div>
          </form>
        </div>
        <div class="main-content-bd">
          <div class="main-content-bd-block detail">
            <div class="traceList">
              <table  class="table">
                <thead>
                  <tr>
                  <th width="4%">#</th>
                  <th width="16%">订单编号</th>
                  <th width="7%">状态</th>
                  <th width="18%">下单/付款时间</th>
                  <th>定金</th>
                  <th width="15%">店铺</th>
                  <th width="12%">用户账号</th>
                  <th>类型</th>
                  <th>接待人员</th>
                  <th>施工人员</th>
                  <th width="8%">操作</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in orderList">
                <td width="30">{{item.trade_id}}</td>
                <td>{{item.trade_no}}</td>
                <td>
                {{item.status_id | showStatusIcon}}
  <!--               <el-button style="border: none;" v-popover:popover1 ><i class="{{item.status_id | showStatusIcon}}" ></i></el-button>
   -->              </td>
                <td>{{item.created}}</td>
                <td>{{item.subtotal}}</td>
                <td>{{item.shop_id}}</td>
                <td>{{item.customer_mobile}}</td>
                <td>{{item.trade_type_id}}</td>
                <td>{{item.comment_tag}}</td>
                <td>{{item.comment_desc}}</td>
               <td>
                  <div class="check-buttons">
                    <button type="button" class="btn btn-green btn-small" @click="onView(item.trade_id)">查看</button>
                  </div>
              </tr>
                </tbody>
              </table>
            <div class="pagination-container">
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
            { name: '管理订单' },
            { name: '订单管理' }
          ],
          orderList: [],
          supplierList: [],
          orderles: [],
          sn: '',
          status_id: '',
          shop_id: 0,
          keyword: '',
          pickedDate: null,
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
        shopper.shopinferior({keyword: this.keyword, shopper_id: this.shopper_id, page_index: this.pagination.index, page_size: this.pagination.size}).then(function (res) {
          self.supplierList = res.data
          self.pagination.total = res.data_count
        })
        shopper.deviceshoplist({page_index: this.pagination.index, page_size: this.pagination.size}).then(function (res) {
          self.orderles = res.data
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
        onPagePull: function () {
          if (this.pickedDate) {
            this.begin_date = moment(this.pickedDate[0]).format('YYYY-MM-DD')
            this.end_date = moment(this.pickedDate[1]).format('YYYY-MM-DD')
          } else {
            this.begin_date = this.end_date = ''
          }
          console.log('...........change..........', this.$route.params.id)
          const self = this

          shopper.orderlist({keyword: this.keyword, page_index: this.pagination.index, page_size: this.pagination.size, begin_date: this.begin_date, end_date: this.end_date, status_id: this.status_id, shop_id: this.shop_id}).then(function (res) {
            self.orderList = res.data
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
