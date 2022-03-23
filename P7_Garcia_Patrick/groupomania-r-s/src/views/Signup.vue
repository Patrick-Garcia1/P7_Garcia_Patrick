<template>
  <!-- page inscription -->
  <div class="signup">
  <!-- comporsant FormulaireSignup -->
    <FormulaireSignup />
  </div>
</template>

<script>
// @ is an alias to /src
import FormulaireSignup from "@/components/FormulaireSignup.vue";

export default {
  name: "Signup",
  components: {
    FormulaireSignup,
  },
};
</script>
<style scoped lang="scss">
.signup {
  min-height: 91vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 75px;
}
</style>
