# vuex-loading changelog

## v1.0.0

- A complete rewrite, more extensible.
- Readable and better code.
- Update to Webpack 4
- Remove built-in loaders. Maybe we can create another repository including custom spinners.
- Remove `width` and `height` props.
- Strict props.
- `isLoading` supports matchers now `creating.*`, `!creating` etc. Please see [/sindresorhus/matcher](/sindresorhus/matcher).
- Rename `registerComponents` to `registerComponent`
- Added `accessorName` option to change `$vueLoading` key.
- Removed `createActionHelpers`, use `mapLoadingActions` or `wrapLoading` instead.
- Added `v-loading:visible`, `v-loading:hidden`, `v-loading:disabled`, `v-loading:enabled`, `v-loading:click` directives.

## v0.4.0

- rename v-loading slot `spinner` to `loading` #30
- added `wrapLoading` helper function for easy integration of vuex-loading in vue component methods #30

## v0.3.0

- Rename `$vuexLoading` to `$vueLoading` to be consistent with class name #25
