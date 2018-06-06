<template lang="html">
  <div>
    <span v-if='isLoading'>
      <slot name='loading'></slot>
      <span v-if='message'>{{ message }}</span>
    </span>
    <slot v-if='!isLoading'></slot>
  </div>
</template>
<script>
  export default {
    props: {
      visible: Boolean,
      loader: String,
      message: String,
    },
    computed: {
      isLoading() {
        if (this.visible) {
          return this.visible;
        }
        if (this.loader) {
          return this.__$vueLoadingInstance.isLoading(this.loader);
        }
        return this.__$vueLoadingInstance.anyLoading;
      }
    }
  }
</script>
