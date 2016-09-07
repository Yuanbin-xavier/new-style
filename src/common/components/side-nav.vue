<style lang="less" scoped>
  .nav {
    width: 220px;
    background-color: #fff;
    z-index: 1;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .nav a {
    text-decoration: none;
    color:#656b79;
  }

  .sub-nav {
    display: none;
    transition: 0.3s height ease-in-out, 0.3s padding-top ease-in-out, 0.3s padding-bottom ease-in-out;
  }
  .expanded .sub-nav {
    display: block;
  }

  .primary-nav-title {
    display: block;
    padding-left: 22px;
    line-height: 56px;
    font-size: 16px;
  }

  .primary-nav-icon {
    position: relative;
    top: 3px;
    margin-right: 9px;
    font-size: 18px;
  }

  .sub-nav-item {
    display: block;
    padding-left: 69px;
    font-size: 14px;
    line-height: 46px;
  }

  .sub-nav-item.active {
    background-color: #f6f8fa;
    color: #63a0e7;
  }
</style>

<template>
  <ul class="nav">
    <li class="primary-nav-item" v-for="item in structure" v-bind:class="{ 'expanded': !!item.expanded }">
      <a v-if="item.subNav.length" href="JavaScript:" class="primary-nav-title" @click="toggle(item)">
        <span class="primary-nav-icon" v-bind:class="item.iconClassName"></span>
        {{ item.name }}
      </a>
      <a v-if="item.path" v-link="{ path: item.path, activeClass: 'active' }" class="primary-nav-title">
        <span class="primary-nav-icon" v-bind:class="item.iconClassName"></span>
        {{ item.name }}
      </a>
      <ul class="sub-nav" v-if="item.subNav.length" transition="collapse">
        <a class="sub-nav-item" href="#"  v-for="subItem in item.subNav" v-link="{ path: subItem.path, activeClass: 'active' }">{{ subItem.name }} </a>
      </ul>
    </li>
  </ul>
</template>

<script>
  import collapse from './collapse-transition'

  export default {
    props: ['structure'],

    methods: {
      toggle (item) {
        item.expanded = !item.expanded
      }
    },

    transitions: {
      collapse
    }
  }
</script>
