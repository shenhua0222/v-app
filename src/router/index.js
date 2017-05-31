import Vue from 'vue'
import Router from 'vue-router'
import All from '@/components/All'
import Publish from '@/components/Publish'
import Message from '@/components/Message'
import Content from '@/components/Content'
import Login from '@/components/Login'
import User from '@/components/User'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'All',
      component: All
    },
    {
      path: '/publish',
      component: Publish
    },
    {
      path: '/Message',
      component: Message
    },
    {
      path: '/Content/:id',
      component: Content
    },
    {
      path: '/Login',
      component: Login
    },
    {
      path: '/user',
      component: User
    }
  ]
})
