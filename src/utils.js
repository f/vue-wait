import { isMatch } from 'matcher';

export function isWaiting(waiters, waiter) {
  if (typeof waiter === 'string' && waiter.match(/[\*\!]/)) {
    return waiters.filter(l => isMatch(l, waiter)).length > 0;
  }
  return Array.isArray(waiter)
    ? waiters.some(v => waiter.includes(v))
    : waiters.indexOf(waiter) > -1;
}

export function any(waiters) {
  return waiters.length > 0;
}

export function start(waiters, waiter) {
  return uniqArray([...waiters, waiter]);
}

export function end(waiters, waiter) {
  return uniqArray(waiters).filter(l => l !== waiter);
}

export function uniqArray(array) {
  return array.filter((el, index, arr) => index == arr.indexOf(el));
}

export function nodeIsDebug() {
  return process.env.NODE_ENV !== 'production';
}
