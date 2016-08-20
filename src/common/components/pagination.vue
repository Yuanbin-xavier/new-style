<style scoped>
  .pagination > span {
    float: left;
    margin-right: 0.5em;
  }
</style>

<template>
  <div class="pagination pagination-sm">
    <a href="JavaScript:" @click="go(-1)">«</a>
    <template v-for="page in content">
      <a href="JavaScript:" v-if="!page.ellipsis" @click="jumpTo(page.number)" v-bind:class="{ 'active': page.number === currentPage }">{{ page.number }}</a>
      <span v-if="page.ellipsis">...</span>
    </template>
    <a href="JavaScript:" @click="go(1)">»</a>
  </div>
</template>

<script>
  export default {
    props: {
      'totalCount': Number,
      'limit': Number,
      'offset': Number,
      'callback': Function
    },

    data () {
      return {
        content: []
      }
    },

    methods: {
      refresh () {
        for (let i = 0, len = this.content.length; i < len; i++) {
          this.content.shift()
        }
        this.totalPage = Math.ceil(this.totalCount / this.limit)
        this.currentPage = this.offset + 1
        if (this.totalPage <= 7) {
          for (let i = 1; i <= this.totalPage; i++) {
            this.content.push({ number: i, ellipsis: false })
          }
        } else {
          let leftDistance = this.currentPage - 1
          let rightDistance = this.totalPage - this.currentPage
          if (leftDistance < 3) { // 没有左省略号
            for (let i = 1; i <= 5; i++) {
              this.content.push({ number: i, ellipsis: false })
            }
            this.content.push({ number: null, ellipsis: true })
            this.content.push({ number: this.totalPage, ellipsis: false })
          } else if (rightDistance < 3) { // 没有右省略号
            this.content.push({ number: 1, ellipsis: false })
            this.content.push({ number: null, ellipsis: true })
            for (let i = this.totalPage - 4; i <= this.totalPage; i++) {
              this.content.push({ number: i, ellipsis: false })
            }
          } else { // 两侧都有省略号
            this.content.push({ number: 1, ellipsis: false })
            this.content.push({ number: null, ellipsis: true })
            this.content.push({ number: this.currentPage - 1, ellipsis: false })
            this.content.push({ number: this.currentPage, ellipsis: false })
            this.content.push({ number: this.currentPage + 1, ellipsis: false })
            this.content.push({ number: null, ellipsis: true })
            this.content.push({ number: this.totalPage, ellipsis: false })
          }
        }
      },
      go (step) {
        if (this.currentPage + step < 1 || this.currentPage + step > this.totalPage) {
          return
        }
        this.offset += step
        this.refresh()
        this.callback(this.offset, this.limit)
      },
      jumpTo (page) {
        this.offset = page - 1
        this.refresh()
        this.callback(this.offset, this.limit)
      }
    },

    ready () {
      this.refresh()
    },

    watches: {
      'totalCount' () {
        this.refresh()
      },
      'limit' () {
        this.refresh()
      },
      'offset' () {
        this.refresh()
      }
    }
  }
</script>