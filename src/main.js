import Vue from 'vue'
import 'lib-flexible/flexible'
import './veevalidate'
import App from './App.vue'

import router from './router'
import CartControl from './components/CartControl/CartControl.vue'
import Header from './components/Header/Header.vue'
import Xing from './components/Xing/Xing.vue'
import store from './store'

import './mock/mock-server.js'
import { Button} from 'mint-ui'

Vue.component(Button.name, Button)
Vue.component('CartControl', CartControl)
Vue.component('Header',Header)
Vue.component('Xing',Xing)



Vue.config.productionTip = false

new Vue({
  el: '#app',
  components: {App},
  template: '<App />',
  router,
  store
})


// new Vue({
//   render: h => h(App),
// }).$mount('#app')


// new Vue({
//   el: '#app',
//   render: h => h(App),
// })





