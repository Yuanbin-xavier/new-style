import Vue from 'vue'

Vue.filter('showStatusIcon', function (id) {
  id = parseInt(id)
  if (id === 1) {
    return '待支付'
  } else if (id === 2) {
    return '已支付'
  } else if (id === 3) {
    return '验车完成'
  } else if (id === 4) {
    return '制定方案并清洗完成'
  } else if (id === 8) {
    return '订单服务完成'
  } else if (id === 9) {
    return '订单已评价'
  } else if (id === 10) {
    return '确认结清尾款'
  }
})
