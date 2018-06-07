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
    <button @click='writeCode()' v-loading:disabled='"writing code"'>
      <v-loading loader='writing code' message='Writing Code...'>
        <template slot='loading'>
          <span class="animated">️️♻️</span>
        </template>
        Write Code
      </v-loading>
    </button>
    <button v-loading:click.end='"writing code"'>
      <span v-loading:visible="'writing *'">Stop Coding</span>
      <span v-loading:visible.not="'writing *'">Coding Stopped</span>
    </button>
    <br>
    <button v-loading:click.start='"c"' v-loading:disabled='"c"'>
      Start <b>"c"</b> Loader
    </button>
    <button v-loading:click.end='"c"' v-loading:disabled.not='"c"'>
      Stop <b>"c"</b> Loader
    </button>
    <p>
      Toggle on any letter to load/unload together.
    </p>
    <ul class="list">
      <li v-for='loader in loaders' :key='loader + Math.random()' v-loading:toggle='loader'>
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
  </div>
</template>

<script>
  export default {
    name: 'vue-app',
    data() {
      return {
        loaders: ['a', 'c', 'b', 'a', 'b', 'a', 'c', 'a', 'c', 'a', 'b']
      };
    },
    methods: {
      writeCode() {
        this.$vueLoading.startLoading('writing code');
      },
      endLoading() {
        this.$vueLoading.endLoading('writing code');
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
