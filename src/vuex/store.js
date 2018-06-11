import { is, any, start, end } from '../utils';

const mutations = {
  START: 'START',
  END: 'END'
};

export default {
  namespaced: true,
  state: {
    waitingFor: []
  },
  getters: {
    is: state => waiter => is(state.waitingFor, waiter),
    any: state => any(state.waitingFor)
  },
  actions: {
    start: ({ commit }, waiter) => commit(mutations.START, waiter),
    end: ({ commit }, waiter) => commit(mutations.END, waiter)
  },
  mutations: {
    [mutations.START](state, waiter) {
      state.waitingFor = start(state.waitingFor, waiter);
    },
    [mutations.END](state, waiter) {
      state.waitingFor = end(state.waitingFor, waiter);
    }
  }
};
