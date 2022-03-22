<template>
  <div class="profilPerso">
    <ProfilUser />
  </div>
</template>

<script>
// @ is an alias to /src
import ProfilUser from "@/components/ProfilUser.vue";

export default {
  name: "Profil",
  components: {
    ProfilUser,
  },
};
</script>
<style scoped lang="scss">
.profilPerso {
  min-height: 84vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
