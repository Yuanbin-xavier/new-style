  <style scoped>
  .table td, .table th {
    text-align: center;
  }
  .right1 {
   text-align: right;
   }
  </style>

  <template>
    <div class="content">
      <m-breadcrumb :items="breadcrumbData"></m-breadcrumb>
      <div class="main-content">
        <div class="main-content-hd">
          <h3>财务报表</h3>
           <form>
          <div class="right1">
          <label class="form-label" style="margin-left: 20px;">付款时间:</label>
            <span class="align-left" style="margin-left: 10px;">
              <el-date-picker
                  type="daterange"
                  placeholder="选择日期范围"
                  style="width: 240px; text-align: left;"
                  :value.sync="pickedDate">
              </el-date-picker>
            <button class="btn btn-small" style="margin-left: 20px;" type="button" @click="onPagePull"><i class="icon icon-search" ></i> </button>
          </div>
        </form>
        </div>
        <div class="main-content-bd">
          <div class="main-content-bd-block detail">
            <div class="traceList">
              <table class="table">
                <thead>
                  <tr>
                    <th width="4%">id</th>
                    <th width="10%">店铺</th>
                    <th width="10%">订单数量</th>
                    <th width="20%">总额</th>
                    <th width="8%">已结算</th>
                    <th width="10%">未结算</th>
                    <th width="20%">操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in inancialist">
                    <td>{{item.shop_id}}</td>
                    <td>{{item.shop_name}}</td>
                    <td>{{item.order_qty}}</td>
                    <td>{{item.total}}</td>
                    <td>{{item.is_bill}}</td>
                    <td>{{item.not_bill}}</td>
                    <td>
                      <div class="check-buttons">
                        <button type="button" class="btn btn-green btn-small" @click="onExportExcel(item.shop_id)" style="width: 60px;">导出excel</button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <el-pagination
                    layout="prev, pager, next, jumper, slot, ->, total"
                    :total="pagination.total" :current-page.sync="pagination.index" :page-size="pagination.size" @current-change="onPagePull" @size-change="onPagePull">
             </el-pagination><div class="pagination-container" v-if="traceList && traceList.length">
              </div>
            </div>
          </div>
        </div>
      </div>
      <iframe src="" id="downloadIframe" style="display:none" width="0" height="0"></iframe>
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
            { name: '其他设置' },
            { name: '财务报表' }
          ],
          inancialist: [],
          shop_id: 0,
          pickedDate: [],
          begin_date: '',
          end_date: '',
          pagination: {
            total: 1,
            size: 10,
            index: 1
          }
        }
      },
      created () {
        this.onPagePull()
      },
      methods: {
        onExportExcel (id) {
          const self = this
          shopper.orderexcel({shop_id: id}).then(function (res) {
            self.$notify({
              title: '导出成功',
              message: res.tips,
              type: 'success'
            })
            document.getElementById('downloadIframe').src = res.url
          }, function (res) {
            self.$notify({
              title: '导出失败',
              message: res.tips,
              type: 'warning'
            })
          })
        },
        onPagePull: function () {
          if (this.pickedDate.length > 0) {
            this.begin_date = moment(this.pickedDate[0]).format('YYYY-MM-DD 00:00:00')
            this.end_date = moment(this.pickedDate[1]).format('YYYY-MM-DD 23:59:59')
          } else {
            this.begin_date = this.begin_date = ''
          }
          const self = this
          shopper.orderinancia({begin_date: this.begin_date, end_date: this.end_date}).then(function (res) {
            self.inancialist = res.data
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
