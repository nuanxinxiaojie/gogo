import Msite from '../pages/Msite/Msite.vue'
import Order from '../pages/Order/Order.vue'
import Profile from '../pages/Profile/Profile.vue'
import Search from '../pages/Search/Search.vue'
import Login from '../pages/Login/Login.vue'
import Shop from '../pages/Shop/Shop.vue'
import Info from '../pages/Shop/Info/Info.vue'
import Goods from '../pages/Shop/Goods/Goods.vue'
import Ratings from '../pages/Shop/Ratings/Ratings.vue'

export default[
  {
     path: '/msite', 
     component: Msite,
     meta:{
      footer:true
    }
  },
  { 
    path: '/order', 
    component: Order,
    meta:{
      footer:true
    }
  }, 
  { 
    path: '/profile', 
    component: Profile,
    meta:{
      footer:true
    }
  },
  { 
    path: '/search', 
    component: Search,
    meta:{
      footer:true
    }
  },
  { 
    path: '/login', 
    component: Login
  },
  { 
    path: '/shop', 
    component: Shop,
    children:[
      {
        path: '/shop/info', 
        component: Info,
      },
      {
        path: '/shop/goods', 
        component: Goods,
      },
      {
        path: '/shop/ratings', 
        component: Ratings,
      },
      {
        path: '/shop', 
        redirect: '/shop/goods',
      },
    ]
  },
  {
    path: '/',
    redirect: '/msite'
  }
  

]