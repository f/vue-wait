import vLoading from './v-loading.vue';

const mutations = {
  LOAD: 'LOAD',
  END: 'END'
};

const uniq = array => {
  return array.filter((el, index, arr) => index == arr.indexOf(el));
};

export default class VueLoading {
  constructor(options = {}) {
    const {
      useVuex = false,
      moduleName = 'loading',
      registerComponents = true
    } = options; // unpack options into defaults

    this.useVuex = useVuex;
    this.moduleName = moduleName;
    this.registerComponents = registerComponents;
    this.initialized = false;
    this.store = null;
  }

  init(Vue /* Vue component instance */, store /* Vuex store */) {
    if (process.env.NODE_ENV !== 'production' && !install.installed) {
      console.warn(
        `not installed. Make sure to call \`Vue.use(VueLoading)\` ` +
          `before init root instance.`
      );
    }

    // already initialized.
    if (this.initialized) {
      return;
    }

    if (this.registerComponents) {
      Vue.component(vLoading.name, vLoading);
    }

    // some of getters can be used without vuex, for sharing code create module definition here
    const storeModule = {
      namespaced: true,
      state: {
        activeLoaders: []
      },
      getters: {
        isLoading: state => loaderMessage =>
          state.activeLoaders.indexOf(loaderMessage) > -1,
        anyLoading: state => state.activeLoaders.length > 0
      },
      actions: {
        load: ({ commit }, loaderMessage) =>
          commit(mutations.LOAD, loaderMessage),
        end: ({ commit }, loaderMessage) => commit(mutations.END, loaderMessage)
      },
      mutations: {
        [mutations.LOAD](state, loaderMessage) {
          state.activeLoaders.push(loaderMessage);
          state.activeLoaders = uniq(state.activeLoaders);
        },
        [mutations.END](state, loaderMessage) {
          state.activeLoaders = uniq(state.activeLoaders).filter(
            p => p !== loaderMessage
          );
        }
      }
    };
    if (this.useVuex) {
      const moduleName = this.moduleName;
      this.storage = new Vue({
        computed: {
          isLoading() {
            if (!store) {
              throw new Error('Vuex not initialized.');
            }
            return store.getters[`${moduleName}/isLoading`];
          },
          anyLoading() {
            if (!store) {
              throw new Error('Vuex not initialized.');
            }
            return store.getters[`${moduleName}/anyLoading`];
          }
        }
      });

      this.store = store;
      store.registerModule(moduleName, storeModule);
    } else {
      // no vuex
      this.storage = new Vue({
        data: {
          activeLoaders: []
        },
        computed: {
          isLoading() {
            const state = this;
            return storeModule.getters.isLoading(state);
          },
          anyLoading() {
            const state = this;
            return storeModule.getters.anyLoading(state);
          }
        },
        methods: {
          startLoading(loaderMessage) {
            const state = this;
            storeModule.mutations[mutations.LOAD](state, loaderMessage);
          },
          endLoading(loaderMessage) {
            const state = this;
            storeModule.mutations[mutations.END](state, loaderMessage);
          }
        }
      });
    }
    this.initialized = true;
  }

  get anyLoading() {
    return this.storage.anyLoading;
  }

  isLoading(loaderMessage) {
    return this.storage.isLoading(loaderMessage);
  }

  startLoading(loaderMessage) {
    if (this.useVuex) {
      this.store.dispatch(`${this.moduleName}/load`, loaderMessage, {
        root: true
      });
    } else {
      this.storage.startLoading(loaderMessage);
    }
  }

  endLoading(loaderMessage) {
    if (this.useVuex) {
      this.store.dispatch(`${this.moduleName}/end`, loaderMessage, {
        root: true
      });
    } else {
      this.storage.endLoading(loaderMessage);
    }
  }
}

export function install(Vue) {
  if (install.installed && Vue) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(
        '[vuex-loading] already installed. Vue.use(VuexLoading) should be called only once.'
      );
    }
    return;
  }
  install.installed = true;
  // applyMixin
  Vue.mixin({
    /**
     * VueLoading init hook, injected into each instances init hooks list.
     */
    beforeCreate() {
      const options = this.$options;
      if (options.vueLoading) {
        this.$loading =
          typeof options.vueLoading === 'function'
            ? new options.vueLoading()
            : options.vueLoading;
        this.$loading.init(Vue, options.store); // store injection
      } else if (options.parent && options.parent.$loading) {
        this.$loading = options.parent.$loading;
        this.$loading.init(Vue, options.parent.$store);
      }
    }
  });
}

export function createActionHelpers({ moduleName }) {
  const start = function(dispatcher, loaderMessage) {
    dispatcher(`${moduleName}/load`, loaderMessage, { root: true });
  };
  const end = function(dispatcher, loaderMessage) {
    dispatcher(`${moduleName}/end`, loaderMessage, { root: true });
  };
  return {
    // start and stop helpers for async processes
    startLoading(dispatcher, loaderMessage, callback) {
      start(dispatcher, loaderMessage);
      if (!callback) return;
      return new Promise((resolve, reject) => {
        callback()
          .then(response => {
            resolve(response);
            end(dispatcher, loaderMessage);
          })
          .catch(response => {
            reject(response);
            end(dispatcher, loaderMessage);
          });
      });
    },
    endLoading(dispatcher, loaderMessage) {
      end(dispatcher, loaderMessage);
    }
  };
}

VueLoading.install = install;
