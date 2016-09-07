<style scoped>
.right .form-label {
  width: 100px;
  text-align: right;
  line-height: 50px;
}
.right textarea.input {
  display: inline-block;
  margin: 0 16px 0 0;
  width: 300px;
  height: 60px;
  line-height: 30px;
  font-size: 12px;
}
.right input.input {
  display: inline-block;
  margin: 0 16px 0 0;
  width: 300px;
  height: 30px;
  line-height: 30px;
  font-size: 12px;
}
.form-block{
  width: 90%;
  text-align: center;
}
</style>

<template>
  <div class="content">
    <m-breadcrumb :items="breadcrumbData"></m-breadcrumb>
    <div class="main-content">
      <div class="main-content-hd">
        <button class="btn btn-white btn-small pull-right" @click="onBack()">返回</button>
        <h3>店铺添加</h3>
      </div>
      <div class="main-content-bd">
        <div class="main-content-bd-block right">
          <h4>基本信息</h4>
          <hr>
          <div>
            <label class="form-label">加盟商:</label>
            <select class="select"  v-model="info.shopper_id">
              <option v-for="option in serviceList" v-bind:value="option.shopper_id">
                {{ option.company_name }}
              </option>
            </select>
          </div>
          <div>
            <label class="form-label">店铺名称:</label>
            <input type="text" class="input"  v-model="info.shop_name">
          </div>
          <div>
            <label class="form-label">店铺LOGO:</label>
            <div class="form-block" style="width:100px">
              <m-image-uploader unique-id="0" :default="info.logo" @on-uploaded="onUploaded" @on-removed="onRemoved"></m-image-uploader>
            </div>  
          </div>
          <div>
            <label class="form-label">店铺介绍:</label>
            <textarea class="input" v-model="info.shop_desc" style="width:500px; height:200px;" ></textarea>
          </div>
          <div>
            <label class="form-label">店铺地址:</label>
            <input type="text" class="input" v-model="info.address">
          </div>
          <div>
            <label class="form-label">店铺地图坐标:</label>
            <input type="text"  class="input" v-model="info.point">
            <button class="btn btn-white btn-small" @click="getPoint()">地图拾取</button>
          </div>
          <div>
            <label class="form-label">店铺形象照片:</label>
            <div class="form-block">
              <div class="row">
                <div class="col-4">
                  <m-image-uploader unique-id="1" :default="info.pic1" @on-uploaded="onUploaded" @on-removed="onRemoved"></m-image-uploader>
                </div>
                <div class="col-4">
                  <m-image-uploader unique-id="2" :default="info.pic2" @on-uploaded="onUploaded" @on-removed="onRemoved"></m-image-uploader>
                </div>
                <div class="col-4">
                  <m-image-uploader unique-id="3" :default="info.pic3" @on-uploaded="onUploaded" @on-removed="onRemoved"></m-image-uploader>
                </div>
                <div class="col-4">
                  <m-image-uploader unique-id="4" :default="info.pic4" @on-uploaded="onUploaded" @on-removed="onRemoved"></m-image-uploader>
                </div>
                <div class="col-4">
                  <m-image-uploader unique-id="5" :default="info.pic5" @on-uploaded="onUploaded" @on-removed="onRemoved"></m-image-uploader>
                </div>
              </div>
            </div>
          </div>

          <h4>基础服务</h4>
          <hr>
          <div>
            <label class="form-label">服务名称:</label>
            <input type="text" class="input" v-model="info.service_name">
          </div>
          <div>
            <label class="form-label">服务介绍:</label>
            <textarea class="input" style="width:500px; height:200px;"  v-model="info.service_desc"></textarea>
          </div>
          <div>
            <label class="form-label">服务照片:</label>

            <div class="form-block">
              <div class="row">
                <div class="col-4">
                  <m-image-uploader unique-id="6" :default="info.pic" @on-uploaded="onUploaded" @on-removed="onRemoved"></m-image-uploader>
                </div>
              </div>
            </div>
          </div>
          <div>
            <label class="form-label">定金:</label>
            <input type="text" class="input" v-model="info.deposit">
          </div>
          <div>
            <label class="form-label">总价:</label>
            <input type="text" class="input" v-model="info.price">
          </div>
          <div class="pagination-container" style="text-align: right;">
            <el-button type="primary" size="large" @click="onSave()" :loading.sync="updateing">保存</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { MBreadcrumb, MImageUploader } from '../../../../common/components/'
  import { shopper } from '../../../../api'
  export default {
    components: {
      MBreadcrumb,
      MImageUploader
    },
    data () {
      return {
        breadcrumbData: [
          { name: '用户管理' },
          { name: '管理用户' },
          { name: '加盟商列表' },
          { name: '添加店铺' }
        ],
        serviceList: [],
        traceList: [],
        traceListPagination: {
          totalCount: 105,
          offset: 0,
          limit: 10
        },
        info: {
        },
        updateing: false
      }
    },
    created () {
      const self = this
      shopper.serviceDropdownList({supperId: 0}).then(function (res) {
        self.serviceList = res.data
      })
    },
    methods: {
      getPoint: function () {
        window.open('http://lbs.qq.com/tool/getpoint/')
      },
      onUploaded: function (uniqueId, res) {
        uniqueId = parseInt(uniqueId)
        if (uniqueId === 1) {
          this.info.pic1 = res.url
        } else if (uniqueId === 2) {
          this.info.pic2 = res.url
        } else if (uniqueId === 3) {
          this.info.pic3 = res.url
        } else if (uniqueId === 4) {
          this.info.pic4 = res.url
        } else if (uniqueId === 5) {
          this.info.pic5 = res.url
        } else if (uniqueId === 6) {
          this.info.pic = res.url
        } else if (uniqueId === 0) {
          this.info.logo = res.url
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
        } else if (uniqueId === 4) {
          this.info.pic4 = ''
        } else if (uniqueId === 5) {
          this.info.pic5 = ''
        } else if (uniqueId === 6) {
          this.info.pic = ''
        } else if (uniqueId === 0) {
          this.info.logo = ''
        }
      },
      onBack: function () {
        this.$router.go({
          name: 'shopper-shop-index',
          params: {id: 0}
        })
      },
      onSave: function () {
        const self = this
        this.updateing = true
        shopper.shopAdd(this.info).then(function (res) {
          self.$notify({
            title: '新增成功',
            message: res.tips,
            type: 'success'
          })
          window.history.go(-1)
        }, function (res) {
          self.updateing = false
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
