<template lang="html">
  <transition :name='transition' :mode='mode'>
    <span v-if='waitsFor'>
      <slot name='waiting'></slot>
      <span v-if='message'>{{ message }}</span>
    </span>
    <slot v-else></slot>
  </transition>
</template>
<script>
  export default {
    props: {
      visible: Boolean,
      transition: String,
      mode: String,
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
