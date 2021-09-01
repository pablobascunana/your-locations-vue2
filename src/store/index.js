import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import application from '@/store/modules/application.js'
import user from '@/store/modules/user.js'

Vue.use(Vuex)

function initialState() {
  return {}
}

export default new Vuex.Store({
  state: initialState,
  mutations: {
    resetStore (state) {
      const initState = initialState();
      this.commit('application/resetApplicationStore');
      this.commit('user/resetUserStore');
      Object.keys(initState).forEach(key => {
        state[key] = initState[key];
      })
    },
  },
  modules: {
    application,
    user
  },
  plugins: [createPersistedState({ storage: window.sessionStorage })]
});
