# vuex-loading changelog

## v1.0.0

- A complete rewrite, more extensible.
- Readable and better code.
- Update to Webpack 4
- Remove built-in loaders.
- Remove `width` and `height` props.
- Strict props.
- `isLoading` supports `RegExp` now.
- Rename `registerComponents` to `registerComponent`
- Added `helperName` option to change `$vueLoading` key.
- Removed `createActionHelpers`, use `mapLoadingActions` or `wrapLoading` instead.

## v0.4.0

- rename v-loading slot `spinner` to `loading` #30
- added `wrapLoading` helper function for easy integration of vuex-loading in vue component methods #30

## v0.3.0

- Rename `$vuexLoading` to `$vueLoading` to be consistent with class name #25
