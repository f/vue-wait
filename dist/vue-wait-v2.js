!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("vue")):"function"==typeof define&&define.amd?define(["vue"],e):"object"==typeof exports?exports.VueWait=e(require("vue")):t.VueWait=e(t.vue)}("undefined"!=typeof self?self:this,(function(t){return(()=>{var e={757:(t,e,r)=>{t.exports=r(666)},150:t=>{"use strict";var e=/[|\\{}()[\]^$+*?.]/g;t.exports=function(t){if("string"!=typeof t)throw new TypeError("Expected a string");return t.replace(e,"\\$&")}},666:t=>{var e=function(t){"use strict";var e,r=Object.prototype,n=r.hasOwnProperty,i="function"==typeof Symbol?Symbol:{},o=i.iterator||"@@iterator",a=i.asyncIterator||"@@asyncIterator",s=i.toStringTag||"@@toStringTag";function c(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{c({},"")}catch(t){c=function(t,e,r){return t[e]=r}}function u(t,e,r,n){var i=e&&e.prototype instanceof y?e:y,o=Object.create(i.prototype),a=new P(n||[]);return o._invoke=function(t,e,r){var n=f;return function(i,o){if(n===h)throw new Error("Generator is already running");if(n===v){if("throw"===i)throw o;return A()}for(r.method=i,r.arg=o;;){var a=r.delegate;if(a){var s=S(a,r);if(s){if(s===d)continue;return s}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(n===f)throw n=v,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n=h;var c=l(t,e,r);if("normal"===c.type){if(n=r.done?v:p,c.arg===d)continue;return{value:c.arg,done:r.done}}"throw"===c.type&&(n=v,r.method="throw",r.arg=c.arg)}}}(t,r,a),o}function l(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}t.wrap=u;var f="suspendedStart",p="suspendedYield",h="executing",v="completed",d={};function y(){}function g(){}function m(){}var b={};c(b,o,(function(){return this}));var w=Object.getPrototypeOf,O=w&&w(w(L([])));O&&O!==r&&n.call(O,o)&&(b=O);var _=m.prototype=y.prototype=Object.create(b);function x(t){["next","throw","return"].forEach((function(e){c(t,e,(function(t){return this._invoke(e,t)}))}))}function j(t,e){function r(i,o,a,s){var c=l(t[i],t,o);if("throw"!==c.type){var u=c.arg,f=u.value;return f&&"object"==typeof f&&n.call(f,"__await")?e.resolve(f.__await).then((function(t){r("next",t,a,s)}),(function(t){r("throw",t,a,s)})):e.resolve(f).then((function(t){u.value=t,a(u)}),(function(t){return r("throw",t,a,s)}))}s(c.arg)}var i;this._invoke=function(t,n){function o(){return new e((function(e,i){r(t,n,e,i)}))}return i=i?i.then(o,o):o()}}function S(t,r){var n=t.iterator[r.method];if(n===e){if(r.delegate=null,"throw"===r.method){if(t.iterator.return&&(r.method="return",r.arg=e,S(t,r),"throw"===r.method))return d;r.method="throw",r.arg=new TypeError("The iterator does not provide a 'throw' method")}return d}var i=l(n,t.iterator,r.arg);if("throw"===i.type)return r.method="throw",r.arg=i.arg,r.delegate=null,d;var o=i.arg;return o?o.done?(r[t.resultName]=o.value,r.next=t.nextLoc,"return"!==r.method&&(r.method="next",r.arg=e),r.delegate=null,d):o:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,d)}function E(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function k(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function P(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(E,this),this.reset(!0)}function L(t){if(t){var r=t[o];if(r)return r.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var i=-1,a=function r(){for(;++i<t.length;)if(n.call(t,i))return r.value=t[i],r.done=!1,r;return r.value=e,r.done=!0,r};return a.next=a}}return{next:A}}function A(){return{value:e,done:!0}}return g.prototype=m,c(_,"constructor",m),c(m,"constructor",g),g.displayName=c(m,s,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===g||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,m):(t.__proto__=m,c(t,s,"GeneratorFunction")),t.prototype=Object.create(_),t},t.awrap=function(t){return{__await:t}},x(j.prototype),c(j.prototype,a,(function(){return this})),t.AsyncIterator=j,t.async=function(e,r,n,i,o){void 0===o&&(o=Promise);var a=new j(u(e,r,n,i),o);return t.isGeneratorFunction(r)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},x(_),c(_,s,"Generator"),c(_,o,(function(){return this})),c(_,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){for(;e.length;){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},t.values=L,P.prototype={constructor:P,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(k),!t)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var r=this;function i(n,i){return s.type="throw",s.arg=t,r.next=n,i&&(r.method="next",r.arg=e),!!i}for(var o=this.tryEntries.length-1;o>=0;--o){var a=this.tryEntries[o],s=a.completion;if("root"===a.tryLoc)return i("end");if(a.tryLoc<=this.prev){var c=n.call(a,"catchLoc"),u=n.call(a,"finallyLoc");if(c&&u){if(this.prev<a.catchLoc)return i(a.catchLoc,!0);if(this.prev<a.finallyLoc)return i(a.finallyLoc)}else if(c){if(this.prev<a.catchLoc)return i(a.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return i(a.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var i=this.tryEntries[r];if(i.tryLoc<=this.prev&&n.call(i,"finallyLoc")&&this.prev<i.finallyLoc){var o=i;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=e&&e<=o.finallyLoc&&(o=null);var a=o?o.completion:{};return a.type=t,a.arg=e,o?(this.method="next",this.next=o.finallyLoc,d):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),d},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),k(r),d}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var i=n.arg;k(r)}return i}}throw new Error("illegal catch attempt")},delegateYield:function(t,r,n){return this.delegate={iterator:L(t),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=e),d}},t}(t.exports);try{regeneratorRuntime=e}catch(t){"object"==typeof globalThis?globalThis.regeneratorRuntime=e:Function("r","regeneratorRuntime = r")(e)}},103:e=>{"use strict";e.exports=t}},r={};function n(t){var i=r[t];if(void 0!==i)return i.exports;var o=r[t]={exports:{}};return e[t](o,o.exports,n),o.exports}n.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return n.d(e,{a:e}),e},n.d=(t,e)=>{for(var r in e)n.o(e,r)&&!n.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),n.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})};var i={};return(()=>{"use strict";function t(t,e,r,n,i,o,a){try{var s=t[o](a),c=s.value}catch(t){return void r(t)}s.done?e(c):Promise.resolve(c).then(n,i)}function e(e){return function(){var r=this,n=arguments;return new Promise((function(i,o){var a=e.apply(r,n);function s(e){t(a,i,o,s,c,"next",e)}function c(e){t(a,i,o,s,c,"throw",e)}s(void 0)}))}}function r(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}n.r(i),n.d(i,{createVueWait:()=>H,default:()=>D,install:()=>G,mapWaitingActions:()=>k,mapWaitingGetters:()=>P,waitFor:()=>L});var s=n(757),c=n.n(s);function u(t){return(u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function l(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function f(t,e){if(t){if("string"==typeof t)return l(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?l(t,e):void 0}}function p(t){return function(t){if(Array.isArray(t))return l(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||f(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var h,v=n(150),d=new Map;function y(t){var e=function(t,e){if("object"!==u(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,e);if("object"!==u(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t,"string");return"symbol"===u(e)?e:String(e)}function g(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function m(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?g(Object(n),!0).forEach((function(e){r(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):g(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function b(t){return t.filter((function(t,e,r){return e==r.indexOf(t)}))}function w(t,e){return"string"==typeof e&&e.match(/[\*\!]/)?t.filter((function(t){return r=t,i=function(t,e){var r=Object.assign({caseSensitive:!1},e),n=t+JSON.stringify(r);if(d.has(n))return d.get(n);var i="!"===t[0];i&&(t=t.slice(1)),t=v(t).replace(/\\\*/g,".*");var o=new RegExp("^".concat(t,"$"),r.caseSensitive?"":"i");return o.negated=i,d.set(n,o),o}(e,n),o=i.test(r),i.negated?!o:o;var r,n,i,o})).length>0:Array.isArray(e)?e.some((function(e){return w(t,e)})):t.includes(e)}function O(t){return t.length>0}function _(t,e){return b([].concat(p(t),[e]))}function x(t,e){return b(t).filter((function(t){return t!==e}))}function j(t,e,n){var i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:100;return n>i?S(t,e):m(m({},t),{},r({},e,{current:n,total:i,percent:100*n/i}))}function S(t,e){return t[e],function(t,e){if(null==t)return{};var r,n,i=function(t,e){if(null==t)return{};var r,n,i={},o=Object.keys(t);for(n=0;n<o.length;n++)r=o[n],e.indexOf(r)>=0||(i[r]=t[r]);return i}(t,e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);for(n=0;n<o.length;n++)r=o[n],e.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(t,r)&&(i[r]=t[r])}return i}(t,[e].map(y))}function E(t,e){var r=t[e];return r?r.percent:0}function k(t,r){var n={};"object"===u(t)&&(r=t,t=null);for(var i=Array.isArray(r),o=function(){var r,o,u=(r=s[a],o=2,function(t){if(Array.isArray(t))return t}(r)||function(t,e){var r=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=r){var n,i,o=[],a=!0,s=!1;try{for(r=r.call(t);!(a=(n=r.next()).done)&&(o.push(n.value),!e||o.length!==e);a=!0);}catch(t){s=!0,i=t}finally{try{a||null==r.return||r.return()}finally{if(s)throw i}}return o}}(r,o)||f(r,o)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),l=u[0],p=u[1],h=void 0,v=void 0,d=void 0;p===Object(p)?(i?(h=p.action,void 0!==p.method&&(h=p.method)):h=l,v=p.action,d=p.loader):i?(h=v=p,d=p):(h=v=l,d=p),d||(d=v),v&&(n[h]=e(c().mark((function e(){var r,n,i,o,a=arguments;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:for(e.prev=0,this.__$waitInstance.start(d),n=a.length,i=new Array(n),o=0;o<n;o++)i[o]=a[o];return e.next=5,(r=this.$store).dispatch.apply(r,[t?"".concat(t,"/").concat(v):v].concat(i));case 5:return e.abrupt("return",e.sent);case 6:return e.prev=6,this.__$waitInstance.end(d),e.finish(6);case 9:case"end":return e.stop()}}),e,this,[[0,,6,9]])}))))},a=0,s=Object.entries(r);a<s.length;a++)o();return n}function P(t){var e={};return Object.keys(t).forEach((function(r){var n=t[r];e[r]=function(){return this.__$waitInstance.is(n)}})),e}function L(t,r){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return"function"!=typeof r?(console.warn("[vue-wait] waitFor second argument must be a function"),r):!0===n?function(){try{this.__$waitInstance.start(t);for(var e=arguments.length,n=new Array(e),i=0;i<e;i++)n[i]=arguments[i];return r.apply(this,n)}finally{this.__$waitInstance.end(t)}}:e(c().mark((function e(){var n,i,o,a=arguments;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:for(e.prev=0,this.__$waitInstance.start(t),n=a.length,i=new Array(n),o=0;o<n;o++)i[o]=a[o];return e.next=5,r.apply(this,i);case 5:return e.abrupt("return",e.sent);case 6:return e.prev=6,this.__$waitInstance.end(t),e.finish(6);case 9:case"end":return e.stop()}}),e,this,[[0,,6,9]])})))}var A="START",$="PROGRESS";const C={namespaced:!0,state:{waitingFor:[],progresses:{}},getters:{is:function(t){return function(e){return w(t.waitingFor,e)}},any:function(t){return O(t.waitingFor)},percent:function(t){return function(e){return E(t.progresses,e)}}},actions:{start:function(t,e){return(0,t.commit)(A,e)},end:function(t,e){return(0,t.commit)("END",e)},progress:function(t,e){return(0,t.commit)($,e)}},mutations:(h={},r(h,A,(function(t,e){t.waitingFor=_(t.waitingFor,e)})),r(h,"END",(function(t,e){t.waitingFor=x(t.waitingFor,e),t.progresses=S(t.progresses,e)})),r(h,$,(function(t,e){var r=e.waiter,n=e.current,i=e.total;t.progresses=j(t.progresses,r,n,i)})),h)},F=function(t,e,r,n,i,o,a,s){var c,u="function"==typeof t?t.options:t;if(e&&(u.render=e,u.staticRenderFns=[],u._compiled=!0),c)if(u.functional){u._injectStyles=c;var l=u.render;u.render=function(t,e){return c.call(e),l(t,e)}}else{var f=u.beforeCreate;u.beforeCreate=f?[].concat(f,c):[c]}return{exports:t,options:u}}({props:{visible:Boolean,for:[String,Array],message:String,transition:String,duration:Number,mode:{type:String,default:"out-in"},enterClass:{type:String,default:"enter"},enterActiveClass:{type:String,default:"enter-active"},enterToClass:{type:String,default:"enter-to"},leaveClass:{type:String,default:"leave"},leaveActiveClass:{type:String,default:"leave-active"},leaveToClass:{type:String,default:"leave-to"}},methods:{transitionClass:function(t){return"".concat(this.transition,"-").concat(t)}},computed:{waitsFor:function(){return this.visible?this.visible:this.for?this.__$waitInstance.is(this.for):this.__$waitInstance.any}}},(function(){var t=this,e=t.$createElement,r=t._self._c||e;return t.transition?r("transition",{attrs:{name:t.transition,mode:t.mode,duration:t.duration,"enter-class":t.transitionClass(t.enterClass),"enter-active-class":t.transitionClass(t.enterActiveClass),"enter-to-class":t.transitionClass(t.enterToClass),"leave-class":t.transitionClass(t.leaveClass),"leave-active-class":t.transitionClass(t.leaveActiveClass),"leave-to-class":t.transitionClass(t.leaveToClass)},on:{beforeEnter:function(e){return t.$emit("beforeEnter")},enter:function(e){return t.$emit("enter")},afterAnter:function(e){return t.$emit("afterEnter")},enterCancelled:function(e){return t.$emit("enterCancelled")},beforeLeave:function(e){return t.$emit("beforeLeave")},leave:function(e){return t.$emit("leave")},afterLeave:function(e){return t.$emit("afterLeave")},leaveCancelled:function(e){return t.$emit("leaveCancelled")}}},[t.waitsFor?r("span",[t._t("waiting"),t._v(" "),t.message?r("span",[t._v(t._s(t.message))]):t._e()],2):r("div",[t._t("default")],2)]):r("div",[t.waitsFor?r("span",[t._t("waiting"),t._v(" "),t.message?r("span",[t._v(t._s(t.message))]):t._e()],2):t._t("default")],2)})).exports;function I(t,e,r,n){var i=e.arg,o=e.modifiers,a=e.value,s=r.context.__$waitInstance.is(a);(o.not||["hidden","enabled"].includes(i))&&(s=!s);var c="none"===t.style.display?"":t.style.display;switch(i){case"visible":case"hidden":t.style.display=s?c:"none";break;case"enabled":case"disabled":s?t.setAttribute("disabled",!0):t.removeAttribute("disabled")}}const N={bind:function(t,e,r,n){var i=e.arg,o=e.modifiers,a=e.value,s=r.context.__$waitInstance;switch(i){case"click":if(o.start){t.addEventListener("click",(function(){return s.start(a)}),!1);break}if(o.end){t.addEventListener("click",(function(){return s.end(a)}),!1);break}if(o.progress){t.addEventListener("click",(function(){return s.progress.apply(s,p(a))}),!1);break}break;case"toggle":t.addEventListener("click",(function(){s.is(a)?s.end(a):s.start(a)}),!1)}I(t,e,r)},update:I};function T(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function V(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?T(Object(n),!0).forEach((function(e){r(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):T(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var D=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};o(this,t);var r={accessorName:"$wait",useVuex:!1,vuexModuleName:"wait",registerComponent:!0,componentName:"v-wait",registerDirective:!0,directiveName:"wait"};this.options=V(V({},r),e),this.initialized=!1}var e,r,i;return e=t,i=[{key:"getVueVersion",value:function(t){return parseFloat((t.version||"").split(".")[0]||0)}}],(r=[{key:"init",value:function(e,r){if(!this.initialized){if(this.options.registerComponent&&e.component(this.options.componentName,F),this.options.registerDirective&&e.directive(this.options.directiveName,N),this.options.useVuex){var i=this.options.vuexModuleName;if(!r)throw new Error("[vue-wait] Vuex not initialized.");this.store=r,r._modules.get([i])||r.registerModule(i,C);var o={computed:{is:function(){return function(t){return r.getters["".concat(i,"/is")](t)}},any:function(){return r.getters["".concat(i,"/any")]},percent:function(){return function(t){return r.getters["".concat(i,"/percent")](t)}}}};if(t.getVueVersion(e)>2){var a=n(103).createApp;this.stateHandler=a(o).mount(document.createElement("div"))}else this.stateHandler=new e(o)}else{var s={data:function(){return{waitingFor:[],progresses:{}}},computed:{is:function(){var t=this;return function(e){return w(t.waitingFor,e)}},any:function(){return O(this.waitingFor)},percent:function(){var t=this;return function(e){return E(t.progresses,e)}}},methods:{start:function(t){this.waitingFor=_(this.waitingFor,t)},end:function(t){this.waitingFor=x(this.waitingFor,t),this.progresses=S(this.progresses,t)},progress:function(t){var e=t.waiter,r=t.current,n=t.total;this.progresses=j(this.progresses,e,r,n)}}};if(t.getVueVersion(e)>2){var c=n(103).createApp;this.stateHandler=c(s).mount(document.createElement("div"))}else this.stateHandler=new e(s)}this.initialized=!0}}},{key:"any",get:function(){return this.stateHandler.any}},{key:"is",value:function(t){return this.stateHandler.is(t)}},{key:"waiting",value:function(t){return this.is(t)}},{key:"percent",value:function(t){return this.stateHandler.percent(t)}},{key:"dispatchWaitingAction",value:function(t,e){var r=this.options.vuexModuleName;this.store.dispatch("".concat(r,"/").concat(t),e,{root:!0})}},{key:"start",value:function(t){this.options.useVuex?this.dispatchWaitingAction("start",t):this.stateHandler.start(t)}},{key:"end",value:function(t){this.options.useVuex?this.dispatchWaitingAction("end",t):this.stateHandler.end(t)}},{key:"progress",value:function(t,e){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:100;this.is(t)||this.start(t),e>r?this.end(t):this.options.useVuex?this.dispatchWaitingAction("progress",{waiter:t,current:e,total:r}):this.stateHandler.progress({waiter:t,current:e,total:r})}}])&&a(e.prototype,r),i&&a(e,i),t}();function G(t){G.installed&&t||(t.mixin({beforeCreate:function(){var e=this.$options,r=e.wait,n=e.store,i=e.parent,o=null;r?(o="function"==typeof r?new r:r).init(t,n):i&&i.__$waitInstance&&(o=i.__$waitInstance).init(t,i.$store),o&&(this.__$waitInstance=o,this[o.options.accessorName]=o)}}),G.installed=!0)}function H(t){return{instance:null,install:function(r){var n=this;return e(c().mark((function e(){var i;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!n.installed||!r){e.next=3;break}return e.abrupt("return",n.instance);case 3:return(i=new D(t)).init(r,r.config.globalProperties.$store),r.config.globalProperties[i.options.accessorName]=i,r.mixin({beforeCreate:function(){this.__$waitInstance=i}}),n.instance=i,n.installed=!0,e.abrupt("return",i);case 10:case"end":return e.stop()}}),e)})))()}}}D.install=G})(),i})()}));