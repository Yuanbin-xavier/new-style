import NProgress from 'nprogress'
import localStorage from 'localStorage'
import 'nprogress/nprogress.css'
export default function (Vue) {
  Vue.http.interceptors.push((request, next, router) => {
    NProgress.start()
    request.headers['Authorization'] = localStorage.getItem('token')
    var timeout
    if (request.timeout) {
      timeout = setTimeout(() => {
        // router.app.$dispatch('timeouting')
        // console.log('timeout')
        request.abort()
      }, request.timeout)
    }

    next((response) => {
      clearTimeout(timeout)
      if (response.status === 0) {
        request.abort()
        return router.app.$dispatch('notwork')
      } else if (response.status === 401) {
        localStorage.removeItem('token')
        return router.app.$dispatch('signin')
      }
      NProgress.done()
      return response
    })
  })
}
