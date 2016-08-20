<template>
<div>
  
    <div class="content">
      <m-breadcrumb :items="breadcrumbData"></m-breadcrumb>
      <div class="main-content">
        hello
      </div>
    </div>

</div>
</template>
<script>
  import MBreadcrumb from '../../../../common/components/breadcrumb.vue'

  export default {
    components: {
      MBreadcrumb
    },
    data () {
      return {
        breadcrumbData: [
          { name: '用户管理' },
          { name: '首页' }
        ]
      }
    }
  }
</script>