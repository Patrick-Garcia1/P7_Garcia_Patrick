<template>
  <!-- corp du pied de page -->
  <footer class="footer">
    <img 
      loading="lazy"
      class="footer__img"
      src="../assets/icon-left-font-monochrome-black.png"
      alt="Logo complet de groupomania."
      width="150px"
      height="25px"
    />
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style lang="scss">
.footer {
  bottom: 0;
  padding: 0;
  margin: 0;
  width: 100%;
  background-color: rgb(200, 70, 130);
  border-top: 2px solid black;
  font-size: 1rem;
  color: black;
  font-size: 1.2rem;
  &__img {
    margin: 0;
    padding: 25px 0 25px 0;
    width: 150px;
    height: 25px;
  }
}
</style>
