import { isLoading, anyLoading, startLoading, endLoading } from '../utils';

const mutations = {
  START_LOADING: 'START_LOADING',
  END_LOADING: 'END_LOADING'
};

export default {
  namespaced: true,
  state: {
    activeLoaders: []
  },
  getters: {
    isLoading: state => loader => isLoading(state.activeLoaders, loader),
    anyLoading: state => anyLoading(state.activeLoaders)
  },
  actions: {
    startLoading: ({ commit }, loader) =>
      commit(mutations.START_LOADING, loader),
    endLoading: ({ commit }, loader) => commit(mutations.END_LOADING, loader)
  },
  mutations: {
    [mutations.START_LOADING](state, loader) {
      state.activeLoaders = startLoading(state.activeLoaders, loader);
    },
    [mutations.END_LOADING](state, loader) {
      state.activeLoaders = endLoading(state.activeLoaders, loader);
    }
  }
};
