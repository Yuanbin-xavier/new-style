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

</style>

<template>
  <div class="content">
    <m-breadcrumb :items="breadcrumbData"></m-breadcrumb>
    <div class="main-content">
      <div class="main-content-hd">
        <button class="btn btn-white btn-small" >添加车系</button>
        <h3>车系设置</h3>
      </div>
      <div class="main-content-bd">
        <table class="table">
          <thead>
            <tr>
              <th width="30">ID</th>
              <th>品牌名称</th>
              <th>品牌LOGO</th>
              <th>操作</th>
            </tr>
          </thead>
        <tbody>
          <tr v-for="1 in 5">
            <td>1</td>
            <td>奥迪</td>
            <td>123123123123</td>
            <td>
              <div class="check-buttons">
                <button type="button" class="btn btn-green btn-small" style="width: 68px;" @click="save()">管理商家</button>
                <button type="button" class="btn btn-red btn-small" @click="jump()">删除</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="pagination-container" style="padding-bottom: 30px;">
        <m-pagination
            :total-count="traceListPagination.totalCount"
            :offset="traceListPagination.offset"
            :limit="traceListPagination.limit"
            :callback="changePage">
        </m-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        breadcrumbData: [
          { name: '我的NLE' },
          { name: '配置' },
          { name: '车系设置', path: '/balance/restaurant' }
        ],
        traceList: [],
        traceListPagination: {
          totalCount: 105,
          offset: 0,
          limit: 10
        }
      }
    },
    methods: {
      save: function () {
        this.$router.go({
          name: 'restaurant-modify-history'
        })
      }
    }
  }
</script>
