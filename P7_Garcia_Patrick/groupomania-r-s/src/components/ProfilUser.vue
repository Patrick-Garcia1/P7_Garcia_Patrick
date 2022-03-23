<template>
  <!-- zone utilisateur -->
  <div class="profil">
    <!-- zone information utilisateur -->
    <div class="profil__User" v-if="modif !== true">
      <!-- bouton d'accés zone modification utilisateur -->
      <input
        v-on:click="appui"
        type="button"
        id="modifProfil"
        title="Cliquez ici pour modifier votre profil."
        value="Modifier profil"
        class="profil__User__modif"
      />
      <!-- image profil utilisateur -->
      <div class="profil__User__bordure">
        <div class="profil__User__bordure__cadre">
          <img
            loading="lazy"
            :src="dataUser.image"
            v-bind:alt="`${dataUser.nom}` + ' ' + `${dataUser.prenom}` + '.'"
            class="profil__User__bordure__cadre__image"
            height="100px"
            width="100px"
          />
        </div>
      </div>
      <p>Nom: {{ dataUser.nom }}</p>
      <p>Prénom: {{ dataUser.prenom }}</p>
      <p v-if="dataUser.moderateur === true">Statut de Modérateur</p>
      <p>Service: {{ dataUser.service }}</p>
      <p>Email: {{ dataUser.email }}</p>
      <p>Inscrit le: {{ dataUser.createdAt }}</p>
      <div class="profil__User__formulaire__champs">
        <!-- bouton efface profil utilisateur -->
        <input
          v-on:click="efface"
          type="submit"
          id="effaceProfil"
          title="Cliquez ici pour effacer votre profil."
          value="Effacer profil"
          class="profil__User__formulaire__champs__soumi"
        />
        <!-- champ mot de passe pour suppression profil -->
        <div>
          <label for="mdpEfface">Mot de passe actuel</label>
          <input
            type="password"
            name="mdpEfface"
            title="Renseignez votre mot de passe si vous voulez effacer le profil."
            id="mdpEfface"
            v-model="mdpEfface"
            placeholder="Mot de passe"
            class="profil__User__formulaire__champs__input"
            required
          />
        </div>
      </div>
    </div>
    <!-- zone modification profil-->
    <div class="profil__User" v-if="modif === true">
      <p>Modification Profil :</p>
      <!-- formulaire modification utilisateur -->
      <form class="profil__User__formulaire">
        <!-- champ mot de passe actuel pour vérification utilisateur -->
        <div class="profil__User__formulaire__champs">
          <label for="mdp">Mot de passe actuel</label>
          <input
            type="password"
            name="mdp"
            title="Renseignez votre mot de passe si vous voulez faire des modifications de profil."
            id="mdp"
            v-model="password"
            placeholder="Mot de passe"
            class="profil__User__formulaire__champs__input"
            required
          />
        </div>
        <!-- champ changement mot de passe -->
        <div class="profil__User__formulaire__champs">
          <!-- champ nouveau mot de passe -->
          <label for="new_password">Nouveau mot de passe</label>
          <input
            type="password"
            name="new_password"
            title="Inscrivez ici votre nouveau mot de passe si vous voulez en changer."
            id="new_password"
            v-model="new_password"
            placeholder="Nouveau"
            class="profil__User__formulaire__champs__input"
          />
          <!-- champ vérification nouveau mot de passe -->
          <label for="new_password_bis">Vérification</label>
          <input
            type="password"
            name="mdp"
            title="Vérification du mot de passe choisi."
            id="new_password_bis"
            v-model="new_password_bis"
            placeholder="Vérification"
            class="profil__User__formulaire__champs__input"
          />
        </div>
        <!-- champ changement de donnée utilisateur -->
        <div class="profil__User__formulaire__champs">
          <!-- champ nom -->
          <label for="nom">Changement de nom</label>
          <input
            type="text"
            name="nom"
            title="Changement de nom."
            id="nom"
            v-model="nom"
            placeholder="Nom"
            class="profil__User__formulaire__champs__input"
          />
          <!-- champ prénom -->
          <label for="prenom">Changement de prénom</label>
          <input
            type="text"
            name="prenom"
            title="Changement de prénom."
            id="prenom"
            v-model="prenom"
            placeholder="Prénom"
            class="profil__User__formulaire__champs__input"
          />
          <!-- champ email -->
          <label for="email">Changement d'email</label>
          <input
            type="email"
            name="email"
            v-model="email"
            title="Changement d'email."
            id="email"
            placeholder="email"
            class="profil__User__formulaire__champs__input"
          />
          <!-- champ service -->
          <label for="service">Changement de Service</label>
          <select
            name="service"
            id="service"
            v-model="service"
            title="Changement de service."
            class="profil__User__formulaire__champs__input"
          >
            <option
              v-for="item in list"
              :key="item"
              class="profil__User__formulaire__champs__input--option"
            >
              {{ item }}
            </option>
          </select>
          <!-- champ image de profil -->
          <label for="photoUser">Changement de photo</label>
          <input
            name="photoUser"
            @change="imageProfil()"
            type="file"
            ref="file"
            id="photoUser"
            title="Changement de photo de profil."
            class="profil__User__formulaire__champs__input"
          />
        </div>
        <!-- champ du renseignement -->
        <p class="profil__User__formulaire__champs__p">
          Renseigner le mot de passe actuel puis renseigner le(s) champ(s) que
          vous voulez modifier.
        </p>
        <!-- bouton soumission changement de donnée profil utilisateur -->
        <input
          type="submit"
          v-on:click="modification"
          value="Valider"
          title="Validez vos modifications de profil."
          id="modif"
          class="profil__User__formulaire__champs__soumi"
        />
        <!-- bouton annulation soumission changement de donnée profil utilisateur -->
        <input
          type="button"
          v-on:click="annuleModification"
          value="Annuler"
          title="Annulez vos modifications de profil."
          id="annulModif"
          class="profil__User__formulaire__champs__soumi"
        />
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ProfilUser",
  data() {
    return {
      modif: "",
      dataUser: [],
      password: "",
      new_password: "",
      new_password_bis: "",
      email: "",
      nom: "",
      prenom: "",
      service: "",
      file: "",
      mdpEfface: "",
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
    //----------------------------
    // Logique affichage accés modification profil
    //----------------------------
    appui() {
      this.modif = true;
    },
    //----------------------------
    // Logique affichage annulation modification profil
    //----------------------------
    annuleModification() {
      this.modif = false;
    },
    //----------------------------
    // Logique d'affectation de valeur du champ file
    //----------------------------
    imageProfil() {
      this.file = this.$refs.file.files[0];
    },
    //----------------------------
    // Logique modification utilisateur
    //----------------------------
    modification(e) {
      e.preventDefault();
      if (this.password === "") {
        return (document.querySelector(".profil__User__formulaire__champs__p").innerHTML =
          "Remplissez le champ du mot de passe actuel");
      } else {
        document.querySelector(".profil__User__formulaire__champs__p").innerHTML =
          "Mot de passe rempli";
      }
      let pass = this.password.match(
        /^((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,20})$/
      );
      if (pass === null) {
        return (document.querySelector(".profil__User__formulaire__champs__p").innerHTML =
          "Forme du mot de passe incorrecte");
      }
      if (this.new_password !== "") {
        let pass1 = this.new_password.match(
          /^((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,20})$/
        );
        if (pass1 === null) {
          return (document.querySelector(".profil__User__formulaire__champs__p").innerHTML =
            "Le nouveau mot de passe doit contenir majuscule, minuscule, chiffre, caractère spécial ainsi que :<br> caractère min: 8, max: 20");
        }
        if (this.new_password_bis !== this.new_password) {
          return (document.querySelector(".profil__User__formulaire__champs__p").innerHTML =
            "Erreur dans la vérification du mot de passe");
        } else {
          document.querySelector(".profil__User__formulaire__champs__p").innerHTML =
            "Modification mot de passe correcte";
        }
      }
      if (this.nom !== "") {
        let leNom = this.nom.search(
          /^[a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ\s-]{1,31}$/i
        );
        if (leNom != 0) {
          return (document.querySelector(".profil__User__formulaire__champs__p").innerHTML =
            "Erreur nom/prénom, seuls les caratères normaux sont autorisés");
        }
      }
      if (this.prenom !== "") {
        let lePrenom = this.prenom.search(
          /^[a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ\s-]{1,31}$/i
        );
        if (lePrenom != 0) {
          return (document.querySelector(".profil__User__formulaire__champs__p").innerHTML =
            "Erreur nom/prénom, seuls les caratères normaux sont autorisés");
        }
      }
      if (this.email !== "") {
        let regEmailMatch = this.email.match(
          /^[a-zA-Z0-9.çæœ!#$%&’*+/=?^_`{|}~"(),:;<>[\]-]+@([a-zA-Z0-9-]+\.)+[\w-]{2,4}$/
        );
        if (regEmailMatch == null) {
          return (document.querySelector(".profil__User__formulaire__champs__p").innerHTML =
            "Forme email incorrecte");
        }
      }
      if (this.file.size >= 2621439) {
        return (document.querySelector(".profil__User__formulaire__champs__p").innerHTML =
          "Le fichier ne doit pas dépasser 2.5Mo");
      }

      let qui = JSON.parse(sessionStorage.getItem("utilisateur"));
      const dataPro = new FormData();
      dataPro.append("image", this.file);
      dataPro.append(
        "account",
        JSON.stringify({
          password: this.password,
          email: this.email,
          nom: this.nom,
          prenom: this.prenom,
          service: this.service,
          new_password: this.new_password,
          new_password_bis: this.new_password_bis,
        })
      );

      axios
        .put("http://localhost:3000/api/auth/MAJ", dataPro, {
          headers: {
            Authorization: "Bearer " + qui.token,
          },
        })
        .then(() => {
          document.location.href = "/profil";
        })
        .catch((error) => {
          console.error(error.response.data);

          return (document.querySelector(".profil__User__formulaire__champs__p").innerHTML =
            "Une erreur s'est produite, vérifiez votre mot de passe");
        });
    },
    //----------------------------
    // Logique suppression utilisateur
    //----------------------------
    efface() {
      const passwordR = this.mdpEfface;
      let qui = JSON.parse(sessionStorage.getItem("utilisateur"));
      axios
        .delete("http://localhost:3000/api/auth/MAJ", {
          data: {
            password: passwordR,
          },
          headers: {
            Authorization: "Bearer " + qui.token,
          },
        })
        .then(() => {
          document.location.href = "/";
        })
        .catch(() => {
          return (document.querySelector(
            ".profil__User__formulaire__champs label"
          ).innerHTML = "Vous ne pouvez pas effacer le profil actuellement");
        });
    },
  },
  //----------------------------
  // Logique d'affichage utilisateur après "montage"
  //----------------------------
  mounted() {
    let oui = JSON.parse(sessionStorage.getItem("utilisateur"));
    axios
      .get("http://localhost:3000/api/auth/userProfil", {
        headers: {
          Authorization: "Bearer " + oui.token,
        },
      })
      .then((res) => {
        this.dataUser = res.data;
        this.dataUser.createdAt = this.dataUser.createdAt.split("T")[0];
        let jour = this.dataUser.createdAt.split("-")[2];
        let mois = this.dataUser.createdAt.split("-")[1];
        let annee = this.dataUser.createdAt.split("-")[0];
        this.dataUser.createdAt = jour + " " + mois + " " + annee;
      })
      .catch((error) => {
        document.location.href = "/logout";
        console.error(error.response.data);
      });
  },
};
</script>

<style scoped lang="scss">
.profil {
  display: flex;
  justify-content: space-around;
  align-items: center;
  min-height: 80vh;
  box-shadow: 0px 0px 8px inset black;
  border: 3px solid rgb(200, 70, 130);
  border-radius: 30px;
  margin: 95px 0 20px 0;
  animation: zoop 0.3s linear;
  width: 90%;
  @media screen and (min-width: 700px) {
    width: 60%;
  }
  @keyframes zoop {
    0% {
      transform: scale3d(0.95, 0.95, 1);
    }
    100% {
      transform: scale3d(1, 1, 1);
    }
  }
  &__User {
    font-size: 1.1rem;
    width: 60%;
    min-width: 260px;
    @media screen and (min-width: 520px) {
      width: 312px;
    }
    @media screen and (max-width: 1023px) {
      margin: 0 auto 0 auto;
    }
    &__modif {
      margin: 10px 5px 10px 5px;
      background-color: white;
      border: 0px solid black;
      box-shadow: 1px 1px 3px black;
      font-size: 1rem;
      border-radius: 15px;
      width: 50%;
      height: 30px;
    }
    &__bordure {
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin: 10px auto 30px auto;
      height: 110px;
      width: 110px;
      border-radius: 50%;
      background: linear-gradient(100deg, rgb(200, 70, 130) 40%, black 90%);
      &__cadre {
        border: 2px solid white;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        overflow: hidden;
        &__image {
          width: 100px;
          height: 100px;
          object-fit: cover;
        }
      }
    }
    &__formulaire {
      padding: 0;
      border-radius: 20px;
      margin: auto;
      width: 90%;
      &__champs {
        border: 2px dashed rgb(200, 70, 130);
        border-radius: 15px;
        width: 85%;
        padding: 10px 0 10px 0;
        margin: 5px auto 5px auto;
        color: black;
        font-size: 1.1rem;
        &__input {
          border: 1px solid black;
          box-shadow: 0px 0px 2px inset black;
          text-align: center;
          max-width: 80%;
          min-width: 180px;
          font-size: 1rem;
          margin: 8px;
          &--option {
            text-align: center;
          }
        }
        &__soumi {
          margin: 10px 5px 10px 5px;
          background-color: white;
          border: 0px solid black;
          box-shadow: 1px 1px 3px black;
          font-size: 1rem;
          border-radius: 15px;
          width: 50%;
          height: 30px;
          &:hover {
            border: 0px solid black;
            box-shadow: 2px 2px 4px black;
          }
        }
      }
    }
  }
}
</style>
