import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Editor from '@/components/editor/Editor'
import Home from '@/components/home/Home'
import Features from '@/components/home/Features'
import About from '@/components/home/About'
import Splash from '@/components/home/Splash'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/home',
      component: Home,
      children: [
        { path: '', name: 'splash', component: Splash },
        { path: 'features', name: 'features', component: Features },
        { path: 'about', name: 'about', component: About }
      ]
    },
    {
      path: '/editor',
      name: 'newDb',
      component: Editor
    },
    {
      path: '/editor/:id',
      name: 'loadDb',
      component: Editor
    }
  ]
})

// can check if user is logged in to protect certain routes
router.beforeEach((to, from, next) => {
  next() // continue
  // next('/') - redirect
})

export default router
