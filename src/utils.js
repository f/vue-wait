import { isMatch } from './lib/matcher';

function uniqArray(array) {
  return array.filter((el, index, arr) => index == arr.indexOf(el));
}

export function is(waitingFor, waiter) {
  if (typeof waiter === 'string' && waiter.match(/[\*\!]/)) {
    return waitingFor.filter(w => isMatch(w, waiter)).length > 0;
  }
  return Array.isArray(waiter)
    ? waitingFor.some(w => is(waiter, w))
    : waitingFor.includes(waiter);
}

export function any(waitingFor) {
  return waitingFor.length > 0;
}

export function start(waitingFor, waiter) {
  return uniqArray([...waitingFor, waiter]);
}

export function end(waitingFor, waiter) {
  return uniqArray(waitingFor).filter(l => l !== waiter);
}

export function progress(progresses, waiter, current, total = 100) {
  if (current > total) {
    return endProgress(progresses, waiter);
  }

  return {
    ...progresses,
    [waiter]: {
      current,
      total,
      percent: (100 * current) / total
    }
  };
}

export function endProgress(progresses, waiter) {
  const { [waiter]: omit, ...omittedProgresses } = progresses;
  return omittedProgresses;
}

export function percent(progresses, waiter) {
  const progress = progresses[waiter];
  if (!progress) return 0;

  return progress.percent;
}

export function nodeIsDebug() {
  return process.env.NODE_ENV !== 'production';
}
