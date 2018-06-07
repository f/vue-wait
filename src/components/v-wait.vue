<template lang="html">
  <div>
    <span v-if='isWaiting'>
      <slot name='waiting'></slot>
      <span v-if='message'>{{ message }}</span>
    </span>
    <slot v-if='!isWaiting'></slot>
  </div>
</template>
<script>
  export default {
    props: {
      visible: Boolean,
      for: String,
      message: String,
    },
    computed: {
      isWaiting() {
        if (this.visible) {
          return this.visible;
        }
        if (this.for) {
          return this.__$waitInstance.isWaiting(this.for);
        }
        return this.__$waitInstance.any;
      }
    }
  }
</script>
