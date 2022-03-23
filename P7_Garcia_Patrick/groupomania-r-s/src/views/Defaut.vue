<template>
  <!-- page accueil par défaut --> 
  <div class="defaut">
    <!-- composant Image --> 
    <Image />
  </div>
</template>

<script>
// @ is an alias to /src
import Image from "@/components/Image.vue";

export default {
  name: "Defaut",
  components: {
    Image,
  },
};
</script>
<style scoped lang="scss">
.defaut {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 91vh;
  overflow: hidden;
}
</style>
