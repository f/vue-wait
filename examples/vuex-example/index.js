import Vue from 'vue';
import Vuex from 'vuex';
import VueLoading from '../../src/vue-loading';

import main from './main.vue'

Vue.use(VueLoading);
Vue.use(Vuex);

const store = new Vuex.Store({});

const vueLoading = new VueLoading({useVuex: true, moduleName: 'vuex-example-module'})
new Vue({
    el: '#app',
    store,
    vueLoading: vueLoading,
    render: function (createElement) {
        return createElement(main)
    }
});
