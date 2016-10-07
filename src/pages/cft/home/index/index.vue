<template>
<div class="index">
    <div class="content">
      <m-breadcrumb :items="breadcrumbData"></m-breadcrumb>
      <div  class="main-content-block">
        <div class="row">
          <div class="col-6">
            <div class="main-content-hd">
              <div class="white-block">
              <i class="icon iconfont">&#xe600;</i><span  class="text"><a>{{shopCount}}</a>&nbsp;家店铺</span>
            </div>
            </div>
          </div>
          <div class="col-6">
            <div class="main-content-hd">
              <div class="white-block">
              <i class="icon2 iconfont">&#xe616;</i><span  class="text"><a>{{ordercount}}</a>&nbsp;单订单</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div  class="main-content">
        <button class="btn you btn-small" @click="lookRecordLeft()"><i class="el-icon-arrow-left"></i></button>
        <button class="btn zuo btn-small"  @click="lookRecordRight()" v-if="dayNumber > 0"><i class="el-icon-arrow-right" ></i></button>
        <div class="chart" v-echarts="barChartOption" :loading="barChartLoading"></div>
        <div class="bq">
            <div class="bb">©2015-2016 技术支持：上海动咖网络科技有限公司</div>
        </div>
      </div>
    </div>
</div>
</template>
<style lang="less" scope>
  .bb {
    font-size: 12px;
    width: 97%;
    height: 20px;
    text-align: center;
    position: absolute;
    bottom: 20px;
  }
  .bq {
    width: 100%;
    height: 230px;
    background-color: #fff;
  }
  .bt {
    width: 97%;
    position: absolute;
    top: 50%;
  }
  .zuo {
   position: fixed;/*这是必须的*/
    z-index: 999;
    left:93%;/*这是必须的*/
    top: 40%;/*这是必须的*/
  }
  .you {
    position: fixed;/*这是必须的*/
    z-index: 999;
    top: 40%;/*这是必须的*/
  }
  .el-icon-arrow-left {
    font-size: 30px;
    text-align: right;
  }
  .el-icon-arrow-right {
    font-size: 30px;
  }
  .index {
     width: 100%;
    .chart {
      width: 100%;
      height: 400px;
    }
    .diamonds {
      width: 40px;
      height: 40px;
      background: #66aaff;
    }
    span {
      font-size: 18px;
    }
    a {
      font-size: 25px;
    }
    .main-content-block {
      margin: 0 1.25rem 1.25rem;
      .white-block {
        background-color: white;
        padding: 10px;
        .icon {
          background-color: #4a86b8;
          font-size: 27px;
          padding: 20px;
          color: white;
        }
        .icon2 {
          background-color: #e04e4e;
          font-size: 27px;
          padding: 20px;
          color: white;
        }
      }
    }
  }
  .text {
    padding: 30%;
  }
  .iconfont {
    font-family: "iconfont" !important;
    font-size: 27px;
    font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
  }


</style>
<script>
  import MBreadcrumb from '../../../../common/components/breadcrumb.vue'
  import { shopper } from '../../../../api'
  import moment from 'moment'
  export default {
    components: {
      MBreadcrumb
    },
    created () {
      var self = this
      this.firstDay = moment(new Date()).format('YYYY-MM-DD')
      console.log(this.firstDay)
      this.lastDay = moment(moment(this.firstDay).subtract(1, 'moment').calendar()).format('YYYY-MM-DD')
      shopper.allOrderCount().then(function (res) {
        self.ordercount = res.data
      })
      shopper.allShopCount().then(function (res) {
        self.shopCount = res.data
      })
      this.getChartData(0)
    },
    methods: {
      lookRecordLeft () {
        this.dayNumber++
        console.log(this.dayNumber)
        this.getChartData(0)
      },
      lookRecordRight () {
        this.dayNumber--
        this.getChartData(0)
      },
      getChartData () {
        var self = this
        if (this.dayNumber === 0) {
          this.firstDay = moment(new Date()).format('YYYY-MM-DD')
          this.lastDay = moment(moment(this.firstDay).subtract(1, 'months').calendar()).format('YYYY-MM-DD')
        } else {
          this.firstDay = moment(moment().subtract(this.dayNumber * 1, 'months').calendar()).format('YYYY-MM-DD')
          this.lastDay = moment(moment().subtract(this.dayNumber + 1, 'months').calendar()).format('YYYY-MM-DD')
        }

        console.log(this.dayNumber * 30 + 30)
        shopper.adminthismonthaddordernum({start_date: this.lastDay, end_date: this.firstDay}).then(function (res) {
          if (res.data.month) {
            var weekList = res.data.month
            var categories = []
            var data = []
            weekList.forEach(function (item, index) {
              categories[index] = item.date
              data[index] = item.qty
            })
            self.barChartOption.xAxis.data = categories
            self.barChartOption.series[0].data = data
          //   self.$refs.month.mergeOptions({
          //     xAxis: {
          //       data: categories
          //     },
          //     series: [{
          //       name: '下单',
          //       data: data
          //     }]
          //   })
          } else {
            self.weekList = ''
          }
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
        num: '',
        end_date: '',
        dayNumber: 0,
        firstDay: '',
        lastDay: '',
        weekList: {},
        start_date: '',
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
    }
  }
</script>
