// clone of sindresorhus/matcher
'use strict';
const escapeStringRegexp = require('escape-string-regexp');

const reCache = new Map();

function makeRe(pattern, options) {
  const opts = Object.assign(
    {
      caseSensitive: false
    },
    options
  );

  const cacheKey = pattern + JSON.stringify(opts);

  if (reCache.has(cacheKey)) {
    return reCache.get(cacheKey);
  }

  const negated = pattern[0] === '!';

  if (negated) {
    pattern = pattern.slice(1);
  }

  pattern = escapeStringRegexp(pattern).replace(/\\\*/g, '.*');

  const re = new RegExp(`^${pattern}$`, opts.caseSensitive ? '' : 'i');
  re.negated = negated;
  reCache.set(cacheKey, re);

  return re;
}

export const isMatch = (input, pattern, options) => {
  const re = makeRe(pattern, options);
  const matches = re.test(input);
  return re.negated ? !matches : matches;
};
