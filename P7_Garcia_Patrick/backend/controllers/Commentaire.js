const db = require("../models");
const fs = require("fs");
const { error } = require("console");

//----------------------------------------------------------------------------------
// LOGIQUE create commentaire
//----------------------------------------------------------------------------------
exports.createCommentaire = (req, res, next) => {
  db.Message.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((message) => {
      if (!message) {
        return res.status(401).json({ error });
      }
      db.Commentaire.create({
        texte: req.body.texte,
        UserId: req.auth.userId,
        MessageId: req.params.id,
      })
        .then((Message) => res.send(Message))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(400).json({ error }));
};
//----------------------------------------------------------------------------------
// LOGIQUE tous les commentaire
//----------------------------------------------------------------------------------
exports.getAllCommentaire = (req, res, next) => {
  db.Commentaire.findAll({
    include: [
      {
        model: db.Message,
        attributes: ["id"],
      },
      {
        model: db.User,
        attributes: ["nom", "prenom", "service", "moderateur", "image", "id", "email"],
      },
    ],
    order: [["createdAt", "DESC"]],
  })
    .then((messages) => res.send(messages))
    .catch((error) => res.status(400).json({ error }));
};
//----------------------------------------------------------------------------------
// LOGIQUE efface commentaire
//----------------------------------------------------------------------------------
exports.deleteCommentaire = (req, res, next) => {
  db.Message.findOne({
    where: {
      id: req.params.id,
    },
  }).then((message) => {
    if (!message) {
      return res.status(401).json({ error });
    }
    db.Commentaire.findOne({
      where: {
        id: req.params.idcom,
        MessageId: req.params.id,
      },
    })
      .then((commentaire) => {
        if (!commentaire) {
          return res.status(401).json({ error });
        }
        db.User.findOne({
          where: {
            id: req.auth.userId,
          },
        })
          .then((user) => {
            if (!user) {
              return res.status(401).json({ error });
            }
            if (user.moderateur === true) {
              db.Commentaire.destroy({
                where: {
                  id: req.params.idcom,
                  messageId: req.params.id,
                },
              })
                .then(() =>
                  res.status(200).json({
                    message: "commentaire supprimé par la modération!",
                  })
                )
                .catch((error) => res.status(400).json({ error }));
            } else if (commentaire.userId === req.auth.userId) {
              db.Commentaire.destroy({
                where: {
                  id: req.params.idcom,
                  messageId: req.params.id,
                  userId: req.auth.userId,
                },
              })
                .then(() =>
                  res.status(200).json({ message: "commentaire supprimé !" })
                )
                .catch((error) => res.status(400).json({ error }));
            } else {
              return res.status(403).send("unauthorized request");
            }
          })
          .catch((error) =>
            res
              .status(400)
              .send({ error: "vous ne pouvez pas effacer ce message" })
          );
      })
      .catch((error) => res.status(400).json({ error }));
  });
};
