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
  .pj{padding: 170px; padding-bottom: 0; padding-top: 0px; line-height: 15px;}
</style>

<template>
  <div class="content">
  {{orderinfo | json}}
    <m-breadcrumb :items="breadcrumbData"></m-breadcrumb>
    <div class="main-content">
      <div class="main-content-hd">
        <button class="btn btn-white btn-small pull-right" type="button" @click="onBack()">返回</button>
        <h3>订单详情</h3>
      </div>
      <div class="main-content-bd">
        <div class="main-content-bd-block right">
          <h4>下单基本信息</h4>
          <hr>
          <div>
            <label class="form-label">订单编号:</label>
           <input type="text" class="input" disabled="" style="border: none; 
   background: #fff;"  v-model="info.trade_no"  readonly="readonly"/>
          </div>
          <div>
            <label class="form-label">订单状态:</label>
            <input type="text" class="input" disabled="" v-model="info.status_id"  style="border: none; 
   background: #fff;"  readonly="readonly" readonly="readonly"/>
          <div>
            <label class="form-label">创建时间:</label>
            <input type="text" class="input" v-model="info.customer_plane_datetime" style="border: none; 
  outline:none; background: #fff;"  readonly="readonly" disabled="" readonly="readonly"/>
          </div>
          <div>
            <label class="form-label">付款时间:</label>
            <input type="text" class="input" disabled="" v-model="info.created" style="border: none; 
   background: #fff;"  readonly="readonly" readonly="readonly"/>
          <div>
            <label class="form-label">下单用户:</label>
            <input type="text" class="input" disabled=""  v-model="info.customer_name" style="border: none; 
   background: #fff;"  readonly="readonly" readonly="readonly"/>
          </div>
          <hr>
          <h4>对应店铺</h4>
          <div>
            <label class="form-label">接待业务员:</label>
            <input type="text" class="input" disabled="" v-model="info.comment_tag" style="border: none; 
   background: #fff;"  readonly="readonly" readonly="readonly"/>
          </div>
          <div>
            <label class="form-label">对应施工员:</label>
            <input v-model="info.comment_tag" type="text" class="input" disabled="" style="border: none; 
   background: #fff;"  readonly="readonly" readonly="readonly"/>
          </div>
          <hr>
          <div>

            <label  class="form-label">服务进度图:</label>
            <div class="form-block">
              <div class="row">
                <div class="col-4">
                   <img :src="info.pic2" />
                </div>
                <div class="col-4">
                  <img :src="info.pic2" />
                </div>
              </div>
            </div>
          </div>

          <div>
            <label class="form-label">拆除滤网及相关:</label>
            <div class="form-block">
              <div class="row">
                <div class="col-4">
                 <img :src="info.pic2" />
                </div>
                <div class="col-4">
                  <img :src="info.pic2" />
                </div>
              </div>
            </div>
          </div>

          <div>
            <label class="form-label">清洗空调蒸发器:</label>
            <div class="form-block">
              <div class="row">
                <div class="col-4">
                  <img :src="info.pic2" />
                </div>
                <div class="col-4">
                  <img :src="info.pic2" />
                </div>
              </div>
            </div>
          </div>
          <hr>
          <div class="pj">
            <h4 class="h4">订单评价</h4>
                <p>★★★★☆</p>
                <br>
                <span>服务专业</span>&nbsp;&nbsp;<span>态度好</span>
          </div>
          <div class="text">
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
          { name: '订单详情' }
        ],
        serviceList: [],
        traceList: [],
        traceListPagination: {
          totalCount: 105,
          offset: 0,
          limit: 10
        },
        info: {
          trade_no: '',
          customer_name: '',
          comment_tag: '',
          created: '',
          customer_plane_datetime: '',
          pay_datetime: ''
        },
        updateing: false
      }
    },
    created () {
      const self = this
      shopper.orderinfo({order_id: this.$route.params.id}).then(function (res) {
        self.info = res.order_info
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
