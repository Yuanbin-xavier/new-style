import NotFound from '../pages/errors/404.vue'
import Login from '../pages/cft/login.vue'
import Home from '../pages/cft/home/index.vue'
import HomeIndex from '../pages/cft/home/index/index.vue'
import ChangePasword from '../pages/cft/home/index/change-passwrd.vue'
import Shopper from '../pages/cft/shopper/index.vue'
import Trade from '../pages/cft/trade/index.vue'
import Coupon from '../pages/cft/coupon/index.vue'
import Config from '../pages/cft/config/index.vue'

import ShopperInderx from '../pages/cft/shopper/index/index.vue'

import shopper from '../pages/cft/shopper/shopper/index.vue'
import ShopperSupplierAdd from '../pages/cft/shopper/shopper/add.vue'
import ShopperSupplierEdit from '../pages/cft/shopper/shopper/edit.vue'

import ShopperService from '../pages/cft/shopper/service/index.vue'
import ShopperServiceEdit from '../pages/cft/shopper/service/edit.vue'
import ShopperServiceAdd from '../pages/cft/shopper/service/add.vue'

import Shop from '../pages/cft/shopper/shop/index.vue'
import Staff from '../pages/cft/shopper/staff/index.vue'

import Admin from '../pages/cft/admin/index.vue'
import AdminIndex from '../pages/cft/admin/users/index.vue'

import OrderIndex from '../pages/cft/trade/order/index.vue'
import OrderTop from '../pages/cft/trade/order/top.vue'
import BlanaceReport from '../pages/cft/trade/blanace/report.vue'
module.exports = {
  '/': {
    component: Home,
    name: 'home',
    auth: true,
    subRoutes: {
      '/home/index': {
        component: HomeIndex,
        auth: true,
        name: 'home-index'
      },
      '/home/change-password': {
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
  '/admin': {
    component: Admin,
    name: 'admin',
    subRoutes: {
      '/index': {
        component: AdminIndex,
        auth: true,
        name: 'admin-admin'
      }
    }
  },
  '/shopper': {
    component: Shopper,
    name: 'shopper',
    auth: true,
    subRoutes: {
      '/index': {
        component: ShopperInderx,
        auth: true,
        name: 'shopper-index'
      },
      '/shopper/index': {
        component: shopper,
        auth: true,
        name: 'shopper-shopper'
      },
      '/shopper/add': {
        component: ShopperSupplierAdd,
        auth: true,
        name: 'shopper-supplier-add'
      },
      '/shopper/edit/:id': {
        component: ShopperSupplierEdit,
        auth: true,
        name: 'shopper-supplier-edit'
      },
      '/service/index': {
        component: ShopperService,
        auth: true,
        name: 'service-index'
      },
      '/service/add': {
        component: ShopperServiceAdd,
        auth: true,
        name: 'service-add'
      },
      '/service/edit/:id': {
        component: ShopperServiceEdit,
        auth: true,
        name: 'service-add'
      },
      '/shop/index': {
        component: Shop,
        auth: true,
        name: 'shop-index'
      },
      '/staff/index': {
        component: Staff,
        auth: true,
        name: 'shop-staff'
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
        name: 'order-index'
      },
      '/order/top': {
        component: OrderTop,
        auth: true,
        name: 'order-top'
      },
      '/blanace/report': {
        component: BlanaceReport,
        auth: true,
        name: 'blanace-report'
      }
    }
  },
  '/coupon': {
    component: Coupon,
    name: 'coupon'
  },
  '/config': {
    component: Config,
    name: 'config'
  },
  '*': {
    component: NotFound
  }
}
