import Vue from 'vue'

const BUS = new Vue();

export default {
    install (Vue) {
      Vue.prototype.$bus = BUS
    }
  }