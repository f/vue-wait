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

export function nodeIsDebug() {
  return process.env.NODE_ENV !== 'production';
}
