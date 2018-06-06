export function mapLoadingActions(moduleName, actions) {
  const mappings = {};
  if (typeof moduleName === 'object') {
    actions = moduleName;
    moduleName = null;
  }
  Object.keys(actions).forEach(action => {
    const loader = actions[action];
    mappings[action] = async function(...args) {
      try {
        this.__$vueLoadingInstance.startLoading(loader);
        return await this.$store.dispatch(
          moduleName ? `${moduleName}/${action}` : action
        );
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
