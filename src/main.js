import Vue from 'vue'
import vuetify from '@/plugins/vuetify' // path to vuetify export
import Player from './Player.vue'
import VueMeta from 'vue-meta';

Vue.use(VueMeta)

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(Player)
}).$mount('#app')