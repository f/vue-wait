export function mapWaitingActions(vuexModuleName, actions) {
  const mappings = {};
  if (typeof vuexModuleName === 'object') {
    actions = vuexModuleName;
    vuexModuleName = null;
  }
  Object.keys(actions).forEach(action => {
    const waiter = actions[action];
    mappings[action] = async function(...args) {
      try {
        this.__$waitInstance.start(waiter);
        return await this.$store.dispatch(
          vuexModuleName ? `${vuexModuleName}/${action}` : action,
          ...args
        );
      } finally {
        this.__$waitInstance.end(waiter);
      }
    };
  });
  return mappings;
}

export function mapWaitingGetters(getters) {
  const mappings = {};
  Object.keys(getters).forEach(getter => {
    const waiter = getters[getter];
    mappings[getter] = function() {
      return this.__$waitInstance.is(waiter);
    };
  });
  return mappings;
}

export function waitFor(waiter, func, forceSync = false) {
  if (typeof func !== 'function') {
    console.warn('[vue-wait] waitFor second argument must be a function');
    return func;
  }

  if (forceSync === true) {
    return function(...args) {
      try {
        this.__$waitInstance.start(waiter);
        return func.apply(this, args);
      } finally {
        this.__$waitInstance.end(waiter);
      }
    };
  }
  return async function(...args) {
    try {
      this.__$waitInstance.start(waiter);
      return await func.apply(this, args);
    } finally {
      this.__$waitInstance.end(waiter);
    }
  };
}
