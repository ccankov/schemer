import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Editor from '@/components/editor/Editor'
import Home from '@/components/Home'
import Session from '@/components/session'
import Features from '@/components/Features'
import About from '@/components/About'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/session',
      name: 'session',
      component: Session
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/editor',
      name: 'editor',
      component: Editor
    },
    {
      path: '/features',
      name: 'feature',
      component: Features
    },
    {
      path: '/about',
      name: 'about',
      component: About
    }
  ]
})

// can check if user is logged in to protect certain routes
router.beforeEach((to, from, next) => {
  next() // continue
  // next('/') - redirect
})

export default router
