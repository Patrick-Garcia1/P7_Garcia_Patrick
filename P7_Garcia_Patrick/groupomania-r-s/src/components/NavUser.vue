<template>
  <div id="nav" v-if="truc === true">
    <router-link to="/login">Connexion</router-link> |
    <router-link to="/signup">Inscription</router-link>
  </div>
</template>

<script>
export default {
  name: "NavUser",
  data() {
    return {
      truc: "",
    };
  },
  mounted() {
    let c = document.location.href.split("8080")[1];
    if (c.match("/login") || c.match("/signup") || c === "/") {
      this.truc = true;
    } else {
      this.truc = false;
    }
  },
};
</script>

<style lang="scss">
#nav {
  padding: 0 0 5px 0;
  font-size: 1.1rem;
  a {
    font-weight: bold;
    color: black;

    &.router-link-exact-active {
      color: rgb(200, 70, 130);
    }
  }
}
</style>
