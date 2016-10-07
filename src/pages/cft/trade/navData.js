export default [
  {
    name: '订单管理',
    subNav: [
      {
        name: '管理订单',
        path: '/trade/order/index'
      },
      {
        name: '销售排名',
        path: '/trade/order/top'
      }
    ],
    expanded: true,
    iconClassName: 'iconfont icon-forms'
  },
  {
    name: '其他设置',
    subNav: [
      {
        name: '财务报表',
        path: '/trade/blanace/report'
      },
      {
        name: '定金结算',
        path: '/trade/blanace/bill'
      }
    ],
    expanded: true,
    iconClassName: 'iconfont icon-shezhi'
  }
]
