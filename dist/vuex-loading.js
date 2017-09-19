/**
 * @license
 *
 * vuex-loading v0.1.13
 *
 * (c) 2017 Fatih Kadir Akın <fatihkadirakin@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.createVuexLoader = factory());
}(this, (function () { 'use strict';

var spinner = {
  props: {
    width: {
      type: String,
      default: '100'
    },
    height: {
      type: String,
      default: '100'
    }
  },
  template: "\n    <svg style='vertical-align: middle' :width=\"width\" :height=\"height\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\" preserveAspectRatio=\"xMidYMid\" class=\"uil-spin\">\n        <rect x=\"0\" y=\"0\" width=\"100\" height=\"100\" fill=\"none\" class=\"bk\"></rect>\n        <g transform=\"translate(50 50)\">\n            <g transform=\"rotate(0) translate(34 0)\">\n                <circle cx=\"0\" cy=\"0\" r=\"6\" fill=\"#000\">\n                    <animate attributeName=\"opacity\" from=\"1\" to=\"0.1\" begin=\"-0.87s\" dur=\"1s\" repeatCount=\"indefinite\"></animate>\n                    <animateTransform attributeName=\"transform\" type=\"scale\" from=\"1.5\" to=\"1\" begin=\"-0.87s\" dur=\"1s\" repeatCount=\"indefinite\"></animateTransform>\n                </circle>\n            </g>\n            <g transform=\"rotate(45) translate(34 0)\">\n                <circle cx=\"0\" cy=\"0\" r=\"6\" fill=\"#000\">\n                    <animate attributeName=\"opacity\" from=\"1\" to=\"0.1\" begin=\"-0.75s\" dur=\"1s\" repeatCount=\"indefinite\"></animate>\n                    <animateTransform attributeName=\"transform\" type=\"scale\" from=\"1.5\" to=\"1\" begin=\"-0.75s\" dur=\"1s\" repeatCount=\"indefinite\"></animateTransform>\n                </circle>\n            </g>\n            <g transform=\"rotate(90) translate(34 0)\">\n                <circle cx=\"0\" cy=\"0\" r=\"6\" fill=\"#000\">\n                    <animate attributeName=\"opacity\" from=\"1\" to=\"0.1\" begin=\"-0.62s\" dur=\"1s\" repeatCount=\"indefinite\"></animate>\n                    <animateTransform attributeName=\"transform\" type=\"scale\" from=\"1.5\" to=\"1\" begin=\"-0.62s\" dur=\"1s\" repeatCount=\"indefinite\"></animateTransform>\n                </circle>\n            </g>\n            <g transform=\"rotate(135) translate(34 0)\">\n                <circle cx=\"0\" cy=\"0\" r=\"6\" fill=\"#000\">\n                    <animate attributeName=\"opacity\" from=\"1\" to=\"0.1\" begin=\"-0.5s\" dur=\"1s\" repeatCount=\"indefinite\"></animate>\n                    <animateTransform attributeName=\"transform\" type=\"scale\" from=\"1.5\" to=\"1\" begin=\"-0.5s\" dur=\"1s\" repeatCount=\"indefinite\"></animateTransform>\n                </circle>\n            </g>\n            <g transform=\"rotate(180) translate(34 0)\">\n                <circle cx=\"0\" cy=\"0\" r=\"6\" fill=\"#000\">\n                    <animate attributeName=\"opacity\" from=\"1\" to=\"0.1\" begin=\"-0.37s\" dur=\"1s\" repeatCount=\"indefinite\"></animate>\n                    <animateTransform attributeName=\"transform\" type=\"scale\" from=\"1.5\" to=\"1\" begin=\"-0.37s\" dur=\"1s\" repeatCount=\"indefinite\"></animateTransform>\n                </circle>\n            </g>\n            <g transform=\"rotate(225) translate(34 0)\">\n                <circle cx=\"0\" cy=\"0\" r=\"6\" fill=\"#000\">\n                    <animate attributeName=\"opacity\" from=\"1\" to=\"0.1\" begin=\"-0.25s\" dur=\"1s\" repeatCount=\"indefinite\"></animate>\n                    <animateTransform attributeName=\"transform\" type=\"scale\" from=\"1.5\" to=\"1\" begin=\"-0.25s\" dur=\"1s\" repeatCount=\"indefinite\"></animateTransform>\n                </circle>\n            </g>\n            <g transform=\"rotate(270) translate(34 0)\">\n                <circle cx=\"0\" cy=\"0\" r=\"6\" fill=\"#000\">\n                    <animate attributeName=\"opacity\" from=\"1\" to=\"0.1\" begin=\"-0.12s\" dur=\"1s\" repeatCount=\"indefinite\"></animate>\n                    <animateTransform attributeName=\"transform\" type=\"scale\" from=\"1.5\" to=\"1\" begin=\"-0.12s\" dur=\"1s\" repeatCount=\"indefinite\"></animateTransform>\n                </circle>\n            </g>\n            <g transform=\"rotate(315) translate(34 0)\">\n                <circle cx=\"0\" cy=\"0\" r=\"6\" fill=\"#000\">\n                    <animate attributeName=\"opacity\" from=\"1\" to=\"0.1\" begin=\"-0s\" dur=\"1s\" repeatCount=\"indefinite\"></animate>\n                    <animateTransform attributeName=\"transform\" type=\"scale\" from=\"1.5\" to=\"1\" begin=\"-0s\" dur=\"1s\" repeatCount=\"indefinite\"></animateTransform>\n                </circle>\n            </g>\n        </g>\n    </svg>\n  "
};

var heart = {
  props: {
    width: {
      type: String,
      default: '100'
    },
    height: {
      type: String,
      default: '100'
    }
  },
  template: "\n    <svg style='vertical-align: middle' :width='width' :height='height' xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\" preserveAspectRatio=\"xMidYMid\" class=\"uil-heart\"><rect x=\"0\" y=\"0\" width=\"100\" height=\"100\" fill=\"none\" class=\"bk\"></rect><g transform=\"translate(50 50)\"><g><g transform=\"translate(-50 -50)\"><path d=\"M90,30.2c0-11-9-20.1-20-20.1s-20,9.1-20,20.2c0,0.2,0-0.3,0,0.7H50c0-1,0-0.6,0-0.8c0-11-9-20.1-20-20.1s-20,9.1-20,20.2 c0,0.2,0-0.3,0,0.7h0c0.3,20,30,39.5,40,55c10-15.5,39.7-35,40-55h0C90,30,90,30.4,90,30.2z\" fill=\"#f02\"></path></g><animateTransform attributeName=\"transform\" type=\"scale\" from=\"1.3\" to=\"0.9\" dur=\"1s\" repeatCount=\"indefinite\" calcMode=\"spline\" values=\"1.3;0.9;1.1;0.9\" keyTimes=\"0;0.3;0.301;1\" keySplines=\"0 0.75 0.25 1;0 1 0 1;0 .75 .25 1\"></animateTransform></g></g></svg>\n  "
};

var mutations = {
  LOAD: 'LOAD',
  END: 'END'
};

var spinners = {
  spinner: spinner,
  heart: heart
};

// Base Utils
var uniq = function (array) {
  return array.filter(function (el, index, arr) { return index == arr.indexOf(el); });
};

function createComponent(ref) {
  var componentName = ref.componentName;
  var moduleName = ref.moduleName;
  var className = ref.className;

  return {
    template: ("\n      <div>\n        <span class='" + className + "' v-if='status'>\n          <slot name='spinner'>\n            <" + componentName + "-spinner :width=\"width || '1em'\" :height=\"height || '1em'\" />\n          </slot>\n          <span>{{ message }}</span>\n        </span>\n        <slot v-if='!status'></slot>\n      </div>\n    "),
    props: ['when', 'loader', 'message', 'height', 'width'],
    computed: {
      isLoading: function isLoading() {
        var store = this.$store;
        if (!store) {
          throw new Error('Vuex not initialized.');
        }
        return store.getters[(moduleName + "/isLoading")];
      },
      anyLoading: function anyLoading() {
        var store = this.$store;
        if (!store) {
          throw new Error('Vuex not initialized.');
        }
        return store.getters[(moduleName + "/anyLoading")];
      },
      status: function status() {
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
var createStore = function(moduleName) {
  return function(store) {
    store.registerModule(moduleName, {
      namespaced: true,
      state: {
        activeLoaders: []
      },
      getters: {
        isLoading: function (state) { return function (loaderMessage) { return state.activeLoaders.indexOf(loaderMessage) > -1; }; },
        anyLoading: function (state) { return state.activeLoaders.length > 0; }
      },
      actions: {
        load: function (ref, loaderMessage) {
            var commit = ref.commit;

            return commit(mutations.LOAD, loaderMessage);
    },
        end: function (ref, loaderMessage) {
          var commit = ref.commit;

          return commit(mutations.END, loaderMessage);
    }
      },
      mutations: ( obj = {}, obj[mutations.LOAD] = function (state, loaderMessage) {
          state.activeLoaders.push(loaderMessage);
          state.activeLoaders = uniq(state.activeLoaders);
        }, obj[mutations.END] = function (state, loaderMessage) {
          state.activeLoaders = uniq(state.activeLoaders).filter(
            function (p) { return p !== loaderMessage; }
          );
        }, obj )
    });
    var obj;
  };
};

// Vue plugin
var createInstaller = function(ref) {
  var moduleName = ref.moduleName;
  var componentName = ref.componentName;
  var className = ref.className;

  return function(Vue) {
    Vue.prototype.$startLoading = function(loaderMessage) {
      this.$store.dispatch((moduleName + "/load"), loaderMessage, { root: true });
    };
    Vue.prototype.$endLoading = function(loaderMessage) {
      this.$store.dispatch((moduleName + "/end"), loaderMessage, { root: true });
    };
    Vue.prototype.$isLoading = function(loaderMessage) {
      return this.$store.getters[(moduleName + "/isLoading")](loaderMessage);
    };
    Vue.prototype.$anyLoading = function() {
      return this.$store.getters[(moduleName + "/anyLoading")];
    };

    Vue.component(
      componentName,
      createComponent({ componentName: componentName, moduleName: moduleName, className: className })
    );
    Object.keys(spinners).forEach(function (spinner$$1) {
      Vue.component((componentName + "-" + spinner$$1), spinners[spinner$$1]);
    });
  };
};

function createVuexLoader(ref) {
  var moduleName = ref.moduleName; if ( moduleName === void 0 ) moduleName = 'loading';
  var componentName = ref.componentName; if ( componentName === void 0 ) componentName = 'v-loading';
  var className = ref.className; if ( className === void 0 ) className = 'v-loading';

  return {
    install: createInstaller({ moduleName: moduleName, componentName: componentName, className: className }),
    Store: createStore(moduleName)
  };
}

function createActionHelpers(ref) {
  var moduleName = ref.moduleName;

  var start = function(dispatcher, loaderMessage) {
    dispatcher((moduleName + "/load"), loaderMessage, { root: true });
  };
  var end = function(dispatcher, loaderMessage) {
    dispatcher((moduleName + "/end"), loaderMessage, { root: true });
  };
  return {
    // start and stop helpers for async processes
    startLoading: function startLoading(dispatcher, loaderMessage, callback) {
      start(dispatcher, loaderMessage);
      if(!callback) { return; }
      return new Promise(function (resolve, reject) {
        callback()
          .then(function (response) {
            resolve(response);
            end(dispatcher, loaderMessage);
          })
          .catch(function (response) {
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

var vuexLoading = {
  createVuexLoader: createVuexLoader,
  createActionHelpers: createActionHelpers
};

return vuexLoading;

})));
