<style scoped>
  .right {
    text-align: right;
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
            <select style="width: 100px; font-size: 18px; margin-left: 10px;">
              <option value="volvo">不限</option>
              <option value="volvo">供应商1</option>
              <option value="volvo">供应商2</option>
            </select>
            <select style="width: 100px; font-size: 18px; margin-left: 10px;">
              <option value="volvo">不限</option>
              <option value="volvo">加盟商1</option>
              <option value="volvo">加盟商2</option>
            </select>
            <input type="text" class="input" placeholder="请输入关键词" v-model="keyword">
            <button class="btn btn-small" type="button">搜索</button>
          </div>
        </form>
      </div>
      <div class="main-content-bd">
        <div class="main-content-bd-block ">
          <div class="traceList">
            <table  class="table">
              <thead>
                <tr>
                  <th width="30">#</th>
                  <th>登录手机号</th>
                  <th>商家名称</th>
                  <th>地址</th>
                  <th>负责人姓名</th>
                  <th>负责人电话</th>
                  <th>最后一次登录时间</th>
                  <th>操作</th>
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
                      <button type="button" class="btn btn-small">店员</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="pagination-container" v-if="this.traceList.length > 0">
              <m-pagination
                  :total-count="traceListPagination.totalCount"
                  :offset="traceListPagination.offset"
                  :limit="traceListPagination.limit"
                  :callback="changePage"></m-pagination>
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
          { name: '我的NLE' },
          { name: '用户管理' },
          { name: '4S店列表' }
        ],
        traceList: [],
        keyword: '',
        traceListPagination: {
          totalCount: 105,
          offset: 0,
          limit: 10
        }
      }
    },
    created () {
      this.changePage(1, 10)
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
        shopper.dataShoperDelete({shopper_id_arr: checkedList}).then(function (res) {
          self.$notify({
            title: '操作成功',
            message: res.tips,
            type: 'success'
          })
          self.changePage(1, 10)
        }, function (res) {
          self.$notify({
            title: '操作失败',
            message: res.tips,
            type: 'warning'
          })
        })
      },
      onReverse: function () {
        this.traceList.forEach(function (val, index) {
          val.checked = !val.checked
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
      changePage: function (offset, limit) {
        const self = this
        shopper.dataSupplierList({keyword: this.keyword, pageIndex: offset, pageSize: limit}).then(function (res) {
          self.traceList = res.data
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
