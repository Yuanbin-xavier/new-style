// Core dependencies
import Vue from 'vue'
import VueHead from 'vue-head'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

// App components
import App from './App'
import routes from './http/routes'
import middlewares from './http/middlewares'
import interceptors from './http/interceptors'
import Element from 'element-ui'

// UI CSS
import 'sushi-ui'
import 'element-ui/lib/theme-default/index.css'
import './common/style'
import './common/fonts/iconfont.css'
import Echarts from './directives/echarts'

Vue.use(VueHead)
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(Element)
Vue.use(interceptors)
Vue.directive('echarts', Echarts)

Vue.http.options.emulateJSON = true
Vue.http.options.crossOrigin = true
Vue.http.options.timeout = 4700

var router = new VueRouter({
  linkActiveClass: 'active',
  hashbang: false,
  history: false
})

router.map(routes)

middlewares(router)

router.start(App, 'app')
