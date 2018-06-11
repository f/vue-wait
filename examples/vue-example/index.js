import Vue from 'vue';
import VueWait from '../../src/vue-wait';
import { OrbitSpinner } from 'epic-spinners';

import main from './main.vue';

Vue.use(VueWait);

Vue.component('orbit-spinner', OrbitSpinner);

new Vue({
  el: '#app',
  wait: new VueWait({ registerComponents: false }),
  render: function(createElement) {
    return createElement(main);
  }
});
