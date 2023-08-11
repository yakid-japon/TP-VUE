import { createRouter, createWebHistory } from 'vue-router'
import RoutesName from './routesName'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import HomeView from '@/views/HomeView.vue'
import supabase from '../supabase'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: RoutesName.login,
      component: LoginView,
      meta: { requiredAuth: false }
    },
    {
      path: '/register',
      name: RoutesName.register,
      component: RegisterView,
      meta: { requiredAuth: false }
    },
    {
      path: '/home',
      name: RoutesName.home,
      component: HomeView,
      meta: { requiredAuth: true }
    },
  ]
})

router.beforeEach(async (to, from, next) => {
  console.log(to)
  const { data } = await supabase.auth.getUser();
  if (!data.user && to.meta.requiredAuth) {
    next({name:RoutesName.login})
  } else {
    next()
  }

})

export default router
