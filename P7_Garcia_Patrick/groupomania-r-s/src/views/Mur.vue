<template>
<!-- page du mur de messages -->
  <div class="mur">
    <!-- composant Messages -->
    <Messages />
  </div>
</template>

<script>
// @ is an alias to /src
import Messages from "@/components/Messages.vue";

export default {
  name: "Mur",
  components: {
    Messages,
  },
};
</script>
<style scoped lang="scss">
.mur {
  margin-top: 75px;
  min-height: 84vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
