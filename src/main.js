import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import i18n from './i18n'
import * as VueGoogleMaps from 'vue2-google-maps'

import '@/api/interceptors'
import '@babel/polyfill'
import '@/mixins/formRules'

Vue.config.productionTip = false
Vue.prototype.EventBus = new Vue;

Vue.use(VueGoogleMaps, {
  load: {
    key: '',
    libraries: 'places',
  }
});

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount('#app')
