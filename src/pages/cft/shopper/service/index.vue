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
        <a class="btn btn-white btn-small" v-link="{path:'/shopper/service/add'}">添加</a>
        <h3>加盟商列表</h3>
        <form>
          <div class="right">
            <input type="text" class="input" v-bind:placeholder="accountType === '订单号' ? '仅支持输入数字' : '请输入关键词'">
            <button class="btn btn-small" type="button">搜索</button>
          </div>
        </form>
      </div>
      <div class="main-content-bd">
        <div class="main-content-bd-block detail">
          <div class="traceList">
            <table class="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>用户名</th>
                  <th>商家名称</th>
                  <th>地址</th>
                  <th>负责人姓名</th>
                  <th>负责人电话</th>
                  <th>最后一次登录时间</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in traceList">
                  <td><input type="checkbox"></td>
                  <td>130000000</td>
                  <td>上汽</td>
                  <td>XXXX</td>
                  <td>高晓松</td>
                  <td>1383838383838</td>
                  <td>2016-03-20 29;15:02</td>
                  <td>
                    <div class="check-buttons">
                      <button type="button" class="btn btn-red btn-small">修改</button>
                      <button type="button" class="btn btn-green btn-small">4S店</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="pagination-container">
              <m-pagination
                  :total-count="traceListPagination.totalCount"
                  :offset="traceListPagination.offset"
                  :limit="traceListPagination.limit"
                  :callback="changePage"></m-pagination>
                  <button class="btn btn-white btn-small" @click="">反选</button>
                  <button class="btn btn-white btn-small" @click="">静止登录</button>
                  <button class="btn btn-white btn-small" @click="">删除</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { MPagination, MBreadcrumb } from '../../../../common/components/'
  import { shopper } from '../../../../api'
  export default {
    components: {
      MPagination,
      MBreadcrumb
    },
    data () {
      return {
        breadcrumbData: [
          { name: '我的NLE' },
          { name: '用户管理' },
          { name: '加盟商列表' }
        ],
        traceList: [],
        keyword: '',
        shopperSupperId: 0,
        traceListPagination: {
          totalCount: 105,
          offset: 0,
          limit: 10
        }
      }
    },
    methods: {
      changePage: function (offset, limit) {
        const self = this
        shopper.dataList({keyword: this.keyword, shopperSupperId: 0, pageIndex: offset, pageSize: limit}).then(function (res) {
          self.traceList = res.data
        }, function (res) {
          self.$notify({
            title: '拉取失败',
            message: res.tips,
            type: 'warning'
          })
        })
      }
    },
    created () {
      this.changePage(1, 10)
    }
  }
</script>
