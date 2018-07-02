import { is, any, start, end, progress, percent, endProgress } from '../utils';

const mutations = {
  START: 'START',
  END: 'END',
  PROGRESS: 'PROGRESS'
};

export default {
  namespaced: true,
  state: {
    waitingFor: [],
    progresses: {}
  },
  getters: {
    is: state => waiter => is(state.waitingFor, waiter),
    any: state => any(state.waitingFor),
    percent: state => waiter => percent(state.progresses, waiter)
  },
  actions: {
    start: ({ commit }, waiter) => commit(mutations.START, waiter),
    end: ({ commit }, waiter) => commit(mutations.END, waiter),
    progress: ({ commit }, progress) => commit(mutations.PROGRESS, progress)
  },
  mutations: {
    [mutations.START](state, waiter) {
      state.waitingFor = start(state.waitingFor, waiter);
    },
    [mutations.END](state, waiter) {
      state.waitingFor = end(state.waitingFor, waiter);
      state.progresses = endProgress(state.progresses, waiter);
    },
    [mutations.PROGRESS](state, { waiter, current, total }) {
      state.progresses = progress(state.progresses, waiter, current, total);
    }
  }
};
