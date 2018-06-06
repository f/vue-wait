import {
  isLoading,
  anyLoading,
  startLoading,
  endLoading,
  nodeIsDebug
} from './utils';

import { mapLoadingActions, wrapLoading } from './helpers';

import vuexStore from './vuex/store';
import vLoading from './components/v-loading.vue';

export default class VueLoading {
  constructor(options = {}) {
    const defaults = {
      useVuex: false,
      componentName: vLoading.name,
      moduleName: 'loading',
      registerComponent: true
    };
    this.options = {
      ...defaults,
      ...options
    };
    this.initialized = false;
  }

  init(Vue, store) {
    if (nodeIsDebug() && !install.installed) {
      console.warn(
        `[vuex-loading] not installed. Make sure to call \`Vue.use(VuexLoading)\` before init root instance.`
      );
    }

    if (this.initialized) {
      return;
    }

    if (this.options.registerComponent) {
      Vue.component(this.options.componentName, vLoading);
    }

    if (this.options.useVuex) {
      const { moduleName } = this.options;
      if (!store) {
        throw new Error('[vuex-loading] Vuex not initialized.');
      }
      this.store = store;
      store.registerModule(moduleName, vuexStore);

      this.stateHandler = new Vue({
        computed: {
          isLoading: () => loader =>
            store.getters[`${moduleName}/isLoading`](loader),
          anyLoading: () => store.getters[`${moduleName}/anyLoading`]
        }
      });
    } else {
      this.stateHandler = new Vue({
        data() {
          return {
            activeLoaders: []
          };
        },
        computed: {
          isLoading() {
            return loader => isLoading(this.activeLoaders, loader);
          },
          anyLoading() {
            return anyLoading(this.activeLoaders);
          }
        },
        methods: {
          startLoading(loader) {
            this.activeLoaders = startLoading(this.activeLoaders, loader);
          },
          endLoading(loader) {
            this.activeLoaders = endLoading(this.activeLoaders, loader);
          }
        }
      });
    }

    this.initialized = true;
  }

  get anyLoading() {
    return this.stateHandler.anyLoading;
  }

  isLoading(loader) {
    return this.stateHandler.isLoading(loader);
  }

  dispatchLoaderAction(action, loader) {
    const { moduleName } = this.options;
    this.store.dispatch(`${moduleName}/${action}`, loader, {
      root: true
    });
  }

  startLoading(loader) {
    if (this.options.useVuex) {
      this.dispatchLoaderAction('startLoading', loader);
      return;
    }
    this.stateHandler.startLoading(loader);
  }

  endLoading(loader) {
    if (this.options.useVuex) {
      this.dispatchLoaderAction('endLoading', loader);
      return;
    }
    this.stateHandler.endLoading(loader);
  }
}

export function install(Vue) {
  if (install.installed && Vue) {
    if (nodeIsDebug()) {
      console.warn(
        '[vuex-loading] already installed. Vue.use(VuexLoading) should be called only once.'
      );
    }
    return;
  }

  Vue.mixin({
    /**
     * VueLoading init hook, injected into each instances init hooks list.
     */
    beforeCreate() {
      const { vueLoading, store, parent } = this.$options;
      let { helperName } = this.$options;

      if (!helperName) {
        helperName = '$vueLoading';
      }

      let instance = null;
      if (vueLoading) {
        instance =
          typeof vueLoading === 'function' ? new vueLoading() : vueLoading;
        // Inject store
        instance.init(Vue, store);
      } else if (parent && parent[helperName]) {
        instance = parent[helperName];
        instance.init(Vue, parent.$store);
      }
      this[helperName] = instance;

      // Store helper for internal use
      this.__$vueLoadingInstance = instance;
    }
  });

  install.installed = true;
}

// Bypass helpers
export { mapLoadingActions, wrapLoading };

VueLoading.install = install;
