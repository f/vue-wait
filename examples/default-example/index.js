import Vue from 'vue';
import VueLoading from '../../src/vue-loading';

import main from './main.vue'

Vue.use(VueLoading);

new Vue({
    el: '#app',
    vueLoading: new VueLoading(false, 'loading', false),
    render: function (createElement) {
        return createElement(main)
    }
});
