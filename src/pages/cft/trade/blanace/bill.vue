<style scoped>

</style>

<template>
  <div class="content">
    <m-breadcrumb :items="breadcrumbData"></m-breadcrumb>
    <div class="main-content">
      <div class="main-content-hd">
        <h3>定金结算</h3>
        <form>
          <label class="form-label">结算时间：</label>
          <input type="text" class="input" v-bind:placeholder="accountType === '订单号' ? '仅支持输入数字' : '请输入时间'">
          <input type="text" class="input" v-bind:placeholder="accountType === '订单号' ? '仅支持输入数字' : '请输入时间'">
        </form>
      </div>
      <div class="main-content-bd">
        <div class="main-content-bd-block detail">
          <div class="traceList">
            <table class="table">
              <thead>
                <tr>
                  <th width="30">#</th>
                  <th>店铺</th>
                  <th>结算日期</th>
                  <th>结算金额</th>
                  <th>创建时间</th>
                  <th>照片</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="1 in 7">
                  <td>1</td>
                  <td>店铺一</td>
                  <td>2016-08-01 - 2016-08-31</td>
                  <td>29.00</td>
                  <td>2016-08-17 11:11:11</td>
                  <td>
                    #
                  </td>
                  <td>
                    <div class="check-buttons">
                      <button type="button" class="btn btn-green btn-small" @click="save()" style="width: 60px;">查看备注</button>
                      <button type="button" class="btn btn-red btn-small" @click="save()">删除</button>
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
          { name: '定金结算' }
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
          name: 'add-handsel-oms'
        })
      }
    }
  }
</script>
