import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import vuetify from './plugins/vuetify'
import Bus from './plugins/BUS'
import Vuex from 'vuex'
//https://stackoverflow.com/questions/46097687/vuex-passing-multiple-parameters-to-mutation

Vue.config.productionTip = false
Vue.use(Bus)
Vue.use(Vuex);

import state from './store/state';

import * as mutations from './store/mutations';
import * as actions from './store/actions';



const store = new Vuex.Store({
   state,
   mutations,
   actions
})


new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
