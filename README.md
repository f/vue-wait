# ⌛️ vuex-loading

Multiple Process Loader Management for [Vue](http://vuejs.org/) and [Vuex](http://vuex.vuejs.org/).

<img src="./resources/vuex-loading.gif" width="640">

**vuex-loading** helps to manage multiple loading states on the page.

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
  data() {
    return {
      email: '',
      password: '',
    }
  },
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

### Built-in Loaders (WIP)

Also you can use built in loaders:
 - `v-loading-spinner`
 - `v-loading-heart`

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
