export function mapLoadingActions(module, actions) {
  const mappings = {};
  Object.keys(actions).forEach(action => {
    const loader = actions[action];
    mappings[action] = async (...args) => {
      try {
        this.__$vueLoadingInstance.startLoading(loader);
        return await this.$store.dispatch(`${module}/${action}`);
      } finally {
        this.__$vueLoadingInstance.endLoading(loader);
      }
    };
  });
  return mappings;
}

export function wrapLoading(loader, func, forceSync = false) {
  if (typeof func !== 'function') {
    console.warn(
      '[vuex-loading] wrapLoading second argument must be a function'
    );
    return func;
  }

  if (forceSync === true) {
    return function(...args) {
      try {
        this.__$vueLoadingInstance.startLoading(loader);
        return func.apply(this, args);
      } finally {
        this.__$vueLoadingInstance.endLoading(loader);
      }
    };
  }
  return async function(...args) {
    try {
      this.__$vueLoadingInstance.startLoading(loader);
      return await func.apply(this, args);
    } finally {
      this.__$vueLoadingInstance.endLoading(loader);
    }
  };
}
