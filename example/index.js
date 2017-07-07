import Vue from 'vue';
import Vuex from 'vuex';
import createVuexLoader from '../src/vuex-loading';

const VuexLoading = createVuexLoader({
  moduleName: 'loading',
  componentName: 'v-loading',
});

Vue.use(Vuex);
Vue.use(VuexLoading);

const store = new Vuex.Store({
  plugins: [VuexLoading.Store],
});

new Vue({
  el: '#app',
  store,
  computed: {
    isLoading() {
      return this.$store.loading.getters.isLoading();
    }
  },
  methods: {
    startLoading() {
      this.$startLoading('fetching data');
    },
    endLoading() {
      this.$endLoading('fetching data');
    }
  },
});
