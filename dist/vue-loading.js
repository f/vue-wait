(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["VueLoading"] = factory();
	else
		root["VueLoading"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/escape-string-regexp/index.js":
/*!****************************************************!*\
  !*** ./node_modules/escape-string-regexp/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar matchOperatorsRe = /[|\\\\{}()[\\]^$+*?.]/g;\n\nmodule.exports = function (str) {\n\tif (typeof str !== 'string') {\n\t\tthrow new TypeError('Expected a string');\n\t}\n\n\treturn str.replace(matchOperatorsRe, '\\\\$&');\n};\n\n\n//# sourceURL=webpack://VueLoading/./node_modules/escape-string-regexp/index.js?");

/***/ }),

/***/ "./node_modules/matcher/index.js":
/*!***************************************!*\
  !*** ./node_modules/matcher/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nconst escapeStringRegexp = __webpack_require__(/*! escape-string-regexp */ \"./node_modules/escape-string-regexp/index.js\");\n\nconst reCache = new Map();\n\nfunction makeRe(pattern, options) {\n\tconst opts = Object.assign({\n\t\tcaseSensitive: false\n\t}, options);\n\n\tconst cacheKey = pattern + JSON.stringify(opts);\n\n\tif (reCache.has(cacheKey)) {\n\t\treturn reCache.get(cacheKey);\n\t}\n\n\tconst negated = pattern[0] === '!';\n\n\tif (negated) {\n\t\tpattern = pattern.slice(1);\n\t}\n\n\tpattern = escapeStringRegexp(pattern).replace(/\\\\\\*/g, '.*');\n\n\tconst re = new RegExp(`^${pattern}$`, opts.caseSensitive ? '' : 'i');\n\tre.negated = negated;\n\treCache.set(cacheKey, re);\n\n\treturn re;\n}\n\nmodule.exports = (inputs, patterns, options) => {\n\tif (!(Array.isArray(inputs) && Array.isArray(patterns))) {\n\t\tthrow new TypeError(`Expected two arrays, got ${typeof inputs} ${typeof patterns}`);\n\t}\n\n\tif (patterns.length === 0) {\n\t\treturn inputs;\n\t}\n\n\tconst firstNegated = patterns[0][0] === '!';\n\n\tpatterns = patterns.map(x => makeRe(x, options));\n\n\tconst ret = [];\n\n\tfor (const input of inputs) {\n\t\t// If first pattern is negated we include everything to match user expectation\n\t\tlet matches = firstNegated;\n\n\t\tfor (const pattern of patterns) {\n\t\t\tif (pattern.test(input)) {\n\t\t\t\tmatches = !pattern.negated;\n\t\t\t}\n\t\t}\n\n\t\tif (matches) {\n\t\t\tret.push(input);\n\t\t}\n\t}\n\n\treturn ret;\n};\n\nmodule.exports.isMatch = (input, pattern, options) => {\n\tconst re = makeRe(pattern, options);\n\tconst matches = re.test(input);\n\treturn re.negated ? !matches : matches;\n};\n\n\n//# sourceURL=webpack://VueLoading/./node_modules/matcher/index.js?");

/***/ }),

/***/ "./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/v-loading.vue?vue&type=script&lang=js":
/*!****************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib??vue-loader-options!./src/components/v-loading.vue?vue&type=script&lang=js ***!
  \****************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n//\n//\n//\n//\n//\n//\n//\n//\n//\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  props: {\n    visible: Boolean,\n    loader: String,\n    message: String,\n  },\n  computed: {\n    isLoading() {\n      if (this.visible) {\n        return this.visible;\n      }\n      if (this.loader) {\n        return this.__$vueLoadingInstance.isLoading(this.loader);\n      }\n      return this.__$vueLoadingInstance.anyLoading;\n    }\n  }\n});\n\n\n//# sourceURL=webpack://VueLoading/./src/components/v-loading.vue?./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/v-loading.vue?vue&type=template&id=3d2e86f6&lang=html":
/*!************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/components/v-loading.vue?vue&type=template&id=3d2e86f6&lang=html ***!
  \************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\n    \"div\",\n    [\n      _vm.isLoading\n        ? _c(\n            \"span\",\n            [\n              _vm._t(\"loading\"),\n              _vm._v(\" \"),\n              _vm.message ? _c(\"span\", [_vm._v(_vm._s(_vm.message))]) : _vm._e()\n            ],\n            2\n          )\n        : _vm._e(),\n      _vm._v(\" \"),\n      !_vm.isLoading ? _vm._t(\"default\") : _vm._e()\n    ],\n    2\n  )\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack://VueLoading/./src/components/v-loading.vue?./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js":
/*!********************************************************************!*\
  !*** ./node_modules/vue-loader/lib/runtime/componentNormalizer.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return normalizeComponent; });\n/* globals __VUE_SSR_CONTEXT__ */\n\n// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).\n// This module is a runtime utility for cleaner component module output and will\n// be included in the final webpack user bundle.\n\nfunction normalizeComponent (\n  scriptExports,\n  render,\n  staticRenderFns,\n  functionalTemplate,\n  injectStyles,\n  scopeId,\n  moduleIdentifier, /* server only */\n  shadowMode /* vue-cli only */\n) {\n  // Vue.extend constructor export interop\n  var options = typeof scriptExports === 'function'\n    ? scriptExports.options\n    : scriptExports\n\n  // render functions\n  if (render) {\n    options.render = render\n    options.staticRenderFns = staticRenderFns\n    options._compiled = true\n  }\n\n  // functional template\n  if (functionalTemplate) {\n    options.functional = true\n  }\n\n  // scopedId\n  if (scopeId) {\n    options._scopeId = 'data-v-' + scopeId\n  }\n\n  var hook\n  if (moduleIdentifier) { // server build\n    hook = function (context) {\n      // 2.3 injection\n      context =\n        context || // cached call\n        (this.$vnode && this.$vnode.ssrContext) || // stateful\n        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional\n      // 2.2 with runInNewContext: true\n      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {\n        context = __VUE_SSR_CONTEXT__\n      }\n      // inject component styles\n      if (injectStyles) {\n        injectStyles.call(this, context)\n      }\n      // register component module identifier for async chunk inferrence\n      if (context && context._registeredComponents) {\n        context._registeredComponents.add(moduleIdentifier)\n      }\n    }\n    // used by ssr in case component is cached and beforeCreate\n    // never gets called\n    options._ssrRegister = hook\n  } else if (injectStyles) {\n    hook = shadowMode\n      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }\n      : injectStyles\n  }\n\n  if (hook) {\n    if (options.functional) {\n      // for template-only hot-reload because in that case the render fn doesn't\n      // go through the normalizer\n      options._injectStyles = hook\n      // register for functioal component in vue file\n      var originalRender = options.render\n      options.render = function renderWithStyleInjection (h, context) {\n        hook.call(context)\n        return originalRender(h, context)\n      }\n    } else {\n      // inject component registration as beforeCreate hook\n      var existing = options.beforeCreate\n      options.beforeCreate = existing\n        ? [].concat(existing, hook)\n        : [hook]\n    }\n  }\n\n  return {\n    exports: scriptExports,\n    options: options\n  }\n}\n\n\n//# sourceURL=webpack://VueLoading/./node_modules/vue-loader/lib/runtime/componentNormalizer.js?");

/***/ }),

/***/ "./src/components/v-loading.vue":
/*!**************************************!*\
  !*** ./src/components/v-loading.vue ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _v_loading_vue_vue_type_template_id_3d2e86f6_lang_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./v-loading.vue?vue&type=template&id=3d2e86f6&lang=html */ \"./src/components/v-loading.vue?vue&type=template&id=3d2e86f6&lang=html\");\n/* harmony import */ var _v_loading_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./v-loading.vue?vue&type=script&lang=js */ \"./src/components/v-loading.vue?vue&type=script&lang=js\");\n/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\n  _v_loading_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _v_loading_vue_vue_type_template_id_3d2e86f6_lang_html__WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _v_loading_vue_vue_type_template_id_3d2e86f6_lang_html__WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"src/components/v-loading.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack://VueLoading/./src/components/v-loading.vue?");

/***/ }),

/***/ "./src/components/v-loading.vue?vue&type=script&lang=js":
/*!**************************************************************!*\
  !*** ./src/components/v-loading.vue?vue&type=script&lang=js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_v_loading_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib??vue-loader-options!./v-loading.vue?vue&type=script&lang=js */ \"./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/v-loading.vue?vue&type=script&lang=js\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_vue_loader_lib_index_js_vue_loader_options_v_loading_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack://VueLoading/./src/components/v-loading.vue?");

/***/ }),

/***/ "./src/components/v-loading.vue?vue&type=template&id=3d2e86f6&lang=html":
/*!******************************************************************************!*\
  !*** ./src/components/v-loading.vue?vue&type=template&id=3d2e86f6&lang=html ***!
  \******************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_v_loading_vue_vue_type_template_id_3d2e86f6_lang_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib??vue-loader-options!./v-loading.vue?vue&type=template&id=3d2e86f6&lang=html */ \"./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/v-loading.vue?vue&type=template&id=3d2e86f6&lang=html\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_v_loading_vue_vue_type_template_id_3d2e86f6_lang_html__WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_v_loading_vue_vue_type_template_id_3d2e86f6_lang_html__WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack://VueLoading/./src/components/v-loading.vue?");

/***/ }),

/***/ "./src/directives/loading.js":
/*!***********************************!*\
  !*** ./src/directives/loading.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction bind(el, binding, vNode, oldVNode) {\n  const { arg, modifiers, value } = binding;\n  const instance = vNode.context.__$vueLoadingInstance;\n  switch (arg) {\n    case 'click':\n      if (modifiers.start) {\n        el.addEventListener('click', () => instance.startLoading(value), false);\n        break;\n      }\n      if (modifiers.end) {\n        el.addEventListener('click', () => instance.endLoading(value), false);\n        break;\n      }\n      break;\n    case 'toggle':\n      el.addEventListener(\n        'click',\n        () => {\n          const isLoading = instance.isLoading(value);\n          if (!isLoading) {\n            instance.startLoading(value);\n          } else {\n            instance.endLoading(value);\n          }\n        },\n        false\n      );\n      break;\n  }\n\n  update(el, binding, vNode, oldVNode);\n}\n\nfunction update(el, binding, vNode, oldVNode) {\n  const { arg, modifiers, value } = binding;\n  const instance = vNode.context.__$vueLoadingInstance;\n\n  let isLoading = instance.isLoading(value);\n  if (modifiers.not || ['hidden', 'enabled'].includes(arg)) {\n    isLoading = !isLoading;\n  }\n\n  const originalDisplay = el.style.display === 'none' ? '' : el.style.display;\n  switch (arg) {\n    case 'visible':\n    case 'hidden':\n      el.style.display = !isLoading ? 'none' : originalDisplay;\n      break;\n    case 'enabled':\n    case 'disabled':\n      isLoading\n        ? el.setAttribute('disabled', true)\n        : el.removeAttribute('disabled');\n      break;\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  bind,\n  update\n});\n\n\n//# sourceURL=webpack://VueLoading/./src/directives/loading.js?");

/***/ }),

/***/ "./src/helpers.js":
/*!************************!*\
  !*** ./src/helpers.js ***!
  \************************/
/*! exports provided: mapLoadingActions, wrapLoading */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"mapLoadingActions\", function() { return mapLoadingActions; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"wrapLoading\", function() { return wrapLoading; });\nfunction mapLoadingActions(vuexModuleName, actions) {\n  const mappings = {};\n  if (typeof vuexModuleName === 'object') {\n    actions = vuexModuleName;\n    vuexModuleName = null;\n  }\n  Object.keys(actions).forEach(action => {\n    const loader = actions[action];\n    mappings[action] = async function(...args) {\n      try {\n        this.__$vueLoadingInstance.startLoading(loader);\n        return await this.$store.dispatch(\n          vuexModuleName ? `${vuexModuleName}/${action}` : action,\n          ...args\n        );\n      } finally {\n        this.__$vueLoadingInstance.endLoading(loader);\n      }\n    };\n  });\n  return mappings;\n}\n\nfunction wrapLoading(loader, func, forceSync = false) {\n  if (typeof func !== 'function') {\n    console.warn(\n      '[vuex-loading] wrapLoading second argument must be a function'\n    );\n    return func;\n  }\n\n  if (forceSync === true) {\n    return function(...args) {\n      try {\n        this.__$vueLoadingInstance.startLoading(loader);\n        return func.apply(this, args);\n      } finally {\n        this.__$vueLoadingInstance.endLoading(loader);\n      }\n    };\n  }\n  return async function(...args) {\n    try {\n      this.__$vueLoadingInstance.startLoading(loader);\n      return await func.apply(this, args);\n    } finally {\n      this.__$vueLoadingInstance.endLoading(loader);\n    }\n  };\n}\n\n\n//# sourceURL=webpack://VueLoading/./src/helpers.js?");

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! exports provided: isLoading, anyLoading, startLoading, endLoading, uniqArray, nodeIsDebug */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"isLoading\", function() { return isLoading; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"anyLoading\", function() { return anyLoading; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"startLoading\", function() { return startLoading; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"endLoading\", function() { return endLoading; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"uniqArray\", function() { return uniqArray; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"nodeIsDebug\", function() { return nodeIsDebug; });\n/* harmony import */ var matcher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! matcher */ \"./node_modules/matcher/index.js\");\n/* harmony import */ var matcher__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(matcher__WEBPACK_IMPORTED_MODULE_0__);\n\n\nfunction isLoading(loaders, loader) {\n  if (loader.match(/[\\*\\!]/)) {\n    return loaders.filter(l => Object(matcher__WEBPACK_IMPORTED_MODULE_0__[\"isMatch\"])(l, loader)).length > 0;\n  }\n  return Array.isArray(loader)\n    ? loaders.some(v => loader.includes(v))\n    : loaders.indexOf(loader) > -1;\n}\n\nfunction anyLoading(loaders) {\n  return loaders.length > 0;\n}\n\nfunction startLoading(loaders, loader) {\n  return uniqArray([...loaders, loader]);\n}\n\nfunction endLoading(loaders, loader) {\n  return uniqArray(loaders).filter(l => l !== loader);\n}\n\nfunction uniqArray(array) {\n  return array.filter((el, index, arr) => index == arr.indexOf(el));\n}\n\nfunction nodeIsDebug() {\n  return \"development\" !== 'production';\n}\n\n\n//# sourceURL=webpack://VueLoading/./src/utils.js?");

/***/ }),

/***/ "./src/vue-loading.js":
/*!****************************!*\
  !*** ./src/vue-loading.js ***!
  \****************************/
/*! exports provided: default, install, mapLoadingActions, wrapLoading */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return VueLoading; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"install\", function() { return install; });\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ \"./src/utils.js\");\n/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers */ \"./src/helpers.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"mapLoadingActions\", function() { return _helpers__WEBPACK_IMPORTED_MODULE_1__[\"mapLoadingActions\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"wrapLoading\", function() { return _helpers__WEBPACK_IMPORTED_MODULE_1__[\"wrapLoading\"]; });\n\n/* harmony import */ var _vuex_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./vuex/store */ \"./src/vuex/store.js\");\n/* harmony import */ var _components_v_loading_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/v-loading.vue */ \"./src/components/v-loading.vue\");\n/* harmony import */ var _directives_loading_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./directives/loading.js */ \"./src/directives/loading.js\");\n\n\n\n\n\n\n\n\nclass VueLoading {\n  constructor(options = {}) {\n    const defaults = {\n      accessorName: '$vueLoading',\n      // Vuex Options\n      useVuex: false,\n      vuexModuleName: 'loading',\n      // Components\n      registerComponent: true,\n      componentName: 'v-loading',\n      // Directives\n      registerDirective: true,\n      directiveName: 'loading'\n    };\n    this.options = {\n      ...defaults,\n      ...options\n    };\n    this.initialized = false;\n  }\n\n  init(Vue, store) {\n    if (Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"nodeIsDebug\"])() && !install.installed) {\n      console.warn(\n        `[vuex-loading] not installed. Make sure to call \\`Vue.use(VuexLoading)\\` before init root instance.`\n      );\n    }\n\n    if (this.initialized) {\n      return;\n    }\n\n    if (this.options.registerComponent) {\n      Vue.component(this.options.componentName, _components_v_loading_vue__WEBPACK_IMPORTED_MODULE_3__[\"default\"]);\n    }\n\n    if (this.options.registerDirective) {\n      Vue.directive(this.options.directiveName, _directives_loading_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"]);\n    }\n\n    if (this.options.useVuex) {\n      const { vuexModuleName } = this.options;\n      if (!store) {\n        throw new Error('[vuex-loading] Vuex not initialized.');\n      }\n      this.store = store;\n\n      if (!store._modules.get([vuexModuleName])) {\n        store.registerModule(vuexModuleName, _vuex_store__WEBPACK_IMPORTED_MODULE_2__[\"default\"]);\n      }\n\n      this.stateHandler = new Vue({\n        computed: {\n          isLoading: () => loader =>\n            store.getters[`${vuexModuleName}/isLoading`](loader),\n          anyLoading: () => store.getters[`${vuexModuleName}/anyLoading`]\n        }\n      });\n    } else {\n      this.stateHandler = new Vue({\n        data() {\n          return {\n            activeLoaders: []\n          };\n        },\n        computed: {\n          isLoading() {\n            return loader => Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"isLoading\"])(this.activeLoaders, loader);\n          },\n          anyLoading() {\n            return Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"anyLoading\"])(this.activeLoaders);\n          }\n        },\n        methods: {\n          startLoading(loader) {\n            this.activeLoaders = Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"startLoading\"])(this.activeLoaders, loader);\n          },\n          endLoading(loader) {\n            this.activeLoaders = Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"endLoading\"])(this.activeLoaders, loader);\n          }\n        }\n      });\n    }\n\n    this.initialized = true;\n  }\n\n  get anyLoading() {\n    return this.stateHandler.anyLoading;\n  }\n\n  isLoading(loader) {\n    return this.stateHandler.isLoading(loader);\n  }\n\n  dispatchLoaderAction(action, loader) {\n    const { vuexModuleName } = this.options;\n    this.store.dispatch(`${vuexModuleName}/${action}`, loader, {\n      root: true\n    });\n  }\n\n  startLoading(loader) {\n    if (this.options.useVuex) {\n      this.dispatchLoaderAction('startLoading', loader);\n      return;\n    }\n    this.stateHandler.startLoading(loader);\n  }\n\n  endLoading(loader) {\n    if (this.options.useVuex) {\n      this.dispatchLoaderAction('endLoading', loader);\n      return;\n    }\n    this.stateHandler.endLoading(loader);\n  }\n}\n\nfunction install(Vue) {\n  if (install.installed && Vue) {\n    if (Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"nodeIsDebug\"])()) {\n      console.warn(\n        '[vuex-loading] already installed. Vue.use(VuexLoading) should be called only once.'\n      );\n    }\n    return;\n  }\n\n  Vue.mixin({\n    /**\n     * VueLoading init hook, injected into each instances init hooks list.\n     */\n    beforeCreate() {\n      const { vueLoading, store, parent } = this.$options;\n\n      let instance = null;\n      if (vueLoading) {\n        instance =\n          typeof vueLoading === 'function' ? new vueLoading() : vueLoading;\n        // Inject store\n        instance.init(Vue, store);\n      } else if (parent && parent.__$vueLoadingInstance) {\n        instance = parent.__$vueLoadingInstance;\n        instance.init(Vue, parent.$store);\n      }\n\n      if (instance) {\n        // Store helper for internal use\n        this.__$vueLoadingInstance = instance;\n        this[instance.options.accessorName] = instance;\n      }\n    }\n  });\n\n  install.installed = true;\n}\n\n// Bypass helpers\n\n\nVueLoading.install = install;\n\n\n//# sourceURL=webpack://VueLoading/./src/vue-loading.js?");

/***/ }),

/***/ "./src/vuex/store.js":
/*!***************************!*\
  !*** ./src/vuex/store.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ \"./src/utils.js\");\n\n\nconst mutations = {\n  START_LOADING: 'START_LOADING',\n  END_LOADING: 'END_LOADING'\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  namespaced: true,\n  state: {\n    activeLoaders: []\n  },\n  getters: {\n    isLoading: state => loader => Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"isLoading\"])(state.activeLoaders, loader),\n    anyLoading: state => Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"anyLoading\"])(state.activeLoaders)\n  },\n  actions: {\n    startLoading: ({ commit }, loader) =>\n      commit(mutations.START_LOADING, loader),\n    endLoading: ({ commit }, loader) => commit(mutations.END_LOADING, loader)\n  },\n  mutations: {\n    [mutations.START_LOADING](state, loader) {\n      state.activeLoaders = Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"startLoading\"])(state.activeLoaders, loader);\n    },\n    [mutations.END_LOADING](state, loader) {\n      state.activeLoaders = Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"endLoading\"])(state.activeLoaders, loader);\n    }\n  }\n});\n\n\n//# sourceURL=webpack://VueLoading/./src/vuex/store.js?");

/***/ }),

/***/ 0:
/*!**********************************!*\
  !*** multi ./src/vue-loading.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./src/vue-loading.js */\"./src/vue-loading.js\");\n\n\n//# sourceURL=webpack://VueLoading/multi_./src/vue-loading.js?");

/***/ })

/******/ });
});