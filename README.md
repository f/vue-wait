# ⌛️ vuex-loading

Multiple Process Loader Management for [Vue](http://vuejs.org/) and (optionally) [Vuex](http://vuex.vuejs.org/).

> Even it's named as "vuex-loading", Vuex is now completely optional.

<img src="./resources/vuex-loading.gif" width="480">

> [Play with demo above](https://f.github.io/vuex-loading/).

**vuex-loading** helps to manage multiple loading states on the page without any conflict. It's based on a **very simple idea** that manages a Vuex store with multiple loading states. The **built-in loader component** listens its registered loader and immediately become loading state.

## Requirements

- [Vue.js](https://vuejs.org) (v2.0.0+)

## Power supplies
- [Vuex](http://vuex.vuejs.org), optionally (v2.0.0+)

## Installation

```bash
$ npm install vuex-loading
# or if you using Yarn
$ yarn add vuex-loading
```

## Usage

```js
import VueLoading from 'vuex-loading'

Vue.use(VueLoading) // add VueLoading as Vue plugin
```

Then you should register `VueLoading` module:

```js
new Vue({
  el: '#app',
  store,
  vueLoading: new VueLoading({registerComponents: false}), // configure VueLoading here
});
```

## Usage with Vuex

Simply set `useVuex` parameter to `true` and optionally override
`moduleName`

```js
import VueLoading from 'vuex-loading'

Vue.use(Vuex)
Vue.use(VueLoading) // add VueLoading as Vue plugin
```

Then you should register `vueLoading` module:

```js
new Vue({
  el: '#app',
  store,
  vueLoading: new VueLoading({ useVuex: true, moduleName: 'vuex-example-module' }), // configure VueLoading here
});
```

Now `VueLoading` will use `Vuex` store for data management
which can be traced in `Vue DevTools`

<img src="./resources/vue-loading-2.gif" width="480">

## VueLoading options

You can use this options for customize VueLoading behavior

#### `useVuex`

boolean value, `false` by default, use this value for enabling
integration with `Vuex` store

When this value is true `VueLoading` will store data in `Vuex` store
and all changes to this data will be made by dispatching actions to store

#### `moduleName`

string value, `loading` by default.
Name for `Vuex` store if `useVuex` set to true, otherwise not used.

#### `registerComponents`

boolean value, true by default, register `v-loading` components.

## Global Template Helpers

**vuex-loading** provides some helpers to you to use in your templates.
All features can be obtained from $vueLoading property in Vue components

#### `$anyLoading`

Returns boolean value if any loader exists in page.

```html
<template>
  <progress-bar v-if="$vueLoading.anyLoading">Please wait...</progress-bar>
</template>
```

#### `$isLoading(loader String)`

Returns boolean value if given loader exists in page.

```html
<template>
  <progress-bar v-if="$vueLoading.isLoading('creating user')">Creating User...</progress-bar>
</template>
```

#### `$isLoading(loaders Array<String>)`

Returns boolean value if some of given loaders exists in page.

```html
<template>
  <progress-bar v-if="$vueLoading.isLoading(['creating user', 'page loading'])">Creating User...</progress-bar>
</template>
```

#### `$startLoading(loader String)`

Starts the given loader.

```html
<template>
  <button @click="$vueLoading.startLoading('creating user')">Create User</button>
</template>
```

#### `$endLoading(loader String)`

Stops the given loader.

```html
<template>
  <button @click="$vueLoading.endLoading('creating user')">Cancel</button>
</template>
```

## Global Action Helpers

**vuex-loading** provides some helpers to you to use in your Vuex stores.

```js
import { createActionHelpers } from 'vuex-loading'
const { startLoading, endLoading } = createActionHelpers({
  moduleName: 'loading'
});
```

#### `startLoading(dispatcher, loader String [,async callback])`

You can trigger loader from the action. This will make your templates cleaner and you will have an accurate loader status.
`startLoading` will trigger a loading and will end loader after the optional async callback is finished.

_Example using the Promise returning callback function_
```js
export default {
  actions: {
    async createUser({ commit, dispatch }) {
      const response = await startLoading(dispatch, 'creating user', () => {
        return fetch("...") // Some async job that returns Promise instance.
      });
      commit(types.CREATE_USER, response)
    }
  },
  // ...
}
```

_Example call without a provided callback_
```js
export default {
  actions: {
    createUser({ commit, dispatch }) {
      startLoading(dispatch, 'creating user');
      request('/create-user', (response) => {
        endLoading(dispatch, 'creating user')
        commit(types.CREATE_USER, response);
      });
    }
  },
  // ...
}
```

#### `endLoading(dispatcher, loader String)`

Ends given loading from actions.

```js
export default {
  actions: {
    async createUser({ commit, dispatch }) {
      try {
        const response = await startLoading(dispatch, 'creating user', () => { /* ... */ });
        commit(types.CREATE_USER, response)
      } catch (e) {
        // In any unexpected thing occurs on runtime, end the loading.
        endLoading(dispatch, 'creating user')
      }
    }
  },
  // ...
}
```

#### `wrapLoading(loader String, func Function, [,force_sync = false])`

Decorator that wraps function,
will trigger a loading and will end loader after the original function (`func` argument) is finished.

By default `wrapLoading` return async function,
if you want to wrap default sync function pass `true` in last argument

_Example using with async function_

```js
methods: {
  fetchDataFromApi: wrapLoading('fetch data', async function () {
    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    // do work here
    await sleep(3000);
    // simulate some api call
    this.fetchResponse = Math.random()
  })
}
```

See also `examples/wrap-example`

## Using `v-loading` Component

If you disable `registerComponents` option then
import and add `v-loading` into components

```js
import vLoading from 'vuex-loading/v-loading.vue'
components: {
  'v-loading': vLoading
}
```

In template, you should wrap your content with `v-loading` component to show loading on it.

```html
<v-loading loader='fetching data'>
  <template slot='loading'>
    This will be shown when "fetching data" loader starts.
  </template>

  This will be shown when "fetching data" loader ends.
</v-loading>
```

Better example for a `button` with loading state:

```html
<button :disabled='$vueLoading.isLoading("creating user")'>
  <v-loading loader='creating user'>
    <template slot='loading'>Creating User...</template>
    Create User
  </v-loading>
</button>
```

## Making Reusable Loader Components

With reusable loader components, you will be able to use custom loader components as example below. This will allow you to create better **user loading experience**.

<img src="./resources/vue-loading-2.gif" width="480">

In this example above, the **tab gets data from back-end**, and the **table loads data from back-end at the same time**. With **vuex-loading**, you will be able to manage these two seperated loading processes easily:

```html
<template lang='pug'>
div
  v-loading(loader='fetching tabs')
    template(slot='loading')
      b-tabs
        template(slot='tabs')
          b-nav-item(active disabled)
            v-icon(name='circle-o-notch', spin)
    b-tabs
      template(slot='tabs')
        b-nav-item(v-for='tab in tabs') {{ tab.name }}

  v-loading(loader='fetching data')
    table-gradient-spinner(slot='loading')
    table
      tr(v-for='row in data')
        // ...
</template>
```

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

Now you can use your spinner everywhere using `slot='loading'` attribute:

```html
<template lang="pug">
  v-loading(loader='fetching data')
    my-spinner(slot='loading')
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
  <template slot="loading">
    <v-loading-spinner height='30px' width='30px' />
  </template>

  This will be shown when "fetching data" loader ends.
</v-loading>
```

Please see `example` for more detailed example.

## Run example

Use `npm run dev-vuex` or `npm run dev-default` commands
for running examples locally.

## Contributors

- Fatih Kadir Akın, (creator)
- Igor, (maintainer, made Vuex-free)

## License

MIT © [Fatih Kadir Akın](https://github.com/f)
