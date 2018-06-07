import { isWaiting, any, start, end, nodeIsDebug } from './utils';

import { mapWaitingActions, mapWaitingGetters, waitFor } from './helpers';

import vuexStore from './vuex/store';
import vWaitComponent from './components/v-wait.vue';
import vWaitDirective from './directives/wait.js';

export default class VueWait {
  constructor(options = {}) {
    const defaults = {
      accessorName: '$wait',
      // Vuex Options
      useVuex: false,
      vuexModuleName: 'wait',
      // Components
      registerComponent: true,
      componentName: 'v-wait',
      // Directives
      registerDirective: true,
      directiveName: 'wait'
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
        `[vue-wait] not installed. Make sure to call \`Vue.use(VueWait)\` before init root instance.`
      );
    }

    if (this.initialized) {
      return;
    }

    if (this.options.registerComponent) {
      Vue.component(this.options.componentName, vWaitComponent);
    }

    if (this.options.registerDirective) {
      Vue.directive(this.options.directiveName, vWaitDirective);
    }

    if (this.options.useVuex) {
      const { vuexModuleName } = this.options;
      if (!store) {
        throw new Error('[vue-wait] Vuex not initialized.');
      }
      this.store = store;

      if (!store._modules.get([vuexModuleName])) {
        store.registerModule(vuexModuleName, vuexStore);
      }

      this.stateHandler = new Vue({
        computed: {
          isWaiting: () => loader =>
            store.getters[`${vuexModuleName}/isWaiting`](loader),
          any: () => store.getters[`${vuexModuleName}/any`]
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
          isWaiting() {
            return loader => isWaiting(this.activeLoaders, loader);
          },
          any() {
            return any(this.activeLoaders);
          }
        },
        methods: {
          start(loader) {
            this.activeLoaders = start(this.activeLoaders, loader);
          },
          end(loader) {
            this.activeLoaders = end(this.activeLoaders, loader);
          }
        }
      });
    }

    this.initialized = true;
  }

  get any() {
    return this.stateHandler.any;
  }

  isWaiting(loader) {
    return this.stateHandler.isWaiting(loader);
  }

  dispatchLoaderAction(action, loader) {
    const { vuexModuleName } = this.options;
    this.store.dispatch(`${vuexModuleName}/${action}`, loader, {
      root: true
    });
  }

  start(loader) {
    if (this.options.useVuex) {
      this.dispatchLoaderAction('start', loader);
      return;
    }
    this.stateHandler.start(loader);
  }

  end(loader) {
    if (this.options.useVuex) {
      this.dispatchLoaderAction('end', loader);
      return;
    }
    this.stateHandler.end(loader);
  }
}

export function install(Vue) {
  if (install.installed && Vue) {
    if (nodeIsDebug()) {
      console.warn(
        '[vue-wait] already installed. Vue.use(VuexLoading) should be called only once.'
      );
    }
    return;
  }

  Vue.mixin({
    /**
     * VueWait init hook, injected into each instances init hooks list.
     */
    beforeCreate() {
      const { wait, store, parent } = this.$options;

      let instance = null;
      if (wait) {
        instance = typeof wait === 'function' ? new wait() : wait;
        // Inject store
        instance.init(Vue, store);
      } else if (parent && parent.__$waitInstance) {
        instance = parent.__$waitInstance;
        instance.init(Vue, parent.$store);
      }

      if (instance) {
        // Store helper for internal use
        this.__$waitInstance = instance;
        this[instance.options.accessorName] = instance;
      }
    }
  });

  install.installed = true;
}

// Bypass helpers
export { mapWaitingActions, mapWaitingGetters, waitFor };

VueWait.install = install;
