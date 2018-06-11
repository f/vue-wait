<template>
  <div id="app">
    <div class="container">
      <v-wait message='Something loading! Lovely...'>
        <template slot='waiting'>
          <span class="animated">❤️</span>
        </template>
        This will be shown after load.
      </v-wait>
    </div>
    <v-wait for='writing code' message='You can also use outsourced spinners like epic-spinners'>
      <orbit-spinner
        style="display: block; margin: 0 auto;"
        slot='waiting'
        :animation-duration="1500"
        :size="64"
        :color="'#ff1d5e'"
      />
    </v-wait>
    <button @click='writeCode()' v-wait:disabled='"writing code"'>
      <v-wait for='writing code' message='Writing Code...'>
        <template slot='waiting'>
          <span class="animated">️️♻️</span>
        </template>
        Write Code
      </v-wait>
    </button>
    <button v-wait:click.end='"writing code"'>
      <span v-wait:visible="'writing *'">Stop Coding</span>
      <span v-wait:visible.not="'writing *'">Coding Stopped</span>
    </button>
    <br>
    <button v-wait:click.start='"c"' v-wait:disabled='"c"'>
      Start <b>"c"</b> Loader
    </button>
    <button v-wait:click.end='"c"' v-wait:disabled.not='"c"'>
      Stop <b>"c"</b> Loader
    </button>
    <p>
      Toggle on any letter to load/unload together.
    </p>
    <ul class="list">
      <li v-for='loader in loaders' :key='loader + Math.random()' v-wait:toggle='loader'>
        <v-wait :for='loader'>
          <template slot='waiting' v-if='loader == "c"'>
            <span class="animated">🎉</span>
          </template>
          <template slot='waiting' v-else>
            <span class="animated">👋🏻</span>
          </template>
          {{ loader }}
        </v-wait>
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
        this.$wait.start('writing code');
      },
      end() {
        this.$wait.end('writing code');
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
