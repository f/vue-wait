(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("vue"));
	else if(typeof define === 'function' && define.amd)
		define(["vue"], factory);
	else if(typeof exports === 'object')
		exports["VueWait"] = factory(require("vue"));
	else
		root["VueWait"] = factory(root["vue"]);
})(typeof self !== 'undefined' ? self : this, function(vue) {
  if (vue.createApp) {
    const v3 = require('./dist/vue-wait-next');
    return v3
  }
  const v2 = require('./dist/vue-wait-v2');
  return v2
})
