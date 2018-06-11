# vue-wait changelog

## v1.2.0
- Rename `isWaiting` to `is` to make the code less crowded.
- Better array matching

## v1.1.0
- Rename package to `vue-wait`
- `anyLoading` to `any`

## v1.0.0

- A complete rewrite, more extensible.
- Readable and better code.
- Update to Webpack 4
- Remove built-in loaders. Maybe we can create another repository including custom spinners.
- Remove `width` and `height` props.
- Strict props.
- `isWaiting` supports matchers now `creating.*`, `!creating` etc. Please see [/sindresorhus/matcher](/sindresorhus/matcher).
- Rename `registerComponents` to `registerComponent`
- Added `accessorName` option to change `$wait` key.
- Removed `createActionHelpers`, use `mapWaitingActions` or `waitFor` instead.
- Added `v-loading:visible`, `v-loading:hidden`, `v-loading:disabled`, `v-loading:enabled`, `v-loading:click` directives.

## v0.4.0

- rename v-loading slot `spinner` to `loading` #30
- added `waitFor` helper function for easy integration of vue-wait in vue component methods #30

## v0.3.0

- Rename `$vuexLoading` to `$wait` to be consistent with class name #25
