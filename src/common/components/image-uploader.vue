<template>
  <div class="single-image-uploader-box">
    <label :for="'profile-upload-' + uniqueId" class="single-upload-label">
    <img :src.sync="imageSrc" alt="" class="profile-image"
         v-bind:class="{'processing' : uploading, 'large': size === 'large', 'round': shape === 'round', 'full': size === 'full', 'rectangle': shape === 'rectangle' }"/>
    <input v-on:change="processFile" type="file" :id="'profile-upload-' + uniqueId"/>
    </label>

    <div class ="upload-status">
      <div class="upload-progress-container" v-show="uploading">
      <span class="upload-progress-bar"
            v-bind:style="{width: uploadPercentage + '%'}" ></span>
      </div>

      <el-button v-if="deleteBtnShow" type="danger" size="small" icon="circle-close" @click="onDelete();">删除</el-button>

      <div class="tips" v-if="!deleteBtnShow">只能上传jpg文件，且不超过500kb</div>
    </div>
    <!-- <p class="upload-message"
    v-bind:class="{'error': uploadStatus === 'error', 'success': uploadStatus === 'success'}"
    v-show="uploadMsg !== ''">{{ uploadMsg }}
    </p> -->
  </div>

</template>

<style scoped lang="less">
  @primary_blue: blue;
  @primary_dark: dark;
  @danger: red;
  .single-image-uploader-box {
    text-align: center;
    margin: 0px auto;
    width: 200px;
    .upload-status{
      height: 30px;
      vertical-align: text-bottom;
      position: relative;
      .tips{
        font-size: 12px;
        position: absolute;
        bottom: 0px;
      }
      button{
        margin-top: 5px;
      }
    }
    .profile-image {
      width: 200px;
      height: 200px;
      margin: 0 auto;
      display: block;
      border: 1px solid #C0CCDA;
      background-color: #F9FAFC;

      &.processing {
        filter: grayscale(100%);
      }

      &.large {
        width: 200px;
        height: 150px;
      }

      &.rectangle {
        width: 300px;
        height: 180px;
      }

      &.full {
        width: 100%;
        height: auto;
        min-height: 200px;
      }

      &.round {
        border-radius: 50%;
      }
    }

    .single-upload-label {
      display: block;
    }

    input[type=file] {
      display: none;
      width: 100%;
    }

    .upload-message {
      color: @primary_dark;
      padding: 4px 8px;
      border-radius: 5px;
      display: block;
      width: 100%;
      max-width: 300px;
      margin: 0 auto;
      text-align: center;

      &.error {
        color: white;
        background: @danger;
      }
    }

    .upload-progress-container {
      width: 100%;
      max-width: 250px;
      height: 16px;
      border: 1px solid @primary_dark;
      position: relative;
      display: block;
      margin: 0 auto;

      .upload-progress-bar {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        background: @primary_blue;
      }
    }
  }
</style>

<script >
import { uploader } from '../../api'
import defaultImg from '../../assets/default_image.gif'
module.exports = {
  props: {
    default: {
      type: String,
      default: defaultImg
    },
    url: {
      type: String,
      default: ''
    },
    shape: {
      type: String,
      default: 'full'
    },
    size: {
      type: String,
      default: 'large'
    },
    uniqueId: {
      type: String
    }
  },
  data () {
    return {
      imageSource: '',
      uploadMsg: '',
      uploading: true,
      uploadStatus: '',
      uploadPercentage: 0,
      deleteBtnShow: false
    }
  },

  computed: {
    imageSrc () {
      if (this.default.length === 0 || this.default === defaultImg) {
        this.imageSource = defaultImg
        this.deleteBtnShow = false
        this.uploading = true
        console.log(this.imageSource)
      } else {
        this.imageSource = this.default
        this.uploading = false
        this.deleteBtnShow = true
      }
      return this.imageSource ? this.imageSource : this.default
    }
  },
  methods: {
    processFile (ev) {
      var file = ev.target.files[0]
      console.log('file', file)
      this.clearMessage()
      if (file.type.indexOf('image') === -1) {
        this.showInvalidFile(file.name)
        return false
      }
      this.handleFile(file)
    },

    showInvalidFile (name) {
      this.uploadMsg = name + ' 不是一个有效的图片'
      this.uploadStatus = 'error'
    },

    handleFile (file) {
      /*global FileReader:true*/
      var fileReader = new FileReader()
      var self = this
      fileReader.onload = function (ev) {
        self.uploading = true
        self.imageSource = this.default = ev.target.result
      }
      fileReader.readAsDataURL(file)
      this.uploadFile(file)
    },

    uploadFile (file) {
      uploader.image(this.prepareFormData(file), this.getUploadOptions())
              .then(res => this.onUploadSuccess(res))
              .catch(err => this.onUploadFailed(err))
    },

    prepareFormData: function (file) {
      /*global FormData:true*/
      let fd = new FormData()
      fd.append('file', file)
      return fd
    },

    onUploadSuccess (res) {
      this.$notify({
        title: '上传成功',
        message: res.tips,
        type: 'success'
      })
      this.uploadMsg = '上传成功'
      this.uploadStatus = 'success'
      this.uploading = false
      this.$emit('on-uploaded', this.uniqueId, {fileType: res.data.file_type, fileExt: res.data.file_ext, fileSize: res.data.file_size, width: res.data.image_width, height: res.data.image_height, fileName: res.data.file_name, url: res.data.url})
      this.showDelete()
    },

    onUploadFailed () {
      this.uploadMsg = '上传失败'
      this.uploadStatus = 'error'
    },

    getUploadOptions () {
      return {
        progress: (ev) => this.showProgress(parseInt(ev.loaded / ev.total * 100))
      }
    },

    showProgress (progress) {
      console.log(progress + '% complete!')
      this.uploadPercentage = progress
    },

    clearMessage () {
      this.uploadMsg = ''
    },

    showDelete () {
      this.deleteBtnShow = true
    },

    onDelete () {
      this.deleteBtnShow = false
      this.imageSource = ''
      this.uploadMsg = ''
      this.uploading = true
      this.uploadStatus = ''
      this.uploadPercentage = 0
      this.$emit('on-removed', this.uniqueId)
    }
  }
}
</script>
