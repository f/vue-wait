<template>
  <div id="app">
    <button @click.prevent="getUsers">Get Users</button>
    <div class="transitions-demo">
      <div>
        <h2>With transition</h2>
        <v-wait for="users" transition="fade" mode="out-in">
          <template slot="waiting">
            <p>Loading...</p>
          </template>

          <ul>
            <li>One</li>
            <li>Two</li>
            <li>Three</li>
            <li>Four</li>
            <li>Five</li>
          </ul>
          <div>Second Component</div>
        </v-wait>
      </div>

      <div>
        <h2>Without transition</h2>
        <v-wait for="users">
          <template slot="waiting">
            <p>Loading...</p>
          </template>

          <ul>
            <li>One</li>
            <li>Two</li>
            <li>Three</li>
            <li>Four</li>
            <li>Five</li>
          </ul>
          <div>Second Component</div>
        </v-wait>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    getUsers() {
      return new Promise(resolve => {
        this.$wait.start("users");
        setTimeout(() => {
          resolve();
          this.$wait.end("users");
        }, 5000);
      });
    }
  }
};
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.transitions-demo {
  display: flex;
  justify-content: space-around;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 2s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
