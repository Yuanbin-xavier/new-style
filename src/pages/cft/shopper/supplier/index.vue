<style scoped>
  .right {
    text-align: right;
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
        <button class="btn btn-white btn-small pull-right" @click="onAdd()">添加</button>
        <h3>供应商列表</h3>
        <form>
          <div class="right">
            <input type="text" class="input" placeholder="请输入关键词" v-model="keyword">
            <button class="btn btn-small" type="button" @click="onPageChange"><i class="icon icon-search" ></i> </button>
          </div>
        </form>
      </div>

      <div class="main-content-bd">
        <div class="main-content-bd-block detail">
          <div class="traceList">
            <table  class="table">
              <thead>
                <tr>
                  <th width="20">#</th>
                  <th width="10%">登录账号</th>
                  <th width="15%">商家名称</th>
                  <th width="15%">地址</th>
                  <th width="10%">负责人姓名</th>
                  <th width="12%">负责人电话</th>
                  <th width="16%">最后一次登录时间</th>
                  <th width="15%">操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in traceList">
                  <td><input type="checkbox" v-model="item.checked" value="true"></td>
                  <td>{{item.mobile}}</td>
                  <td>{{item.company_name}}</td>
                  <td>{{item.address}}</td>
                  <td>{{item.fullname}}</td>
                  <td>{{item.tel}}</td>
                  <td>{{item.last_login_time}}</td>
                  <td>
                    <div class="check-buttons">
                      <button type="button" class="btn btn-gray btn-small" @click="onEdit(item.shopper_id)" >修改</button>
                      <button type="button"  class="btn btn-green btn-small" @click="goService(item.shopper_id)" >加盟商</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="pagination-container" v-if="this.traceList.length > 0">
                <el-pagination
                  layout="prev, pager, next, jumper, slot, ->, total"
                  :total="pagination.total" :current-page.sync="pagination.index" :page-size="pagination.size" @current-change="onPageChange" @size-change="onPageChange">
                </el-pagination>
                  <button class="btn btn-white btn-small" @click="onReverse()">反选</button>
                  <button class="btn btn-white btn-small" @click="onDelete()">删除</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { MPagination, MBreadcrumb } from '../../../../common/components/'
  import { shopper } from '../../../../api'
  export default {
    components: {
      MPagination,
      MBreadcrumb
    },
    data () {
      return {
        breadcrumbData: [
          { name: '用户管理' },
          { name: '管理用户' },
          { name: '供应商列表' }
        ],
        traceList: [],
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
    },
    methods: {
      onDelete () {
        const self = this
        let checkedList = []
        this.traceList.forEach(function (val, index) {
          if (val.checked) {
            checkedList.push(val.shopper_id)
          }
        })
        if (checkedList.length === 0) {
          this.$alert('操作失败, 请先选取您要删除的项', '提示', {
            type: 'error'
          })
          return false
        }

        this.$confirm('删除后将不可恢复，确定要删除吗?', '提示', {
          type: 'warning'
        }).then(() => {
          shopper.supplierDelete({shopper_id_arr: checkedList}).then(function (res) {
            self.$notify({
              title: '操作成功',
              message: res.tips,
              type: 'success'
            })
            self.pagination.index = 1
            self.onPageChange()
          }, function (res) {
            self.$notify({
              title: '操作失败',
              message: res.tips,
              type: 'warning'
            })
          })
        }).catch(() => {
          self.$notify({
            title: '提示',
            message: '已取消删除',
            type: 'info'
          })
        })
      },
      onReverse: function () {
        this.traceList.forEach(function (val, index) {
          val.checked = !val.checked
        })
      },
      goService: function (id) {
        this.$router.go({
          name: 'shopper-service-index',
          params: {id: id}
        })
      },
      onEdit: function (id) {
        this.$router.go({
          name: 'shopper-supplier-edit',
          params: {id: id}
        })
      },
      onAdd: function () {
        this.$router.go({
          name: 'shopper-supplier-add'
        })
      },
      onPageChange: function () {
        console.log('...........change..........')
        const self = this
        shopper.supplierList({keyword: this.keyword, pageIndex: this.pagination.index, pageSize: this.pagination.size}).then(function (res) {
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
