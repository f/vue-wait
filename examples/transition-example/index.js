import Vue from 'vue';
import VueWait from '../../src/vue-wait';

import main from './main.vue';

Vue.use(VueWait);

new Vue({
  el: '#app',
  wait: new VueWait({ registerComponents: false }),
  render: function(createElement) {
    return createElement(main);
  }
});
