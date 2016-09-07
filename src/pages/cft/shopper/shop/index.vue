<style scoped>
  .right {
    text-align: right;
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
        <h3>店铺列表</h3>
        <form>
          <div class="right">
            <select class="select"  v-model="shopper_id">
              <option value="0">不限加盟商</option>
              <option v-for="option in serviceList" v-bind:value="option.shopper_id">
                {{ option.company_name }}
              </option>
            </select>
            <input type="text"placeholder="请输入关键词" v-model="keyword" class="input">
            <button class="btn btn-small" type="button" @click="onPagePull"><i class="icon icon-search" ></i> </button>
          </div>
        </form>
      </div>
      <div class="main-content-bd">
        <div class="main-content-bd-block detail">
          <div class="traceList">
            <table class="table" type="list">
              <thead>
                <tr>
                  <th width="30">#</th>
                  <th width="15%">加盟商</th>
                  <th width="15%">店铺名称</th>
                  <th>地址</th>
                  <th width="12%">服务名称</th>
                  <th width="22%">操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in shopList">
                  <td><input v-model="item.checked" type="checkbox"></td>
                  <td>{{item.shopper_id}}</td>
                  <td>{{item.shop_name}}</td>
                  <td>{{item.address}}</td>
                  <td>{{item.shop_desc}}</td>
                  <td>
                    <div class="check-buttons">
                      <button type="button" class="btn btn-gray btn-small" @click="onEdit(item.shop_id)">修改</button>
                      <button type="button" class="btn btn-green btn-small" @click="viewStaff(item.shop_id)">店员</button>
                      <button type="button" class="btn btn-gray btn-small" @click="showDialog(item)">二维码</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="pagination-container" v-if="shopList && shopList.length">
                <el-pagination
                  layout="prev, pager, next, jumper, slot, ->, total"
                  :total="pagination.total" :current-page.sync="pagination.index" :page-size="pagination.size" @current-change="onPagePull" @size-change="onPagePull">
                </el-pagination>
                  <button class="btn btn-white btn-small" @click="onReverse()">反选</button>
                  <button class="btn btn-white btn-small" @click="onDelete()">删除</button>
            </div>
          </div>
        </div>
      </div>
      <el-dialog  :visible.sync="dialogVisible" size="full">
          <center>
            <img :src="currentUser.qr_code" />
            <h2>请扫描二维码或另存二维码</h2>
          </center>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import { MBreadcrumb, MImageUploader } from '../../../../common/components/'
  import { shopper } from '../../../../api'
  export default {
    components: {
      MBreadcrumb,
      MImageUploader
    },
    data () {
      return {
        breadcrumbData: [
          { name: '用户管理' },
          { name: '管理用户' },
          { name: '加盟商店铺列表' }
        ],
        shopList: [],
        suplierId: 0,
        serviceId: 0,
        shop_id: 0,
        shopper_id: 0,
        supplierList: [],
        serviceList: [],
        keyword: '',
        pagination: {
          total: 1,
          size: 10,
          index: 1
        },
        dialogVisible: false
      }
    },
    created () {
      this.onPagePull()
      this.loadServiceDropdownList()
      this.loadSupplierDropdownList()
    },
    methods: {
      onDelete () {
        const self = this
        let checkedList = []
        this.shopList.forEach(function (val, index) {
          if (val.checked) {
            checkedList.push(val.shop_id)
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
          shopper.shoppperdel({shop_id_arr: checkedList}).then(function (res) {
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
      },
      onReverse: function () {
        this.shopList.forEach(function (val, index) {
          val.checked = !val.checked
        })
      },
      showDialog (item) {
        console.log(item)
        this.currentUser = item
        this.dialogVisible = true
      },
      onAdd: function (id) {
        this.$router.go({
          name: 'shopper-shop-add',
          params: {id: id}
        })
      },
      onEdit: function (id) {
        this.$router.go({
          name: 'shopper-shop-edit',
          params: {id: id}
        })
      },
      viewStaff: function (id) {
        this.$router.go({
          name: 'shopper-shop-staff',
          params: {id: id}
        })
      },
      loadServiceDropdownList: function () {
        const self = this
        shopper.serviceDropdownList({supperId: this.serviceId}).then(function (res) {
          self.serviceList = res.data
        })
      },
      loadSupplierDropdownList: function () {
        const self = this
        shopper.supplierDropdownList().then(function (res) {
          self.supplierList = res.data
        })
      },
      onPagePull: function () {
        console.log('...........change..........', this.$route.params.id)
        const self = this
        shopper.shopList({shopper_id: this.shopper_id, keyword: this.keyword, page_index: this.pagination.index, page_size: this.pagination.size}).then(function (res) {
          self.shopList = res.data
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
