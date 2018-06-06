import { isMatch } from 'matcher';

export function isLoading(loaders, loader) {
  if (loader.match(/[\*\!]/)) {
    return loaders.filter(l => isMatch(l, loader)).length > 0;
  }
  return Array.isArray(loader)
    ? loaders.some(v => loader.includes(v))
    : loaders.indexOf(loader) > -1;
}

export function anyLoading(loaders) {
  return loaders.length > 0;
}

export function startLoading(loaders, loader) {
  return uniqArray([...loaders, loader]);
}

export function endLoading(loaders, loader) {
  return uniqArray(loaders).filter(l => l !== loader);
}

export function uniqArray(array) {
  return array.filter((el, index, arr) => index == arr.indexOf(el));
}

export function nodeIsDebug() {
  return process.env.NODE_ENV !== 'production';
}
