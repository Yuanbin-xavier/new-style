<style scoped>
  .right {
    text-align: right;
  }
  .traceList table{
    line-height: 30px;
    text-align: center;
  }
</style>

<template>
  <div class="content">
    <m-breadcrumb :items="breadcrumbData"></m-breadcrumb>
    <div class="main-content">
      <div class="main-content-hd">
        <h3>店员列表</h3>
        <form>
          <div class="right">
            <select style="width: 100px; font-size: 18px; margin-left: 10px;" v-model="info.supplier_id">
              <option value="0" >不限</option>
              <option  v-for="option in info.supplierList" v-bind:value="option.shopper_id">{{ option.company_name }}</option>
            </select>
            <select style="width: 100px; font-size: 18px; margin-left: 10px;"  v-model="info.servicer_id">
              <option value="0">不限</option>
              <option value="volvo" v-for="option in info.servicerList" v-bind:value="option.shopper_id">{{ option.company_name }}</option>
            </select>
            <select style="width: 100px; font-size: 18px; margin-left: 10px;" v-model="info.shopper_id">
              <option value="0">不限</option>
              <option value="volvo" v-for="option in info.traceList" v-bind:value="option.shopper_id">{{ option.fullname}}</option>
            </select>
            <input type="text" class="input" v-model="info.keyword">
            <button class="btn btn-small" type="button">搜索</button>
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
                  <th>姓名</th>
                  <th>店铺</th>
                  <th>职位</th>
                  <th>手机</th>
                  <th>最后一次登录时间</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                  <tr v-for="item in info.traceList">
                  <td>{{item.shopper_id}}</td>
                  <td>{{item.fullname}}</td>
                  <td>{{item.company_name}}</td>
                  <td>{{item.introduce}}</td>
                  <td>{{item.mobile}}</td>
                  <td>{{item.created}}</td>
                  <td>
                    <div class="check-buttons">
                      <button type="button" class="btn btn-red btn-small" style="width: 60px;" @click="showDialog(item)">自我介绍</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="pagination-container" >
                <el-pagination
                  layout="prev, pager, next, jumper, slot, ->, total"
                  :total="info.total" :current-page.sync="info.page_index" :page-size="info.page_size" @current-change="onPageChange" @size-change="onPageChange">
                </el-pagination>
            </div>
          </div>
          <el-dialog title="自我介绍" :visible.sync="info.dialogVisible" v-model="info.shopper_id">
            <span>{{{info.currentUser.fullname}}</span><span>{{info.currentUser.company_name}}</span><span>{{info.currentUser.introduce}}</span>
              <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="info.dialogVisible = false">确 定</el-button>
              </span>
            </el-dialog>
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
          { name: '店员列表' }
        ],
        info: {
          traceList: [],
          supplierList: [],
          servicerList: [],
          shopList: [],
          supplier_id: 0,
          servicer_id: 0,
          shop_id: 0,
          page_index: 1,
          page_size: 10,
          keyword: '',
          total: 1,
          dialogContent: '',
          shopper_id: 0,
          dialogVisible: false,
          currentUser: {}
        }
      }
    },
    created () {
      this.onPageChange(1, 1)
      const self = this
      shopper.supplierDropdownList().then(function (res) {
        self.info.supplierList = res.data
      })
      shopper.seviceDropdownList({supplier_id: this.info.supplier_id}).then(function (res) {
        self.info.servicerList = res.data
      })
    },
    methods: {
      showDialog (item) {
        console.log(item)
        this.info.currentUser = item
        this.info.dialogVisible = true
      },
      onPageChange: function () {
        const self = this
        shopper.shopinferior({keyword: this.info.keyword, shop_id: this.info.shop_id, page_index: this.info.page_index, page_size: this.info.page_size}).then(function (res) {
          self.info.traceList = res.data
          self.info.total = res.data_count
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
