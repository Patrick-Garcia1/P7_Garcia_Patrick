<template>
  <div class="zoneLogin">
    <p class="zoneLogin__aide">Connexion</p>
    <form method="get" class="zoneLogin__formulaire">
      <div class="zoneLogin__formulaire__champs">
        <label for="email">Champ email</label>
        <input
          v-model="email"
          type="email"
          name="email"
          id="email"
          placeholder="email"
          title="Inscrivez votre email."
          class="zoneLogin__formulaire__champs__input"
          required
        />
      </div>
      <div class="zoneLogin__formulaire__champs">
        <label for="mdp">Champ mot de passe</label>
        <input
          v-model="password"
          type="password"
          name="mdp"
          id="mdp"
          minlength="8"
          maxlength="20"
          placeholder="Mot de passe"
          title="Inscrivez votre mot de passe."
          class="zoneLogin__formulaire__champs__input"
          required
        />
      </div>
      <input
        v-on:click="connection"
        type="submit"
        value="Valider"
        title="Valider la connection."
        id="valider"
        class="zoneLogin__formulaire__champs__soumi"
      />
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "FormulaireLogin",
  data() {
    return {
      password: "",
      email: "",
    };
  },
  computed: {},
  methods: {
    connection(e) {
      e.preventDefault();
      if (this.password === "" || this.email === "") {
        return (document.querySelector(".zoneLogin__aide").innerHTML =
          "Identifiants incorrects");
      }
      axios
        .post("http://localhost:3000/api/auth/login", {
          password: this.password,
          email: this.email,
        })
        .then((res) => {
          //this.$store.state.utilisateur.userId = res.data.userId;
          //this.$store.state.utilisateur.moderateur = res.data.moderateur;
          //this.$store.state.utilisateur.token = res.data.token;

          let qui = {};
          qui.userId = res.data.userId;
          qui.moderateur = res.data.moderateur;
          qui.token = res.data.token;
          qui.email = res.data.email;
          qui.image = res.data.image;
          qui.date_deco = res.data.date_deco;
          sessionStorage.utilisateur = JSON.stringify(qui);
          document.location.href = "/messages";
        })
        .catch((error) => {
          if (error.message.match("429")) {
            return (document.querySelector(".zoneLogin__aide").innerHTML =
              "Trop de tentatives! <br> Contactez un administrateur");
          }
          return (document.querySelector(".zoneLogin__aide").innerHTML =
            "Identifiants incorrects");
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.zoneLogin {
  background-color: black;
  width: 60%;
  min-width: 260px;
  margin: 0 auto 0 auto;
  padding: 0 0 16px 0;
  border-radius: 18px;
  animation: zoop 0.3s linear;
  @keyframes zoop {
    0% {
      transform: scale3d(0.95, 0.95, 1);
    }
    100% {
      transform: scale3d(1, 1, 1);
    }
  }
  @media screen and (min-width: 520px) {
    width: 312px;
  }
  &__aide {
    margin: 0;
    font-size: 1.1rem;
    color: rgb(200, 70, 130);
    padding-top: 8px;
    padding-bottom: 8px;
  }
  &__formulaire {
    padding: 10px 0 10px 0;
    background-color: white;
    border-left: 2px solid rgb(200, 70, 130);
    border-right: 2px solid rgb(200, 70, 130);
    &__champs {
      width: 60%;
      min-width: 255px;
      margin: auto;
      color: black;
      font-size: 1.2rem;
      &__input {
        border: 1px solid black;
        box-shadow: 0px 0px 2px black;
        text-align: center;
        width: 90%;
        min-width: 200px;
        font-size: 1.2rem;
        margin-bottom: 10px;
      }
      &__soumi {
        border: 0px solid black;
        box-shadow: 1px 1px 3px black;
        background-color: white;
        font-size: 1rem;
        border-radius: 15px;
        width: 40%;
        height: 30px;
        &:hover {
          border: 0px solid black;
          box-shadow: 2px 2px 4px black;
        }
      }
    }
  }
}
</style>
