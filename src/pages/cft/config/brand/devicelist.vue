<style scoped>
 .alert-message {
    margin: 30px 0;
    text-align: center;
  }
  .alert-buttons {
    margin: 30px 0;
    text-align: center;
  }
  .alert-buttons button {
    display: inline-block;
  }
  .freezing-log {
    margin-bottom: 24px;
  }
  .main-content-hd a {
    font-size: 8px;
    float: right;
  }
  .main-input {
    padding-left: 15px;
    padding-top: 15px;
  }
  .main-frame {
    margin-bottom: 18px;
    padding: 14px 0;
    justify-content: center;
    align-items: center;
    background-color: rgba(223, 226, 231, 0.20);
    font-size: 0;
  }
  .main-content-hd button {
    float: right;
  }
  .filter button {
    margin: 20px 0 20px 100px;
  }
</style>

<template>
  <div class="content">
    <m-breadcrumb :items="breadcrumbData"></m-breadcrumb>
    <div class="main-content">
      <div class="main-content-hd">
        <button class="btn btn-white btn-small" @click="save()">设备发放</button>
        <h3>设备列表</h3>
        <form>
          <select style="width: 100px; font-size: 18px; margin-left: 20px;" v-model="shopper_id">
            <option value="volvo">店铺</option>
            <option value="volvo" v-for="option in supplierList" v-bind:value="option.shopper_id">{{option.fullname}}</option>
            <option value="volvo">店铺二</option>
          </select>
          <select style="width: 100px; font-size: 18px; margin-left: 20px;">
            <option value="volvo">在架状态</option>
            <option value="volvo">上架</option>
            <option value="volvo">下架</option>
          </select>
          <input type="text" class="input" style="width: 140px; margin-left: 20px;">
          <input type="text" class="input" style="width: 140px;">
          <label class="form-label" >商品标题：</label>
          <input type="text" class="input" style="width: 100px;" value="输入关键字">
        </form>
        <div class="main-content-bd">
          <table class="table">
            <thead>
              <tr>
                <th width="30">ID</th>
                <th>店铺</th>
                <th>设备SN</th>
                <th>激活状态</th>
                <th>激活时间</th>
                <th>创建时间</th>
                <th>操作</th>
              </tr>
            </thead>
          <tbody>
          {{traceList | json}}
            <tr v-for="1 in 5">
              <td>1</td>
              <td>店铺</td>
              <td>123123123123</td>
              <td>已激活</td>
              <td>2016-11-11</td>
              <td>2016-11-11</td>
              <td>
                <div class="check-buttons">
                  <button type="button" class="btn btn-red btn-small" >删除</button> 
                </div>
            </tr>
          </tbody>
        </table>
      <div class="pagination-container">
          <el-pagination
                  layout="prev, pager, next, jumper, slot, ->, total"
                  :total="pagination.total" :current-page.sync="pagination.index" :page-size="pagination.size" @current-change="onPageChange" @size-change="onPageChange">
          </el-pagination>
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
          { name: '加盟商列表' }
        ],
        traceList: [],
        supplierList: [],
        shopper_id: 0,
        shop_id: '',
        is_activated: 0,
        sn: '',
        pagination: {
          total: 1,
          size: 10,
          index: 1
        }
      }
    },
    created () {
      this.onPageChange(1, 1)
      const self = this
      shopper.shopinferior({keyword: this.keyword, shopper_id: this.shopper_id, page_index: this.pagination.index, page_size: this.pagination.size}).then(function (res) {
        self.supplierList = res.data
        self.pagination.total = res.data_count
      })
    },
    methods: {
      onPageChange: function () {
        console.log('...........change..........', this.$route.params.id)
        const self = this

        shopper.devicelist({page_index: this.pagination.index, page_size: this.pagination.size, is_activated: this.is_activated, shop_id: this.shop_id, sn: this.sn}).then(function (res) {
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
