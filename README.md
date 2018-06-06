# ⌛️ vuex-loading

Multiple Process Loader Management for [Vue](http://vuejs.org/) and (optionally) [Vuex](http://vuex.vuejs.org/).

> ⚠️ Even it's named as **`vuex-loading`**, Vuex is completely optional.

<img src="./resources/vuex-loading.gif" width="480">

> [Play with demo above](https://f.github.io/vuex-loading/).

**vuex-loading** helps to manage multiple loading states on the page without any conflict. It's based on a **very simple idea** that manages an array (or Vuex store optionally) with multiple loading states. The **built-in loader component** listens its registered loader and immediately become loading state.

## 📦  Requirements

- [Vue.js](https://vuejs.org) (v2.0.0+)

## 🚀  Power Supplies
- [Vuex](http://vuex.vuejs.org), optionally (v2.0.0+)

## 🔧 Installation

```bash
$ yarn add vuex-loading
# or if you using npm
$ npm install vuex-loading
```

## 📖 Usage

```js
import VueLoading from 'vuex-loading'

Vue.use(VueLoading) // add VueLoading as Vue plugin
```

Then you should register `VueLoading` module:

```js
new Vue({
  el: '#app',
  store,
  vueLoading: new VueLoading({
    // Defaults values are following:
    useVuex: false,              // Uses Vuex to manage loading state
    vuexModuleName: 'loading',   // Vuex module name

    registerComponent: true      // Registers `v-loading` component
    componentName: 'v-loading',  // <v-loading> component name, you can set `my-loader` etc.

    registerDirective: true      // Registers `v-loading` directive
    directiveName: 'loading',    // <span v-loading /> directive name, you can set `my-loader` etc.

  }),
});
```

## ♻️ Usage with Vuex

Simply set `useVuex` parameter to `true` and optionally override
`vuexModuleName`

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
  vueLoading: new VueLoading({
    useVuex: true, // You must pass this option `true` to use Vuex
    vuexModuleName: 'vuex-example-module' // It's optional, `loading` by default.
  }),
});
```

Now `VueLoading` will use `Vuex` store for data management which can be traced in `Vue DevTools > Vuex`

<img src="./resources/vue-loading-2.gif" width="480">

## 🔁 VueLoading Options

You can use this options for customize VueLoading behavior.

#### `accessorName`

`String` value, `$vueLoading` by default, you can change this value to rename the accessor.

E.g. if you rename this to `$l`, your `VueLoading` methods will be accessible by `$l.isLoading(..)` etc.

#### `useVuex`

`Boolean` value, `false` by default, use this value for enabling
integration with `Vuex` store

When this value is true `VueLoading` will store data in `Vuex` store
and all changes to this data will be made by dispatching actions to store

#### `vuexModuleName`

`String` value, `loading` by default.
Name for `Vuex` store if `useVuex` set to true, otherwise not used.

#### `registerComponent`

`Boolean` value, `true` by default, register `v-loading` component.

#### `componentName`

`String` value, `v-loading` by default, changes `v-loading` component name.

## 🌈 Global Template Helpers

**vuex-loading** provides some helpers to you to use in your templates.
All features can be obtained from $vueLoading property in Vue components.

#### `.anyLoading`

Returns boolean value if any loader exists in page.

```html
<template>
  <progress-bar v-if="$vueLoading.anyLoading">Please wait...</progress-bar>
</template>
```

#### `.isLoading(loader String | RegExp)`

Returns boolean value if given loader exists in page.

```html
<template>
  <progress-bar v-if="$vueLoading.isLoading('creating user')">Creating User...</progress-bar>
</template>
```

Also you can use matcher to make it more flexible:

Please see [matcher](https://github.com/sindresorhus/matcher/) library to see how to use matchers.

```html
<template>
  <progress-bar v-if="$vueLoading.isLoading('creating.*')">Creating something...</progress-bar>
</template>
```

#### `.isLoading(loaders Array<String>)`

Returns boolean value if some of given loaders exists in page.

```html
<template>
  <progress-bar v-if="$vueLoading.isLoading(['creating user', 'page loading'])">Creating User...</progress-bar>
</template>
```

#### `.startLoading(loader String)`

Starts the given loader.

```html
<template>
  <button @click="$vueLoading.startLoading('creating user')">Create User</button>
</template>
```

#### `.endLoading(loader String)`

Stops the given loader.

```html
<template>
  <button @click="$vueLoading.endLoading('creating user')">Cancel</button>
</template>
```

## 🏹 Directives

You can use directives to make your template cleaner.

#### `v-loading:visible='"loader name"'`

Shows if the given loader is loading.

```html
<template>
  <progress-bar v-loading:visible='"creating user"'>Creating User...</progress-bar>
</template>
```

#### `v-loading:hidden='"loader name"'` or `v-loading:visible.not='"loader name"'`

Hides if the given loader is loading.

```html
<template>
  <main v-loading:hidden='"creating *"'>Some Content</main>
</template>
```

#### `v-loading:disabled='"loader name"'`

Sets `disabled="disabled"` attribute to element if the given loader is loading.

```html
<template>
  <input v-loading:disabled="'*'" placeholder="Username" />
  <input v-loading:disabled="'*'" placeholder="Password" />
</template>
```

#### `v-loading:enabled='"loader name"'` or `v-loading:disabled.not='"loader name"'`

Removes `disabled="disabled"` attribute to element if the given loader is loading.

```html
<template>
  <button v-loading:enabled='"creating user"'>Abort Request</button>
</template>
```

#### `v-loading:click.start='"loader name"'`

Starts given loader on click.

```html
<template>
  <button v-loading:click.start='"create user"'>Start loader</button>
</template>
```

#### `v-loading:click.end='"loader name"'`

Ends given loader on click.

```html
<template>
  <button v-loading:click.end='"create user"'>End loader</button>
</template>
```

#### `v-loading:toggle='"loader name"'`

Toggles given loader on click.

```html
<template>
  <button v-loading:toggle='"flip flop"'>Toggles the loader</button>
</template>
```

## 🔌 Loading Action Mappers

**vuex-loading** provides `mapLoadingActions` mapper to be used with your Vuex stores.

Let's assume you have a store and async **action**s called `createUser` and `updateUser`.
It will call the methods you map and will start loaders while action is resolved.

```js
import { mapLoadingActions } from 'vuex-loading'

// ...
  methods: {
    ...mapLoadingActions('users', {
      getUsers: 'loading users',
      createUser: 'creating user',
      updateUser: 'updating user',
    }),
  }
// ...

```

##### 😱 What happened to old `createActionHelpers`?

**We've removed them**. Since they were just calling `dispatch`, you can just write like following example. We don't like complexity.

```js
//...
actions: {
  async getUsers({ dispatch }) {
    const loader = 'getting users';

    dispatch(`loading/startLoading`, loader, { root: true });
    await UserService.getUsers();
    dispatch(`loading/endLoading`, loader, { root: true });
  }
}
//...
```

**Using `mapLoadingActions` or `wrapLoading` instead is a better way.**

#### `wrapLoading(loader String, func Function, [,force_sync = false])`

Decorator that wraps function, will trigger a loading and will end loader after the original function (`func` argument) is finished.

By default `wrapLoading` return async function, if you want to wrap default sync function pass `true` in last argument

_Example using with async function_

```js
...
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
...
```

See also `examples/wrap-example`

## 💧 Using `v-loading` Component

If you disable `registerComponent` option then import and add `v-loading` into components

```js
import vLoading from 'vuex-loading/src/components/v-loading.vue'
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

## ⚡️ Making Reusable Loader Components

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

## 🚌 Run example

Use `npm run dev-vuex`, `npm run dev-vue` or `npm run dev-wrap` commands.
for running examples locally.

## 🎯 Contributors

- Fatih Kadir Akın, (creator)
- Igor, (maintainer, made Vuex-free)

## 🔑 License

MIT © [Fatih Kadir Akın](https://github.com/f)
