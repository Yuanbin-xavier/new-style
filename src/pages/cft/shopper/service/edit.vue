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
        <button class="btn btn-white btn-small pull-right" type="button" @click="onBack()">返回</button>
        <h3>加盟商修改</h3>
      </div>
      <div class="main-content-bd">
        <div class="main-content-bd-block right">
          <h4>基本信息</h4>
          <hr>
          <div>
            <label class="form-label">供应商: </label>
            <select class="select"  v-model="info.parent_shopper_id">
              <option v-for="option in supplierList" v-bind:value="option.shopper_id">
                {{ option.company_name }}
              </option>
            </select>
          </div>
          <div>
            <label class="form-label">登录手机号:</label>
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
            <textarea class="input" v-model="info.company_desc"></textarea>
          </div>
          <div>
            <label class="form-label">经营资质:</label>
            <div class="form-block">
              <div class="row">
                <div class="col-4">
                  <m-image-uploader unique-id="1" :default="info.pic1"  @on-uploaded="onUploaded" @on-removed="onRemoved"></m-image-uploader>
                </div>
                <div class="col-4">
                  <m-image-uploader unique-id="2" :default="info.pic2"  @on-uploaded="onUploaded" @on-removed="onRemoved"></m-image-uploader>
                </div>
                <div class="col-4">
                  <m-image-uploader unique-id="3" :default="info.pic3"  @on-uploaded="onUploaded" @on-removed="onRemoved"></m-image-uploader>
                </div>
              </div>
            </div>
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
            <button class="btn btn-primary btn-small"  @click="onSave()">保存</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { MImageUploader, MBreadcrumb } from '../../../../common/components/'
  import { shopper } from '../../../../api'
  export default {
    components: {
      MImageUploader,
      MBreadcrumb
    },
    data () {
      return {
        breadcrumbData: [
          { name: '用户管理' },
          { name: '管理用户' },
          { name: '加盟商修改' }
        ],
        supplierList: [],
        info: {
          mobile: '',
          company_name: '',
          address: '',
          company_desc: '',
          fullname: '',
          tel: '',
          id_card: '',
          pic1: '',
          pic2: '',
          pic3: ''
        },
        updateing: false
      }
    },
    created () {
      this.loadInfo()
    },
    methods: {
      onUploaded: function (uniqueId, res) {
        uniqueId = parseInt(uniqueId)
        if (uniqueId === 1) {
          this.info.pic1 = res.url
        } else if (uniqueId === 2) {
          this.info.pic2 = res.url
        } else if (uniqueId === 3) {
          this.info.pic3 = res.url
        }
      },
      onRemoved: function (uniqueId) {
        uniqueId = parseInt(uniqueId)
        if (uniqueId === 1) {
          this.info.pic1 = ''
        } else if (uniqueId === 2) {
          this.info.pic2 = ''
        } else if (uniqueId === 3) {
          this.info.pic3 = ''
        }
      },
      onBack: function () {
        this.$router.go({
          name: 'shopper-service-index'
        })
      },
      loadInfo: function () {
        const self = this
        shopper.supplierDropdownList().then(function (res) {
          self.supplierList = res.data
        })
        shopper.serviceOne({shopper_id: this.$route.params.id}).then(function (res) {
          self.info = res.data
        }, function (res) {
          self.$notify({
            title: '拉取失败',
            message: res.tips,
            type: 'warning'
          })
        })
      },
      onSave: function () {
        const self = this
        this.updateing = true
        shopper.serviceUpdate(this.info).then(function (res) {
          self.$notify({
            title: '发放成功',
            message: res.tips,
            type: 'success'
          })
          self.$router.go({
            name: 'shopper-service-index'
          })
        }, function (res) {
          self.updateing = false
          self.$notify({
            title: '发放失败',
            message: res.tips,
            type: 'warning'
          })
        })
      }
    }
  }
</script>
