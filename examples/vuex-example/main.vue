<template>
  <div id="app">
    <div class="container">
      <v-loading message='Something loading! Lovely...'>
        <template slot='loading'>
          <span class="animated">❤️</span>
        </template>
        This will be shown after load.
      </v-loading>
    </div>
    <button @click='writeCode()' :disable='$l.isLoading("writing code")'>
      <v-loading loader='writing code' message='Writing Code...'>
        <template slot='loading'>
          <span class="animated">️️♻️</span>
        </template>
        Write Code
      </v-loading>
    </button>
    <button @click='endLoading()' :disabled='!$l.isLoading("writing code")'>
      <span v-if='$l.isLoading("writing code")'>Stop Coding</span>
      <span v-else>Coding Stopped</span>
    </button>
    <br>
    <button @click='$l.startLoading("c")' :disabled='$l.isLoading("c")'>
      Start <b>"c"</b> Loader
    </button>
    <button @click='$l.endLoading("c")' :disabled='!$l.isLoading("c")'>
      Stop <b>"c"</b> Loader
    </button>
    <p>
      Toggle on any letter to load/unload together.
    </p>
    <ul class="list">
      <li v-for='loader in loaders' :key='loader + Math.random()' @click='toggleLoader(loader)'>
        <v-loading :loader='loader'>
          <template slot='loading' v-if='loader == "c"'>
            <span class="animated">🎉</span>
          </template>
          <template slot='loading' v-else>
            <span class="animated">👋🏻</span>
          </template>
          {{ loader }}
        </v-loading>
      </li>
    </ul>
    <hr>
    <button @click='incrementAsync'>
      <v-loading loader="incrementing" message='incrementing...'>
        <template slot='loading'>
          <span class="animated">+</span>
        </template>
        <code>mapLoadingActions</code> {{ count }}
      </v-loading>
    </button>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { mapLoadingActions } from '../../src/vue-loading';

  export default {
    name: 'vuex-app',
    data() {
      return {
        loaders: ['a', 'c', 'b', 'a', 'b', 'a', 'c', 'a', 'c', 'a', 'b']
      };
    },
    computed: {
      ...mapGetters(['count']),
    },
    methods: {
      ...mapLoadingActions({
        incrementAsync: 'incrementing',
      }),
      writeCode() {
        this.$l.startLoading('writing code');
      },
      endLoading() {
        this.$l.endLoading('writing code');
      },
      toggleLoader(loader) {
        if (this.$l.isLoading(loader)) {
          this.$l.endLoading(loader);
        } else {
          this.$l.startLoading(loader);
        }
      }
    }
  }
</script>

<style>
  body {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 20px;
  }

  #app {
    margin: 50px auto;
    width: 500px;
    text-align: center;
  }

  .list {
    list-style: none;
    padding: 0;
  }

  .list li {
    display: inline-block;
    margin: 10px;
    width: 30px;
    height: 30px;
    border-radius: 3px;
    border: 2px solid #ccc;
    line-height: 30px;
  }

  .container {
    padding: 50px;
  }

  button {
    border: 0;
    background-color: #fff;
    border: 2px solid #9f0fa0;
    border-radius: 4px;
    margin: 5px;
    color: #9f0fa0;
    font-size: 16px;
    padding: 8px;
  }

  button[disabled] {
    opacity: 0.4;
  }

  .animated {
    text-align: center;
    opacity: 0.5;
    animation: pulse 1s infinite;
    animation-delay: 1s;
    display: inline-block;
  }

  @-webkit-keyframes pulse {
    0%,
    100% {
      opacity: 1;
      transform: scale(1.3);
    }
    50% {
      opacity: 0.1;
      transform: scale(1);
    }
  }

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
      transform: scale(1.3);
    }
    50% {
      opacity: 0.1;
      transform: scale(1);
    }
  }
</style>
