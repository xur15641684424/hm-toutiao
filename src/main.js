import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
// render 渲染函数 h是回调的参数 渲染APP组件 挂载到App容器 把APP根组件渲染到APP容器
new Vue({
  render: h => h(App)
}).$mount('#app')
