<template>
  <header>
    <h1 v-on:click="maj()" title="mis à jour de la page">Groupomania</h1>
    <NavUser />
    <NavMur />
  </header>
  <router-view />
  <Footer />
</template>

<script>
import NavUser from "@/components/NavUser.vue";
import NavMur from "@/components/NavMur.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "App",
  components: {
    NavUser,
    NavMur,
    Footer,
  },
  methods: {
    maj() {
      let c = document.location.href.split("8080/")[1];
      document.location.href = `/${c}`;
    },
  },
};
</script>

<style lang="scss">
body {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
header {
  position: fixed;
  width: 100%;
  background-color: white;
  border-bottom: 2px solid rgb(200, 70, 130);
  font-family: "Chakra Petch", sans-serif;
  font-size: 1.2rem;
  z-index: 4;
}
h1 {
  margin: 5px 0 5px 0;
  cursor: grab;
  transition: 0.5s linear;
  &:hover {
    transform: scale(1.2);
  }
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin: 0 auto 0 auto;
  padding: 0;
  overflow: hidden;
}
</style>
