<template>
  <form class="post">
    <p class="post__para" v-if="touche === true"></p>
    <input
      v-on:click="CreerMessage()"
      v-if="touche !== true"
      type="button"
      value="Nouveau Message"
      title="Nouveau Message."
      class="post__creer"
    />
    <div class="post__cadre" v-if="touche === true">
      <div class="post__cadre__grand">
        <div class="post__cadre__grand__champs">
          <input
            type="text"
            title="Ecrivez le titre."
            v-model="titre"
            name="titre"
            placeholder="Titre du message"
            class="post__cadre__grand__champs__input"
            required
          />
        </div>
        <div class="post__cadre__grand__champs">
          <textarea
            type="text"
            title="Ecrivez le texte ici."
            v-model="texte"
            name="texte"
            placeholder="Ecrivez votre texte ici."
            class="post__cadre__grand__champs__area"
            required
          ></textarea>
        </div>
        <div class="post__cadre__grand__champs">
          <input
            @change="imageMessage()"
            type="file"
            ref="file"
            name="file"
            id="file"
            title="Inserer une image."
            class="post__cadre__grand__champs__file"
          />
        </div>
      </div>
    </div>
    <input
      v-on:click="validerMessage()"
      v-if="touche === true"
      type="button"
      value="Valider Message"
      title="Valider le message."
      class="post__submit"
    />
    <input
      v-on:click="annule()"
      v-if="touche === true"
      type="button"
      value="Annuler"
      title="Annuler la demande de nouveau message."
      class="post__annule"
    />
  </form>
</template>

<script>
import axios from "axios";

export default {
  name: "NewMessage",
  data() {
    return {
      titre: "",
      texte: "",
      file: "",
      touche: "",
    };
  },
  methods: {
    CreerMessage() {
      this.touche = true;
    },
    annule() {
      this.touche = false;
    },
    imageMessage() {
      this.file = this.$refs.file.files[0];
    },
    validerMessage() {
      let oui = JSON.parse(sessionStorage.getItem("utilisateur"));
      if (this.titre === "" || this.texte === "") {
        return (document.querySelector(".post__para").innerHTML =
          "Remplissez Titre/Texte");
      }
      if (this.file.size >= 2621439) {
        return (document.querySelector(".post__para").innerHTML =
          "Fichier trop gros");
      }
      const data = new FormData();
      data.append("image", this.file);
      data.append(
        "message",
        JSON.stringify({ titre: this.titre, texte: this.texte })
      );
      axios
        .post("http://localhost:3000/api/messages", data, {
          headers: {
            Authorization: "Bearer " + oui.token,
          },
        })
        .then((res) => {
          console.log(res);
          //document.location.href = "/messages";
        })
        .catch((error) => {
          console.error(error.response.data);
        });
    },
  },
};
</script>

<style lang="scss">
.post {
  &__para {
    margin: 0;
  }
  &__creer {
    margin: 0 5px 10px 5px;
    background-color: white;
    border: 0px solid black;
    box-shadow: 1px 1px 3px black;
    font-size: 1rem;
    border-radius: 15px;
    width: 180px;
    height: 25px;
    &:hover {
      border: 0px solid black;
      box-shadow: 2px 2px 4px black;
    }
  }
  &__cadre {
    border-radius: 15%;
    box-shadow: 0px 0px 8px inset black;
    width: 50%;
    margin: auto;
    min-width: 220px;
    font-size: 1rem;
    animation: ouvre 0.3s linear forwards;
    transform: scaleY(0);
    @keyframes ouvre {
      0% {
        transform: scaleY(0);
      }
      100% {
        transform: scaleY(1);
      }
    }
    &__grand {
      padding: 15px 15px 5px 15px;
      opacity: 0;
      animation: inv 0.6s linear forwards;
      @keyframes inv {
        50% {
          opacity: 0;
        }
        100% {
          opacity: 1;
        }
      }
      &__champs {
        padding: 0 0 10px 0;
        margin: 5px;
        position: relative;
        &__input {
          text-align: center;
          border-radius: 20px;
          width: 80%;
          border: 1px solid rgb(200, 70, 130);
          box-shadow: 0px 0px 6px rgb(200, 70, 130);
          font-size: 0.8rem;
          padding: 5px;
        }
        &__area {
          text-align: center;
          border-radius: 15px;
          border-bottom-right-radius: 0px;
          min-width: 90%;
          max-width: 90%;
          border: 1px solid rgb(200, 70, 130);
          box-shadow: 0px 0px 6px rgb(200, 70, 130);
          font-size: 0.8rem;
          padding-top: 5px;
        }
      }
    }
  }
  &__submit {
    margin: 10px 5px 10px 5px;
    background-color: white;
    border: 0px solid black;
    box-shadow: 1px 1px 3px black;
    font-size: 1rem;
    border-radius: 15px;
    width: 180px;
    height: 25px;
    animation: bout 0.3s linear forwards;
    transform: translateX(100px);
    @keyframes bout {
      0% {
        transform: translateX(100px);
      }
      100% {
        transform: translateX(0px);
      }
    }
    &:hover {
      border: 0px solid black;
      box-shadow: 2px 2px 4px black;
    }
  }
  &__annule {
    margin: 5px 5px 10px 5px;
    background-color: white;
    border: 0px solid black;
    box-shadow: 1px 1px 3px black;
    font-size: 1rem;
    border-radius: 15px;
    width: 180px;
    height: 25px;
    animation: boutinv 0.3s linear forwards;
    transform: translateX(-100px);
    @keyframes boutinv {
      0% {
        transform: translateX(-100px);
      }
      100% {
        transform: translateX(0px);
      }
    }
    &:hover {
      border: 0px solid black;
      box-shadow: 2px 2px 4px black;
    }
  }
}
</style>
