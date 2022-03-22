<template>
  <div class="login">
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
