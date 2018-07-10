import Vuex from 'vuex'
import Vue from 'vue'
import actions from './actions'

// modules
import user from './modules/user'
import article from './modules/article'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: true,
  actions,
  modules: {
    user,
    article
  }
})

export default store