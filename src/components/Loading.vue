<template>
  <!-- Loading screen -->
  <div class="loading__center">
      <div class="heading">Loading</div>
      <div class="ring"><div></div><div></div><div></div><div></div></div>
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
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}

.ring {
  display: flex;
  flex-direction: column;
	align-items: center;
	justify-content: center;
  position: relative;
  width: 80px;
  height: 70px;
  
}
.ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 8px solid #000;
  border-radius: 50%;
  animation: ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #000 transparent transparent transparent;
}
.ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>