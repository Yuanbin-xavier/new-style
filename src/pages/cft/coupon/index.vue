ß<template>
  <side-nav :structure="navData"></side-nav>
  <router-view></router-view>
</template>

<script>
  import SideNav from '../../../common/components/side-nav.vue'
  import navData from './navData.js'

  export default {
    components: {
      SideNav
    },
    data () {
      return {
        navData
      }
    }
  }
</script>

