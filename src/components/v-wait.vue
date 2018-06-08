<template lang="html">
  <div>
    <span v-if='isWaiting || isDelaying'>
      <slot name='waiting'></slot>
      <span v-if='message'>{{ message }}</span>
    </span>
    <slot v-else></slot>
    <span>{{ isDelaying }}</span>
  </div>
</template>
<script>
  export default {
    props: {
      visible: Boolean,
      for: String,
      message: String,
      delay: {
        type: Number,
        default: 0,
      },
    },
    data() {
      return {
        delayTimer: null,
        isDelaying: false,
      };
    },
    watch: {
      isDelaying() {
        console.log(this.delay);
      },
      isWaiting(isWaiting, wasWaiting) {
        const notWaitingToWaiting = !isWaiting && wasWaiting;
        const endDelay = () => {
          this.isDelaying = false;
          clearTimeout(this.delayTimer);
        };
        endDelay();
        if (this.delay > 0 && notWaitingToWaiting) {
          this.isDelaying = true;
          this.delayTimer = setTimeout(endDelay, this.delay);
        }
      },
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
