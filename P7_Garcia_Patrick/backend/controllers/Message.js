const db = require("../models");
const fs = require("fs");
const { error } = require("console");

//----------------------------------------------------------------------------------
// LOGIQUE tous les messages
//----------------------------------------------------------------------------------
exports.getAllMessage = (req, res, next) => {
  db.Message.findAll({
    include: [
      {
        model: db.User,
        attributes: ["nom", "prenom", "service", "moderateur", "image", "email"],
      },
    ],
    order: [["createdAt", "DESC"]],
  })
    .then((messages) => res.send(messages))
    .catch((error) => res.status(400).json({ error }));
};
//----------------------------------------------------------------------------------
// LOGIQUE create message
//----------------------------------------------------------------------------------
exports.createMessage = (req, res, next) => {
  let post = JSON.parse(req.body.message);
  if (req.file) {
    if (
      req.file.mimetype === "image/jpeg" ||
      req.file.mimetype === "image/png" ||
      req.file.mimetype === "image/jpg" ||
      req.file.mimetype === "image/bmp" ||
      req.file.mimetype === "image/gif" ||
      req.file.mimetype === "image/ico" ||
      req.file.mimetype === "image/svg" ||
      req.file.mimetype === "image/tiff" ||
      req.file.mimetype === "image/tif" ||
      req.file.mimetype === "image/webp"
    ) {
      db.Message.create({
        ...post,
        contenuMultimedia: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
        UserId: req.auth.userId,
      })
        .then((message) => res.send(message))
        .catch((error) => {
          if (req.file) {
            fs.unlink(`images/${req.file.filename}`, () => {});
          }
          return res.status(404).json({ error });
        });
    } else {
      db.Message.create({
        ...post,
        UserId: req.auth.userId,
      })
        .then((truc) => res.send(truc))
        .catch((error) => {
          if (req.file) {
            fs.unlink(`images/${req.file.filename}`, () => {});
          }
          return res.status(404).json({ error });
        });
    }
  } else {
    db.Message.create({
      ...post,
      UserId: req.auth.userId,
    })
      .then((message) => res.send(message))
      .catch((error) => res.status(400).json({ error }));
  }
};
//----------------------------------------------------------------------------------
// LOGIQUE efface message
//----------------------------------------------------------------------------------
exports.deleteMessage = (req, res, next) => {
  db.Message.findOne({
    where: {
      id: req.params.id,
    },
  }).then((message) => {
    if (!message) {
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
        if (message.contenuMultimedia != null) {
          if (user.moderateur === true || message.userId === req.auth.userId) {
            const filename = message.contenuMultimedia.split("/images/")[1];
            return fs.unlink(`images/${filename}`, () => {
              db.Commentaire.findAll({
                where: {
                  messageId: req.params.id,
                },
              })
                .then((commentaire) => {
                  if (!commentaire) {
                    res.status(404).json("pas de commentaire pour ce message");
                  }
                  db.Commentaire.destroy({
                    where: {
                      messageId: req.params.id,
                    },
                  });
                })
                .catch((error) => res.status(400).json({ error }));
              db.Message.destroy({
                where: {
                  id: req.params.id,
                },
              })
                .then(() =>
                  res.status(200).json({ message: "message supprimé!" })
                )
                .catch((error) => res.status(400).json({ error }));
            });
          } else {
            return res.status(403).send("unauthorized request");
          }
        } else {
          db.Commentaire.findAll({
            where: {
              messageId: req.params.id,
            },
          })
            .then((commentaire) => {
              if (!commentaire) {
                res.status(404).json("pas de commentaire pour ce message");
              }
              db.Commentaire.destroy({
                where: {
                  messageId: req.params.id,
                },
              });
            })
            .catch((error) => res.status(400).json({ error }));
          db.Message.destroy({
            where: {
              id: req.params.id,
            },
          })
            .then(() => res.status(200).json({ message: "message supprimé!" }))
            .catch((error) => res.status(400).json({ error }));
        }
      })
      .catch((error) =>
        res.status(400).send({ error: "vous ne pouvez pas effacer ce message" })
      );
  });
};
