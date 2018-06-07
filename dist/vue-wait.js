(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["VueWait"] = factory();
	else
		root["VueWait"] = factory();
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
eval("\n\nvar matchOperatorsRe = /[|\\\\{}()[\\]^$+*?.]/g;\n\nmodule.exports = function (str) {\n\tif (typeof str !== 'string') {\n\t\tthrow new TypeError('Expected a string');\n\t}\n\n\treturn str.replace(matchOperatorsRe, '\\\\$&');\n};\n\n\n//# sourceURL=webpack://VueWait/./node_modules/escape-string-regexp/index.js?");

/***/ }),

/***/ "./node_modules/matcher/index.js":
/*!***************************************!*\
  !*** ./node_modules/matcher/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nconst escapeStringRegexp = __webpack_require__(/*! escape-string-regexp */ \"./node_modules/escape-string-regexp/index.js\");\n\nconst reCache = new Map();\n\nfunction makeRe(pattern, options) {\n\tconst opts = Object.assign({\n\t\tcaseSensitive: false\n\t}, options);\n\n\tconst cacheKey = pattern + JSON.stringify(opts);\n\n\tif (reCache.has(cacheKey)) {\n\t\treturn reCache.get(cacheKey);\n\t}\n\n\tconst negated = pattern[0] === '!';\n\n\tif (negated) {\n\t\tpattern = pattern.slice(1);\n\t}\n\n\tpattern = escapeStringRegexp(pattern).replace(/\\\\\\*/g, '.*');\n\n\tconst re = new RegExp(`^${pattern}$`, opts.caseSensitive ? '' : 'i');\n\tre.negated = negated;\n\treCache.set(cacheKey, re);\n\n\treturn re;\n}\n\nmodule.exports = (inputs, patterns, options) => {\n\tif (!(Array.isArray(inputs) && Array.isArray(patterns))) {\n\t\tthrow new TypeError(`Expected two arrays, got ${typeof inputs} ${typeof patterns}`);\n\t}\n\n\tif (patterns.length === 0) {\n\t\treturn inputs;\n\t}\n\n\tconst firstNegated = patterns[0][0] === '!';\n\n\tpatterns = patterns.map(x => makeRe(x, options));\n\n\tconst ret = [];\n\n\tfor (const input of inputs) {\n\t\t// If first pattern is negated we include everything to match user expectation\n\t\tlet matches = firstNegated;\n\n\t\tfor (const pattern of patterns) {\n\t\t\tif (pattern.test(input)) {\n\t\t\t\tmatches = !pattern.negated;\n\t\t\t}\n\t\t}\n\n\t\tif (matches) {\n\t\t\tret.push(input);\n\t\t}\n\t}\n\n\treturn ret;\n};\n\nmodule.exports.isMatch = (input, pattern, options) => {\n\tconst re = makeRe(pattern, options);\n\tconst matches = re.test(input);\n\treturn re.negated ? !matches : matches;\n};\n\n\n//# sourceURL=webpack://VueWait/./node_modules/matcher/index.js?");

/***/ }),

/***/ "./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/v-wait.vue?vue&type=script&lang=js":
/*!*************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib??vue-loader-options!./src/components/v-wait.vue?vue&type=script&lang=js ***!
  \*************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n//\n//\n//\n//\n//\n//\n//\n//\n//\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  props: {\n    visible: Boolean,\n    for: String,\n    message: String,\n  },\n  computed: {\n    isWaiting() {\n      if (this.visible) {\n        return this.visible;\n      }\n      if (this.for) {\n        return this.__$waitInstance.isWaiting(this.for);\n      }\n      return this.__$waitInstance.any;\n    }\n  }\n});\n\n\n//# sourceURL=webpack://VueWait/./src/components/v-wait.vue?./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/v-wait.vue?vue&type=template&id=2dae407c&lang=html":
/*!*********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/components/v-wait.vue?vue&type=template&id=2dae407c&lang=html ***!
  \*********************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\n    \"div\",\n    [\n      _vm.isWaiting\n        ? _c(\n            \"span\",\n            [\n              _vm._t(\"waiting\"),\n              _vm._v(\" \"),\n              _vm.message ? _c(\"span\", [_vm._v(_vm._s(_vm.message))]) : _vm._e()\n            ],\n            2\n          )\n        : _vm._e(),\n      _vm._v(\" \"),\n      !_vm.isWaiting ? _vm._t(\"default\") : _vm._e()\n    ],\n    2\n  )\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack://VueWait/./src/components/v-wait.vue?./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js":
/*!********************************************************************!*\
  !*** ./node_modules/vue-loader/lib/runtime/componentNormalizer.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return normalizeComponent; });\n/* globals __VUE_SSR_CONTEXT__ */\n\n// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).\n// This module is a runtime utility for cleaner component module output and will\n// be included in the final webpack user bundle.\n\nfunction normalizeComponent (\n  scriptExports,\n  render,\n  staticRenderFns,\n  functionalTemplate,\n  injectStyles,\n  scopeId,\n  moduleIdentifier, /* server only */\n  shadowMode /* vue-cli only */\n) {\n  // Vue.extend constructor export interop\n  var options = typeof scriptExports === 'function'\n    ? scriptExports.options\n    : scriptExports\n\n  // render functions\n  if (render) {\n    options.render = render\n    options.staticRenderFns = staticRenderFns\n    options._compiled = true\n  }\n\n  // functional template\n  if (functionalTemplate) {\n    options.functional = true\n  }\n\n  // scopedId\n  if (scopeId) {\n    options._scopeId = 'data-v-' + scopeId\n  }\n\n  var hook\n  if (moduleIdentifier) { // server build\n    hook = function (context) {\n      // 2.3 injection\n      context =\n        context || // cached call\n        (this.$vnode && this.$vnode.ssrContext) || // stateful\n        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional\n      // 2.2 with runInNewContext: true\n      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {\n        context = __VUE_SSR_CONTEXT__\n      }\n      // inject component styles\n      if (injectStyles) {\n        injectStyles.call(this, context)\n      }\n      // register component module identifier for async chunk inferrence\n      if (context && context._registeredComponents) {\n        context._registeredComponents.add(moduleIdentifier)\n      }\n    }\n    // used by ssr in case component is cached and beforeCreate\n    // never gets called\n    options._ssrRegister = hook\n  } else if (injectStyles) {\n    hook = shadowMode\n      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }\n      : injectStyles\n  }\n\n  if (hook) {\n    if (options.functional) {\n      // for template-only hot-reload because in that case the render fn doesn't\n      // go through the normalizer\n      options._injectStyles = hook\n      // register for functioal component in vue file\n      var originalRender = options.render\n      options.render = function renderWithStyleInjection (h, context) {\n        hook.call(context)\n        return originalRender(h, context)\n      }\n    } else {\n      // inject component registration as beforeCreate hook\n      var existing = options.beforeCreate\n      options.beforeCreate = existing\n        ? [].concat(existing, hook)\n        : [hook]\n    }\n  }\n\n  return {\n    exports: scriptExports,\n    options: options\n  }\n}\n\n\n//# sourceURL=webpack://VueWait/./node_modules/vue-loader/lib/runtime/componentNormalizer.js?");

/***/ }),

/***/ "./src/components/v-wait.vue":
/*!***********************************!*\
  !*** ./src/components/v-wait.vue ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _v_wait_vue_vue_type_template_id_2dae407c_lang_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./v-wait.vue?vue&type=template&id=2dae407c&lang=html */ \"./src/components/v-wait.vue?vue&type=template&id=2dae407c&lang=html\");\n/* harmony import */ var _v_wait_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./v-wait.vue?vue&type=script&lang=js */ \"./src/components/v-wait.vue?vue&type=script&lang=js\");\n/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\n  _v_wait_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _v_wait_vue_vue_type_template_id_2dae407c_lang_html__WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _v_wait_vue_vue_type_template_id_2dae407c_lang_html__WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"src/components/v-wait.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack://VueWait/./src/components/v-wait.vue?");

/***/ }),

/***/ "./src/components/v-wait.vue?vue&type=script&lang=js":
/*!***********************************************************!*\
  !*** ./src/components/v-wait.vue?vue&type=script&lang=js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_v_wait_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib??vue-loader-options!./v-wait.vue?vue&type=script&lang=js */ \"./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/v-wait.vue?vue&type=script&lang=js\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_vue_loader_lib_index_js_vue_loader_options_v_wait_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack://VueWait/./src/components/v-wait.vue?");

/***/ }),

/***/ "./src/components/v-wait.vue?vue&type=template&id=2dae407c&lang=html":
/*!***************************************************************************!*\
  !*** ./src/components/v-wait.vue?vue&type=template&id=2dae407c&lang=html ***!
  \***************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_v_wait_vue_vue_type_template_id_2dae407c_lang_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib??vue-loader-options!./v-wait.vue?vue&type=template&id=2dae407c&lang=html */ \"./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/v-wait.vue?vue&type=template&id=2dae407c&lang=html\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_v_wait_vue_vue_type_template_id_2dae407c_lang_html__WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_v_wait_vue_vue_type_template_id_2dae407c_lang_html__WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack://VueWait/./src/components/v-wait.vue?");

/***/ }),

/***/ "./src/directives/wait.js":
/*!********************************!*\
  !*** ./src/directives/wait.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction bind(el, binding, vNode, oldVNode) {\n  const { arg, modifiers, value } = binding;\n  const instance = vNode.context.__$waitInstance;\n  switch (arg) {\n    case 'click':\n      if (modifiers.start) {\n        el.addEventListener('click', () => instance.start(value), false);\n        break;\n      }\n      if (modifiers.end) {\n        el.addEventListener('click', () => instance.end(value), false);\n        break;\n      }\n      break;\n    case 'toggle':\n      el.addEventListener(\n        'click',\n        () => {\n          const isWaiting = instance.isWaiting(value);\n          if (!isWaiting) {\n            instance.start(value);\n          } else {\n            instance.end(value);\n          }\n        },\n        false\n      );\n      break;\n  }\n\n  update(el, binding, vNode, oldVNode);\n}\n\nfunction update(el, binding, vNode, oldVNode) {\n  const { arg, modifiers, value } = binding;\n  const instance = vNode.context.__$waitInstance;\n\n  let isWaiting = instance.isWaiting(value);\n  if (modifiers.not || ['hidden', 'enabled'].includes(arg)) {\n    isWaiting = !isWaiting;\n  }\n\n  const originalDisplay = el.style.display === 'none' ? '' : el.style.display;\n  switch (arg) {\n    case 'visible':\n    case 'hidden':\n      el.style.display = !isWaiting ? 'none' : originalDisplay;\n      break;\n    case 'enabled':\n    case 'disabled':\n      isWaiting\n        ? el.setAttribute('disabled', true)\n        : el.removeAttribute('disabled');\n      break;\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  bind,\n  update\n});\n\n\n//# sourceURL=webpack://VueWait/./src/directives/wait.js?");

/***/ }),

/***/ "./src/helpers.js":
/*!************************!*\
  !*** ./src/helpers.js ***!
  \************************/
/*! exports provided: mapWaitingActions, mapWaitingGetters, waitFor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"mapWaitingActions\", function() { return mapWaitingActions; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"mapWaitingGetters\", function() { return mapWaitingGetters; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"waitFor\", function() { return waitFor; });\nfunction mapWaitingActions(vuexModuleName, actions) {\n  const mappings = {};\n  if (typeof vuexModuleName === 'object') {\n    actions = vuexModuleName;\n    vuexModuleName = null;\n  }\n  Object.keys(actions).forEach(action => {\n    const waiter = actions[action];\n    mappings[action] = async function(...args) {\n      try {\n        this.__$waitInstance.start(waiter);\n        return await this.$store.dispatch(\n          vuexModuleName ? `${vuexModuleName}/${action}` : action,\n          ...args\n        );\n      } finally {\n        this.__$waitInstance.end(waiter);\n      }\n    };\n  });\n  return mappings;\n}\n\nfunction mapWaitingGetters(getters) {\n  const mappings = {};\n  Object.keys(getters).forEach(getter => {\n    const waiter = getters[getter];\n    mappings[getter] = function() {\n      return this.__$waitInstance.isWaiting(waiter);\n    };\n  });\n  return mappings;\n}\n\nfunction waitFor(waiter, func, forceSync = false) {\n  if (typeof func !== 'function') {\n    console.warn('[vue-wait] waitFor second argument must be a function');\n    return func;\n  }\n\n  if (forceSync === true) {\n    return function(...args) {\n      try {\n        this.__$waitInstance.start(waiter);\n        return func.apply(this, args);\n      } finally {\n        this.__$waitInstance.end(waiter);\n      }\n    };\n  }\n  return async function(...args) {\n    try {\n      this.__$waitInstance.start(waiter);\n      return await func.apply(this, args);\n    } finally {\n      this.__$waitInstance.end(waiter);\n    }\n  };\n}\n\n\n//# sourceURL=webpack://VueWait/./src/helpers.js?");

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! exports provided: isWaiting, any, start, end, uniqArray, nodeIsDebug */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"isWaiting\", function() { return isWaiting; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"any\", function() { return any; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"start\", function() { return start; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"end\", function() { return end; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"uniqArray\", function() { return uniqArray; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"nodeIsDebug\", function() { return nodeIsDebug; });\n/* harmony import */ var matcher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! matcher */ \"./node_modules/matcher/index.js\");\n/* harmony import */ var matcher__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(matcher__WEBPACK_IMPORTED_MODULE_0__);\n\n\nfunction isWaiting(waiters, waiter) {\n  if (typeof waiter === 'string' && waiter.match(/[\\*\\!]/)) {\n    return waiters.filter(l => Object(matcher__WEBPACK_IMPORTED_MODULE_0__[\"isMatch\"])(l, waiter)).length > 0;\n  }\n  return Array.isArray(waiter)\n    ? waiters.some(v => waiter.includes(v))\n    : waiters.indexOf(waiter) > -1;\n}\n\nfunction any(waiters) {\n  return waiters.length > 0;\n}\n\nfunction start(waiters, waiter) {\n  return uniqArray([...waiters, waiter]);\n}\n\nfunction end(waiters, waiter) {\n  return uniqArray(waiters).filter(l => l !== waiter);\n}\n\nfunction uniqArray(array) {\n  return array.filter((el, index, arr) => index == arr.indexOf(el));\n}\n\nfunction nodeIsDebug() {\n  return \"development\" !== 'production';\n}\n\n\n//# sourceURL=webpack://VueWait/./src/utils.js?");

/***/ }),

/***/ "./src/vue-wait.js":
/*!*************************!*\
  !*** ./src/vue-wait.js ***!
  \*************************/
/*! exports provided: default, install, mapWaitingActions, mapWaitingGetters, waitFor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return VueWait; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"install\", function() { return install; });\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ \"./src/utils.js\");\n/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers */ \"./src/helpers.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"mapWaitingActions\", function() { return _helpers__WEBPACK_IMPORTED_MODULE_1__[\"mapWaitingActions\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"mapWaitingGetters\", function() { return _helpers__WEBPACK_IMPORTED_MODULE_1__[\"mapWaitingGetters\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"waitFor\", function() { return _helpers__WEBPACK_IMPORTED_MODULE_1__[\"waitFor\"]; });\n\n/* harmony import */ var _vuex_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./vuex/store */ \"./src/vuex/store.js\");\n/* harmony import */ var _components_v_wait_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/v-wait.vue */ \"./src/components/v-wait.vue\");\n/* harmony import */ var _directives_wait_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./directives/wait.js */ \"./src/directives/wait.js\");\n\n\n\n\n\n\n\n\nclass VueWait {\n  constructor(options = {}) {\n    const defaults = {\n      accessorName: '$wait',\n      // Vuex Options\n      useVuex: false,\n      vuexModuleName: 'wait',\n      // Components\n      registerComponent: true,\n      componentName: 'v-wait',\n      // Directives\n      registerDirective: true,\n      directiveName: 'wait'\n    };\n    this.options = {\n      ...defaults,\n      ...options\n    };\n    this.initialized = false;\n  }\n\n  init(Vue, store) {\n    if (Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"nodeIsDebug\"])() && !install.installed) {\n      console.warn(\n        `[vue-wait] not installed. Make sure to call \\`Vue.use(VueWait)\\` before init root instance.`\n      );\n    }\n\n    if (this.initialized) {\n      return;\n    }\n\n    if (this.options.registerComponent) {\n      Vue.component(this.options.componentName, _components_v_wait_vue__WEBPACK_IMPORTED_MODULE_3__[\"default\"]);\n    }\n\n    if (this.options.registerDirective) {\n      Vue.directive(this.options.directiveName, _directives_wait_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"]);\n    }\n\n    if (this.options.useVuex) {\n      const { vuexModuleName } = this.options;\n      if (!store) {\n        throw new Error('[vue-wait] Vuex not initialized.');\n      }\n      this.store = store;\n\n      if (!store._modules.get([vuexModuleName])) {\n        store.registerModule(vuexModuleName, _vuex_store__WEBPACK_IMPORTED_MODULE_2__[\"default\"]);\n      }\n\n      this.stateHandler = new Vue({\n        computed: {\n          isWaiting: () => loader =>\n            store.getters[`${vuexModuleName}/isWaiting`](loader),\n          any: () => store.getters[`${vuexModuleName}/any`]\n        }\n      });\n    } else {\n      this.stateHandler = new Vue({\n        data() {\n          return {\n            activeLoaders: []\n          };\n        },\n        computed: {\n          isWaiting() {\n            return loader => Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"isWaiting\"])(this.activeLoaders, loader);\n          },\n          any() {\n            return Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"any\"])(this.activeLoaders);\n          }\n        },\n        methods: {\n          start(loader) {\n            this.activeLoaders = Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"start\"])(this.activeLoaders, loader);\n          },\n          end(loader) {\n            this.activeLoaders = Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"end\"])(this.activeLoaders, loader);\n          }\n        }\n      });\n    }\n\n    this.initialized = true;\n  }\n\n  get any() {\n    return this.stateHandler.any;\n  }\n\n  isWaiting(loader) {\n    return this.stateHandler.isWaiting(loader);\n  }\n\n  dispatchLoaderAction(action, loader) {\n    const { vuexModuleName } = this.options;\n    this.store.dispatch(`${vuexModuleName}/${action}`, loader, {\n      root: true\n    });\n  }\n\n  start(loader) {\n    if (this.options.useVuex) {\n      this.dispatchLoaderAction('start', loader);\n      return;\n    }\n    this.stateHandler.start(loader);\n  }\n\n  end(loader) {\n    if (this.options.useVuex) {\n      this.dispatchLoaderAction('end', loader);\n      return;\n    }\n    this.stateHandler.end(loader);\n  }\n}\n\nfunction install(Vue) {\n  if (install.installed && Vue) {\n    if (Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"nodeIsDebug\"])()) {\n      console.warn(\n        '[vue-wait] already installed. Vue.use(VuexLoading) should be called only once.'\n      );\n    }\n    return;\n  }\n\n  Vue.mixin({\n    /**\n     * VueWait init hook, injected into each instances init hooks list.\n     */\n    beforeCreate() {\n      const { wait, store, parent } = this.$options;\n\n      let instance = null;\n      if (wait) {\n        instance = typeof wait === 'function' ? new wait() : wait;\n        // Inject store\n        instance.init(Vue, store);\n      } else if (parent && parent.__$waitInstance) {\n        instance = parent.__$waitInstance;\n        instance.init(Vue, parent.$store);\n      }\n\n      if (instance) {\n        // Store helper for internal use\n        this.__$waitInstance = instance;\n        this[instance.options.accessorName] = instance;\n      }\n    }\n  });\n\n  install.installed = true;\n}\n\n// Bypass helpers\n\n\nVueWait.install = install;\n\n\n//# sourceURL=webpack://VueWait/./src/vue-wait.js?");

/***/ }),

/***/ "./src/vuex/store.js":
/*!***************************!*\
  !*** ./src/vuex/store.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ \"./src/utils.js\");\n\n\nconst mutations = {\n  START_WAITING: 'START_WAITING',\n  END_WAITING: 'END_WAITING'\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  namespaced: true,\n  state: {\n    activeLoaders: []\n  },\n  getters: {\n    isWaiting: state => loader => Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"isWaiting\"])(state.activeLoaders, loader),\n    any: state => Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"any\"])(state.activeLoaders)\n  },\n  actions: {\n    start: ({ commit }, loader) => commit(mutations.START_WAITING, loader),\n    end: ({ commit }, loader) => commit(mutations.END_WAITING, loader)\n  },\n  mutations: {\n    [mutations.START_WAITING](state, loader) {\n      state.activeLoaders = Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"start\"])(state.activeLoaders, loader);\n    },\n    [mutations.END_WAITING](state, loader) {\n      state.activeLoaders = Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"end\"])(state.activeLoaders, loader);\n    }\n  }\n});\n\n\n//# sourceURL=webpack://VueWait/./src/vuex/store.js?");

/***/ }),

/***/ 0:
/*!*******************************!*\
  !*** multi ./src/vue-wait.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./src/vue-wait.js */\"./src/vue-wait.js\");\n\n\n//# sourceURL=webpack://VueWait/multi_./src/vue-wait.js?");

/***/ })

/******/ });
});