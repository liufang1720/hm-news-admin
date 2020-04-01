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

// --------------------全局过滤器---------------------------
import moment from 'moment'
Vue.filter('date', function(input) {
  return moment(input).format('YYYY-MM-DD')
})

Vue.config.productionTip = false

new Vue({
  router: router,
  render: h => h(App)
}).$mount('#app')
