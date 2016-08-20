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
        <button class="btn btn-white btn-small" @click="onBack()">返回</button>
        <h3>加盟商添加</h3>
      </div>
      <div class="main-content-bd">
        <div class="main-content-bd-block right">
          <h4>基本信息</h4>
          {{info | json}}
          <hr>
          <div>
            <label class="form-label">供应商ID:</label>
            <input type="text" class="input" v-model="info.parent_shopper_id">
          </div>
          <div>
            <label class="form-label">手机号:</label>
            <input type="text" class="input" v-model="info.mobile">
          </div>
          <div>
            <label class="form-label">商家名称:</label>
            <input type="text" class="input" v-model="info.company_name">
          </div>
          <div>
            <label class="form-label">地址:</label>
            <input type="text" class="input" v-model="info.address">
          </div>
          <div>
            <label class="form-label">经营种类:</label>
            <input type="text" class="input" v-model="info.company_desc">
          </div>
          <div>
            <label class="form-label">经营资质:</label>

          </div>
          <hr>
          <h4>负责人信息</h4>
          <div>
            <label class="form-label">姓名:</label>
            <input type="text" class="input" v-model="info.fullname">
          </div>
          <div>
            <label class="form-label">电话:</label>
            <input type="text" class="input" v-model="info.tel">
          </div>
          <div>
            <label class="form-label">身份证:</label>
            <input type="text" class="input" v-model="info.id_card">
          </div>
          <div class="pagination-container" style="text-align: right;">
            <button class="btn btn-primary" @click="onSave()">保存</button>
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
        },
        info: {
          parent_shopper_id: '',
          mobile: '',
          company_name: '',
          address: '',
          company_desc: '',
          fullname: '',
          tel: '',
          id_card: ''
        }
      }
    },
    methods: {
      onBack: function () {
        this.$router.go({
          path: 'shopper/service/index'
        })
      },
      onSave: function () {
        const self = this
        shopper.dataAdd(this.info).then(function (res) {
          self.$notify({
            title: '新增成功',
            message: res.tips,
            type: 'success'
          })
          this.$router.go('/shopper/service/index')
        }, function (res) {
          self.$notify({
            title: '新增失败',
            message: res.tips,
            type: 'warning'
          })
        })
      }
    }
  }
</script>
