<style scoped>
.right .form-label {
  width: 150px;
  text-align: right;
  line-height: 50px;
}
.row{ 
   margin-left: 50px;
  }
  .h4{margin-top: 30px;}
  .text{ width: 60%; padding: 170px; padding-top: 20px; padding-bottom: 0; font-size: 14px}
  .col-1 span{
    font-size: 35px;
  }
</style>

<template>
  <div class="content">
  {{orderinfo | json}}
    <m-breadcrumb :items="breadcrumbData"></m-breadcrumb>
    <div class="main-content">
      <div class="main-content-hd">
        <button class="btn btn-white btn-small pull-right" type="button" @click="onBack()">返回</button>
        <h3>查看抵用券(已审核)</h3>
      </div>
      <div class="main-content-bd">
        <div class="main-content-bd-block right">
          <hr>
          <div>
            <label class="form-label">店铺:</label>
           <input type="text" class="input" disabled="" style="border: none; 
   background: #fff;"  v-model="info.company_name"  readonly="readonly"/>
          </div>
          <div>
            <label class="form-label">抵用券名称:</label>
            <input type="text" class="input" disabled="" v-model="info.coupon_name"  style="border: none; 
   background: #fff;"  readonly="readonly" readonly="readonly"/>
          <div>
            <label class="form-label">抵用券类型:</label>
            <input type="text" class="input" v-model="info.refused_desc" style="border: none; 
  outline:none; background: #fff;"  readonly="readonly" disabled="" readonly="readonly"/>
          </div>
          <div>
            <label class="form-label">最低消费</label>
            <input type="text" class="input" disabled="" v-model="info.min_payment" style="border: none; 
   background: #fff;"  readonly="readonly" readonly="readonly"/>
          <div>
            <label class="form-label">下单用户:</label>
            <input type="text" class="input" disabled=""  v-model="info.customer_name" style="border: none; 
   background: #fff;"  readonly="readonly" readonly="readonly"/>
          </div>
          <div>
            <label class="form-label">生成数量:</label>
            <input type="text" class="input" disabled="" v-model="info.qty" style="border: none; 
   background: #fff;"  readonly="readonly" readonly="readonly"/>
          </div>
          <div>
            <label class="form-label">失效日期:</label>
            <input v-model="info.expire_datetime" type="text" class="input" disabled="" style="border: none; 
   background: #fff;"  readonly="readonly" readonly="readonly"/>
          </div>
          <div>
          <label class="form-label">创建日期:</label>
            <input v-model="info.expire_datetime" type="text" class="input" disabled="" style="border: none; 
   background: #fff;"  readonly="readonly" readonly="readonly"/>
          </div>
          <hr>
           <div>
          <label class="form-label">数量:</label>
            <input v-model="info.qty" type="text" class="input" disabled="" style="border: none; 
   background: #fff;"  readonly="readonly" readonly="readonly"/>
          </div>
          </div>
          </div>
          <div class="pagination-container" style="text-align: right;">
            <el-button type="primary" size="large" @click="onBack()" :loading.sync="updateing">确定</el-button>
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
          { name: '订单管理' },
          { name: '管理订单' },
          { name: '订单详情' },
          { name: '修改店铺' }
        ],
        serviceList: [],
        traceList: [],
        traceListPagination: {
          totalCount: 105,
          offset: 0,
          limit: 10
        },
        info: {
          company_name: ''
        },
        updateing: false
      }
    },
    created () {
      const self = this
      shopper.couponinfo({coupon_rule_id: this.$route.params.id}).then(function (res) {
        self.info = res.data
      }, function (res) {
        self.$notify({
          title: '拉取失败',
          message: res.tips,
          type: 'warning'
        })
      })
    },
    methods: {
      onBack: function () {
        this.$router.go({
          name: 'trade-order-index'
        })
      }
    }
  }
</script>
