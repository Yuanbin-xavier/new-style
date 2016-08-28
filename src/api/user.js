import Vue from 'vue'
import {CFT} from './constant'
import localStorage from 'localStorage'

const UserAction = {
  login (data) {
    return new Promise((resolve, reject) => {
      Vue.http.post(`${CFT.BASE_API_URL}/admin/login`, data).then(function (response) {
        response = JSON.parse(response.body)
        localStorage.setItem('token', response.token)
        resolve(response)
      }, function (response) {
        reject(response.data)
      })
    })
  },
  logout () {
    return new Promise((resolve, reject) => {
      localStorage.removeItem('token')
      resolve(true)
    })
  }
}

export default UserAction
