<template>
  <div id="navbis" v-if="autre === true">
    <router-link to="/profil">Profil</router-link> |
    <router-link to="/messages">Mur</router-link> |
    <router-link to="/logout">Logout</router-link>
  </div>
</template>

<script>
export default {
  name: "NavMur",
  data() {
    return {
      autre: "",
    };
  },
  mounted() {
    let c = document.location.href.split("8080")[1];
    if (c.match("/profil") || c.match("/messages")) {
      this.autre = true;
    } else {
      this.autre = false;
    }
  },
};
</script>

<style lang="scss">
#navbis {
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
