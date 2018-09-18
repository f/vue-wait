export function mapWaitingActions(vuexModuleName, actions) {
  const mappings = {};
  if (typeof vuexModuleName === 'object') {
    actions = vuexModuleName;
    vuexModuleName = null;
  }
  const isActionsArray = Array.isArray(actions);

  for (let [key, entry] of Object.entries(actions)) {
    let method, action, waiter;
    if (entry === Object(entry)) {
      if (isActionsArray) {
        method = entry.action;
        if (entry.method !== undefined) {
          method = entry.method;
        }
      } else {
        method = key;
      }
      action = entry.action;
      waiter = entry.loader;
    } else {
      if (isActionsArray) {
        method = action = entry;
        waiter = entry;
      } else {
        method = action = key;
        waiter = entry;
      }
    }
    if (!waiter) {
      waiter = action;
    }
    if (action) {
      mappings[method] = async function(...args) {
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
    }
  }
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
