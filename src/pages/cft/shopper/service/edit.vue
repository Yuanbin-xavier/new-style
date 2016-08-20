<style scoped>
.right .form-label {
  width: 100px;
  text-align: right;
  line-height: 50px;
}
</style>

<template>
  <div class="content">
    <m-breadcrumb :items="breadcrumbData"></m-breadcrumb>
    <div class="main-content">
      <div class="main-content-hd">
        <button class="btn btn-white btn-small" @click="save()">返回</button>
        <h3>加盟商编辑</h3>
      </div>
      <div class="main-content-bd">
        <div class="main-content-bd-block right">
          <h4>基本信息</h4>
          <hr>
          <div>
            <label class="form-label">手机号:</label>
            <input type="text" class="input" v-bind:placeholder="accountType === '订单号' ? '仅支持输入数字' : ''">
          </div>
          <div>
            <label class="form-label">订单状态:</label>
            <input type="text" class="input" v-bind:placeholder="accountType === '订单号' ? '仅支持输入数字' : ''">
          </div>
          <div>
            <label class="form-label">商家名称:</label>
            <input type="text" class="input" v-bind:placeholder="accountType === '订单号' ? '仅支持输入数字' : ''">
          </div>
          <div>
            <label class="form-label">地址:</label>
            <input type="text" class="input" v-bind:placeholder="accountType === '订单号' ? '仅支持输入数字' : ''">
          </div>
          <div>
            <label class="form-label">经营种类:</label>
            <input type="text" class="input" v-bind:placeholder="accountType === '订单号' ? '仅支持输入数字' : ''">
          </div>
          <div>
            <label class="form-label">经营资质:</label>

          </div>
          <hr>
          <h4>负责人信息</h4>
          <div>
            <label class="form-label">姓名:</label>
            <input type="text" class="input" v-bind:placeholder="accountType === '订单号' ? '仅支持输入数字' : '请输入时间'">
          </div>
          <div>
            <label class="form-label">电话:</label>
            <input type="text" class="input" v-bind:placeholder="accountType === '订单号' ? '仅支持输入数字' : '请输入时间'">
          </div>
          <div>
            <label class="form-label">身份证:</label>
            <input type="text" class="input" v-bind:placeholder="accountType === '订单号' ? '仅支持输入数字' : '请输入时间'">
          </div>
          <div class="pagination-container" style="text-align: right;">
            <button class="btn btn-white btn-small" @click="keep()">保存</button>
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
          { name: '我的NLE' },
          { name: '用户管理' },
          { name: '加盟商编辑' }
        ],
        traceList: [],
        traceListPagination: {
          totalCount: 105,
          offset: 0,
          limit: 10
        }
      }
    },
    created () {
      shopper.dataOne(this.$router.params.id)
    },
    methods: {
      save: function () {
        this.$router.go({
          name: 'franchisee-customer'
        })
      },
      keep: function () {
        this.$router.go({
          name: 'franchisee-customer'
        })
      }
    }
  }
</script>
