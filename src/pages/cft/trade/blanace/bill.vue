<style scoped>
.table td, .table th{
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
       <button class="btn btn-white btn-small pull-right" @click="addBalance()">添加结算</button>
        <h3>定金结算{{page_index | json}}</h3>
        <form>
        <div class="right">
         <label class="form-label" style="margin-left: 20px;"> 结算时间:</label>
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
                  <th width="30">#</th>
                  <th>店铺</th>
                  <th>结算日期</th>
                  <th>结算金额</th>
                  <th>创建时间</th>
                  <th>照片</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in prepaidLhis">
                  <td>{{item.bill_id}}</td>
                  <td>{{item.shop_id}}</td>
                  <td>{{item.end_datetime}}</td>
                  <td>{{item.subtotal}}</td>
                  <td>{{item.begin_datetime}}</td>
                  <td>
<!--                   <a href="{{item.scan_file}}" target="_blank"><img src="{{item.scan_file}}" width="60" height="60"></a>
 -->                  </td>
                  <td>
                    <div class="check-buttons">
                      <button type="button" class="btn btn-gray btn-small" @click="onRemark(item.remark)" style="width: 60px;">查看备注</button>
                      <button type="button" class="btn btn-green btn-small" @click="onDelete(item.bill_id)">删除</button>
                    </div>
                  </td>
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
      <el-dialog title="备注" :visible.sync="dialogVisible" >
          <span>{{remark}}</span>
          <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
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
          { name: '订单管理' },
          { name: '其他设置' },
          { name: '定金结算' }
        ],
        prepaidLhis: [],
        pickedDate: [],
        end_datetime: '',
        begin_datetime: '',
        remark: '',
        dialogVisible: false,
        pagination: {
          total: 1,
          size: 5,
          index: 1
        }
      }
    },
    created () {
      this.onPagePull(1.1)
    },
    methods: {
      onRemark (remark) {
        this.dialogVisible = true
        this.remark = remark
      },
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
        shopper.orderdeposit({page_index: this.pagination.index, page_size: this.pagination.size, begin_datetime: this.begin_datetime, end_datetime: this.end_datetime}).then(function (res) {
          self.prepaidLhis = res.data
          self.pagination.total = res.data_count
        }, function (res) {
          self.$notify({
            title: '拉取失败',
            message: res.tips,
            type: 'warning'
          })
        })
      },
      addBalance: function () {
        this.$router.go({
          name: 'blanace-add'
        })
      },
      onDelete (id) {
        const self = this
        this.$confirm('删除后将不可恢复，确定要删除吗?', '提示', {
          type: 'warning'
        }).then(() => {
          shopper.orderdelbill({bill_id: id}).then(function (res) {
            self.$notify({
              title: '操作成功',
              message: res.tips,
              type: 'success'
            })
            self.pagination.index = 1
            self.onPagePull()
          }, function (res) {
            self.$notify({
              title: '操作失败',
              message: res.tips,
              type: 'warning'
            })
          })
        })
      }
    }
  }
</script>
