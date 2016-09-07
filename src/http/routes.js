// import NotFound from '../pages/errors/404.vue'
import Login from '../pages/cft/login.vue'
import Home from '../pages/cft/home/index.vue'
import HomeIndex from '../pages/cft/home/index/index.vue'
import ChangePasword from '../pages/cft/home/index/change-passwrd.vue'
import Shopper from '../pages/cft/shopper/index.vue'
import Trade from '../pages/cft/trade/index.vue'
import Coupon from '../pages/cft/coupon/index.vue'

import shopper from '../pages/cft/shopper/supplier/index.vue'
import ShopperSupplierAdd from '../pages/cft/shopper/supplier/add.vue'
import ShopperSupplierEdit from '../pages/cft/shopper/supplier/edit.vue'

import ShopperService from '../pages/cft/shopper/service/index.vue'
import ShopperServiceEdit from '../pages/cft/shopper/service/edit.vue'
import ShopperServiceAdd from '../pages/cft/shopper/service/add.vue'

import Shop from '../pages/cft/shopper/shop/index.vue'
import ShopAdd from '../pages/cft/shopper/shop/add.vue'
import ShopEdit from '../pages/cft/shopper/shop/edit.vue'

import Staff from '../pages/cft/shopper/staff/index.vue'

import AdminIndex from '../pages/cft/shopper/admin/index.vue'
import AdminEdit from '../pages/cft/shopper/admin/edit.vue'
import AdminEditpassword from '../pages/cft/shopper/admin/editpassword.vue'
import AdminAdd from '../pages/cft/shopper/admin/add.vue'

import OrderIndex from '../pages/cft/trade/order/index.vue'
import OrderTop from '../pages/cft/trade/order/top.vue'
import OrderDetails from '../pages/cft/trade/order/orderdetails.vue'

import BlanaceReport from '../pages/cft/trade/blanace/report.vue'
import BlanaceBill from '../pages/cft/trade/blanace/bill.vue'
import BlanaceAdd from '../pages/cft/trade/blanace/add.vue'

import VouchersIndex from '../pages/cft/coupon/vouchers/index.vue'
import VouchersVouchers from '../pages/cft/coupon/vouchers/vouchers.vue'

import Config from '../pages/cft/config/index.vue'
// import BrandIndex from '../pages/cft/config/brand/index.vue'
import DeviceLinelist from '../pages/cft/config/brand/devicelist.vue'
import DrandFacility from '../pages/cft/config/brand/facility.vue'

module.exports = {
  '/home': {
    component: Home,
    name: 'home',
    auth: true,
    subRoutes: {
      '/index': {
        component: HomeIndex,
        auth: true,
        name: 'home-index'
      },
      '/change-password': {
        component: ChangePasword,
        auth: true,
        name: 'change-password'
      }
    }
  },
  '/login': {
    component: Login,
    name: 'login'
  },
  '/shopper': {
    component: Shopper,
    name: 'shopper',
    auth: true,
    subRoutes: {
      '/supplier/index': {
        component: shopper,
        auth: true,
        name: 'shopper-supplier-index'
      },
      '/supplier/add': {
        component: ShopperSupplierAdd,
        auth: true,
        name: 'shopper-supplier-add'
      },
      '/supplier/edit/:id': {
        component: ShopperSupplierEdit,
        auth: true,
        name: 'shopper-supplier-edit'
      },
      '/service/index/:id': {
        component: ShopperService,
        auth: true,
        name: 'shopper-service-index'
      },
      '/service/add': {
        component: ShopperServiceAdd,
        auth: true,
        name: 'shopper-service-add'
      },
      '/service/edit/:id': {
        component: ShopperServiceEdit,
        auth: true,
        name: 'shopper-service-edit'
      },
      '/shop/index/:id': {
        component: Shop,
        auth: true,
        name: 'shopper-shop-index'
      },
      '/shop/add': {
        component: ShopAdd,
        auth: true,
        name: 'shopper-shop-add'
      },
      '/shop/edit/:id': {
        component: ShopEdit,
        auth: true,
        name: 'shopper-shop-edit'
      },
      '/staff/index': {
        component: Staff,
        auth: true,
        name: 'shopper-shop-staff'
      },
      '/admin/index': {
        component: AdminIndex,
        auth: true,
        name: 'shopper-admin-index'
      },
      '/admin/edit/:id': {
        component: AdminEdit,
        auth: true,
        name: 'admin-edit'
      },
      '/admin/editpassword/:id': {
        component: AdminEditpassword,
        auth: true,
        name: 'admin-editpassword'
      },
      '/admin/add': {
        component: AdminAdd,
        auth: true,
        name: 'admin-add'
      }
    }
  },
  '/trade': {
    component: Trade,
    name: 'trade',
    auth: true,
    subRoutes: {
      '/order/index': {
        component: OrderIndex,
        auth: true,
        name: 'trade-order-index'
      },
      '/order/top': {
        component: OrderTop,
        auth: true,
        name: 'trade-order-top'
      },
      '/blanace/report': {
        component: BlanaceReport,
        auth: true,
        name: 'trade-blanace-report'
      },
      '/blanace/bill': {
        component: BlanaceBill,
        auth: true,
        name: 'blanae-bill'
      },
      'order/orderdetails/:id': {
        component: OrderDetails,
        auth: true,
        name: 'order-orderdetails'
      },
      'blanace/add': {
        component: BlanaceAdd,
        auth: true,
        name: 'blanace-add'
      }
    }
  },
  '/coupon': {
    component: Coupon,
    auth: true,
    name: 'coupon',
    subRoutes: {
      '/vouchers/index': {
        component: VouchersIndex,
        auth: true,
        name: 'vouchers-index'
      },
      '/vouchers/vouchers/:id': {
        component: VouchersVouchers,
        auth: true,
        name: 'vouchers-vouchers'
      }
    }
  },

  '/config': {
    component: Config,
    name: 'config',
    auth: true,
    subRoutes: {
      '/brand/devicelist': {
        component: DeviceLinelist,
        auth: true,
        name: 'device-list'
      },
      '/brand/facility/': {
        component: DrandFacility,
        auth: true,
        name: 'device-facility'
      }
    }
  }
}
