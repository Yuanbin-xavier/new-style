<style scoped>
  .right {
    text-align: right;
  }
  .table{
    line-height: 30px;
  }
  .table td, .table th{
    text-align: center;
  }
</style>

<template>
  <div class="content">
    <m-breadcrumb :items="breadcrumbData"></m-breadcrumb>
    <div class="main-content">
      <div class="main-content-hd">
      <button class="btn btn-white btn-small pull-right" @click="onAdd()">添加</button>
        <h3>管理员列表</h3>
        <form>
          <div class="right">
            <input type="text" placeholder="请输入关键词" class="input" v-model="keyword">
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
                  <th width="4%">#</th>
                  <th width="8%">用户名</th>
                  <th width="8%">姓名</th>
                  <th width="15%">电子邮件</th>
                  <th width="13%">手机号</th>
                  <th width="18%">最后一次登录时间</th>
                  <th width="15%">操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in administratorList">
                  <td><input v-model="item.checked" type="checkbox"></td>
                  <td>{{item.admin_name}}</td>
                  <td>{{item.fullname}}</td>
                  <td>{{item.email}}</td>
                  <td>{{item.mobile}}</td>
                  <td>{{item.created}}</td>
                  <td>
                    <div class="check-buttons">
                      <button type="button" class="btn btn-gray btn-small" @click="onDdit(item.admin_id)">修改</button>
                      <button type="button" class="btn btn-green btn-small" @click="onRevise(item.admin_id)" style="width: 60px;">修改密码</button>
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
                  <button class="btn btn-white btn-small" @click="onReverse()">反选</button>
                  <button class="btn btn-white btn-small" @click="onLogin()">禁止登录</button>
                  <button class="btn btn-white btn-small" @click="onDelete()">删除</button>
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
  export default {
    components: {
      MBreadcrumb
    },
    data () {
      return {
        breadcrumbData: [
          { name: '用户管理' },
          { name: '管理用户' },
          { name: '管理员列表' }
        ],
        administratorList: [],
        keyword: '',
        admin_id: '',
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
      onDdit: function (id) {
        this.$router.go({
          name: 'admin-edit',
          params: {id: id}
        })
      },
      onRevise: function (id) {
        this.$router.go({
          name: 'admin-editpassword',
          params: {id: id}
        })
      },
      onAdd: function () {
        this.$router.go({
          name: 'admin-add'
        })
      },
      onDelete () {
        const self = this
        let checkedList = []
        this.administratorList.forEach(function (val, index) {
          if (val.checked) {
            checkedList.push(val.admin_id)
          }
        })
        if (checkedList.length === 0) {
          this.$alert('操作失败, 请先选取您要删除的项', '提示', {
            type: 'info'
          })
          return false
        }
        this.$confirm('删除后将不可恢复，确定要删除吗?', '提示', {
          type: 'warning'
        }).then(() => {
          shopper.admindel({admin_id_arr: checkedList}).then(function (res) {
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
        }).catch(() => {
          self.$notify({
            title: '提示',
            message: '已取消删除',
            type: 'info'
          })
        })
      },
      onLogin () {
        const self = this
        let checkedList = []
        this.traceList.forEach(function (val, index) {
          if (val.checked) {
            checkedList.push(val.admin_id)
          }
        })
        if (checkedList.length === 0) {
          this.$alert('操作失败, 请先选取您要锁定的项', '提示', {
            type: 'info'
          })
          return false
        }
        this.$confirm('删除后将不可恢复，确定要锁定吗?', '提示', {
          type: 'warning'
        }).then(() => {
          shopper.adminsetislock({shop_id_arr: checkedList}).then(function (res) {
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
        }).catch(() => {
          self.$notify({
            title: '提示',
            message: '已取消锁定',
            type: 'info'
          })
        })
      },
      onReverse: function () {
        this.traceList.forEach(function (val, index) {
          val.checked = !val.checked
        })
      },
      onPagePull: function () {
        console.log('...........change..........', this.$route.params.id)
        const self = this
        shopper.adminlist({keyword: this.keyword, page_index: this.pagination.index, page_size: this.pagination.size}).then(function (res) {
          self.administratorList = res.data
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
