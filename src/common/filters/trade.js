import Vue from 'vue'

Vue.filter('showStatusIcon', function (id) {
  id = parseInt(id)
  if (id === 0) {
    return '待付款'
  } else if (id === 1) {
    return '待下单'
  } else if (id === 2) {
    return '已付款'
  }
})
