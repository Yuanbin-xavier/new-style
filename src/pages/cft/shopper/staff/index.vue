<style scoped>
  .right {
    text-align: right;
  }
  .traceList table {
    line-height: 30px;
    font-size: 13px;
    text-align: center;
  }
  .btn-red {
    background: #2bb56f;
    border-color:#2bb56f;
  }
  .btn-red:hover {
    background: #0f7e46;
    border-color: #2bb56f;
  }
  .span {
    text-align: center;
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
        <h3>店员列表</h3>
        <form>
          <div class="right">
            <select style="width: 100px; font-size: 18px; margin-left: 10px;"  v-model="info.shop_id">
              <option value="0">不限</option>
              <option value="volvo" v-for="option in info.servicerList" v-bind:value="option.shopper_id">{{ option.company_name }}</option>
            </select>
            <input type="text" class="input" placeholder="请输入关键词" style="margin-left: 10px" v-model="info.keyword">
            <button class="btn btn-small" type="button" @click="onPagePull"><i class="icon icon-search" ></i> </button>
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
                  <th>状态</th>
                  <th width="16%">店铺</th>
                  <th>职位</th>
                  <th>手机</th>
                  <th width="20%">最后一次登录时间</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                  <tr v-for="item in info.shopemployeesList">
                  <td>{{item.shopper_id}}</td>
                  <td>{{item.fullname}}</td>
                  <td>{{item.is_checked}}</td>
                  <td>{{item.company_name}}</td>
                  <td>{{item.job}}</td>
                  <td>{{item.mobile}}</td>
                  <td>{{item.created}}</td>
                  <td>
                    <div class="check-buttons">
                      <button type="button" class="btn btn-red btn-small" style="width: 60px;" @click="showDialog(item.introduce)">自我介绍</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="pagination-container" >
                <el-pagination
                  layout="prev, pager, next, jumper, slot, ->, total"
                  :total="info.total" :current-page.sync="info.page_index" :page-size="info.page_size" @current-change="onPagePull" @size-change="onPagePull">
                </el-pagination>
            </div>
          </div>
              <el-dialog title="自我介绍" :visible.sync="info.dialogVisible" >
                <span>{{info.introduce}}</span>
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
        updateing: false,
        info: {
          shopemployeesList: [],
          introduce: '',
          servicerList: [],
          supplier_id: 0,
          shop_id: 0,
          page_index: 1,
          page_size: 10,
          keyword: '',
          total: 1,
          shopper_id: 0,
          dialogVisible: false,
          currentUser: {}
        }
      }
    },
    created () {
      this.onPagePull()
      const self = this
      shopper.supplierDropdownList().then(function (res) {
        self.info.supplierList = res.data
      })
      shopper.seviceDropdownList({supplier_id: this.info.supplier_id}).then(function (res) {
        self.info.servicerList = res.data
      })
    },
    methods: {
      showDialog (introduce) {
        this.info.dialogVisible = true
        this.info.introduce = introduce
      },
      onSearch: function () {
        this.updateing = true
        this.onPagePull()
      },
      onPagePull: function () {
        const self = this
        shopper.shopinferior({keyword: this.info.keyword, shop_id: this.info.shop_id, page_index: this.info.page_index, page_size: this.info.page_size}).then(function (res) {
          self.updateing = false
          self.info.shopemployeesList = res.data
          self.info.total = res.data_count
          console.log('......xxx...........')
        }, function (res) {
          self.updateing = false
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
