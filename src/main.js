import Vue from 'vue'
import vuetify from '@/plugins/vuetify' // path to vuetify export
import Player from './Player.vue'
import VueMeta from 'vue-meta';
import './registerServiceWorker'

Vue.use(VueMeta)

Vue.prototype.$mediaSession = navigator.mediaSession;

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(Player)
}).$mount('#app')