import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import router from '@/router'

import '@/styles/index.less'

import axios from '@/api'
Vue.prototype.$http = axios

Vue.config.productionTip = false
// render 渲染函数 h是回调的参数 渲染APP组件 挂载到App容器 把APP根组件渲染到APP容器

Vue.use(ElementUI)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
