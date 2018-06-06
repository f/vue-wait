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
    <button @click='fetchDataFromApi' :disable='$vueLoading.isLoading("fetch data")'>
      <v-loading loader='fetch data' message='Fetching data...'>
        <template slot='loading'>
          <span class="animated">👾</span>
        </template>
        Fetching response {{ fetchResponse }}
      </v-loading>
    </button>

    <button @click='syncCalculator' :disable='$vueLoading.isLoading("sync work")'>
      <v-loading loader='sync work' message='Calculating data...'>
        <template slot='loading'>
          <span class="animated">❤️</span>
        </template>
        Calculate data {{ calculateData }}
      </v-loading>
    </button>
  </div>
</template>
<script>
  import { wrapLoading } from '../../src/vue-loading'

  export default {
    name: 'wrap-app',
    data() {
      return {
        fetchResponse: null,
        calculateData: 0
      };
    },
    methods: {
      fetchDataFromApi: wrapLoading('fetch data', async function () {
        function sleep(ms) {
          return new Promise(resolve => setTimeout(resolve, ms));
        }

        // do work here
        await sleep(3000);
        // simulate some api call
        this.fetchResponse = Math.random()
      }),
      syncCalculator: wrapLoading('sync work', function () {
        for (let i = 2; i < 1000000000; i++) {
          Math.sqrt(i)
        }
        this.calculateData += 1;
      }, true)
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
