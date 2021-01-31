import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import '@mdi/font/css/materialdesignicons.css'
import { store } from './store';
Vue.config.productionTip = false
import axios from "axios";
import VueAxios from 'vue-axios';
Vue.use(VueAxios, axios);
new Vue({
  render: h => h(App),
  router,
  vuetify,
  iconfont: 'md', 
  store
}).$mount('#app')
