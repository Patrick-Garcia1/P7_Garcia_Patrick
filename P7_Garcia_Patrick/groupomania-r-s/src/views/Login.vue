<template>
  <!-- page login --> 
  <div class="login">
    <!-- composant FormulaireLogin --> 
    <FormulaireLogin />
  </div>
</template>

<script>
// @ is an alias to /src
import FormulaireLogin from "@/components/FormulaireLogin.vue";

export default {
  name: "Login",
  components: {
    FormulaireLogin,
  },
  //------------------
  // Logique supression d'élément utilisateur si existe 
  //------------------
  mounted() {
    sessionStorage.removeItem("utilisateur");
  },
};
</script>
<style scoped lang="scss">
.login {
  min-height: 91vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
