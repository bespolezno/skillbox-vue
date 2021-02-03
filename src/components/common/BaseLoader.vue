<template>
  <div class="loader-wrapper">
    <div class="sk-rotating-plane"></div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.loader-wrapper {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.sk-rotating-plane {
  width: 100px;
  height: 100px;
  margin: auto;
  background-color: #272727;
  animation: sk-rotating-plane 1.2s infinite ease-in-out;
}

@keyframes sk-rotating-plane {
  0% {
    transform: perspective(120px) rotateX(0deg) rotateY(0deg);
  }
  50% {
    transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
  }
  100% {
    transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
  }
}
</style>