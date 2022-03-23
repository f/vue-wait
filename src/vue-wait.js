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

  init(App, store) {
    if (nodeIsDebug() && !install.installed && VueWait.getVueVersion(App) < 3) {
      console.warn(
        `[vue-wait] not installed. Make sure to call \`Vue.use(VueWait)\` before init root instance.`
      );
    }

    if (this.initialized) {
      return;
    }

    if (this.options.registerComponent) {
      App.component(this.options.componentName, vWaitComponent);
    }

    if (this.options.registerDirective) {
      App.directive(this.options.directiveName, vWaitDirective);
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

      const config = {
        computed: {
          is: () => waiter => store.getters[`${vuexModuleName}/is`](waiter),
          any: () => store.getters[`${vuexModuleName}/any`],
          percent: () => waiter =>
            store.getters[`${vuexModuleName}/percent`](waiter)
        }
      };

      if (VueWait.getVueVersion(App) > 2) {
        const { createApp } = require('vue');
        // A template is only needed to avoid Vue 3 warning
        // [Vue warn]: Component is missing template or render function.
        config['template'] = '<i></i>';
        this.stateHandler = createApp(config).mount(
          document.createElement('div')
        );
      } else {
        this.stateHandler = new App(config);
      }
    } else {
      const config = {
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
      };

      if (VueWait.getVueVersion(App) > 2) {
        const { createApp } = require('vue');
        // A template is only needed to avoid Vue 3 warning
        // [Vue warn]: Component is missing template or render function.
        config['template'] = '<i></i>';
        this.stateHandler = createApp(config).mount(
          document.createElement('div')
        );
      } else {
        this.stateHandler = new App(config);
      }
    }

    this.initialized = true;
  }

  get any() {
    return this.stateHandler.any;
  }

  static getVueVersion(app) {
    return parseFloat((app.version || '').split('.')[0] || 0);
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

export function install(App) {
  if (install.installed && App) {
    if (nodeIsDebug()) {
      console.warn(
        '[vue-wait] already installed. Vue.use(VueWait) should be called only once.'
      );
    }
    return;
  }

  App.mixin({
    /**
     * VueWait init hook, injected into each instances init hooks list.
     */
    beforeCreate() {
      const { wait, store, parent } = this.$options;

      let instance = null;
      if (wait) {
        instance = typeof wait === 'function' ? new wait() : wait;
        // Inject store
        instance.init(App, store);
      } else if (parent && parent.__$waitInstance) {
        instance = parent.__$waitInstance;
        instance.init(App, parent.$store);
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

function createVueWait(options) {
  const Wait = {
    instance: null,
    async install(app) {
      if (this.installed && app) {
        if (nodeIsDebug()) {
          console.warn('[vue-wait] already installed');
        }
        return this.instance;
      }

      const instance = new VueWait(options);
      instance.init(app, app.config.globalProperties.$store);
      app.config.globalProperties[instance.options.accessorName] = instance;

      app.mixin({
        beforeCreate() {
          this.__$waitInstance = instance;
        }
      });

      this.instance = instance;
      this.installed = true;
      return instance;
    }
  };

  return Wait;
}

// Export which are imported to export
export { mapWaitingActions, mapWaitingGetters, waitFor, createVueWait };

VueWait.install = install;
