<style scoped>
  .right {
    text-align: right;
  }
  .table{
    line-height: 30px;
  }
</style>

<template>
  <div class="content">
    <m-breadcrumb :items="breadcrumbData"></m-breadcrumb>
    <div class="main-content">
      <div class="main-content-hd">
        <h3>管理员列表</h3>
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
                  <th width="30">#</th>
                  <th>用户名</th>
                  <th>姓名</th>
                  <th>电子邮件</th>
                  <th>手机号</th>
                  <th>最后一次登录时间</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in traceList">
                  <td><input type="checkbox"></td>
                  <td>{{item.admin_name}}</td>
                  <td>{{item.fullname}}</td>
                  <td>{{item.email}}</td>
                  <td>{{item.mobile}}</td>
                  <td>{{item.created}}</td>
                  <td>
                    <div class="check-buttons">
                      <button type="button" class="btn btn-red btn-small" @click="onDdit(item.admin_id)">修改</button>
                      <button type="button" class="btn btn-red btn-small" @click="onBack()" style="width: 60px;">修改密码</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="pagination-container">
              <el-pagination
                  layout="prev, pager, next, jumper, slot, ->, total"
                  :total="pagination.total" :current-page.sync="pagination.index" :page-size="pagination.size" @current-change="onPageChange" @size-change="onPageChange">
                </el-pagination>
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
  import { MBreadcrumb } from '../../../../common/components/'
  import { shopper } from '../../../../api'
  export default {
    components: {
      MBreadcrumb
    },
    data () {
      return {
        breadcrumbData: [
          { name: '用户管理' },
          { name: '管理用户' },
          { name: '管理员列表' }
        ],
        traceList: [],
        keyword: '',
        admin_id: '',
        pagination: {
          total: 1,
          size: 10,
          index: 1
        }
      }
    },

    created () {
      this.onPageChange(1, 1)
    },
    methods: {
      onDdit: function (id) {
        this.$router.go({
          name: 'admin-edit',
          params: {id: id}
        })
      },
      onPageChange: function () {
        console.log('...........change..........', this.$route.params.id)
        const self = this
        shopper.adminlist({keyword: this.keyword, page_index: this.pagination.index, page_size: this.pagination.size}).then(function (res) {
          self.traceList = res.data
          self.pagination.total = res.data_count
        }, function (res) {
          self.$notify({
            title: '拉取失败',
            message: res.tips,
            type: 'warning'
          })
        })
      }
    }
  }
</script>
