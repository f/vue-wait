<template>
  <transition
    v-if='transition'
    :name='transition'
    :mode='mode'
    :duration='duration'
    :enter-class='transitionClass(enterClass)'
    :enter-active-class='transitionClass(enterActiveClass)'
    :enter-to-class='transitionClass(enterToClass)'
    :leave-class='transitionClass(leaveClass)'
    :leave-active-class='transitionClass(leaveActiveClass)'
    :leave-to-class='transitionClass(leaveToClass)'
    @beforeEnter='$emit("beforeEnter")'
    @enter='$emit("enter")'
    @afterAnter='$emit("afterEnter")'
    @enterCancelled='$emit("enterCancelled")'
    @beforeLeave='$emit("beforeLeave")'
    @leave='$emit("leave")'
    @afterLeave='$emit("afterLeave")'
    @leaveCancelled='$emit("leaveCancelled")'
    >
    <span v-if='waitsFor'>
      <slot name='waiting'></slot>
      <span v-if='message'>{{ message }}</span>
    </span>
    <div v-else><slot /></div>
  </transition>
  <div v-else>
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
    for: [String, Array],
    message: String,
    transition: String,
    duration: Number,
    mode: {
      type: String,
      default: 'out-in'
    },
    enterClass: {
      type: String,
      default: 'enter'
    },
    enterActiveClass: {
      type: String,
      default: 'enter-active'
    },
    enterToClass: {
      type: String,
      default: 'enter-to'
    },
    leaveClass: {
      type: String,
      default: 'leave'
    },
    leaveActiveClass: {
      type: String,
      default: 'leave-active'
    },
    leaveToClass: {
      type: String,
      default: 'leave-to'
    },
  },
  methods: {
    transitionClass(className) {
      return `${this.transition}-${className}`;
    }
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
};
</script>
