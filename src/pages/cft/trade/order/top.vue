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
  .filter button {
    margin: 20px 0 20px 100px;
  }
</style>

<template>
  <div class="content">
    <m-breadcrumb :items="breadcrumbData"></m-breadcrumb>
    <div class="main-content">
      <div class="main-content-hd">
        <button class="btn btn-white btn-small" @click="save()">返回</button>
        <h3>设备列表</h3>
        <form>
          <label class="form-label">成交时间：</label>
          <el-date-picker
              type="daterange"
              placeholder="选择日期范围"
              style="width: 240px;"
              :value.sync="pickedDate">
          </el-date-picker>
          <select style="width: 100px; font-size: 18px; margin-left: 20px;">
            <option value="volvo">不限店铺</option>
            <option value="volvo">店铺一</option>
            <option value="volvo">店铺二</option>
          </select>
          <select style="width: 100px; font-size: 18px; margin-left: 20px;">
            <option value="volvo">不限员工</option>
            <option value="volvo">业余员</option>
            <option value="volvo">施工人员</option>
          </select>
          <label class="form-label" >商品标题：</label>
          <input type="text" class="input" style="width: 100px;" value="输入关键字">
        </form>
        <div class="main-content-bd detail">
          <table type="list">
            <thead>
              <tr>
                <th>#</th>
                <th>店铺</th>
                <th>员工</th>
                <th>订单</th>
              </tr>
            </thead>
          <tbody>
            <tr v-for="1 in 5">
              <td>1</td>
              <td>店铺一</td>
              <td>马超</td>
              <td>100单</td>
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
</template>

<script>
  export default {
    data () {
      return {
        breadcrumbData: [
          { name: '我的NLE' },
          { name: '配置' },
          { name: '设备管理', path: '/balance/device/devices' }
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
