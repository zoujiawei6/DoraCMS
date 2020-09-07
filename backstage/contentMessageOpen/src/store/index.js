import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import contentMessageOpen from './modules/contentMessageOpen'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    contentMessageOpen
  },
  getters
})

export default store