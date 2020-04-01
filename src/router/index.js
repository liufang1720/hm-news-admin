//配置路由信息
import Vue from 'vue'

import VueRouter from 'vue-router'

import Login from '../pages/Login.vue'

import Home from '../pages/Home.vue'

import PostList from '../pages/PostList.vue'

import PostPublish from '../pages/PostPublish.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      // name: 'home',
      component: Home,
      //子路由
      children: [
        { path: '/', name: 'post-list', component: PostList },
        { path: '/post-publish', name: 'post-publish', component: PostPublish }
      ]
    },

    { path: '/login', name: 'login', component: Login }
  ]
})

// 解决 NavigationDuplicated 异常
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

//导航守卫
router.beforeEach((to, from, next) => {
  // 除了登录页可以不用登录就能访问，其他页面都必须登录了才能访问
  const token = localStorage.getItem('token')
  if (to.path !== '/login' && !token) {
    router.push({
      name: 'login'
    })
  } else {
    next()
  }
})

export default router
