export function isLoading(loaders, loader) {
  if (loader instanceof RegExp) {
    return loaders.filter(l => l.match(loader)).length > 0;
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
