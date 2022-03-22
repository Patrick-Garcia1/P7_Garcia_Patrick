<template>
  <div class="logout">
    <h2>Vous avez été déconnecté</h2>
  </div>
</template>

<script>
import axios from "axios";
// @ is an alias to /src
export default {
  mounted() {
    let oui = JSON.parse(sessionStorage.getItem("utilisateur"));
    axios
      .post("http://localhost:3000/api/auth/logout", {
        userId: oui.userId,
        email: oui.email,
      })
      .then(() => {
        sessionStorage.removeItem("utilisateur");
        function redirection() {
          document.location.href = "/";
        }
        function deco() {
          setTimeout(redirection, 1500);
        }
        deco();
      })
      .catch(() => {
        sessionStorage.removeItem("utilisateur");
        function redirection() {
          document.location.href = "/login";
        }
        function deco() {
          setTimeout(redirection, 1000);
        }
        deco();
      });
  },
  beforeUnmount() {},
};
</script>
<style scoped lang="scss">
.logout {
  min-height: 76vh;
}
h2 {
  margin-top: 125px;
}
</style>
