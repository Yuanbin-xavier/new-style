import api from './api'

const ShopperAction = {
  dataList (data) {
    return new Promise((resolve, reject) => {
      api.shoperServiceList(data).then(function (response) {
        resolve(response.data)
      }, function (response) {
        reject(response.data)
      })
    })
  },
  dataOne (data) {
    return new Promise((resolve, reject) => {
      api.shoperServiceOne(data).then(function (response) {
        resolve(response.data)
      }, function (response) {
        reject(response.data)
      })
    })
  },
  dataAdd (data) {
    return new Promise((resolve, reject) => {
      api.shoperServiceAdd(data).then(function (response) {
        resolve(response.data)
      }, function (response) {
        reject(response.data)
      })
    })
  },
  dataSupplierList (data) {
    return new Promise((resolve, reject) => {
      api.shoperSupplierList(data).then(function (response) {
        resolve(response.data)
      }, function (response) {
        reject(response.data)
      })
    })
  },
  dataSupplierAdd (data) {
    return new Promise((resolve, reject) => {
      api.shoperSupplierAdd(data).then(function (response) {
        resolve(response.data)
      }, function (response) {
        reject(response.data)
      })
    })
  },
  dataSupplierOne (data) {
    return new Promise((resolve, reject) => {
      api.shoperSupplierOne(data).then(function (response) {
        resolve(response.data)
      }, function (response) {
        reject(response.data)
      })
    })
  },
  dataSupplierUpdate (data) {
    return new Promise((resolve, reject) => {
      api.shoperSupplierUpdate(data).then(function (response) {
        resolve(response.data)
      }, function (response) {
        reject(response.data)
      })
    })
  },
  dataShoperDelete (data) {
    return new Promise((resolve, reject) => {
      api.shoperDelete(data).then(function (response) {
        resolve(response.data)
      }, function (response) {
        reject(response.data)
      })
    })
  }
}

export default ShopperAction
