import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import vuetify from './plugins/vuetify'
import Bus from './plugins/BUS'



Vue.config.productionTip = false
Vue.use(Bus)



new Vue({
  router,
  vuetify,
  
  render: h => h(App)
}).$mount('#app')
