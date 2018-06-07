import Vue from 'vue';
import VueLoading from '../../src/vue-loading';

import main from './main.vue';

Vue.use(VueLoading);

new Vue({
  el: '#app',
  vueLoading: new VueLoading({
    registerComponents: false,
    componentName: 'my-spinner'
  }),
  render: function(createElement) {
    return createElement(main);
  }
});
