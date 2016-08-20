<style scoped>
  .main-content-bd td button {
    padding: 5px;
    height: 40px;
  }
  .main-content-hd input {
    width: 150px;
  }

</style>

<template>
  <div class="content">
    <m-breadcrumb :items="breadcrumbData"></m-breadcrumb>
    <div class="main-content">
      <div class="main-content-hd">
        <h3>订单列表</h3>
        <form>
          <label class="form-label">下单时间：</label>
          <select style="width: 100px; font-size: 18px; margin-left: 10px;">
            <option value="volvo">请选择状态</option>
            <option value="volvo">未付款</option>
            <option value="volvo">已付款</option>
          </select>
          <select style="width: 100px; font-size: 18px; margin-left: 10px;">
            <option value="volvo">请选择店铺</option>
            <option value="volvo">店铺1</option>
            <option value="volvo">店铺2</option>
          </select>
          <input type="text" class="input" style="margin-left: 10px;">
          <button class="btn btn-white btn-small" >搜索</button>
        </form>
      </div>
        <div class="main-content-bd detail">
          <table type="list">
            <thead>
              <tr>
                <th>#</th>
                <th>订单编号</th>
                <th>状态</th>
                <th>下单/付款时间</th>
                <th>定金</th>
                <th>店铺</th>
                <th>用户账号</th>
                <th>类型</th>
                <th>接待人员</th>
                <th>施工人员</th>
                <th>操作</th>
              </tr>
            </thead>
          <tbody>
            <tr v-for="1 in 5">
              <td>1</td>
              <td>123123123123</td>
              <td>未付款</td>
              <td>01-17  14:29:12</td>
              <td>27:30</td>
              <td>xxxxx</td>
              <td>12312312312</td>
              <td>自动接单</td>
              <td>小张</td>
              <td>小关</td>
              <td>
                <div class="check-buttons">
                  <button type="button" class="btn btn-red btn-small" @click="save()">查看</button>
                  <button type="button" class="btn btn-red btn-small" >删除</button>
                </div>
            </tr>
          </tbody>
        </table>

        <div class="pagination-container" style="padding-bottom: 30px;">
          <m-pagination
              :total-count="traceListPagination.totalCount"
              :offset="traceListPagination.offset"
              :limit="traceListPagination.limit"
              :callback="changePage"></m-pagination>
        </div>
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
          { name: '订单管理' },
          { name: '订单列表' }
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
          name: 'orders-oms'
        })
      }
    }
  }
</script>
index.vue
