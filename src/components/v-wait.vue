<template lang="html">
  <div>
    <span v-if='waitsFor'>
      <slot name='waiting'></slot>
      <span v-if='message'>{{ message }}</span>
    </span>
    <slot v-else></slot>
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
      waitsFor() {
        if (this.visible) {
          return this.visible;
        }
        if (this.for) {
          return this.__$waitInstance.is(this.for);
        }
        return this.__$waitInstance.any;
      }
    }
  }
</script>
