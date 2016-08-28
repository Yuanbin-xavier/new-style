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
        <h3>加盟商店铺列表</h3>
        <form>
          <div class="right">
            <select class="select"  v-model="suplierId">
              <option value="0">不限供应商</option>
              <option v-for="option in supplierList" v-bind:value="option.shopper_id">
                {{ option.company_name }}
              </option>
            </select>
            <select class="select"  v-model="serviceId">
              <option value="0">不限加盟商</option>
              <option v-for="option in serviceList" v-bind:value="option.shopper_id">
                {{ option.company_name }}
              </option>
            </select>
            <input type="text" class="input">
            <button class="btn btn-small" type="button">搜索</button>
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
                  <th>加盟商</th>
                  <th>店铺名称</th>
                  <th>地址</th>
                  <th>服务名称</th>
                  <th>定金</th>
                  <th>总价</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in traceList">
                  <td><input type="checkbox"></td>
                  <td></td>
                  <td>{{item.shop_name}}</td>
                  <td>{{item.fullname}}</td>
                  <td>{{item.shop_name}}</td>
                  <td>{{item.deposit}}</td>
                  <td>{{item.price}}</td>
                  <td>
                    <div class="check-buttons">
                      <button type="button" class="btn btn-red btn-small" @click="onEdit(item.shop_id)">修改</button>
                      <button type="button" class="btn btn-green btn-small" @click="onAdd(item.shop_id)">店员</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="pagination-container" v-if="traceList && traceList.length">
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
        traceList: [],
        suplierId: 0,
        serviceId: 0,
        supplierList: [],
        serviceList: [],
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
      this.loadServiceDropdownList()
      this.loadSupplierDropdownList()
    },
    methods: {
      onAdd: function (id) {
        this.$router.go({
          name: 'shopper-shop-staff',
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
          name: 'shopper-staff-index',
          params: {id: id}
        })
      },
      onReverse: function () {
        this.traceList.forEach(function (val, index) {
          val.checked = !val.checked
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
      onPageChange: function () {
        console.log('...........change..........', this.$route.params.id)
        const self = this
        shopper.shopList({shopperServiceId: this.$route.params.id, keyword: this.keyword, pageIndex: this.pagination.index, pageSize: this.pagination.size}).then(function (res) {
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
