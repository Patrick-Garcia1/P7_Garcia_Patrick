<template>
  <div class="message">
    <!-- composant NewMessage -->
    <NewMessage />
    <!-- liste des messages -->
    <div
      class="message__list"
      v-for="message in messages"
      v-bind:key="message.id"
    >
      <!-- bouton efface message -->
      <div
        v-on:click="EffacerMessage(message.id)"
        v-if="quiId === message.UserId || moderateur === true"
        type="button"
        title="Effacer le message."
        class="message__list--effacebtn"
      >
        <p class="message__list--effacebtn--icone">X</p>
      </div>
      <div class="message__list__user">
        <!-- composant Nouveau -->
        <Nouveau
          v-if="date_deco <= message.createdAt && message.UserId != quiId"
        />
        <!-- entête message -->
        <p class="message__list__user__nom" v-if="message.User != null">
          {{ message.User.nom }}
          {{ message.User.prenom }} <span class="message__list__user__nom__icon">☺</span> Contact: {{ message.User.email }}
        </p>
        <p class="message__list__user__nom" v-else>
           Utilisateur Supprimé
        </p>
        <div class="message__list__user__contour" v-if="message.User != null">
          <img
            loading="lazy"
            :src="message.User.image"
            v-if="message.User != null"
            class="message__list__user__contour__image"
            v-bind:alt="`${message.User.nom}` + ' ' + `${message.User.prenom}` + '.'"
            width="40px"
            height="40px"
          />
        </div>
        <p class="message__list__user__para" v-if="message.User != null">
          ► {{ message.User.service }}
        </p>
        <p class="message__list__user__para" v-else>Message conservé</p>
      </div>
      <!-- zone message -->
      <p class="message__list__titre">{{ message.titre }}</p>
      <img
        loading="lazy"
        :src="message.contenuMultimedia"
        v-if="message.contenuMultimedia !== null"
        class="message__list__image"
        v-bind:alt="'Contenu multimedia ' + `${message.User.nom}` + ' ' + `${message.User.prenom}` + '.'"
        width="350px"
        height="350px"
      />
      <p class="message__list__texte" v-if="message.texte !== ''">{{ message.texte }}</p>
      <!-- zone commentaire -->
      <div class="message__commentaire">
        <p class="message__commentaire__para">Commentaires</p>
        <div class="message__commentaire__affiche">
        <!-- liste des commentaires -->
          <div
            class="message__commentaire__affiche__unique"
            v-for="commentaire in commentaires.filter((commentaire) => {
              return commentaire.messageId == message.id;
            })"
            v-bind:key="commentaire.id"
          > 
            <!-- composant Nouveau -->
            <Nouveau
              v-if="
                date_deco <= commentaire.createdAt &&
                commentaire.UserId != quiId
              "
            />
            <!-- bouton efface commentaire -->
            <div
              v-on:click="
                EffacerCommentaire(commentaire.messageId, commentaire.id)
              "
              v-if="quiId === commentaire.UserId || moderateur === true"
              type="button"
              title="Effacer le commentaire."
              class="message__commentaire__affiche--effacebtn"
            >
              <p class="message__commentaire__affiche--effacebtn--icone">
               X 
              </p>
            </div>
            <div
              class="message__commentaire__affiche__unique__contour"
              v-if="message.User != null"
            >
              <img
                loading="lazy"
                :src="commentaire.User.image"
                v-if="commentaire.User != null"
                class="message__commentaire__affiche__unique__contour--image"
                v-bind:alt="'Photo profil de ' + `${commentaire.User.nom}` + ' ' + `${commentaire.User.prenom}` + '.'" 
                width="30px"
                height="30px"
              />
            </div>
            <!-- entête commentaire -->
            <p
              class="message__commentaire__affiche__user"
              v-if="commentaire.User != null"
            >
              {{ commentaire.User.nom }} 
              {{ commentaire.User.prenom }} <span class="message__commentaire__affiche__user__icon">☺</span> Contact: {{ commentaire.User.email }} 
            </p>
            <p
              class="message__commentaire__affiche__user"
              v-if="commentaire.User != null"
            >
             ► {{ commentaire.User.service }}
            </p>
            <p class="message__commentaire__affiche__user" v-else>
               Utilisateur Supprimé
            </p>
            <p class="message__commentaire__affiche__para">
              {{ commentaire.texte }}
            </p>
          </div>
        </div>
      </div>
      <!-- zone ajout commentaire -->
      <form class="comment">
        <input
          v-on:click="validerCommentaire(message.id)"
          type="button"
          value="Commentez"
          title="Valider le commentaire."
          class="comment__submit"
        />
        <div class="comment__cadre">
          <div class="comment__cadre__grand">
            <div class="comment__cadre__grand__champs">
              <!-- création id unique entre label et "input/textarea/..." -->
              <label v-show="labelcom == true" v-bind:for="`${message.User.nom}${message.User.prenom}${message.createdAt}`" class="comment__cadre__grand__champs__label">Commentez</label>
              <textarea
                type="text"
                title="Ecrivez le commentaire ici."
                v-bind:id="`${message.User.nom}${message.User.prenom}${message.createdAt}`" 
                v-model="texteCom"
                name="texte"
                placeholder="Ecrivez votre commentaire ici."
                class="comment__cadre__grand__champs__area"
                required
              ></textarea>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import NewMessage from "@/components/NewMessage.vue";
import Nouveau from "@/components/Nouveau.vue";

export default {
  name: "Messages",
  components: {
    NewMessage,
    Nouveau,
  },
  data() {
    return {
      messages: [],
      commentaires: [],
      quiId: "",
      moderateur: "",
      texteCom: "",
      date_deco: "",
      labelcom: "",
    };
  },
  methods: {
    //----------------------------
    // Logique efface message
    //----------------------------
    EffacerMessage(idMessage) {
      let qui = JSON.parse(sessionStorage.getItem("utilisateur"));

      axios
        .delete(`http://localhost:3000/api/messages/${idMessage}`, {
          headers: {
            Authorization: "Bearer " + qui.token,
          },
        })
        .then(() => {
          document.location.href = "/messages";
        })
        .catch((error) => {
          console.error(error.response.data);
        });
    },
    //----------------------------
    // Logique post message
    //----------------------------
    validerCommentaire(idMessage) {
      let oui = JSON.parse(sessionStorage.getItem("utilisateur"));
      if (this.texteCom === "") {
        return console.log("message vide");
      }
      let messageNew = { texte: this.texteCom };
      axios
        .post(`http://localhost:3000/api/messages/${idMessage}`, messageNew, {
          headers: {
            Authorization: "Bearer " + oui.token,
          },
        })
        .then(() => {
          document.location.href = "/messages";
        })
        .catch((error) => {
          console.error(error.response.data);
        });
    },
    //----------------------------
    // Logique efface commentaire
    //----------------------------
    EffacerCommentaire(idMessage, idCommentaire) {
      let qui = JSON.parse(sessionStorage.getItem("utilisateur"));

      axios
        .delete(
          `http://localhost:3000/api/messages/${idMessage}/${idCommentaire}`,
          {
            headers: {
              Authorization: "Bearer " + qui.token,
            },
          }
        )
        .then(() => {
          document.location.href = "/messages";
        })
        .catch((error) => {
          console.error(error.response.data);
        });
    },
  },
  //----------------------------
    // Logique à l'affichage des messages une fois "montée"
    //----------------------------
  mounted() {
    let qui = JSON.parse(sessionStorage.getItem("utilisateur"));
    this.quiId = qui.userId;
    this.date_deco = qui.date_deco;
    this.moderateur = qui.moderateur;
    this.labelcom = false;
    axios
      .get("http://localhost:3000/api/messages", {
        headers: {
          Authorization: "Bearer " + qui.token,
        },
      })
      .then((res) => {
        this.messages = res.data;
      })
      .catch((error) => {
        console.error(error.response.data);
      });
    //----------------------------
    // Logique à l'affichage des commentaires
    //----------------------------
    axios
      .get("http://localhost:3000/api/messages/commentaires", {
        headers: {
          Authorization: "Bearer " + qui.token,
        },
      })
      .then((res) => {
        this.commentaires = res.data;
      })
      .catch((error) => {
        console.error(error.response.data);
      });
  },
};
</script>

<style lang="scss">
.blanc {
  color: blanc;
}
.message {
  width: 90%;
  margin: 20px auto 20px auto;
  padding: 20px;
  @media screen and (max-width: 700px) {
    width: 95%;
    padding: 5px 0 0 0;
  }
  &__list {
    position: relative;
    margin: 10px auto 30px auto;
    padding-top: 1px;
    padding-bottom: 1px;
    box-shadow: 4px 4px 8px black;
    width: 80%;
    max-width: 600px;
    @media screen and (max-width: 700px) {
      width: 95%;
    }
    &--effacebtn {
      position: absolute;
      z-index: 1;
      position: absolute;
      top: -3px;
      left: -5px;
      width: 30px;
      height: 30px;
      background-color: rgb(200, 70, 130);
      color: black;
      border: 2px solid white;
      border-radius: 50% 50% 50% 50% / 67% 67% 33% 33%;
      transition: 0.1s transform linear;
      &--icone {
        position: absolute;
        top: -8px;
        left: 10px;
      }
      &:hover {
        cursor: grab;
        transform: scale(1.3);
      }
    }
    &__titre {
      margin-top: 2px;
      padding: 5px 0 5px 0;
      text-align: center;
      text-indent: 20px;
      border-top: 2px solid black;
      box-shadow: 2px 2px 3px black;
      font-family: "Chakra Petch", sans-serif;
      font-size: 1.2rem;
      font-weight: 700;
    }
    &__texte {
      margin: 5px 5px 15px 5px;
      padding: 20px;
      text-align: left;
      border-radius: 20px;
      min-height: 30px;
      font-size: 1.1rem;
      font-weight: 500;
      font-family: "Quicksand", sans-serif;
    }
    &__user {
      margin: 0px 0px 0 0px;
      border-right: 1px solid white;
      border-top: 1px solid white;
      position: relative;
      box-shadow: 0px 0px 5px 4px inset rgb(200, 70, 130);
      background-color: black;
      color: white;
      font-size: 1rem;
      &__para {
        text-align: right;
        margin: 0;
        padding: 0 10px 5px 0px;
        font-family: "Chakra Petch", sans-serif;
        font-size: 1.1rem;
        font-weight: 300;
      }
      &__nom {
        text-align: center;
        font-weight: 500;
        font-size: 1.1rem;
        margin: 0 5px 0 0;
        padding: 0px 0 0px 50px;
        font-family: "Chakra Petch", sans-serif;
        &__icon{
          font-size: 1.5rem;
        }
      }
      &__contour {
        position: absolute;
        top: 40px;
        left: 5px;
        height: 40px;
        width: 40px;
        border-radius: 50%;
        box-shadow: 2px 2px 12px black;
        background: linear-gradient(180deg, rgb(200, 70, 130) 30%, black 100%);
        transition: 0.1s transform linear;
        &:hover {
          transform: scale(2);
          z-index: 2;
        }
        &__image {
          border-radius: 20px;
          width: 100%;
          height: 40px;
          object-fit: cover;
        }
      }
    }
    &__image {
      margin: 10px;
      width: 60vw;
      min-width: 220px;
      min-height: 220px;
      max-width: 350px;
      max-height: 350px;
      object-fit: cover;
      border: 1px solid black;
      border-radius: 10px;
      box-shadow: 1px 1px 2px black;
    }
  }

  &__commentaire {
    width: 98%;
    margin: 0px auto 0px auto;
    border-top: 1px solid rgb(200, 70, 130);

    color: black;
    &__para {
      padding: 2px 5px 2px 5px;
      margin: 0;
      border-bottom: 1px solid rgb(200, 70, 130);
      &:hover {
        cursor: default;
      }
    }
    &__affiche {
      position: relative;
      display: flex;
      flex-direction: Column-reverse;
      justify-content: space-evenly;
      background-color: white;
      margin: auto;
      color: black;
      width: 95%;
      &--effacebtn {
        position: absolute;
        z-index: 1;
        left: -25px;
        bottom: -5px;
        width: 30px;
        height: 30px;
        background-color: rgb(200, 70, 130);
        color: black;
        border: 2px solid white;
        border-radius: 88% 100% 100% 100% / 100% 1% 100% 100%;
        transition: 0.1s transform linear;
        &--icone {
          position: absolute;
          top: -10px;
          left: 10px;
        }
        &:hover {
          cursor: grab;
          transform: scale(1.3);
        }
      }
      &__para {
        margin: 8px;
        text-align: left;
        font-family: "Chakra Petch", sans-serif;
        font-weight: 200;
      }
      &__user {
        text-align: left;
        text-indent: 5px;
        padding-right: 20px;
        margin: 0;
        border-radius: 8px;
        border-bottom: 1px dotted white;
        border-top: 1px dotted white;
        background-color: black;
        color: white;
        font-family: "Chakra Petch", sans-serif;
        font-weight: 200;
        text-align: right;
        &__icon{
          
        }
      }
      &__unique {
        position: relative;
        border-right: 5px solid rgb(200, 70, 130);
        border-left: 5px solid rgb(200, 70, 130);
        box-shadow: 2px 2px 4px black;
        margin: 15px 5px 10px 20px;
        padding: 0;
        border-radius: 10px;

        &__contour {
          z-index: 1;
          position: absolute;
          top: 5px;
          left: -25px;
          box-shadow: 3px 3px 8px black;
          height: 30px;
          width: 30px;
          border-radius: 50%;
          &:hover {
            animation: grand 0.2s linear forwards;
            @keyframes grand {
              0% {
                transform: scale(1);
              }
              100% {
                transform: scale(2);
              }
            }
          }
          &--image {
            background-color: black;
            border-radius: 20px;
            width: 100%;
            height: 30px;
            object-fit: cover;
          }
        }
      }
    }
  }
}

.comment {
  width: 98%;
  margin: auto;
  padding-top: 5px;
  border-top: 1px dotted black;
  &__cadre {
    margin-bottom: 5px;
    width: 100%;
    font-size: 1rem;

    &__grand {
      padding: 5px 10px 3px 5px;
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
        padding: 0;
        margin: 0;
        &__area {
          text-align: center;
          border-radius: 15px;
          border-bottom-right-radius: 0px;
          min-width: 90%;
          max-width: 90%;
          border: 1px solid rgb(200, 70, 130);
          box-shadow: 0px 0px 6px rgb(200, 70, 130);
          font-size: 0.7rem;
          height: 12px;
        }
      }
    }
  }
  &__submit {
    margin: 5px 5px 0px 5px;
    background-color: white;
    border: 0px solid black;
    box-shadow: 1px 1px 3px black;
    font-size: 1rem;
    border-radius: 15px;
    width: 120px;
    height: 20px;
    &:hover {
      border: 0px solid black;
      box-shadow: 2px 2px 4px black;
    }
  }
}
</style>
