<template>
    <div>
        <div class="container">
            <v-loading message='Something loading! Lovely...'>
                <template slot='loading'>
                    <loading-heart width='1em' height='1em'/>
                </template>
                This will be shown after load.
            </v-loading>
        </div>
        <button @click='fetchDataFromApi' :disable='$vueLoading.isLoading("fetch data")'>
            <v-loading loader='fetch data' message='Fetching data...'>
                <template slot='loading'>
                    <loading-spinner width="1em" height="1em"/>
                </template>
                Fetching response {{fetchResponse}}
            </v-loading>
        </button>

        <button @click='syncCalculator' :disable='$vueLoading.isLoading("sync work")'>
            <v-loading loader='sync work' message='Calculating data...'>
                <template slot='loading'>
                    <loading-spinner width="1em" height="1em"/>
                </template>
                Calculate data {{calculateData}}
            </v-loading>
        </button>
    </div>
</template>
<script>
import vLoading from '../../src/v-loading.vue'
import loadingHeart from '../../src/spinners/heart.vue'
import loadingSpinner from '../../src/spinners/spinner.vue'
import {wrapLoading} from '../../src/vuex-loading'

export default {
  name: 'main',
  components: {
    'v-loading': vLoading,
    'loading-heart': loadingHeart,
    'loading-spinner': loadingSpinner
  },
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

.my-loading {
    text-align: center;
    opacity: .5;
    animation: pulse 3s infinite;
    animation-delay: 1s;
}

@-webkit-keyframes pulse {
    0%, 100% {
        opacity: .5;
    }
    50% {
        opacity: .1;
    }
}

@keyframes pulse {
    0%, 100% {
        opacity: .5;
    }
    50% {
        opacity: .1;
    }
}
</style>
