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
        <button class="btn btn-white btn-small" @click="save()">添加员工</button>
        <h3>员工列表</h3>
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
            <table type="list">
              <thead>
                <tr>
                  <th>#</th>
                  <th>用户名</th>
                  <th>姓名</th>
                  <th>电子邮件</th>
                  <th>手机号</th>
                  <th>最后一次登录时间</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="1 in 7">
                  <td><input type="checkbox"></td>
                  <td>test</td>
                  <td>上汽</td>
                  <td>123142151@qq.com</td>
                  <td>1383838383838</td>
                  <td>2016-03-20 29;15:02</td>
                  <td>
                    <div class="check-buttons">
                      <button type="button" class="btn btn-red btn-small">修改</button>
                      <button type="button" class="btn btn-red btn-small" @click="keep()" style="width: 60px;">修改密码</button>
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
  export default {
    data () {
      return {
        breadcrumbData: [
          { name: '我的NLE' },
          { name: '用户管理' },
          { name: '员工列表' }
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
          name: 'staff-add-personnel'
        })
      },
      keep: function () {
        this.$router.go({
          name: 'change-password-personnel'
        })
      }
    }
  }
</script>
