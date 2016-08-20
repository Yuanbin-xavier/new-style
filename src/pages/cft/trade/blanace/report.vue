<style scoped>

</style>

<template>
  <div class="content">
    <m-breadcrumb :items="breadcrumbData"></m-breadcrumb>
    <div class="main-content">
      <div class="main-content-hd">
        <h3>财务报表</h3>
        <form>
          <label class="form-label">付款时间：</label>
          <input type="text" class="input" v-bind:placeholder="accountType === '订单号' ? '仅支持输入数字' : '请输入时间'">
          <input type="text" class="input" v-bind:placeholder="accountType === '订单号' ? '仅支持输入数字' : '请输入时间'">
        </form>
      </div>
      <div class="main-content-bd">
        <div class="main-content-bd-block detail">
          <div class="traceList">
            <table type="list">
              <thead>
                <tr>
                  <th>#</th>
                  <th>店铺</th>
                  <th>订单数量</th>
                  <th>总额</th>
                  <th>已结算</th>
                  <th>未结算</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="1 in 7">
                  <td>1</td>
                  <td>店铺一</td>
                  <td>1</td>
                  <td>299.00</td>
                  <td>299.00</td>
                  <td>500</td>
                  <td>
                    <div class="check-buttons">
                      <button type="button" class="btn btn-green btn-small" @click="save()" style="width: 60px;">导出excel</button>
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
              <p>当前第1-10条记录，共200条</p>
            </div>
          </div>
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
          { name: '管理结算' },
          { name: '财务报表' }
        ],
        traceList: [],
        traceListPagination: {
          totalCount: 105,
          offset: 0,
          limit: 10
        }
      }
    }
  }
</script>
