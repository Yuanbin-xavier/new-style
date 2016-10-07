<style scoped>
  .right {
    text-align: right;
    float: 
  }
  .table td, .table th{
    text-align: center;
  }
  .btn {
    width: 60px;
  }
</style>

<template>
  <div class="content">
    <m-breadcrumb :items="breadcrumbData"></m-breadcrumb>
    <div class="main-content">
      <div class="main-content-hd">
        <button class="btn btn-white btn-small pull-right" @click="onProvide()">添加设备</button>
        <h3>设备列表</h3>
        <form>
          <div class="right">
          <select style="width: 100px; font-size: 18px;" v-model="shop_id">
            <option value="0">店铺</option>
            <option value="volvo" v-for="option in orderles" v-bind:value="option.shop_id">{{option.shop_name}}</option>
          </select>
          <select style="width: 100px; font-size: 18px; margin-left: 20px;" v-model="is_activated">
            <option selected="selected">激活状态</option>
            <option value="1">已激活</option>
            <option value="0">未激活</option>
          </select>
            <input type="text" class="input" placeholder="设备SN" style="margin-left:20px;" v-model="sn">
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
                <th width="30">ID</th>
                <th>店铺</th>
                <th>设备SN</th>
                <th>激活状态</th>
                <th>激活时间</th>
                <th>创建时间</th>
                <th width="150">操作</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="item in devicelist">
              <td>{{item.device_id}}</td>
              <td>{{item.shop_id}}</td>
              <td>{{item.sn}}</td>
              <td>{{item.is_activated==='0'?'未激活':'已激活'}}</td>
              <td>{{item.activated_datetime}}</td>
              <td>{{item.created}}</td>
              <td>
                <div class="check-buttons">
                  <button type="button" class="btn btn-gray btn-small" v-if="device_id != 1" @click="onDelete(item.device_id)">删除</button>
                  <button type="button" class="btn btn-green btn-small"  @click="ontice(item.device_id)">短信通知</button>  
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
  export default {
    components: {
      MBreadcrumb
    },
    data () {
      return {
        breadcrumbData: [
          { name: '配置' },
          { name: '设备管理' },
          { name: '设备列表' }
        ],
        devicelist: [],
        orderles: [],
        shop_id: 0,
        is_activated: 0,
        device_id: 0,
        sn: '',
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
      shopper.deviceshoplist({page_index: this.pagination.index, page_size: this.pagination.size}).then(function (res) {
        self.orderles = res.data
      })
    },
    methods: {
      onProvide: function () {
        this.$router.go({
          name: 'device-facility'
        })
      },
      onPagePull: function () {
        console.log('...........change..........')
        const self = this
        shopper.devicelist({page_index: this.pagination.index, page_size: this.pagination.size, is_activated: this.is_activated, shop_id: this.shop_id, sn: this.sn}).then(function (res) {
          self.devicelist = res.data
        }, function (res) {
          self.$notify({
            title: '拉取失败',
            message: res.tips,
            type: 'warning'
          })
        })
      },
      onDelete (id) {
        const self = this
        this.$confirm('删除后将不可恢复，确定要删除吗?', '提示', {
          type: 'warning'
        }).then(() => {
          shopper.devicdedel({device_id: id}).then(function (res) {
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
      ontice (id) {
        const self = this
        this.$confirm('确定发送短信通知吗?', '提示', {
          type: 'warning'
        }).then(() => {
          shopper.devicesms({device_id: id}).then(function (res) {
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
