import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueRouter from 'vue-router'
import routes from './router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import vuetify from '@/plugins/vuetify'
import Vuex from 'vuex'
import store from './store'
import SweetAlertIcons from 'vue-sweetalert-icons';
import Toasted from 'vue-toasted';
// import liff from '@line/liff';

Vue.use(Toasted, {
  position: 'bottom-center',
  durations: 3000,
})

Vue.use(SweetAlertIcons);

Vue.use(Vuex)

Vue.use(VueRouter)
const router = new VueRouter({
  mode: 'history',
  routes
});

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
