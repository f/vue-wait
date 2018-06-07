import {
  isLoading,
  anyLoading,
  startLoading,
  endLoading,
  nodeIsDebug
} from './utils';

import { mapLoadingActions, wrapLoading } from './helpers';

import vuexStore from './vuex/store';
import vLoadingComponent from './components/v-loading.vue';
import vLoadingDirective from './directives/loading.js';

export default class VueLoading {
  constructor(options = {}) {
    const defaults = {
      accessorName: '$vueLoading',
      // Vuex Options
      useVuex: false,
      vuexModuleName: 'loading',
      // Components
      registerComponent: true,
      componentName: 'v-loading',
      // Directives
      registerDirective: true,
      directiveName: 'loading'
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
      Vue.component(this.options.componentName, vLoadingComponent);
    }

    if (this.options.registerDirective) {
      Vue.directive(this.options.directiveName, vLoadingDirective);
    }

    if (this.options.useVuex) {
      const { vuexModuleName } = this.options;
      if (!store) {
        throw new Error('[vuex-loading] Vuex not initialized.');
      }
      this.store = store;

      try {
        store.unregisterModule(vuexModuleName);
      } finally {
        store.registerModule(vuexModuleName, vuexStore);
      }

      this.stateHandler = new Vue({
        computed: {
          isLoading: () => loader =>
            store.getters[`${vuexModuleName}/isLoading`](loader),
          anyLoading: () => store.getters[`${vuexModuleName}/anyLoading`]
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
    const { vuexModuleName } = this.options;
    this.store.dispatch(`${vuexModuleName}/${action}`, loader, {
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

      let instance = null;
      if (vueLoading) {
        instance =
          typeof vueLoading === 'function' ? new vueLoading() : vueLoading;
        // Inject store
        instance.init(Vue, store);
      } else if (parent && parent.__$vueLoadingInstance) {
        instance = parent.__$vueLoadingInstance;
        instance.init(Vue, parent.$store);
      }

      if (instance) {
        // Store helper for internal use
        this.__$vueLoadingInstance = instance;
        this[instance.options.accessorName] = instance;
      }
    }
  });

  install.installed = true;
}

// Bypass helpers
export { mapLoadingActions, wrapLoading };

VueLoading.install = install;
