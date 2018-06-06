export function mapLoadingActions(vuexModuleName, actions) {
  const mappings = {};
  if (typeof vuexModuleName === 'object') {
    actions = vuexModuleName;
    vuexModuleName = null;
  }
  Object.keys(actions).forEach(action => {
    const loader = actions[action];
    mappings[action] = async function(...args) {
      try {
        this.__$vueLoadingInstance.startLoading(loader);
        return await this.$store.dispatch(
          vuexModuleName ? `${vuexModuleName}/${action}` : action
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
