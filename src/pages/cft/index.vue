<template>
  <m-header></m-header>
  <m-side-nav :structure="navData"></m-side-nav>
  <router-view></router-view>
</template>

<script>
  import { MHeader, MSideNav } from '../../../common/components/'
  import navData from './navData.js'

  export default {
    components: {
      MHeader,
      MSideNav
    },
    data () {
      return {
        navData
      }
    }
  }
</script>

