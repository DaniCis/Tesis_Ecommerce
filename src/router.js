import { createRouter, createWebHistory } from "vue-router"
import { getAccessToken } from './services/auth'
import Login from './pages/login.vue'
import Principal from './components/principal.vue'
import Register from './pages/register.vue'
import Search from './pages/search.vue'
import Checkout from './pages/checkout.vue'
import Products from './pages/products.vue'
import Summary from './pages/orderSummary.vue'
import Compras from './pages/sales.vue'
import Detalles from './pages/saleDetail.vue'

const routes = [
    { path: "/", component:Principal },
    { path: "/login", component: Login },
    { path: "/register", component:Register },
    { path: "/search", component:Search},
    { path: "/products", component:Products},
    { 
      path:"/sales",
      component:Compras,
      meta:{
        requiresAuth:true
      }
    },
    { 
      path:"/saleDetail/:id",
      component:Detalles,
      meta:{
        requiresAuth:true
      }
    },
    { path: "/checkout", 
      component:Checkout, 
      meta:{
        requiresAuth: true
      },
    },
    { path: "/orderSummary/:id", 
      component: Summary, 
      meta:{
        requiresAuth: true
      },
    },
  ];
  
  const history = createWebHistory();
  
  const router = createRouter({
    history,
    routes,
  });
  
  router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
      if (getAccessToken()) {
        next();
      } else {
        next({ path: "/login" });
      }
    } else {
      next();
    }
  });
  
  export default router;