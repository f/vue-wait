/**
 * Extends interfaces in Vue.js
 */

import Vue from 'vue';
import VueWait from './index';

declare module 'vue/types/vue' {
  interface Vue {
    $wait: VueWait;
  }
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    wait?: VueWait;
  }
}
