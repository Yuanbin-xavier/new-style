import Vue from 'vue'
import {CFT} from './constant'

const UploaderAction = {
  image (data) {
    return new Promise((resolve, reject) => {
      Vue.http.post(`${CFT.BASE_API_URL}/admin_upload/image`, data).then(function (response) {
        resolve(response.data)
      }, function (response) {
        reject(response.data)
      })
    })
  }
}

export default UploaderAction
