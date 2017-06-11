import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Editor from '@/components/editor/Editor'
import Home from '@/components/Home'
import Splash from '@/components/Splash'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/splash',
      name: 'splash',
      component: Splash
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
    }
  ]
})
