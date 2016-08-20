import api from './api'
import localStorage from 'localStorage'

const UserAction = {
  login (data) {
    return new Promise((resolve, reject) => {
      api.adminLogin(data).then(function (response) {
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
