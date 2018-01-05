import spinner from './spinners/spinner';
import heart from './spinners/heart';

const mutations = {
  LOAD: 'LOAD',
  END: 'END'
};

const spinners = {
  spinner,
  heart
};

// Base Utils
const uniq = array => {
  return array.filter((el, index, arr) => index == arr.indexOf(el));
};

function createComponent({ componentName, moduleName, className }) {
  return {
    template: `
      <div>
        <span class='${className}' v-if='status'>
          <slot name='spinner'>
            <${componentName}-spinner :width="width || '1em'" :height="height || '1em'" />
          </slot>
          <span>{{ message }}</span>
        </span>
        <slot v-if='!status'></slot>
      </div>
    `,
    props: ['when', 'loader', 'message', 'height', 'width'],
    computed: {
      isLoading() {
        const store = this.$store;
        if (!store) {
          throw new Error('Vuex not initialized.');
        }
        return store.getters[`${moduleName}/isLoading`];
      },
      anyLoading() {
        const store = this.$store;
        if (!store) {
          throw new Error('Vuex not initialized.');
        }
        return store.getters[`${moduleName}/anyLoading`];
      },
      status() {
        if (this.when) {
          return this.when;
        }
        if (this.loader) {
          return this.isLoading(this.loader);
        }
        return this.anyLoading;
      }
    }
  };
}

// Vuex store to collect loadings
const createStore = function(moduleName) {
  return function(store) {
    store.registerModule(moduleName, {
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
    });
  };
};

// Vue plugin
const createInstaller = function({ moduleName, componentName, className }) {
  return function(Vue) {
    Vue.prototype.$startLoading = function(loaderMessage) {
      this.$store.dispatch(`${moduleName}/load`, loaderMessage, { root: true });
    };
    Vue.prototype.$endLoading = function(loaderMessage) {
      this.$store.dispatch(`${moduleName}/end`, loaderMessage, { root: true });
    };
    Vue.prototype.$isLoading = function(loaderMessage) {
      return this.$store.getters[`${moduleName}/isLoading`](loaderMessage);
    };
    Vue.prototype.$anyLoading = function() {
      return this.$store.getters[`${moduleName}/anyLoading`];
    };

    Vue.component(
      componentName,
      createComponent({ componentName, moduleName, className })
    );
    Object.keys(spinners).forEach(spinner => {
      Vue.component(`${componentName}-${spinner}`, spinners[spinner]);
    });
  };
};

function createVuexLoader(
  {
    moduleName = 'loading',
    componentName = 'v-loading',
    className = 'v-loading'
  } = {}
) {
  return {
    install: createInstaller({ moduleName, componentName, className }),
    Store: createStore(moduleName)
  };
}

function createActionHelpers({ moduleName = 'loading' } = {}) {
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

export default {
  createVuexLoader,
  createActionHelpers
};
