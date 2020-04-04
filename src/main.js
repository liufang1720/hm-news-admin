//导入vue
import Vue from 'vue'
//导入app组件
import App from './App.vue'
//导入路由
import router from './router'

//引入样式
import './style/base.css'

// 完整导入element-ui
import ElementUI from 'element-ui'
//导入element-ui的样式
import 'element-ui/lib/theme-chalk/index.css'
//告诉vue使用element-ui
Vue.use(ElementUI)

//---------------------axios的处理-------------------------
import axios from 'axios'
Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://localhost:3000'

// axios 请求拦截器
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
})

// --------------------全局过滤器---------------------------
import moment from 'moment'
Vue.filter('date', function(input) {
  return moment(input).format('YYYY-MM-DD')
})

//------------------------富文本编辑器的处理-----------------
import VueQuillEditor from 'vue-quill-editor'

import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme
Vue.use(VueQuillEditor /* { default global options } */)

Vue.config.productionTip = false

new Vue({
  router: router,
  render: h => h(App)
}).$mount('#app')
