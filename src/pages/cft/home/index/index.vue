<template>
<div class="index">
    <div class="content">
      <m-breadcrumb :items="breadcrumbData"></m-breadcrumb>

      <div  class="main-content-block">
        <div class="row">
          <div class="col-6">
            <div class="main-content-hd">
              <div class="white-block">
                <span class="icon">XX</span> 10 店铺
              </div>
            </div>
          </div>
          <div class="col-6">
            <div class="main-content-hd">
              <div class="white-block">
                <span class="icon">XX</span> 10 店铺
              </div>
            </div>
          </div>
        </div>
      </div>

      <div  class="main-content">
        <div class="chart" v-echarts="barChartOption" :loading="barChartLoading"></div>
      </div>
    </div>

</div>
</template>
<style lang="less" scope>
  .index{
     width: 100%;
    .chart {
      width: 100%;
      height: 400px;
    }
    .main-content-block{
      margin: 0 1.25rem 1.25rem;
      .white-block{
        background-color: white;
        padding: 10px;
        .icon{
          background-color: #000066;
          padding: 30px;
          color: white;
        }
      }
    }
  }
</style>
<script>
  import MBreadcrumb from '../../../../common/components/breadcrumb.vue'

  export default {
    components: {
      MBreadcrumb
    },
    data () {
      return {
        breadcrumbData: [
          { name: '我的首页' },
          { name: '我的面板' },
          { name: '我的首页' }
        ],
        barChartOption: {
          tooltip: {},
          xAxis: {
            data: ['2016/07/01', '2016/07/02', '2016/07/03', '2016/07/04', '2016/07/05', '2016/07/06', '2016/07/07', '2016/07/08', '2016/07/09', '2016/07/10', '2016/07/11']
          },
          yAxis: {},
          series: [
            {
              name: 'Num',
              type: 'bar',
              data: [5, 20, 36, 10, 10, 20, 10, 11, 11, 12, 13]
            }
          ]
        }
      }
    }
  }
</script>
