import Vue from 'vue';
import Vuex from 'vuex';
import VueLoading from '../../src/vue-loading';

import main from './main.vue';

Vue.use(VueLoading);
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

const vueLoading = new VueLoading({
  useVuex: true,
  vuexModuleName: 'vuex-example-module',
  accessorName: '$l'
});

new Vue({
  el: '#app',
  store,
  vueLoading,
  render: function(createElement) {
    return createElement(main);
  }
});
