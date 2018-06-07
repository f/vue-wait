import Vue from 'vue';
import Vuex from 'vuex';
import VueWait from '../../src/vue-wait';

import main from './main.vue';

Vue.use(VueWait);
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    counter: 1
  },
  getters: {
    count: state => state.counter
  },
  actions: {
    incrementAsync({ commit }) {
      return new Promise(resolve => {
        setTimeout(() => {
          commit('increment');
          resolve();
        }, 3000);
      });
    }
  },
  mutations: {
    increment(state) {
      state.counter += 1;
    }
  }
});

const wait = new VueWait({
  useVuex: true,
  vuexModuleName: 'vuex-example-module',
  accessorName: '$l'
});

new Vue({
  el: '#app',
  store,
  wait,
  render: function(createElement) {
    return createElement(main);
  }
});
