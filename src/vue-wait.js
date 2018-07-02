import {
  is,
  any,
  start,
  end,
  progress,
  percent,
  endProgress,
  nodeIsDebug
} from './utils';

// Import to export
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
          is: () => waiter => store.getters[`${vuexModuleName}/is`](waiter),
          any: () => store.getters[`${vuexModuleName}/any`],
          percent: () => waiter =>
            store.getters[`${vuexModuleName}/percent`](waiter)
        }
      });
    } else {
      this.stateHandler = new Vue({
        data() {
          return {
            waitingFor: [],
            progresses: {}
          };
        },
        computed: {
          is() {
            return waiter => is(this.waitingFor, waiter);
          },
          any() {
            return any(this.waitingFor);
          },
          percent() {
            return waiter => percent(this.progresses, waiter);
          }
        },
        methods: {
          start(waiter) {
            this.waitingFor = start(this.waitingFor, waiter);
          },
          end(waiter) {
            this.waitingFor = end(this.waitingFor, waiter);
            this.progresses = endProgress(this.progresses, waiter);
          },
          progress({ waiter, current, total }) {
            this.progresses = progress(this.progresses, waiter, current, total);
          }
        }
      });
    }

    this.initialized = true;
  }

  get any() {
    return this.stateHandler.any;
  }

  is(waiter) {
    return this.stateHandler.is(waiter);
  }

  // alias for `is`
  waiting(waiter) {
    return this.is(waiter);
  }

  percent(waiter) {
    return this.stateHandler.percent(waiter);
  }

  dispatchWaitingAction(action, waiter) {
    const { vuexModuleName } = this.options;
    this.store.dispatch(`${vuexModuleName}/${action}`, waiter, {
      root: true
    });
  }

  start(waiter) {
    if (this.options.useVuex) {
      this.dispatchWaitingAction('start', waiter);
      return;
    }
    this.stateHandler.start(waiter);
  }

  end(waiter) {
    if (this.options.useVuex) {
      this.dispatchWaitingAction('end', waiter);
      return;
    }
    this.stateHandler.end(waiter);
  }

  progress(waiter, current, total = 100) {
    if (!this.is(waiter)) {
      this.start(waiter);
    }

    if (current > total) {
      this.end(waiter);
      return;
    }

    if (this.options.useVuex) {
      this.dispatchWaitingAction('progress', { waiter, current, total });
      return;
    }
    this.stateHandler.progress({ waiter, current, total });
  }
}

export function install(Vue) {
  if (install.installed && Vue) {
    if (nodeIsDebug()) {
      console.warn(
        '[vue-wait] already installed. Vue.use(VueWait) should be called only once.'
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

// Export which are imported to export
export { mapWaitingActions, mapWaitingGetters, waitFor };

VueWait.install = install;
