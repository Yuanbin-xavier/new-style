<template>
<div class="index">
    <div class="content">
      <m-breadcrumb :items="breadcrumbData"></m-breadcrumb>
      <div  class="main-content-block">
        <div class="row">
          <div class="col-6">
            <div class="main-content-hd">
              <div class="white-block">
              <i class="icon iconfont">&#xe607;</i><span  class="text"><a>{{shopCount}}</a>&nbsp;家店铺</span>
            </div>
            </div>
          </div>
          <div class="col-6">
            <div class="main-content-hd">
              <div class="white-block">
              <i class="icon2 iconfont">&#xe602;</i><span  class="text"><a>{{ordercount}}</a>&nbsp;单订单</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div  class="main-content">
<!-- 
      <button><i class="el-icon-arrow-left"></i></button>
        <button><i class="el-icon-arrow-right"></i></button> -->
        <div class="chart" v-echarts="barChartOption" :loading="barChartLoading"></div>
      </div>
    </div>

</div>
</template>
<style lang="less" scope>
.el-icon-arrow-left{
  font-size: 30px;
}
.el-icon-arrow-right{
  font-size: 30px;
}
  .index{
     width: 100%;
    .chart {
      width: 100%;
      height: 400px;
    }
    .diamonds{ 
      width: 40px; 
      height: 40px; 
      background: #66aaff;}
    span{
      font-size: 18px;
    }
    a{ 
      font-size: 25px;
    }
    .main-content-block{
      margin: 0 1.25rem 1.25rem;
      .white-block{
        background-color: white;
        padding: 10px;
        .icon{
          background-color: #4a86b8;
          font-size: 27px;
          padding: 20px;
          color: white;
        }
        .icon2{
          background-color: #e04e4e;
          font-size: 27px;
          padding: 20px;
          color: white;
        }
      }
    }
  }
  .text{
    padding: 30%;
  }
  .iconfont{
    font-family:"iconfont" !important;
    font-size:27px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
  }


</style>
<script>
  import MBreadcrumb from '../../../../common/components/breadcrumb.vue'
  import { shopper } from '../../../../api'
  export default {
    components: {
      MBreadcrumb
    },
    methods: {
      onPageChange: function () {
        console.log('...........change..........')
        const self = this
        shopper.adminthismonthaddordernum().then(function (res) {
          var categories = []
          var data = []
          res.data.month.forEach(function (item, index) {
            categories[index] = item.date
            data[index] = item.qty
          })

          console.log('e............')

          self.barChartOption.xAxis.data = categories
          self.barChartOption.series[0].data = data
        })
        shopper.allOrderCount().then(function (res) {
          self.ordercount = res.data
        })
        shopper.allShopCount().then(function (res) {
          self.shopCount = res.data
        }, function (res) {
          self.$notify({
            title: '拉取失败',
            message: res.tips,
            type: 'warning'
          })
        })
      }
    },
    data () {
      return {
        shopCount: 0,
        ordercount: 0,
        breadcrumbData: [
          { name: '我的首页' },
          { name: '我的面板' },
          { name: '我的首页' }
        ],
        barChartOption: {
          tooltip: {},
          xAxis: {
            data: []
          },
          yAxis: {},
          series: [
            {
              name: '单',
              type: 'bar',
              data: []
            }
          ]
        }
      }
    },
    created () {
      this.onPageChange()
    }
  }
</script>
