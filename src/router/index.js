import { createRouter, createWebHistory } from 'vue-router'
import RoutesName from './routesName'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import HomeView from '@/views/HomeView.vue'
import AddImagesView from '@/views/AddImagesView.vue'
import supabase from '../supabase'
import { useUserStore } from '../stores/user'
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
      path: '/',
      name: RoutesName.home,
      component: HomeView,
      meta: { requiredAuth: true },
      children:[
        {
          path: 'add/images',
          name: RoutesName.add_image,
          component: AddImagesView,
          meta: { requiredAuth: true }
        }
      ]
    },
  ]
})

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()
  const { data } = await supabase.auth.getUser();
  userStore.setUser(data.user)
  console.log(data.user.id)
  if (!data.user && to.meta.requiredAuth) {
    next({ name: RoutesName.login })
  }
  else if (data.user && (to.path == "/login" || to.path == "/register")) {
    console.log("toto")
    next({ name: RoutesName.home })
  }
  else {
    next()
  }

})

export default router
