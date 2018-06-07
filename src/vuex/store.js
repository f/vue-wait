import { isWaiting, any, start, end } from '../utils';

const mutations = {
  START_WAITING: 'START_WAITING',
  END_WAITING: 'END_WAITING'
};

export default {
  namespaced: true,
  state: {
    activeLoaders: []
  },
  getters: {
    isWaiting: state => loader => isWaiting(state.activeLoaders, loader),
    any: state => any(state.activeLoaders)
  },
  actions: {
    start: ({ commit }, loader) => commit(mutations.START_WAITING, loader),
    end: ({ commit }, loader) => commit(mutations.END_WAITING, loader)
  },
  mutations: {
    [mutations.START_WAITING](state, loader) {
      state.activeLoaders = start(state.activeLoaders, loader);
    },
    [mutations.END_WAITING](state, loader) {
      state.activeLoaders = end(state.activeLoaders, loader);
    }
  }
};
