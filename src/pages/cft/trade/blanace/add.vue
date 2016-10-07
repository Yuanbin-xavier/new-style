<style scoped>
.right{
}
.right .form-label {
  width: 100px;
  text-align: right;
  line-height: 50px;
}
.right textarea.input {
  display: inline-block;
  margin: 0 16px 0 0;
  width: 300px;
  height: 60px;
  line-height: 30px;
  font-size: 12px;
}
.right input.input {
  display: inline-block;
  margin: 0 16px 0 0;
  width: 300px;
  height: 30px;
  line-height: 30px;
  font-size: 12px;
}
.form-block{
  width: 90%;
  text-align: center;
}
.right .form-label[_v-37a33f62] {
  width: 190px;
}
.single-image-uploader-box[_v-77402400] {
  margin-left: 95px;
}
.right1 {
}
.main-content-bd1 h1{
  font-size: 28px;
  text-align: center;
  padding: 300px;
}
</style>

<template>
  <div class="content">
    <m-breadcrumb :items="breadcrumbData"></m-breadcrumb>
    <div class="main-content">
      <div class="main-content-hd">
        <h3>添加结算</h3>
        <form>
          <div class="right1">
          <select style="width: 100px; font-size: 18px; margin-left: 90px;" v-model="info.shop_id">
            <option value="0">请选择店铺</option>
            <option value="volvo" v-for="option in orderles" v-bind:value="option.shop_id">{{option.shop_name}}</option>
          </select>
          <label class="form-label" style="margin-left: 20px;">付款时间:</label>
            <span class="align-left" style="margin-left: 10px;">
              <el-date-picker
                  type="daterange"
                  placeholder="选择日期范围"
                  style="width: 240px;"
                  :value.sync="pickedDate">
              </el-date-picker>
            <button class="btn btn-small" style="margin-left: 20px;" type="button" @click="onPageChange"><i class="icon icon-search" ></i> </button>
          </div>
        </form>
      </div>
       <div class="main-content-bd1" v-if="!showResult">
         <h1>请选择您结算的店铺和周期</h1>
       </div>
       <div class="main-content-bd" v-if="showResult">
        <div class="main-content-bd-block right">
          <div>
            <label class="form-label">本批次结算金额为:</label>
            <input type="text" class="input" v-model="info.total" disabled="disabled">
          </div>
          <div>
            <label class="form-label">本批次结算订单数量为:</label>
            <input type="text" class="input" v-model="info.trade_count" disabled="disabled">
          </div>
           <div>
            <label class="form-label">结算扫描件:</label>
            <div class="form-block" style="width:100px">
              <m-image-uploader unique-id="1" :default="info.scan_file" @on-uploaded="onUploaded" @on-removed="onRemoved"></m-image-uploader>
            </div>
          </div>
          <div>
            <label class="form-label">结算备注:</label>
            <textarea class="input" v-model="info.remark" style="width:500px; height:200px;" ></textarea>
            </div>
          </div>
          <div class="pagination-container" style="text-align: right;">
            <button class="btn btn-primary btn-small"  @click="onSave()">保存</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { MBreadcrumb, MImageUploader } from '../../../../common/components/'
  import { shopper } from '../../../../api'
  import moment from 'moment'

  export default {
    components: {
      MBreadcrumb,
      MImageUploader
    },
    data () {
      return {
        breadcrumbData: [
          { name: '订单管理' },
          { name: '管理订单' },
          { name: '订单管理' }
        ],
        orderles: [],
        pickedDate: null,
        pagination: {
          total: 1,
          size: 10,
          index: 1
        },
        info: {
          begin_datetime: '',
          end_datetime: '',
          total: 0,
          trade_count: 0,
          shop_id: 0,
          scan_file: '',
          qty: '',
          remark: ''
        },
        showResult: false,
        updateing: false
      }
    },
    created () {
      const self = this
      shopper.deviceshoplist({page_index: this.pagination.index, page_size: this.pagination.size}).then(function (res) {
        self.orderles = res.data
      })
    },
    methods: {
      onUploaded: function (uniqueId, res) {
        uniqueId = parseInt(uniqueId)
        if (uniqueId === 1) {
          this.info.scan_file = res.url
        }
      },
      onRemoved: function (uniqueId) {
        uniqueId = parseInt(uniqueId)
        if (uniqueId === 1) {
          this.info.scan_file = ''
        }
      },
      onPageChange: function (id) {
        if (this.pickedDate) {
          this.info.begin_datetime = moment(this.pickedDate[0]).format('YYYY-MM-DD 00:00:00')
          this.info.end_datetime = moment(this.pickedDate[1]).format('YYYY-MM-DD 23:59:59')
        }
        const self = this
        shopper.addsettlement(this.info).then(function (res) {
          console.log(res)
          self.showResult = true
          self.info = res.data[0]
        })
      },
      onSave: function () {
        const self = this
        this.updateing = true
        if (this.pickedDate) {
          this.info.begin_datetime = moment(this.pickedDate[0]).format('YYYY-MM-DD 00:00:00')
          this.info.end_datetime = moment(this.pickedDate[1]).format('YYYY-MM-DD 23:59:59')

          shopper.orderaddsettlement({shop_id: this.info.shop_id, scan_file: this.info.scan_file, end_datetime: this.info.end_datetime, qty: this.info.trade_count, begin_datetime: this.info.begin_datetime, remark: this.info.remark}).then(function (res) {
            self.$notify({
              title: '修改成功',
              message: res.tips,
              type: 'success'
            })
            self.$router.go({
              name: 'blanae-bill'
            })
          }, function (res) {
            self.updateing = false
            self.$notify({
              title: '修改失败',
              message: res.tips,
              type: 'warning'
            })
          })
        }
      }
    }
  }
  </script>
