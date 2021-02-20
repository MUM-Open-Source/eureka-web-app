<template>
  <!-- Loading screen -->
  <div class="loading__center">
      <div class="heading">Loading..</div>
  </div>
</template>

<script>

export default {
  name: 'Loading'
}
</script>

<style lang="scss" scoped>
.loading__center {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>