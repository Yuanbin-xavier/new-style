import Vue from 'vue'
const baseUrl = 'http://cft-api.dongkatech.com/api'

export default {
  adminLogin (data) {
    return Vue.http.post(`${baseUrl}/admin/login`, data)
  },
  adminCurrentProfile () {
    return Vue.http.get(`${baseUrl}/admin/profile`) // ${JSON.stringify(where)}`)
  },
  adminChangePassword (data) {
    return Vue.http.post(`${baseUrl}/admin/edit_password`, data)
  },
  shoperServiceList (data) {
    let params = {keyword: data.keyword}
    return Vue.http.get(`${baseUrl}/shopper/inferior_join/${data.shopperSupperId}/${data.pageIndex}/${data.pageSize}/`, {params})
  },
  shoperServiceOne (data) {
    return Vue.http.post(`${baseUrl}/shopper/shopper_info/`, {shopper_id: data.shopper_id})
  },
  shoperServiceAdd (data) {
    console.log(data)
    console.log(`${baseUrl}/shopper/add_join/` + data.parent_shopper_id)
    return Vue.http.post(`${baseUrl}/shopper/add_join/${data.parent_shopper_id}`, data)
  },
  shoperSupplierList (data) {
    let params = {keyword: data.keyword}
    return Vue.http.get(`${baseUrl}/shopper/supplier_list/${data.pageIndex}/${data.pageSize}/`, {params})
  },
  shoperSupplierAdd (data) {
    return Vue.http.post(`${baseUrl}/shopper/add_supplier/`, data)
  },
  shoperSupplierOne (data) {
    return Vue.http.get(`${baseUrl}/shopper/shopper_info/${data.shopper_id}`)
  },
  shoperSupplierUpdate (data) {
    return Vue.http.post(`${baseUrl}/shopper/edit_supplier/`, data)
  },
  upload (data) {
    return Vue.http.post(`${baseUrl}/admin_upload/image/`, data)
  },
  shoperDelete (data) {
    return Vue.http.post(`${baseUrl}//shopper/del_shopper/`, data)
  }
}
