<template>
  <!-- indicateur de nouveau message -->
  <div class="nouveau" title="Nouveauté.">
    <p class="nouveau__para">✪</p>
  </div>
</template>

<script>
export default {
  name: "Nouveau",
};
</script>

<style lang="scss">
.nouveau {
  position: absolute;
  right: -5px;
  top: -2px;
  background-color: white;
  width: 20px;
  height: 20px;
  padding: 0;
  margin: 0;
  border-radius: 50% 50% 50% 50% / 17% 17% 83% 83%;
  box-shadow: 0 0 4px inset black;
  border: 2px solid rgb(200, 70, 130);
  animation: flash 4s linear infinite;
  transform: scale(1);
  opacity: 1;
  @keyframes flash {
    0% {
      opacity: 1;
    }
    79% {
      opacity: 1;
      transform: scale(1);
    }
    80% {
      opacity: 0;
      transform: scale(1);
    }
    85% {
      opacity: 1;
      transform: scale(1.4);
    }
    90% {
      opacity: 1;
      transform: scale(1.4);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
  &:hover {
    cursor: default;
  }
  &__para {
    position: absolute;
    z-index: 1;
    top: -3px;
    left: 0px;
    width: 20px;
    height: 20px;
    border-radius: 18px;
    margin: 0;
    color: rgb(30, 200, 30);
  }
}
</style>
