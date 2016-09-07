import Vue from 'vue'
import {CFT} from './constant'
import localStorage from 'localStorage'

const UserAction = {
  login (data) {
    return new Promise((resolve, reject) => {
      Vue.http.post(`${CFT.BASE_API_URL}/admin/login`, data).then(function (response) {
        response = JSON.parse(response.body)
        localStorage.setItem('token', response.token)
        localStorage.setItem('fullname', response.data.fullname)
        localStorage.setItem('username', response.data.admin_name)
        localStorage.setItem('mobile', response.data.mobile)
        localStorage.setItem('email', response.data.email)
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
  },
  loginProfile () {
    return new Promise((resolve, reject) => {
      resolve({
        fullname: localStorage.getItem('fullname'),
        username: localStorage.getItem('username'),
        mobile: localStorage.getItem('mobile'),
        email: localStorage.getItem('email')
      })
    })
  }
}

export default UserAction
