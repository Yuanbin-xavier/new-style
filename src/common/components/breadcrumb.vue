<style scoped>
  .breadcrumb {
    padding: 11px 0 13px 1.25rem;
    margin: 0;
  }

  .breadcrumb > li {
    font-size: 12px;
    line-height: 12px;
  }

  .breadcrumb li a {
    color: #999da7;
  }

  .breadcrumb a[href] {
    text-decoration: underline;
  }

  .breadcrumb .current a {
    color: #656b79;
    text-decoration: none;
  }
</style>

<template>
  <ol class="breadcrumb">
    <li v-for="item in items" v-bind:class="{ 'current': $index === items.length - 1 }">
      <a v-if="item.path" v-link="{ path: item.path }">{{ item.name }}</a>
      <template v-else>{{ item.name }}</template>
    </li>
  </ol>
</template>

<script>
  export default {
    props: {
      items: {}
    }
  }
</script>
