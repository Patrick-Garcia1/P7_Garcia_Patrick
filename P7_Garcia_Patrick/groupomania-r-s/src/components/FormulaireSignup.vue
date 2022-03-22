<template>
  <div class="zoneSignup">
    <p class="zoneSignup__aide">Inscription</p>
    <form method="get" class="zoneSignup__formulaire">
      <div class="zoneSignup__formulaire__champs">
        <label for="email">Champ email</label>
        <input
          type="email"
          name="email"
          title="Inscrivez votre email."
          v-model="email"
          id="email"
          placeholder="email"
          class="zoneSignup__formulaire__champs__input"
          required
        />
      </div>
      <div class="zoneSignup__formulaire__champs">
        <label for="mdp">Champ mot de passe</label>
        <input
          type="password"
          name="mdp"
          id="mdp"
          title="Inscrivez votre mot de passe."
          v-model="password"
          placeholder="Mot de passe"
          class="zoneSignup__formulaire__champs__input"
          required
        />
      </div>
      <div class="zoneSignup__formulaire__champs">
        <label for="service">Champ du Service</label>
        <select
          name="service"
          id="service"
          title="Inscrivez votre service."
          v-model="service"
          class="zoneSignup__formulaire__champs__input"
          required
        >
          <option
            v-for="item in list"
            :key="item"
            class="zoneSignup__formulaire__champs__input--option"
          >
            {{ item }}
          </option>
        </select>
      </div>
      <div class="zoneSignup__formulaire__champs">
        <label for="nom">Champ du Nom</label>
        <input
          type="text"
          name="nom"
          id="nom"
          title="Inscrivez votre nom."
          v-model="nom"
          placeholder="Nom"
          class="zoneSignup__formulaire__champs__input"
          required
        />
      </div>
      <div class="zoneSignup__formulaire__champs">
        <label for="prenom">Champ du Prénom</label>
        <input
          type="text"
          name="prenom"
          id="prenom"
          title="Inscrivez votre prénom."
          v-model="prenom"
          placeholder="Prénom"
          class="zoneSignup__formulaire__champs__input"
          required
        />
      </div>
      <input
        type="submit"
        v-on:click="inscription"
        value="Valider"
        title="Validez votre inscription."
        id="login"
        class="zoneSignup__formulaire__champs__soumi"
      />
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "FormulaireSignup",
  data() {
    return {
      password: "",
      email: "",
      nom: "",
      prenom: "",
      service: "",
    };
  },
  props: {
    list: {
      type: Array,
      default: () => [
        "Logistique",
        "Direction",
        "Comptabilité",
        "Après-vente",
        "Renseignement",
      ],
    },
  },
  methods: {
    inscription(e) {
      e.preventDefault();
      // mon adresse doit avoir cette forme pour que je puisse la valider
      let regEmailMatch = this.email.match(
        /^[a-zA-Z0-9.çæœ!#$%&’*+/=?^_`{|}~"(),:;<>[\]-]+@([a-zA-Z0-9-]+\.)+[\w-]{2,4}$/
      );
      // quand le resultat sera correct, le console log affichera une autre réponse que null
      if (regEmailMatch == null) {
        return (document.querySelector(".zoneSignup__aide").innerHTML =
          "Forme email incorrecte");
      }
      let pass = this.password.match(
        /^((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,20})$/
      );
      if (pass == null) {
        return (document.querySelector(".zoneSignup__aide").innerHTML =
          "Le mot de passe contient majuscule, minuscule, chiffre, caractère spécial ainsi que :<br> caractère min: 8, max: 20");
      }
      let serve = this.service;
      if (serve == null || serve == undefined || serve == "") {
        return (document.querySelector(".zoneSignup__aide").innerHTML =
          "Choisissez un service");
      }
      let leNom = this.nom.search(
        /^[a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ\s-]{1,31}$/i
      );
      let lePrenom = this.prenom.search(
        /^[a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ\s-]{1,31}$/i
      );
      if (leNom != 0 || lePrenom != 0) {
        return (document.querySelector(".zoneSignup__aide").innerHTML =
          "Erreur nom/prénom <br> Seuls les caratères normaux sont autorisés");
      }

      axios
        .post("http://localhost:3000/api/auth/signup", {
          password: this.password,
          email: this.email,
          nom: this.nom,
          prenom: this.prenom,
          service: this.service,
        })
        .then(() => {
          document.location.href = "/login";
        })
        .catch(() => {
          return (document.querySelector(".zoneSignup__aide").innerHTML =
            "L'email est déjà enregistré");
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.zoneSignup {
  background-color: black;
  width: 60%;
  min-width: 260px;
  margin: 20px auto 20px auto;
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
        &--option {
          text-align: center;
        }
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
