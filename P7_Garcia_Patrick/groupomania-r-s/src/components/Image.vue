<template>
  <!-- zone d'accueil -->
  <div id="image">
    <img id="image__def" loading="lazy" alt="Logo de groupomania." src="../assets/icon.png" width="250" height="250" />
  </div>
</template>

<script>
export default {
  name: "Image",
};
</script>

<style lang="scss">
#image {
  z-index: -1;
  display: flex;
  justify-content: center;
  align-items: center;

  &__def {
    width: 250px;
    animation: gross 4s linear infinite;
    @keyframes gross {
      0% {
        transform: scale(1);
      }
      10% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.25);
      }
      90% {
        transform: scale(1);
      }
      100% {
        transform: scale(1);
      }
    }
  }
}
</style>
