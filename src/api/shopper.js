import Vue from 'vue'
import {CFT} from './constant'

const ShopperAction = {
  serviceList (data) {
    return new Promise((resolve, reject) => {
      let params = {keyword: data.keyword}
      Vue.http.get(`${CFT.BASE_API_URL}/shopper/inferior_join/${data.parent_shopper_id}/${data.page_index}/${data.page_size}`, {params}).then(function (response) {
        resolve(response.data)
      }, function (response) {
        reject(response.data)
      })
    })
  },
  serviceOne (data) {
    return new Promise((resolve, reject) => {
      Vue.http.post(`${CFT.BASE_API_URL}/shopper/shopper_info/${data.shopper_id}`, {shopper_id: data.shopper_id}).then(function (response) {
        resolve(response.data)
      }, function (response) {
        reject(response.data)
      })
    })
  },
  serviceAdd (data) {
    return new Promise((resolve, reject) => {
      Vue.http.post(`${CFT.BASE_API_URL}/shopper/add_join/${data.parent_shopper_id}`, data).then(function (response) {
        resolve(response.data)
      }, function (response) {
        reject(response.data)
      })
    })
  },
  serviceDropdownList (data) {
    return new Promise((resolve, reject) => {
      Vue.http.get(`${CFT.BASE_API_URL}/shopper/sevice_dropdown_list/${data.supperId}`, data).then(function (response) {
        resolve(response.data)
      }, function (response) {
        reject(response.data)
      })
    })
  },
  serviceUpdate (data) {
    return new Promise((resolve, reject) => {
      Vue.http.post(`${CFT.BASE_API_URL}/shopper/edit_join/`, data).then(function (response) {
        resolve(response.data)
      }, function (response) {
        reject(response.data)
      })
    })
  },
  serviceDelete (data) {
    return new Promise((resolve, reject) => {
      Vue.http.post(`${CFT.BASE_API_URL}//shopper/del_shopper/`, data).then(function (response) {
        resolve(response.data)
      }, function (response) {
        reject(response.data)
      })
    })
  },
  supplierDropdownList (data) {
    return new Promise((resolve, reject) => {
      Vue.http.get(`${CFT.BASE_API_URL}/shopper/supplier_dropdown_list/`, data).then(function (response) {
        resolve(response.data)
      }, function (response) {
        reject(response.data)
      })
    })
  },
  seviceDropdownList (data) {
    return new Promise((resolve, reject) => {
      Vue.http.get(`${CFT.BASE_API_URL}/shopper/sevice_dropdown_list/${data.supplier_id}/`).then(function (response) {
        resolve(response.data)
      }, function (response) {
        reject(response.data)
      })
    })
  },
  supplierList (data) {
    let params = {keyword: data.keyword}
    return new Promise((resolve, reject) => {
      Vue.http.get(`${CFT.BASE_API_URL}/shopper/supplier_list/${data.pageIndex}/${data.pageSize}/`, {params}).then(function (response) {
        resolve(response.data)
      }, function (response) {
        reject(response.data)
      })
    })
  },
  supplierAdd (data) {
    return new Promise((resolve, reject) => {
      Vue.http.post(`${CFT.BASE_API_URL}/shopper/add_supplier/`, data).then(function (response) {
        resolve(response.data)
      }, function (response) {
        reject(response.data)
      })
    })
  },
  supplierOne (data) {
    return new Promise((resolve, reject) => {
      Vue.http.get(`${CFT.BASE_API_URL}/shopper/shopper_info/${data.shopper_id}`).then(function (response) {
        resolve(response.data)
      }, function (response) {
        reject(response.data)
      })
    })
  },
  supplierUpdate (data) {
    return new Promise((resolve, reject) => {
      Vue.http.post(`${CFT.BASE_API_URL}/shopper/edit_supplier/`, data).then(function (response) {
        resolve(response.data)
      }, function (response) {
        reject(response.data)
      })
    })
  },
  supplierDelete (data) {
    return new Promise((resolve, reject) => {
      Vue.http.post(`${CFT.BASE_API_URL}//shopper/del_shopper/`, data).then(function (response) {
        resolve(response.data)
      }, function (response) {
        reject(response.data)
      })
    })
  },
  shopList (data) {
    return new Promise((resolve, reject) => {
      let params = {keyword: data.keyword}
      Vue.http.get(`${CFT.BASE_API_URL}/shopper/inferior_shop/${data.shopper_id}/${data.page_index}/${data.page_size}/`, {params}).then(function (response) {
        resolve(response.data)
      }, function (response) {
        reject(response.data)
      })
    })
  },
  shopOne (data) {
    return new Promise((resolve, reject) => {
      let params = {keyword: data.keyword}
      Vue.http.get(`${CFT.BASE_API_URL}/shopper/shop_info/${data.shopId}`, {params}).then(function (response) {
        resolve(response.data)
      }, function (response) {
        reject(response.data)
      })
    })
  },
  shopAdd (data) {
    return new Promise((resolve, reject) => {
      Vue.http.post(`${CFT.BASE_API_URL}/shopper/add_shop/${data.shopper_id}/`, data).then(function (response) {
        resolve(response.data)
      }, function (response) {
        reject(response.data)
      })
    })
  },
  shopUpdate (data) {
    return new Promise((resolve, reject) => {
      Vue.http.post(`${CFT.BASE_API_URL}/shopper/edit_shop`, data).then(function (response) {
        resolve(response.data)
      }, function (response) {
        reject(response.data)
      })
    })
  },
  shopDelete (data) {
    return new Promise((resolve, reject) => {
      Vue.http.post(`${CFT.BASE_API_URL}/shopper/del_shop`, data).then(function (response) {
        resolve(response.data)
      }, function (response) {
        reject(response.data)
      })
    })
  },
  staffList (data) {
    return new Promise((resolve, reject) => {
      let params = {keyword: data.keyword}
      Vue.http.get(`${CFT.BASE_API_URL}/shopper/shop_clerk/${data.shop_id}/${data.page_index}/${data.shopper_id}${data.page_size}/`, {params}).then(function (response) {
        resolve(response.data)
      }, function (response) {
        reject(response.data)
      })
    })
  },
  managerList (data) {
    return new Promise((resolve, reject) => {
      let params = {keyword: data.keyword}
      Vue.http.get(`${CFT.BASE_API_URL}/admin/admin_list/${data.page_index}/${data.page_size}`, {params}).then(function (response) {
        resolve(response.data)
      }, function (response) {
        reject(response.data)
      })
    })
  },
  shopinferior (data) {
    return new Promise((resolve, reject) => {
      let params = {keyword: data.keyword}
      Vue.http.get(`${CFT.BASE_API_URL}/shopper/shop_clerk/${data.shop_id}/${data.page_index}/${data.page_size}`, {params}).then(function (response) {
        resolve(response.data)
      }, function (response) {
        reject(response.data)
      })
    })
  },
  shopperIntroduce (data) {
    return new Promise((resolve, reject) => {
      let params = {keyword: data.keyword}
      Vue.http.get(`${CFT.BASE_API_URL}/shopper/introduce/${data.shopper_id}/`, {params}).then(function (response) {
        resolve(response.data)
      }, function (response) {
        reject(response.data)
      })
    })
  },
  adminlist (data) {
    return new Promise((resolve, reject) => {
      let params = {keyword: data.keyword}
      Vue.http.get(`${CFT.BASE_API_URL}/admin/admin_list/${data.page_index}/${data.page_size}/`, {params}).then(function (response) {
        resolve(response.data)
      }, function (response) {
        reject(response.data)
      })
    })
  },
  orderlist (data) {
    return new Promise((resolve, reject) => {
      let params = {keyword: data.keyword, begin_date: data.begin_date, end_date: data.end_date, status_id: data.status_id, shop_id: data.shop_id}
      Vue.http.get(`${CFT.BASE_API_URL}/order/order_list/${data.page_index}/${data.page_size}/`, {params}).then(function (response) {
        resolve(response.data)
      }, function (response) {
        reject(response.data)
      })
    })
  },
  oalesrank (data) {
    return new Promise((resolve, reject) => {
      Vue.http.get(`${CFT.BASE_API_URL}/order/sales_rank/`, data).then(function (response) {
        resolve(response.data)
      }, function (response) {
        reject(response.data)
      })
    })
  },
  orderinancia (data) {
    let params = {begin_date: data.begin_date, end_date: data.end_date}
    return new Promise((resolve, reject) => {
      Vue.http.get(`${CFT.BASE_API_URL}/order/financial_statements/`, {params}).then(function (response) {
        resolve(response.data)
      }, function (response) {
        reject(response.data)
      })
    })
  },
  couponlist (data) {
    return new Promise((resolve, reject) => {
      let params = {keyword: data.keyword, shop_id: data.shop_id, status_id: data.status_id, begin_datetime: data.begin_datetime, end_datetime: data.end_datetime}
      Vue.http.get(`${CFT.BASE_API_URL}/coupon/coupon_list/${data.page_index}/${data.page_size}/`, {params}).then(function (response) {
        resolve(response.data)
      }, function (response) {
        reject(response.data)
      })
    })
  },
  devicelist (data) {
    return new Promise((resolve, reject) => {
      let params = {shop_id: data.shop_id, is_activated: data.is_activated, sn: data.sn}
      Vue.http.get(`${CFT.BASE_API_URL}/device/device_list/${data.page_index}/${data.page_size}/`, {params}).then(function (response) {
        resolve(response.data)
      }, function (response) {
        reject(response.data)
      })
    })
  },
  adminpssword (data) {
    return new Promise((resolve, reject) => {
      Vue.http.get(`${CFT.BASE_API_URL}/admin/edit_password/${data.admin_id}/`).then(function (response) {
        resolve(response.data)
      }, function (response) {
        reject(response.data)
      })
    })
  },
  orderinfo (data) {
    return new Promise((resolve, reject) => {
      Vue.http.get(`${CFT.BASE_API_URL}/order/order_info/${data.order_id}/`).then(function (response) {
        resolve(response.data)
      }, function (response) {
        reject(response.data)
      })
    })
  },
  couponinfo (data) {
    return new Promise((resolve, reject) => {
      Vue.http.get(`${CFT.BASE_API_URL}/coupon/coupon_info/${data.coupon_rule_id}/`).then(function (response) {
        resolve(response.data)
      }, function (response) {
        reject(response.data)
      })
    })
  },
  admininfo (data) {
    return new Promise((resolve, reject) => {
      Vue.http.get(`${CFT.BASE_API_URL}/admin/admin_info/${data.admin_id}/`, data).then(function (response) {
        resolve(response.data)
      }, function (response) {
        reject(response.data)
      })
    })
  },
  adminedit (data) {
    return new Promise((resolve, reject) => {
      Vue.http.post(`${CFT.BASE_API_URL}/admin/edit_admin/`, data).then(function (response) {
        resolve(response.data)
      }, function (response) {
        reject(response.data)
      })
    })
  },
  ordersales (data) {
    return new Promise((resolve, reject) => {
      let params = {begin_datetime: data.begin_datetime, end_datetime: data.end_datetime}
      Vue.http.get(`${CFT.BASE_API_URL}/order/deposit_settlement/${data.page_index}/${data.page_size}`, {params}).then(function (response) {
        resolve(response.data)
      }, function (response) {
        reject(response.data)
      })
    })
  },
  deviceshoplist (data) {
    return new Promise((resolve, reject) => {
      Vue.http.get(`${CFT.BASE_API_URL}/device/shop_list/${data.page_index}/${data.page_size}/`, data).then(function (response) {
        resolve(response.data)
      }, function (response) {
        reject(response.data)
      })
    })
  },
  orderdeposit (data) {
    return new Promise((resolve, reject) => {
      let params = {begin_datetime: data.begin_datetime, end_datetime: data.end_datetime}
      Vue.http.get(`${CFT.BASE_API_URL}/order/deposit_settlement/${data.page_index}/${data.page_size}`, {params}).then(function (response) {
        resolve(response.data)
      }, function (response) {
        reject(response.data)
      })
    })
  },
  admindel (data) {
    return new Promise((resolve, reject) => {
      Vue.http.post(`${CFT.BASE_API_URL}/admin/del_admin/`, data).then(function (response) {
        resolve(response.data)
      }, function (response) {
        reject(response.data)
      })
    })
  },
  devicegrant (data) {
    return new Promise((resolve, reject) => {
      Vue.http.post(`${CFT.BASE_API_URL}/device/grant_device/`, data).then(function (response) {
        resolve(response.data)
      }, function (response) {
        reject(response.data)
      })
    })
  },
  devicdedel (data) {
    return new Promise((resolve, reject) => {
      Vue.http.post(`${CFT.BASE_API_URL}/device/del_device/`, data).then(function (response) {
        resolve(response.data)
      }, function (response) {
        reject(response.data)
      })
    })
  },
  admineditpassword (data) {
    return new Promise((resolve, reject) => {
      Vue.http.post(`${CFT.BASE_API_URL}/admin/edit_onlin_admin_pass/`, data).then(function (response) {
        resolve(response.data)
      }, function (response) {
        reject(response.data)
      })
    })
  },
  adminpassword (data) {
    return new Promise((resolve, reject) => {
      Vue.http.post(`${CFT.BASE_API_URL}/admin/edit_password/`, data).then(function (response) {
        resolve(response.data)
      }, function (response) {
        reject(response.data)
      })
    })
  },
  adminsetislock (data) {
    return new Promise((resolve, reject) => {
      Vue.http.post(`${CFT.BASE_API_URL}/admin/set_is_lock/`, data).then(function (response) {
        resolve(response.data)
      }, function (response) {
        reject(response.data)
      })
    })
  },
  shopperinfo (data) {
    return new Promise((resolve, reject) => {
      Vue.http.get(`${CFT.BASE_API_URL}/shopper/shopper_info/${data.shopper_id}/`, data).then(function (response) {
        resolve(response.data)
      }, function (response) {
        reject(response.data)
      })
    })
  },
  shoppperdel (data) {
    return new Promise((resolve, reject) => {
      Vue.http.post(`${CFT.BASE_API_URL}/shopper/del_shop/`, data).then(function (response) {
        resolve(response.data)
      }, function (response) {
        reject(response.data)
      })
    })
  },
  couponsetpass (data) {
    return new Promise((resolve, reject) => {
      Vue.http.post(`${CFT.BASE_API_URL}/coupon/set_pass/`, data).then(function (response) {
        resolve(response.data)
      }, function (response) {
        reject(response.data)
      })
    })
  },
  couponsetnotpass (data) {
    return new Promise((resolve, reject) => {
      Vue.http.post(`${CFT.BASE_API_URL}/coupon/set_not_pass/`, data).then(function (response) {
        resolve(response.data)
      }, function (response) {
        reject(response.data)
      })
    })
  },
  adminadd (data) {
    return new Promise((resolve, reject) => {
      Vue.http.post(`${CFT.BASE_API_URL}/admin/add_admin/`, data).then(function (response) {
        resolve(response.data)
      }, function (response) {
        reject(response.data)
      })
    })
  },
  allShopCount () {
    return new Promise((resolve, reject) => {
      Vue.http.get(`${CFT.BASE_API_URL}/admin/all_shop/`).then(function (response) {
        resolve(response.data)
      }, function (response) {
        reject(response.data)
      })
    })
  },
  allOrderCount () {
    return new Promise((resolve, reject) => {
      Vue.http.get(`${CFT.BASE_API_URL}/admin/all_order/`).then(function (response) {
        resolve(response.data)
      }, function (response) {
        reject(response.data)
      })
    })
  },
  orderexcel (data) {
    return new Promise((resolve, reject) => {
      Vue.http.get(`${CFT.BASE_API_URL}/order/export_excel/${data.shop_id}/`, data).then(function (response) {
        resolve(response.data)
      }, function (response) {
        reject(response.data)
      })
    })
  },
  adminthismonthaddordernum (data) {
    return new Promise((resolve, reject) => {
      Vue.http.get(`${CFT.BASE_API_URL}/admin/this_month_add_order_num/`, data).then(function (response) {
        resolve(response.data)
      }, function (response) {
        reject(response.data)
      })
    })
  },
  addsettlement (data) {
    return new Promise((resolve, reject) => {
      Vue.http.post(`${CFT.BASE_API_URL}/order/add_settlement_search`, data).then(function (response) {
        resolve(response.data)
      }, function (response) {
        reject(response.data)
      })
    })
  },
  orderaddsettlement (data) {
    return new Promise((resolve, reject) => {
      Vue.http.post(`${CFT.BASE_API_URL}/order/add_settlement`, data).then(function (response) {
        resolve(response.data)
      }, function (response) {
        reject(response.data)
      })
    })
  },
  orderdelbill (data) {
    return new Promise((resolve, reject) => {
      Vue.http.post(`${CFT.BASE_API_URL}/order/del_bill`, data).then(function (response) {
        resolve(response.data)
      }, function (response) {
        reject(response.data)
      })
    })
  }
}
export default ShopperAction
