<template>
  <!-- Loading screen -->
  <div class="loader"><div></div><div></div></div>
  <div class="loading__center">
    <div class="ripple"><div></div><div></div></div>
  </div>
</template>

<script>

export default {
  name: 'Loader'
}
</script>

<style lang="scss" scoped>
.loading__center {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: $loader-position-ratio;
    left: $loader-position-ratio;
    transform: translate(-$loader-position-ratio,-$loader-position-ratio);
  }
  .ripple {
      display: inline-block;
      position: relative;
      width: $loader-width-height;
      height: $loader-width-height;
      div {
          position: absolute;
          border: $loader-border solid $color-brand-alt;
          opacity: 1;
          border-radius: $loader-position-ratio;
          animation: ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
          &:nth-child(2) {
              animation-delay: $loader-delay;
          }
      }
  }
  @keyframes ripple {
    0% {
      top: $loader-top-left;
      left: $loader-top-left;
      width: $loader-zero;
      height: $loader-zero;
      opacity: $loader-one;
    }
    100% {
      top: $loader-zero;
      left: $loader-zero;
      width: $loader-changed-wh;
      height: $loader-changed-wh;
      opacity: $loader-zero;
    }
  }
</style>