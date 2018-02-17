(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.VuexLoading = {})));
}(this, (function (exports) { 'use strict';

var vLoading = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', [_vm.status ? _c('span', { attrs: { "width": _vm.width || '1em', "height": _vm.height || '1em' } }, [_vm._t("spinner"), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.message))])], 2) : _vm._e(), _vm._v(" "), !_vm.status ? _vm._t("default") : _vm._e()], 2);
  }, staticRenderFns: [],
  name: 'v-loading',
  props: ['when', 'loader', 'message', 'height', 'width'],
  computed: {
    status: function status() {
      if (this.when) {
        return this.when;
      }
      if (this.loader) {
        return this.$loading.isLoading(this.loader);
      }
      return this.$loading.anyLoading;
    }
  }
};

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var mutations = {
  LOAD: 'LOAD',
  END: 'END'
};

var uniq = function uniq(array) {
  return array.filter(function (el, index, arr) {
    return index == arr.indexOf(el);
  });
};

var VueLoading = function () {
  function VueLoading() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, VueLoading);

    var _options$useVuex = options.useVuex,
        useVuex = _options$useVuex === undefined ? false : _options$useVuex,
        _options$moduleName = options.moduleName,
        moduleName = _options$moduleName === undefined ? 'loading' : _options$moduleName,
        _options$registerComp = options.registerComponents,
        registerComponents = _options$registerComp === undefined ? true : _options$registerComp;


    this.useVuex = useVuex;
    this.moduleName = moduleName;
    this.registerComponents = registerComponents;
    this.initialized = false;
    this.store = null;
  }

  _createClass(VueLoading, [{
    key: 'init',
    value: function init(Vue, store) {
      var _mutations;

      if (this.initialized) {
        return;
      }

      if (this.registerComponents) {
        Vue.component(vLoading.name, vLoading);
      }

      var storeModule = {
        namespaced: true,
        state: {
          activeLoaders: []
        },
        getters: {
          isLoading: function isLoading(state) {
            return function (loaderMessage) {
              return Array.isArray(loaderMessage) ? state.activeLoaders.some(function (v) {
                return loaderMessage.includes(v);
              }) : state.activeLoaders.indexOf(loaderMessage) > -1;
            };
          },
          anyLoading: function anyLoading(state) {
            return state.activeLoaders.length > 0;
          }
        },
        actions: {
          load: function load(_ref, loaderMessage) {
            var commit = _ref.commit;
            return commit(mutations.LOAD, loaderMessage);
          },
          end: function end(_ref2, loaderMessage) {
            var commit = _ref2.commit;
            return commit(mutations.END, loaderMessage);
          }
        },
        mutations: (_mutations = {}, _defineProperty(_mutations, mutations.LOAD, function (state, loaderMessage) {
          state.activeLoaders.push(loaderMessage);
          state.activeLoaders = uniq(state.activeLoaders);
        }), _defineProperty(_mutations, mutations.END, function (state, loaderMessage) {
          state.activeLoaders = uniq(state.activeLoaders).filter(function (p) {
            return p !== loaderMessage;
          });
        }), _mutations)
      };
      if (this.useVuex) {
        var moduleName = this.moduleName;
        this.storage = new Vue({
          computed: {
            isLoading: function isLoading() {
              if (!store) {
                throw new Error('Vuex not initialized.');
              }
              return store.getters[moduleName + '/isLoading'];
            },
            anyLoading: function anyLoading() {
              if (!store) {
                throw new Error('Vuex not initialized.');
              }
              return store.getters[moduleName + '/anyLoading'];
            }
          }
        });

        this.store = store;
        store.registerModule(moduleName, storeModule);
      } else {
        this.storage = new Vue({
          data: {
            activeLoaders: []
          },
          computed: {
            isLoading: function isLoading() {
              var state = this;
              return storeModule.getters.isLoading(state);
            },
            anyLoading: function anyLoading() {
              var state = this;
              return storeModule.getters.anyLoading(state);
            }
          },
          methods: {
            startLoading: function startLoading(loaderMessage) {
              var state = this;
              storeModule.mutations[mutations.LOAD](state, loaderMessage);
            },
            endLoading: function endLoading(loaderMessage) {
              var state = this;
              storeModule.mutations[mutations.END](state, loaderMessage);
            }
          }
        });
      }
      this.initialized = true;
    }
  }, {
    key: 'isLoading',
    value: function isLoading(loaderMessage) {
      return this.storage.isLoading(loaderMessage);
    }
  }, {
    key: 'startLoading',
    value: function startLoading(loaderMessage) {
      if (this.useVuex) {
        this.store.dispatch(this.moduleName + '/load', loaderMessage, {
          root: true
        });
      } else {
        this.storage.startLoading(loaderMessage);
      }
    }
  }, {
    key: 'endLoading',
    value: function endLoading(loaderMessage) {
      if (this.useVuex) {
        this.store.dispatch(this.moduleName + '/end', loaderMessage, {
          root: true
        });
      } else {
        this.storage.endLoading(loaderMessage);
      }
    }
  }, {
    key: 'anyLoading',
    get: function get() {
      return this.storage.anyLoading;
    }
  }]);

  return VueLoading;
}();

function install(Vue) {
  if (install.installed && Vue) {
    return;
  }
  install.installed = true;

  Vue.mixin({
    beforeCreate: function beforeCreate() {
      var options = this.$options;
      if (options.vueLoading) {
        this.$loading = typeof options.vueLoading === 'function' ? new options.vueLoading() : options.vueLoading;
        this.$loading.init(Vue, options.store);
      } else if (options.parent && options.parent.$loading) {
        this.$loading = options.parent.$loading;
        this.$loading.init(Vue, options.parent.$store);
      }
    }
  });
}

function createActionHelpers(_ref3) {
  var moduleName = _ref3.moduleName;

  var start = function start(dispatcher, loaderMessage) {
    dispatcher(moduleName + '/load', loaderMessage, { root: true });
  };
  var end = function end(dispatcher, loaderMessage) {
    dispatcher(moduleName + '/end', loaderMessage, { root: true });
  };
  return {
    startLoading: function startLoading(dispatcher, loaderMessage, callback) {
      start(dispatcher, loaderMessage);
      if (!callback) return;
      return new Promise(function (resolve, reject) {
        callback().then(function (response) {
          resolve(response);
          end(dispatcher, loaderMessage);
        }).catch(function (response) {
          reject(response);
          end(dispatcher, loaderMessage);
        });
      });
    },
    endLoading: function endLoading(dispatcher, loaderMessage) {
      end(dispatcher, loaderMessage);
    }
  };
}

VueLoading.install = install;

exports.VueLoading = VueLoading;
exports.install = install;
exports.createActionHelpers = createActionHelpers;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=vuex-loading.umd.js.map
