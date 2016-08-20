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
        <button class="btn btn-white btn-small" @click="save()">添加</button>
        <h3>店员列表</h3>
        <form>
          <div class="right">
            <select style="width: 100px; font-size: 18px; margin-left: 10px;">
              <option value="volvo">不限</option>
              <option value="volvo">供应商1</option>
              <option value="volvo">供应商2</option>
            </select>
            <select style="width: 100px; font-size: 18px; margin-left: 10px;">
              <option value="volvo">不限</option>
              <option value="volvo">加盟商1</option>
              <option value="volvo">加盟商2</option>
            </select>
            <select style="width: 100px; font-size: 18px; margin-left: 10px;">
              <option value="volvo">不限</option>
              <option value="volvo">店铺1</option>
              <option value="volvo">店铺2</option>
            </select>
            <input type="text" class="input" v-bind:placeholder="accountType === '订单号' ? '仅支持输入数字' : '请输入关键词'">
            <button class="btn btn-small" type="button">搜索</button>
          </div>
        </form>
      </div>
      <div class="main-content-bd">
        <div class="main-content-bd-block detail">
          <div class="traceList">
            <table type="list">
              <thead>
                <tr>
                  <th>#</th>
                  <th>姓名</th>
                  <th>店铺</th>
                  <th>电机</th>
                  <th>职位</th>
                  <th>手机</th>
                  <th>最后一次登录时间</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="1 in 7">
                  <td><input type="checkbox"></td>
                  <td>高晓松</td>
                  <td>上汽</td>
                  <td>XXXX</td>
                  <td>操作工</td>
                  <td>1383838383838</td>
                  <td>2016-03-20 29;15:02</td>
                  <td>
                    <div class="check-buttons">
                      <button type="button" class="btn btn-red btn-small" style="width: 60px;">自我介绍</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="pagination-container" >
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
          { name: '用户管理' },
          { name: '店员列表' }
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
