import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ROUTES_SERVICE from "@/services/RoutesService.js";
import {useAuthStore} from "@/stores/auth.js";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: ROUTES_SERVICE.index.path,
      name: ROUTES_SERVICE.index.name,
      component: HomeView,
      meta: {
        auth: true
      }
    },
    {
      path: ROUTES_SERVICE.signIn.path,
      name: ROUTES_SERVICE.signIn.name,
      component: () => import('../views/SignInView.vue'),
      meta: {
        auth: false
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta && to.meta.auth && !authStore.authInfo.token) {
    next(ROUTES_SERVICE.signIn.path)
  } if (to.meta && to.meta.auth === false && authStore.authInfo.token) {
    next(ROUTES_SERVICE.index.path)
  } else {
    next();
  }
})


export default router
