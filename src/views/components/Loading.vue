<template>
  <div class="loading">
    <svg class="icon" aria-hidden="true">
      <use xlink:href="#icon-loading"></use>
    </svg>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
@keyframes loading {
  0% {
    transform: rotateZ(0deg);
  }
  100% {
    transform: rotateZ(360deg);
  }
}

.loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .icon {
    animation: 1s loading infinite linear;
  }
}
@media (max-width: 768px) {
  .icon {
    width: 72px;
    height: 72px;
  }
}
@media (min-width: 769px) {
  .icon {
    width: 80px;
    height: 80px;
  }
}
</style>
