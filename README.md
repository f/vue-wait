# ⌛️ vuex-loading

Multiple Process Loader Management for [Vue](http://vuejs.org/) and [Vuex](http://vuex.vuejs.org/).

<img src="./resources/vuex-loading.gif" width="640">

**vuex-loading** helps to manage multiple loading states on the page without any conflict. It's based on a **very simple idea** that manages a Vuex store with multiple loading states. The **built-in loader component** listens its registered loader and immediately become loading state.

## Requirements

- [Vue.js](https://vuejs.org) (v2.0.0+)
- [Vuex](http://vuex.vuejs.org) (v2.0.0+)

## Installation

```bash
$ npm install vuex-loading
# or if you using Yarn
$ yarn add vuex-loading
```

## Usage

```js
import createVuexLoader from 'vuex-loading'

const VuexLoading = createVuexLoader({
  // The Vuex module name, 'loading' by default.
  moduleName: 'loading',
  // The Vue component name, 'v-loading' by default.
  componentName: 'v-loading',
  // Vue component class name, 'v-loading' by default.
  className: 'v-loading',
});

Vue.use(Vuex)
Vue.use(VuexLoading)

const store = new Vuex.Store({
  plugins: [VuexLoading.Store],
});
```

Then you should register loading module:

```js
new Vue({
  el: '#app',
  store,
  computed: {
    ...mapGetters('loading', [
      /*
        `isLoading` returns a function with a parameter of loader name.
        e.g. `isLoading('creating user')` will return you a boolean value.
      */
      'isLoading',
      /*
        `anyLoading` returns a boolean value if any loader name exists on store.
      */
      'anyLoading',
    ])
  },
  methods: {
    startLoading() {
      /*
        VuexLoading registers $startLoading method with loader name.
        When you start a loader, it pushes the loader name to loading state.
      */
      this.$startLoading('fetching data');
    },
    endLoading() {
      /*
        VuexLoading registers $startLoading method with loader name.
        When you stop a loader, it pulls the loader name from loading state.
      */
      this.$endLoading('fetching data');
    },
  },
});
```

## Using `v-loading` Component

In template, you should wrap your content with `v-loading` component to show loading on it.

```html
<v-loading loader='fetching data'>
  <template slot="spinner">
    This will be shown when "fetching data" loader starts.
  </template>
  
  This will be shown when "fetching data" loader ends.
</v-loading>
```

## Making Common Loaders

You may want to design your own reusable loader for your project. You better create a wrapper component called `my-spinner`:

```html
<!-- MySpinner.vue -->
<i18n>
  tr:
    loading: Yükleniyor...
  en:
    loading: Loading...
</i18n>

<template lang="pug">
  div.loading-spinner
    //- Uses vue-awesome spinner
    v-icon(name='refresh', spin)
    span {{ $t('loading') }}
</template>

<style scoped lang="scss">
  .loading-spinner {
    opacity: 0.5;
    margin: 50px auto;
    text-align: center;
    .fa-icon {
      vertical-align: middle;
      margin-right: 10px;
    }
  }
</style>
```

Now you can use your spinner everywhere using `slot='spinner'` attribute:

```html
<template lang="pug">
  v-loading(loader='fetching data')
    my-spinner(slot='spinner')
    div
      p My main content after fetching data...
</template>
```

### Built-in Loaders (WIP)

Also you can use built in loaders:
 - `v-loading-spinner`
 - `v-loading-heart`
 - ... more to come.

You need to put them into a `template` tag.

```html
<v-loading loader='fetching data'>
  <template slot="spinner">
    <v-loading-spinner height='30px' width='30px' />
  </template>
  
  This will be shown when "fetching data" loader ends.
</v-loading>
```

Please see `example` for more detailed example.

## License

MIT © [Fatih Kadir Akın](https://github.com/f)
